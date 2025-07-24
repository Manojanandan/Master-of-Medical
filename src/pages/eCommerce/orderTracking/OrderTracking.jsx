/* import React from 'react'
import BreadCrumbs from '../../../components/e_commerceComponents/BreadCrumbs'
import { Box, Typography } from '@mui/material'

const OrderTracking = () => {
  return (
    <Box sx={{height:'auto',width:'100%',}}>
        <BreadCrumbs title={"Order Tracking"} />
        <Box sx={{height:'100%',width:'90%',margin:'2% auto'}}>
            <Typography variant='h5' sx={{fontWeight:'bold',margin:'1% 0'}}>Note</Typography>
            <Typography variant='p' sx={{fontSize:'16px',}}>Stay in control with real-time order tracking.</Typography><br />
            <Typography variant='p' sx={{fontSize:'16px',lineHeight:'50px',marginLeft:'2%'}}>1. Log in to your M.O.M account</Typography><br/>
            <Typography variant='p' sx={{fontSize:'16px',lineHeight:'50px',marginLeft:'2%'}}>2.	Navigate to “My Orders”</Typography><br />
            <Typography variant='p' sx={{fontSize:'16px',lineHeight:'50px',marginLeft:'2%'}}>3.	Click “Track Order” for live updates on shipment, delivery, and status</Typography><br />
            <Typography variant='p' sx={{fontSize:'16px',lineHeight:'50px'}}>You’ll also receive notifications via SMS and email at every key stage.</Typography><br />
        </Box>
    </Box>
  )
}

export default OrderTracking */


import React, { useEffect } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

const OrderTracking = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff' }}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            mt: 0,
            borderRadius: 2,
            bgcolor: '#ffffff',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              color: '#003087',
              textAlign: 'center',
              fontSize: { xs: '1.8rem', md: '2.5rem' },
            }}
          >
            Order Tracking
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'medium',
              mb: 2,
              color: '#1e40af',
              fontSize: { xs: '1.2rem', md: '1.5rem' },
            }}
          >
            Note
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.9rem', md: '1rem' },
              color: '#374151',
              mb: 4,
              lineHeight: 1.8,
            }}
          >
            Stay in control with real-time order tracking at Master of Medical.
          </Typography>
          <Box sx={{ pl: { xs: 2, md: 4 }, mb: 4 }}>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: '#212121',
                mb: 2,
                lineHeight: 2,
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Box component="span" sx={{ mr: 2, color: '#1a237e' }}>1.</Box>
              Log in to your Master of Medical account.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: '#212121',
                mb: 2,
                lineHeight: 2,
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Box component="span" sx={{ mr: 2, color: '#1a237e' }}>2.</Box>
              Navigate to “My Orders” in your account dashboard.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: '#212121',
                mb: 2,
                lineHeight: 2,
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Box component="span" sx={{ mr: 2, color: '#1a237e' }}>3.</Box>
              Click “Track Order” for live updates on shipment, delivery, and status.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: '#212121',
                mt: 2,
                lineHeight: 2,
              }}
            >
              You’ll also receive notifications via SMS and email at every key stage of your order.
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: '0.8rem', md: '0.9rem' },
              color: '#6b7280',
              textAlign: 'center',
              mt: 4,
            }}
          >
            Last updated: July 24, 2025
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default OrderTracking;