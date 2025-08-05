// Color palette for feature highlights
const colors = {
  primary: '#de3b6f',
  secondary: '#f49507',
  accent: '#873589',
  background: '#fff',
  border: '#f1ac1b',
  text: '#22223b',
  lightText: '#6c757d',
  lightBg: '#f8f9fa',
};
// FeatureHighlights.jsx
import React from 'react';
import { Box, Stack, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Payment, LocalOffer, Verified, LocalShipping } from '@mui/icons-material';

const FeatureHighlights = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

const featureList = [
  {
    icon: <Payment sx={{ fontSize: isMobile ? 32 : 42, color: colors.primary }} />,
    heading: "100% Safe & Secure Payments",
    description: "Shop with confidence using our 100% secure online payment system."
  },
  {
    icon: <LocalOffer sx={{ fontSize: isMobile ? 32 : 42, color: colors.secondary }} />,
    heading: "Fresh Stock & Exclusive Deals",
    description: "Enjoy the latest products and special offers, updated regularly just for you."
  },
  {
    icon: <Verified sx={{ fontSize: isMobile ? 32 : 42, color: colors.accent }} />,
    heading: "Trusted Quality Assurance",
    description: "We guarantee premium quality products, thoroughly tested before delivery."
  },
  {
    icon: <LocalShipping sx={{ fontSize: isMobile ? 32 : 42, color: colors.primary }} />,
    heading: "Fast Delivery",
    description: "Get your orders quickly with our efficient and reliable delivery service."
  }
];


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        flexWrap: 'wrap',
        gap: isMobile ? '4%' : '2%',
        margin: isMobile ? '40px 0' : '50px 0', // Increased margin space
        padding: isMobile ? '0 10px' : '0 20px', // Added padding
      }}
    >
      {featureList.map((feature, i) => (
        <Box
          key={i}
          sx={{
            height: 'auto',
            width: isMobile ? '48%' : isTablet ? '48%' : '23%',
            minWidth: isMobile ? 'auto' : '250px',
            padding: isMobile ? '20px' : '25px', // Increased padding
            borderRadius: '16px', // Increased border radius
            backgroundColor: colors.background,
            border: `2px solid ${colors.border}`,
            marginBottom: isMobile ? '20px' : '15px', // Increased margin
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}10)`,
              opacity: 0,
              transition: 'opacity 0.3s ease',
              zIndex: 0,
            },
            '&:hover': {
              transform: 'translateY(-8px) scale(1.02)', // Enhanced hover effect
              borderColor: colors.primary,
              boxShadow: `0 15px 35px rgba(222, 59, 111, 0.2), 0 5px 15px rgba(0,0,0,0.1)`,
              '&::before': {
                opacity: 1,
              },
              '& .feature-icon': {
                transform: 'scale(1.2) rotate(5deg)',
                filter: 'drop-shadow(0 4px 8px rgba(222, 59, 111, 0.3))',
              },
              '& .feature-heading': {
                color: colors.primary,
                transform: 'translateY(-2px)',
              },
              '& .feature-description': {
                color: colors.text,
                transform: 'translateY(-1px)',
              }
            }
          }}
        >
          <Stack 
            direction={isMobile ? 'column' : 'row'} 
            spacing={isMobile ? 2 : 2.5}
            sx={{ position: 'relative', zIndex: 1 }}
          >
            <Box
              sx={{
                height: isMobile ? '50px' : '70px', // Increased size
                width: isMobile ? '100%' : '90px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: `${colors.lightBg}`,
                borderRadius: '12px',
                transition: 'all 0.3s ease',
              }}
            >
              <Box 
                className="feature-icon"
                sx={{
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {feature.icon}
              </Box>
            </Box>
            <Box sx={{ height: 'auto', width: '100%' }}>
              <Typography
                className="feature-heading"
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  fontSize: isMobile ? '15px' : '17px', // Increased font size
                  marginBottom: '10px',
                  textAlign: isMobile ? 'center' : 'left',
                  color: colors.text,
                  transition: 'all 0.3s ease',
                  lineHeight: 1.3,
                }}
              >
                {feature.heading}
              </Typography>
              <Typography
                className="feature-description"
                variant="body2"
                sx={{
                  fontSize: isMobile ? '12px' : '14px',
                  color: colors.lightText,
                  textAlign: isMobile ? 'center' : 'left',
                  lineHeight: 1.5,
                  transition: 'all 0.3s ease',
                }}
              >
                {feature.description}
              </Typography>
            </Box>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};


export default FeatureHighlights;
