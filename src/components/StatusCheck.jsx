import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserInfoFromToken, isUserStatusPending } from '../utils/jwtUtils';
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

  useEffect(() => {
    checkUserStatus();
    
    // Check status every 30 seconds to see if it changes
    const interval = setInterval(() => {
      checkUserStatus();
    }, 30000);
    
    // Listen for login success events
    const handleLoginSuccess = () => {
      console.log('Login success event received, checking status immediately');
      setTimeout(() => {
        checkUserStatus();
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
    if (isProfilePage()) {
      console.log('Route changed to profile page, hiding status popup');
      setShowPopup(false);
    } else {
      // If not on profile page, check status again
      checkUserStatus();
    }
  }, [location.pathname]);

  // Check if current route is a profile page
  const isProfilePage = () => {
    const currentPath = location.pathname;
    return currentPath.includes('/profile') || 
           currentPath.includes('/vendorDashboard/profile') || 
           currentPath.includes('/ecommerceDashboard/profile');
  };

  const checkUserStatus = () => {
    // Don't show popup if user is on profile page
    if (isProfilePage()) {
      console.log('User is on profile page, not showing status popup');
      setShowPopup(false);
      return;
    }

    // Use the utility function to check if user status is pending
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
        console.log('User status is pending, showing popup for:', currentUser);
        setUserData(currentUser);
        setShowPopup(true);
      }
    } else {
      // If status is not pending, hide the popup
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
        <div className="status-popup-header">
          <div className="status-icon pending">⏳</div>
          <h2>Account Pending Approval</h2>
        </div>
        
        <div className="status-popup-content">
          <p>
            Your account is currently pending approval from our admin team. 
            This process usually takes 24-48 hours.
          </p>
          
          <div className="status-details">
            <div className="status-item">
              <strong>Account Type:</strong> 
              <span>{userData?.role || userData?.type || 'User'}</span>
            </div>
            <div className="status-item">
              <strong>Email:</strong> 
              <span>{userData?.email}</span>
            </div>
            <div className="status-item">
              <strong>Status:</strong> 
              <span className="status-badge pending">Pending</span>
            </div>
          </div>
          
          <div className="status-info">
            <h4>What happens next?</h4>
            <ul>
              <li>Our admin team will review your account and verify</li>
              <li>You'll receive an approval status within 24-48 hours</li>
              <li>Once approved, you can access all features of the platform</li>
            </ul>
          </div>
        </div>
        
        <div className="status-popup-actions">
          <button className="btn-primary" onClick={handleEditProfile}>
            Edit Profile
          </button>
          <button className="btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusCheck; 
 