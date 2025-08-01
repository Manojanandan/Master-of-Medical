import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import instance from '../../utils/Instance';

const PendingStatusRoute = () => {
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Allowed routes during pending status
  const allowedRoutes = [
    '/user/edit-profile',
    '/vendor/edit-profile',
    '/status-check'
  ];

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const jwt = sessionStorage.getItem('jwt');
      if (!jwt) {
        setIsLoading(false);
        return;
      }

      const userType = sessionStorage.getItem('userType');
      const endpoint = userType === 'vendor' ? '/api/vendor/profile' : '/api/user/profile';
      
      const response = await instance.get(endpoint);
      
      if (response.data.success) {
        const userData = response.data.data;
        
        // Check if user status is pending
        if (userData.status === 'pending') {
          setIsPending(true);
          
          // If trying to access a restricted route, redirect to status check
          if (!allowedRoutes.includes(location.pathname)) {
            window.location.href = '/status-check';
            return;
          }
        }
      }
    } catch (error) {
      console.error('Error checking user status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // or a loading spinner
  }

  // If user is pending and trying to access a restricted route, redirect to status check
  if (isPending && !allowedRoutes.includes(location.pathname)) {
    return <Navigate to="/status-check" replace />;
  }

  // Allow access to the route
  return <Outlet />;
};

export default PendingStatusRoute; 