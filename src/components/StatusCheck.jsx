import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LinearProgress, Box, Typography, Button } from '@mui/material';
import { getUserInfoFromToken, isUserStatusPending } from '../utils/jwtUtils';
import { instance } from '../utils/Instance';
import RegistrationStepper from './RegistrationStepper';
import './StatusCheck.css';

// Custom event for login success
const LOGIN_SUCCESS_EVENT = 'loginSuccess';

// Utility function to trigger login success event
export const triggerLoginSuccess = () => {
  window.dispatchEvent(new CustomEvent(LOGIN_SUCCESS_EVENT));
};

const StatusCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState(null);


  console.log(userData , "userDataaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

  useEffect(() => {
    // Immediately check if we're on a profile page and hide popup if so
    if (shouldPreventPopup()) {
      console.log('Component mounted on profile page, hiding popup');
      setShowPopup(false);
      setUserData(null);
      return;
    }
    
    checkUserStatus().catch(console.error);
    
    // Check status every 30 seconds to see if it changes
    const interval = setInterval(() => {
      checkUserStatus().catch(console.error);
    }, 30000);
    
    // Listen for login success events
    const handleLoginSuccess = () => {
      console.log('Login success event received, checking status immediately');
      setTimeout(() => {
        checkUserStatus().catch(console.error);
      }, 100); // Small delay to ensure user data is stored
    };
    
    window.addEventListener(LOGIN_SUCCESS_EVENT, handleLoginSuccess);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener(LOGIN_SUCCESS_EVENT, handleLoginSuccess);
    };
  }, []);

  // Monitor route changes and hide popup on profile pages
  useEffect(() => {
    console.log('Route changed to:', location.pathname);
    
    if (shouldPreventPopup()) {
      console.log('Route changed to profile page, hiding status popup immediately');
      setShowPopup(false);
      setUserData(null); // Clear user data as well
    } else {
      // If not on profile page, check status again
      console.log('Route changed to non-profile page, checking status');
      checkUserStatus().catch(console.error);
    }
  }, [location.pathname]);

  // Additional effect to ensure popup is hidden on profile pages
  useEffect(() => {
    if (shouldPreventPopup() && showPopup) {
      console.log('Profile page detected with popup open, hiding popup');
      setShowPopup(false);
      setUserData(null);
    }
  }, [showPopup, location.pathname]);

  // Check if current route is a profile page
  const isProfilePage = () => {
    const currentPath = location.pathname;
    const isProfile = currentPath.includes('/profile') || 
                     currentPath.includes('/vendorDashboard/profile') || 
                     currentPath.includes('/ecommerceDashboard/profile');
    
    console.log('Profile page check:', { currentPath, isProfile });
    return isProfile;
  };

  // Check if popup should be prevented from showing
  const shouldPreventPopup = () => {
    // Always prevent on profile pages
    if (isProfilePage()) {
      return true;
    }
    
    // Additional checks can be added here if needed
    return false;
  };

  // Function to check current status from API
  const checkCurrentStatusFromAPI = async () => {
    try {
      const userData = sessionStorage.getItem('userData');
      if (!userData) {
        console.log('No user data found, skipping API check');
        return null;
      }

      const parsedUserData = JSON.parse(userData);
      const userId = parsedUserData.id;
      const userType = sessionStorage.getItem('userType');

      if (!userId) {
        console.log('No user ID found, skipping API check');
        return null;
      }

      // Determine the correct API endpoint based on user type
      let endpoint = '';
      if (userType === 'vendor') {
        endpoint = `vendor/get-vendor/${userId}`;
      } else {
        endpoint = `customer/get-customer/${userId}`;
      }

      console.log(`Checking current status from API: ${endpoint}`);
      
      const response = await instance.get(endpoint);
      console.log('API Response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error checking status from API:', error);
      return null;
    }
  };

  const checkUserStatus = async () => {
    // Don't show popup if user is on profile page or should be prevented
    if (shouldPreventPopup()) {
      console.log('Popup prevented from showing - user is on profile page');
      setShowPopup(false);
      setUserData(null); // Clear user data
      return;
    }

    console.log('Checking user status...');
    
    // First check local status
    if (isUserStatusPending()) {
      // Get user info from token
      const user = getUserInfoFromToken();      
      // Also check sessionStorage for user data
      const sessionUserData = sessionStorage.getItem('userData');
      let parsedUserData = null;
      
      if (sessionUserData) {
        try {
          parsedUserData = JSON.parse(sessionUserData);
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }

      // Use the most complete user data
      const currentUser = parsedUserData || user;
      
      if (currentUser) {
        // Check current status from API to see if it has changed
        const apiResponse = await checkCurrentStatusFromAPI();
        
        if (apiResponse && apiResponse.success) {
          const currentStatus = apiResponse.data?.status || apiResponse.data?.approvalStatus;
          console.log('Current status from API:', currentStatus);
          console.log('API Response data:', apiResponse.data);
          
          if (currentStatus === 'approved' || currentStatus === 'active') {
            console.log('✅ User has been approved! Hiding popup and updating session data');
            setShowPopup(false);
            
            // Update session data with new status
            if (parsedUserData) {
              parsedUserData.status = currentStatus;
              sessionStorage.setItem('userData', JSON.stringify(parsedUserData));
            }
            
            // Optionally refresh the page or redirect to show approved state
            window.location.reload();
            return;
          } else if (currentStatus === 'pending') {
            console.log('✅ User status is still pending, showing popup');
            // Use API response data instead of currentUser to get the correct type
            setUserData(apiResponse.data);
            setShowPopup(true);
          } else {
            console.log('❌ Unknown status:', currentStatus);
            setShowPopup(false);
          }
        } else {
          // If API check fails, fall back to local check
          console.log('API check failed, using local status check');
        setUserData(currentUser);
        setShowPopup(true);
        }
      } else {
        console.log('❌ No user data found for status check');
      }
    } else {
      // If local status is not pending, hide the popup
      console.log('✅ User status is not pending, hiding popup');
      setShowPopup(false);
    }
  };

  const handleLogout = () => {
    // Clear all session data
    sessionStorage.clear();
    localStorage.removeItem('token');
    
    // Redirect to login
    window.location.href = '/login';
  };

  const handleEditProfile = () => {
    // Close the popup
    setShowPopup(false);
    
    // Navigate to profile page based on user type
    const userType = sessionStorage.getItem('userType');
    if (userType === 'vendor') {
      navigate('/vendorDashboard/profile');
    } else {
      navigate('/ecommerceDashboard/profile');
    }
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div className="status-popup-overlay">
      <div className="status-popup">
        {/* Back Button */}
        <div className="back-button">
          <button onClick={handleLogout} className="back-btn">
            <span>←</span> Back
          </button>
        </div>

        {/* Main Content */}
        <div className="status-popup-main">
          <div className="status-popup-card">
            {/* Title */}
            <Typography variant="h4" className="status-title">
              Under Review
            </Typography>

            {/* Registration Stepper */}
            <Box sx={{ mb: 4, mt: 3 }}>
              <RegistrationStepper currentStep={3} />
            </Box>

            {/* Thank You Message */}
            <Typography variant="h5" className="thank-you-title">
              Thank You for Registering!
            </Typography>
            
            <Typography variant="body1" className="thank-you-message">
              Your account is currently under review. Our admin team will verify the details you've submitted. This process typically takes 4 to 48 hours.
            </Typography>

            {/* Account Details */}
            <div className="account-details">
              <div className="detail-item">
                <span className="detail-label">Account Type:</span>
                <span className="detail-value">{userData?.type || '-'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{userData?.email || 'dhanush12@gmail.com'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className="status-badge-pending">PENDING</span>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="what-happens-next">
              <Typography variant="h6" className="what-happens-title">
                What happens next?
              </Typography>
              <ul className="what-happens-list">
                <li>Our admin team will review your account and verify</li>
                <li>You'll receive an approval status within 24-48 hours</li>
                <li>Once approved, you can access all features of the platform</li>
              </ul>
            </div>

            {/* Review Status Note */}
            <div className="review-status-note">
              <Typography variant="body2" className="review-note-text">
                Your account is currently pending approval our admin will review you submitted details. This process usually takes 4 - 48 hours
              </Typography>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <Button 
                variant="contained" 
                className="edit-profile-btn"
                onClick={handleEditProfile}
              >
                Edit Profile
              </Button>
              <Button 
                variant="outlined" 
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCheck; 
 