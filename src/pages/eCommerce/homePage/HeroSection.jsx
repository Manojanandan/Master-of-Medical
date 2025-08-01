import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';

// ✅ Adjusted import paths based on the structure shown
import FeatureHighlights from './FeatureHighlights';
import PromotionalCards from './PromotionalCards';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%', padding: isMobile ? '4% 2%' : '2% 3%' }}>
      <FeatureHighlights />
      <PromotionalCards />
    </Box>
  );
};

export default HeroSection;
