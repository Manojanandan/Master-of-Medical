import React, { useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { motion } from 'framer-motion';

const ThankYou = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    // Scroll to top on component mount
//     window.scrollTo(0, 0);
//   }, []);
    // Get order ID from navigation state
    if (location.state?.orderId) {
      setOrderId(location.state.orderId);
    }
    
    // Clear cart after successful order
    dispatch(clearCart());
  }, [location.state, dispatch]);

  const handleContinueShopping = () => {
    setLoading(true);
            navigate('/customer');
  };

  const handleViewOrders = () => {
    setLoading(true);
            navigate('/customer/profile');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Box sx={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: theme.palette.background.default,
      backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 1) 90%)',
      padding: { xs: 2, md: 4 }
    }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <Card sx={{ 
          maxWidth: 800, 
          width: '100%', 
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          borderRadius: 8,
          overflow: 'visible',
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
            borderRadius: 8,
            zIndex: -1,
            opacity: 0.7,
            filter: 'blur(10px)'
          }
        }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <motion.div variants={fadeInUp}>
              <Box sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 100,
                height: 100,
                borderRadius: '50%',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                mb: 3,
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '2px dashed rgba(76, 175, 80, 0.5)',
                  animation: 'spin 20s linear infinite',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                  }
                }
              }}>
                <CheckCircleOutlineIcon 
                  sx={{ 
                    fontSize: 60, 
                    color: '#4caf50',
                  }} 
                />
              </Box>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Typography variant="h4" component="h1" sx={{ 
                fontWeight: 700, 
                mb: 2,
                color: theme.palette.text.primary,
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}>
                Order Confirmed!
              </Typography>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Typography variant="h6" sx={{ 
                mb: 3, 
                color: theme.palette.text.secondary,
                fontWeight: 500,
                fontSize: { xs: '1.1rem', md: '1.25rem' }
              }}>
                Thank you for your purchase!
              </Typography>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Typography variant="body1" sx={{ 
                mb: 4, 
                color: theme.palette.text.secondary,
                lineHeight: 1.8,
                maxWidth: 600,
                mx: 'auto',
                fontSize: { xs: '0.95rem', md: '1rem' }
              }}>
                Your order #ORD-{Math.floor(Math.random() * 1000000)} has been successfully placed. 
                A confirmation email has been sent with all the details. 
                Our team is preparing your medical supplies for shipment.
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                mt: 3
              }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/ecommerceDashboard')}
                  sx={{ 
                    borderRadius: 50, 
                    px: 4, 
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 600,
                    minWidth: 200,
                    background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
                    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
                      background: 'linear-gradient(45deg, #3d8b40, #7cb342)'
                    }
                  }}
                >
                  Continue Shopping
                </Button>
                
                <Button
                  variant="outlined"
                  onClick={() => navigate('/ecommerceDashboard/profile')}
                  sx={{ 
                    borderRadius: 50, 
                    px: 4, 
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 600,
                    minWidth: 200,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      backgroundColor: 'rgba(76, 175, 80, 0.08)'
                    }
                  }}
                >
                  Track Order
                </Button>
              </Box>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography variant="body2" sx={{ 
                mt: 4, 
                color: theme.palette.text.secondary,
                fontStyle: 'italic'
              }}>
                Need assistance? <Box component="span" sx={{ color: '#4caf50', fontWeight: 500 }}>Contact our support team</Box>
              </Typography>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default ThankYou;