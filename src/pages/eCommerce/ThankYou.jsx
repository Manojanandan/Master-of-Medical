import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: 2
    }}>
      <Card sx={{ 
        maxWidth: 600, 
        width: '100%', 
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        borderRadius: 3
      }}>
        <CardContent sx={{ p: 4 }}>
          <CheckCircleOutlineIcon 
            sx={{ 
              fontSize: 80, 
              color: '#4caf50', 
              mb: 3 
            }} 
          />
          
          <Typography variant="h4" component="h1" sx={{ 
            fontWeight: 600, 
            mb: 2,
            color: '#2e7d32'
          }}>
            Thank You!
          </Typography>
          
          <Typography variant="h6" sx={{ 
            mb: 3, 
            color: '#666',
            fontWeight: 500
          }}>
            Your order has been placed successfully
          </Typography>
          
          <Typography variant="body1" sx={{ 
            mb: 4, 
            color: '#666',
            lineHeight: 1.6
          }}>
            We have received your order and will process it shortly. 
            You will receive an email confirmation with your order details.
            Our team will contact you soon regarding delivery.
            <br /><br />
            <strong>Your cart has been cleared and is ready for your next shopping session!</strong>
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={() => navigate('/ecommerceDashboard')}
              sx={{ 
                borderRadius: 2, 
                px: 4, 
                py: 1.5,
                textTransform: 'none',
                fontSize: '16px'
              }}
            >
              Continue Shopping
            </Button>
            
            <Button
              variant="outlined"
              onClick={() => navigate('/ecommerceDashboard/profile')}
              sx={{ 
                borderRadius: 2, 
                px: 4, 
                py: 1.5,
                textTransform: 'none',
                fontSize: '16px'
              }}
            >
              View Orders
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ThankYou; 