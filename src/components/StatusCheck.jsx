import React, { useState, useEffect } from 'react';
import { getUserInfoFromToken, isUserStatusPending } from '../utils/jwtUtils';
import './StatusCheck.css';

const StatusCheck = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    checkUserStatus();
    
    // Check status every 30 seconds to see if it changes
    const interval = setInterval(() => {
      checkUserStatus();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const checkUserStatus = () => {
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
              <li>Our admin team will review your account</li>
              <li>You'll receive an email notification once approved</li>
              <li>You can then access all features of the platform</li>
            </ul>
          </div>
        </div>
        
        <div className="status-popup-actions">
          <button className="btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusCheck; 
 