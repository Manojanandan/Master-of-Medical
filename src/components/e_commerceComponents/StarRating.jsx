import React from 'react';
import { Box, Typography } from '@mui/material';

const StarRating = ({ 
  rating = 0, 
  reviewCount = 0, 
  size = 'medium', 
  showReviewCount = true, 
  color = '#FFD700',
  emptyColor = '#e0e0e0'
}) => {
  const ratingValue = parseFloat(rating);
  
  // Size configurations
  const sizeConfig = {
    small: { fontSize: '12px', gap: '2px' },
    medium: { fontSize: '16px', gap: '4px' },
    large: { fontSize: '20px', gap: '6px' }
  };
  
  const config = sizeConfig[size] || sizeConfig.medium;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: config.gap }}>
      {[...Array(5)].map((_, index) => {
        const isFilled = index < Math.floor(ratingValue);
        const isHalfFilled = !isFilled && index === Math.floor(ratingValue) && ratingValue % 1 > 0;
        
        return (
          <Box
            key={index}
            sx={{
              color: isFilled ? color : isHalfFilled ? color : emptyColor,
              fontSize: config.fontSize,
              position: 'relative',
              display: 'inline-block',
            }}
          >
            {isHalfFilled ? (
              <>
                <Box
                  sx={{
                    position: 'absolute',
                    width: '50%',
                    overflow: 'hidden',
                    color: color,
                  }}
                >
                  ★
                </Box>
                <Box sx={{ color: emptyColor }}>★</Box>
              </>
            ) : (
              '★'
            )}
          </Box>
        );
      })}
      {showReviewCount && reviewCount > 0 && (
        <Typography 
          variant="body2" 
          sx={{
            color: '#666666',
            fontSize: size === 'small' ? '10px' : size === 'large' ? '14px' : '12px',
            marginLeft: '4px',
          }}
        >
          ({reviewCount})
        </Typography>
      )}
    </Box>
  );
};

export default StarRating; 