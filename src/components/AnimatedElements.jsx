import React from 'react';
import { Card, Button, TextField, Chip, IconButton } from '@mui/material';
import { Fade, Grow, Zoom } from '@mui/material';
import '../styles/animations.css';

// Animated Card Component
export const AnimatedCard = ({ children, delay = 0, className = '', ...props }) => {
  return (
    <Fade in={true} timeout={600} style={{ transitionDelay: `${delay}ms` }}>
      <Card className={`cardHover cardFadeIn ${className}`} {...props}>
        {children}
      </Card>
    </Fade>
  );
};

// Animated Product Card Component
export const AnimatedProductCard = ({ children, index = 0, className = '', ...props }) => {
  const delay = index * 100;
  
  return (
    <Grow in={true} timeout={600} style={{ transitionDelay: `${delay}ms` }}>
      <Card className={`productCard ${className}`} {...props}>
        {children}
      </Card>
    </Grow>
  );
};

// Animated Button Component
export const AnimatedButton = ({ children, delay = 0, className = '', ...props }) => {
  return (
    <Fade in={true} timeout={400} style={{ transitionDelay: `${delay}ms` }}>
      <Button className={`buttonAnimated ${className}`} {...props}>
        {children}
      </Button>
    </Fade>
  );
};

// Animated Text Field Component
export const AnimatedTextField = ({ delay = 0, className = '', ...props }) => {
  return (
    <Fade in={true} timeout={500} style={{ transitionDelay: `${delay}ms` }}>
      <TextField className={`inputAnimated ${className}`} {...props} />
    </Fade>
  );
};

// Animated Chip Component
export const AnimatedChip = ({ children, delay = 0, className = '', ...props }) => {
  return (
    <Zoom in={true} timeout={400} style={{ transitionDelay: `${delay}ms` }}>
      <Chip className={`chip ${className}`} {...props}>
        {children}
      </Chip>
    </Zoom>
  );
};

// Animated Icon Button Component
export const AnimatedIconButton = ({ children, delay = 0, className = '', ...props }) => {
  return (
    <Fade in={true} timeout={300} style={{ transitionDelay: `${delay}ms` }}>
      <IconButton className={`buttonAnimated ${className}`} {...props}>
        {children}
      </IconButton>
    </Fade>
  );
};

// Animated Container Component
export const AnimatedContainer = ({ children, delay = 0, className = '', animationType = 'fade' }) => {
  const getAnimationComponent = () => {
    switch (animationType) {
      case 'fade':
        return (
          <Fade in={true} timeout={600} style={{ transitionDelay: `${delay}ms` }}>
            <div className={`containerFadeIn ${className}`}>
              {children}
            </div>
          </Fade>
        );
      case 'slide':
        return (
          <Fade in={true} timeout={600} style={{ transitionDelay: `${delay}ms` }}>
            <div className={`containerSlideIn ${className}`}>
              {children}
            </div>
          </Fade>
        );
      case 'grow':
        return (
          <Grow in={true} timeout={600} style={{ transitionDelay: `${delay}ms` }}>
            <div className={`containerFadeIn ${className}`}>
              {children}
            </div>
          </Grow>
        );
      default:
        return (
          <div className={`containerFadeIn ${className}`}>
            {children}
          </div>
        );
    }
  };

  return getAnimationComponent();
};

// Staggered List Component
export const StaggeredList = ({ children, className = '', itemClassName = '' }) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <div 
          className={`staggerItem ${itemClassName}`} 
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Animated Hero Section Component
export const AnimatedHeroSection = ({ children, className = '' }) => {
  return (
    <div className={`heroSection ${className}`}>
      {children}
    </div>
  );
};

// Animated Banner Component
export const AnimatedBanner = ({ children, animationType = 'slide', className = '' }) => {
  const bannerClass = animationType === 'slide' ? 'bannerSlide' : 'bannerFade';
  
  return (
    <Fade in={true} timeout={800}>
      <div className={`${bannerClass} ${className}`}>
        {children}
      </div>
    </Fade>
  );
};

// Animated Category Card Component
export const AnimatedCategoryCard = ({ children, delay = 0, className = '', ...props }) => {
  return (
    <Fade in={true} timeout={500} style={{ transitionDelay: `${delay}ms` }}>
      <Card className={`categoryCard ${className}`} {...props}>
        {children}
      </Card>
    </Fade>
  );
};

// Animated Cart Item Component
export const AnimatedCartItem = ({ children, className = '', isRemoving = false, ...props }) => {
  const cartItemClass = isRemoving ? 'cartItemRemoving' : 'cartItem';
  
  return (
    <Fade in={!isRemoving} timeout={300}>
      <div className={`${cartItemClass} ${className}`} {...props}>
        {children}
      </div>
    </Fade>
  );
};

// Animated Checkout Step Component
export const AnimatedCheckoutStep = ({ children, isActive = false, className = '', ...props }) => {
  const stepClass = isActive ? 'checkoutStep active' : 'checkoutStep';
  
  return (
    <Fade in={true} timeout={600}>
      <div className={`${stepClass} ${className}`} {...props}>
        {children}
      </div>
    </Fade>
  );
};

// Animated Form Field Component
export const AnimatedFormField = ({ children, index = 0, className = '', ...props }) => {
  const delay = index * 100;
  
  return (
    <Fade in={true} timeout={500} style={{ transitionDelay: `${delay}ms` }}>
      <div className={`formField ${className}`} {...props}>
        {children}
      </div>
    </Fade>
  );
};

// Animated Loading Component
export const AnimatedLoading = ({ type = 'spinner', className = '' }) => {
  const getLoadingClass = () => {
    switch (type) {
      case 'spinner':
        return 'loadingSpinner';
      case 'pulse':
        return 'loadingPulse';
      case 'skeleton':
        return 'loadingSkeleton';
      default:
        return 'loadingSpinner';
    }
  };

  return (
    <div className={`${getLoadingClass()} ${className}`} />
  );
};

// Animated Message Component
export const AnimatedMessage = ({ children, type = 'success', className = '' }) => {
  const messageClass = type === 'success' ? 'successMessage' : 'errorMessage';
  
  return (
    <Fade in={true} timeout={500}>
      <div className={`${messageClass} ${className}`}>
        {children}
      </div>
    </Fade>
  );
}; 