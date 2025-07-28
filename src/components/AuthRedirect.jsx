import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndRedirect = () => {
      const jwt = sessionStorage.getItem('jwt');
      const userType = sessionStorage.getItem('userType');
      
      if (jwt && userType) {
        // User is logged in, redirect to appropriate dashboard
        if (userType === 'user' || userType === 'customer') {
          navigate('/customer');
        } else if (userType === 'vendor') {
          navigate('/vendor');
        }
      }
      // If not logged in, stay on the landing page
    };

    checkAuthAndRedirect();
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default AuthRedirect; 