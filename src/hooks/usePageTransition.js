import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== currentPage) {
      setIsTransitioning(true);
      
      // Simulate page transition
      const timer = setTimeout(() => {
        setCurrentPage(location.pathname);
        setIsTransitioning(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, currentPage]);

  const getAnimationType = (pathname) => {
    // Define animation types based on route
    const animationMap = {
      '/': 'fade',
      '/customer': 'fade',
      '/customer/products': 'slide',
      '/customer/products/': 'zoom',
      '/customer/cart': 'slide',
      '/customer/checkout': 'grow',
      '/customer/profile': 'fade',
      '/auth/login': 'slide',
      '/auth/register': 'slide',
      '/auth/complete-profile': 'fade',
      '/auth/forgot-password': 'slide',
      '/vendor': 'fade',
      '/vendor/products': 'slide',
      '/vendor/products/': 'zoom',
      '/vendor/orders': 'slide',
      '/vendor/profile': 'fade',
      '/profile/customer/edit': 'fade',
      '/profile/vendor/edit': 'fade',
      '/legal/terms-of-use': 'slide',
      '/legal/privacy-policy': 'slide',
      // Legacy routes for backward compatibility
      '/login': 'slide',
      '/signup': 'slide',
      '/ecommerceDashboard': 'fade',
      '/vendorDashboard': 'fade',
    };

    // Find matching route
    for (const [route, animation] of Object.entries(animationMap)) {
      if (pathname.startsWith(route)) {
        return animation;
      }
    }

    return 'fade'; // default animation
  };

  const getAnimationDirection = (pathname) => {
    // Define animation directions based on route
    const directionMap = {
      '/customer/products': 'up',
      '/customer/cart': 'right',
      '/customer/checkout': 'up',
      '/customer/profile': 'up',
      '/auth/login': 'up',
      '/auth/register': 'up',
      '/auth/complete-profile': 'fade',
      '/auth/forgot-password': 'up',
      '/vendor/products': 'up',
      '/vendor/orders': 'up',
      '/vendor/profile': 'up',
      '/profile/customer/edit': 'fade',
      '/profile/vendor/edit': 'fade',
      '/legal/terms-of-use': 'left',
      '/legal/privacy-policy': 'left',
      // Legacy routes
      '/login': 'up',
      '/signup': 'up',
    };

    for (const [route, direction] of Object.entries(directionMap)) {
      if (pathname.startsWith(route)) {
        return direction;
      }
    }

    return 'up'; // default direction
  };

  const getAnimationTimeout = (pathname) => {
    // Define animation timeouts based on route
    const timeoutMap = {
      '/': 1000,
      '/customer': 800,
      '/customer/products/': 700,
      '/customer/checkout': 800,
      '/customer/profile': 1000,
      '/auth/login': 600,
      '/auth/register': 600,
      '/auth/complete-profile': 600,
      '/auth/forgot-password': 600,
      '/vendor': 800,
      '/vendor/products/': 700,
      '/vendor/profile': 800,
      '/profile/customer/edit': 800,
      '/profile/vendor/edit': 800,
      '/legal/terms-of-use': 600,
      '/legal/privacy-policy': 600,
      // Legacy routes
      '/ecommerceDashboard': 800,
      '/vendorDashboard': 800,
    };

    for (const [route, timeout] of Object.entries(timeoutMap)) {
      if (pathname.startsWith(route)) {
        return timeout;
      }
    }

    return 600; // default timeout
  };

  return {
    isTransitioning,
    currentPage,
    getAnimationType: () => getAnimationType(location.pathname),
    getAnimationDirection: () => getAnimationDirection(location.pathname),
    getAnimationTimeout: () => getAnimationTimeout(location.pathname),
  };
};

export default usePageTransition; 