import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Divider,
  Chip,
  Grid,
  Paper,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { clearCart } from '../../redux/CartReducer';

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

  const handleGoHome = () => {
    setLoading(true);
    navigate('/');
  };

  const handleShare = (platform) => {
    const text = `Just placed an order on Master of Medical! 🛒✨ Check out their amazing products.`;
    const url = window.location.origin;
    
    let shareUrl = '';
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleContactSupport = () => {
    window.open('mailto:support@masterofmedical.com', '_blank');
  };

  const handleCallSupport = () => {
    window.open('tel:+1234567890', '_blank');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: 2,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <Box sx={{ width: '90%', maxWidth: 800 }}>
        <Card sx={{ 
          width: '100%', 
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          borderRadius: 4,
          overflow: 'visible'
        }}>
          <CardContent sx={{ p: 4 }}>
            {/* Success Icon */}
            <Box sx={{ 
              position: 'relative',
              display: 'inline-block',
              mb: 3
            }}>
              <Box sx={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(76, 175, 80, 0.3)',
                mx: 'auto'
              }}>
                <CheckCircleOutlineIcon 
                  sx={{ 
                    fontSize: 60, 
                    color: 'white'
                  }} 
                />
              </Box>
            </Box>
            
            {/* Main Title */}
            <Typography variant="h3" component="h1" sx={{ 
              fontWeight: 700, 
              mb: 2,
              color: '#2e7d32',
              background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Order Successful!
            </Typography>
            
            {/* Subtitle */}
            <Typography variant="h6" sx={{ 
              mb: 3, 
              color: '#666',
              fontWeight: 500
            }}>
              Thank you for your purchase
            </Typography>

            {/* Order ID */}
            {orderId && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Order ID: <Chip label={orderId} color="primary" size="small" />
                </Typography>
              </Alert>
            )}

            {/* Support Section */}
            <Paper elevation={0} sx={{ 
              p: 3, 
              mb: 4, 
              borderRadius: 3,
              backgroundColor: '#fff3cd',
              border: '1px solid #ffeaa7'
            }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#856404' }}>
                Need Help?
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  onClick={handleContactSupport}
                  sx={{ borderRadius: 2, textTransform: 'none' }}
                >
                  Email Support
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<PhoneIcon />}
                  onClick={handleCallSupport}
                  sx={{ borderRadius: 2, textTransform: 'none' }}
                >
                  Call Support
                </Button>
              </Box>
            </Paper>
            
            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ShoppingCartIcon />}
                onClick={handleContinueShopping}
                disabled={loading}
                sx={{ 
                  borderRadius: 2, 
                  px: 4, 
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #45a049 0%, #3d8b40 100%)'
                  }
                }}
              >
                Continue Shopping
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<PersonIcon />}
                onClick={handleViewOrders}
                disabled={loading}
                sx={{ 
                  borderRadius: 2, 
                  px: 4, 
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 600,
                  borderColor: '#4caf50',
                  color: '#4caf50',
                  '&:hover': {
                    borderColor: '#45a049',
                    backgroundColor: 'rgba(76, 175, 80, 0.04)'
                  }
                }}
              >
                View Orders
              </Button>
              
              <Button
                variant="text"
                startIcon={<HomeIcon />}
                onClick={handleGoHome}
                disabled={loading}
                sx={{ 
                  borderRadius: 2, 
                  px: 4, 
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#666',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                Go Home
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ThankYou; 