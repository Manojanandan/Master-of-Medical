import React from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery, Stack } from '@mui/material';
import { ShoppingCart, Payment, LocalOffer, Verified, LocalShipping } from '@mui/icons-material';

// Color theme
const colors = {
  primary: '#de3b6f',
  secondary: '#f49507',
  accent: '#873589',
  text: '#2C3E50',
  lightText: '#7F8C8D',
  background: '#ffffff',
  lightBg: '#f8f9fa',
  border: '#e0e0e0'
};

const promotionalCards = [
  {
    badge: "Only This Week",
    title: "Quality Injections at an affordable price",
    description: "Don't Miss it......",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80"
  },
  {
    badge: "MVP",
    title: "Products that nourishes our mind and body",
    description: "Shine the morning...",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80"
  },
  {
    badge: "#1 contentor product",
    title: "Unbeatable quality, unbeatable prices.",
    description: "Only this week. Don't miss...",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80"
  },
  {
    badge: "Hall of Fame",
    title: "Unbeatable quality, unbeatable prices.",
    description: "Only this week. Don't miss...",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80"
  }
];

const PromotionalCards = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        flexWrap: 'wrap',
        gap: isMobile ? '4%' : '2%',
        margin: isMobile ? '30px 0' : '40px 0', // Added margin space
        padding: isMobile ? '0 10px' : '0 20px', // Added padding
      }}
    >
      {promotionalCards.map((card, i) => (
        <Box
          key={i}
          sx={{
            height: isMobile ? '280px' : '220px', // Increased height
            width: isMobile ? '48%' : isTablet ? '48%' : '23%',
            minWidth: isMobile ? 'auto' : '250px',
            position: 'relative',
            borderRadius: '20px', // Increased border radius
            overflow: 'hidden',
            boxShadow: `0 8px 25px rgba(222, 59, 111, 0.15)`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            marginBottom: isMobile ? '20px' : '10px', // Increased margin
            cursor: 'pointer',
            '&:hover': {
              transform: 'translateY(-12px) scale(1.02)', // Enhanced hover effect
              boxShadow: `0 20px 40px rgba(222, 59, 111, 0.25), 0 8px 16px rgba(0,0,0,0.1)`,
              '& .card-overlay': {
                background: `linear-gradient(135deg, rgba(222, 59, 111, 0.95) 0%, rgba(135, 53, 137, 0.85) 100%)`,
              },
              '& .card-title': {
                color: '#ffffff',
                transform: 'translateY(-5px)',
              },
              '& .card-description': {
                color: 'rgba(255, 255, 255, 0.9)',
                transform: 'translateY(-3px)',
              },
              '& .card-badge': {
                backgroundColor: colors.secondary,
                transform: 'scale(1.1)',
              },
              '& .shop-button': {
                backgroundColor: '#ffffff',
                color: colors.primary,
                borderColor: '#ffffff',
                transform: 'translateY(-8px) scale(1.05)',
              }
            }
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${card.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 1,
              filter: 'brightness(1.1) contrast(1.05)',
            }}
          />
          <Box
            className="card-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 100%)',
              zIndex: 2,
              padding: isMobile ? '20px' : '25px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.4s ease',
            }}
          >
            <Box>
              <Box
                className="card-badge"
                sx={{
                  display: 'inline-block',
                  backgroundColor: colors.primary,
                  color: '#ffffff',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: isMobile ? '10px' : '11px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(222, 59, 111, 0.3)',
                }}
              >
                {card.badge}
              </Box>
              <Typography 
                className="card-title"
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: colors.text, 
                  fontSize: isMobile ? '15px' : '19px', 
                  marginTop: '12px',
                  lineHeight: 1.3,
                  transition: 'all 0.3s ease',
                }}
              >
                {card.title}
              </Typography>
              <Typography 
                className="card-description"
                variant="body2" 
                sx={{ 
                  color: colors.lightText, 
                  fontSize: isMobile ? '12px' : '14px', 
                  marginTop: '10px',
                  lineHeight: 1.4,
                  transition: 'all 0.3s ease',
                }}
              >
                {card.description}
              </Typography>
            </Box>
            <Button
              className="shop-button"
              variant="outlined"
              sx={{
                borderColor: colors.primary,
                borderRadius: '25px',
                color: colors.primary,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: `2px solid ${colors.primary}`,
                '&:hover': {
                  backgroundColor: colors.primary,
                  color: '#ffffff',
                  borderColor: colors.primary,
                },
                alignSelf: 'flex-start',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: isMobile ? '12px' : '14px',
                padding: isMobile ? '8px 16px' : '10px 20px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 12px rgba(222, 59, 111, 0.2)',
              }}
              endIcon={<ShoppingCart sx={{ fontSize: isMobile ? 16 : 18 }} />}
            >
              Shop Now
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const FeatureHighlights = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const featureList = [
    {
      icon: <Payment sx={{ fontSize: isMobile ? 32 : 42, color: colors.primary }} />,
      heading: "Payment only online",
      description: "Secure online payments with multiple gateway options for your convenience."
    },
    {
      icon: <LocalOffer sx={{ fontSize: isMobile ? 32 : 42, color: colors.secondary }} />,
      heading: "New stocks and sales",
      description: "Get notified about latest stock arrivals and exclusive sales offers."
    },
    {
      icon: <Verified sx={{ fontSize: isMobile ? 32 : 42, color: colors.accent }} />,
      heading: "Quality assurance",
      description: "Premium quality products with certified authenticity and safety standards."
    },
    {
      icon: <LocalShipping sx={{ fontSize: isMobile ? 32 : 42, color: colors.primary }} />,
      heading: "Delivery from 1 hour",
      description: "Fast and reliable delivery service starting from just one hour."
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

export default PromotionalCards;
