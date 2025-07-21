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
      '/ecommerceDashboard': 'fade',
      '/ecommerceDashboard/products': 'slide',
      '/ecommerceDashboard/product': 'zoom',
      '/ecommerceDashboard/cart': 'slide',
      '/ecommerceDashboard/checkout': 'grow',
      '/ecommerceDashboard/profile': 'fade',
      '/login': 'slide',
      '/signup': 'slide',
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
      '/ecommerceDashboard/products': 'up',
      '/ecommerceDashboard/cart': 'right',
      '/ecommerceDashboard/checkout': 'up',
      '/ecommerceDashboard/profile': 'up',
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
      '/ecommerceDashboard': 800,
      '/ecommerceDashboard/product': 700,
      '/ecommerceDashboard/checkout': 800,
      '/ecommerceDashboard/profile': 1000,
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