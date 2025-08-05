import React, { useEffect, useState } from 'react';
import { Fade, Slide, Grow, Zoom } from '@mui/material';
import '../styles/animations.css';

const AnimatedPage = ({ 
  children, 
  animationType = 'fade', 
  direction = 'up', 
  timeout = 600,
  className = '',
  delay = 0 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationComponent = () => {
    switch (animationType) {
      case 'fade':
        return (
          <Fade in={isVisible} timeout={timeout}>
            <div className={`pageTransition ${className}`}>
              {children}
            </div>
          </Fade>
        );
      case 'slide':
        return (
          <Slide direction={direction} in={isVisible} timeout={timeout}>
            <div className={`pageSlideIn ${className}`}>
              {children}
            </div>
          </Slide>
        );
      case 'grow':
        return (
          <Grow in={isVisible} timeout={timeout}>
            <div className={`pageTransition ${className}`}>
              {children}
            </div>
          </Grow>
        );
      case 'zoom':
        return (
          <Zoom in={isVisible} timeout={timeout}>
            <div className={`pageTransition ${className}`}>
              {children}
            </div>
          </Zoom>
        );
      default:
        return (
          <div className={`pageTransition ${className}`}>
            {children}
          </div>
        );
    }
  };

  return getAnimationComponent();
};

export default AnimatedPage; 