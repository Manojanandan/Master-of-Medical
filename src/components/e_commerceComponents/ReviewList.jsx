import React from 'react';
import {
  Box,
  Typography,
  Rating,
  Paper,
  Avatar,
  Divider,
  Skeleton,
  Alert,
  Chip,
  Grid
} from '@mui/material';
import { useSelector } from 'react-redux';
import StarRating from './StarRating';

const ReviewList = ({ productId }) => {
  const { reviews, loading, error } = useSelector((state) => state.reviewReducer);

  // Debug logging
  console.log('ReviewList Debug:', {
    productId,
    reviews,
    loading,
    error,
    reviewsType: typeof reviews,
    isArray: Array.isArray(reviews),
    reviewsLength: Array.isArray(reviews) ? reviews.length : 'Not an array'
  });

  // Ensure reviews is always an array
  const reviewsArray = Array.isArray(reviews) ? reviews : [];

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Unknown date';
    }
  };

  const getCustomerInitials = (customerName) => {
    if (!customerName) return 'U';
    return customerName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper function to get customer name from review object
  const getCustomerName = (review) => {
    if (review.Customer && review.Customer.name) {
      return review.Customer.name;
    }
    if (review.customerName) {
      return review.customerName;
    }
    if (review.customer && review.customer.name) {
      return review.customer.name;
    }
    return 'Anonymous';
  };

  // Helper function to get customer ID from review object
  const getCustomerId = (review) => {
    if (review.Customer && review.Customer.id) {
      return review.Customer.id;
    }
    if (review.customerId) {
      return review.customerId;
    }
    return null;
  };

  if (loading) {
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Customer Reviews
        </Typography>
        <Grid container spacing={2}>
          {[1, 2, 3].map((index) => (
            <Grid item xs={12} key={index}>
              <Paper elevation={1} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="60%" height={20} />
                    <Skeleton variant="text" width="40%" height={16} />
                  </Box>
                </Box>
                <Skeleton variant="text" width="100%" height={16} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="80%" height={16} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Customer Reviews
        </Typography>
        <Alert severity="error">
          {error}
        </Alert>
      </Box>
    );
  }

  if (!reviewsArray || reviewsArray.length === 0) {
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Customer Reviews
        </Typography>
        <Paper elevation={1} sx={{ p: 4, textAlign: 'center', bgcolor: '#f8f9fa' }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No reviews yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Be the first to review this product and help other customers make informed decisions!
          </Typography>
        </Paper>
        
        {/* Debug info */}
        <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Debug Info: productId={productId}, reviews={JSON.stringify(reviews)}, loading={loading.toString()}, error={error}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mr: 2 }}>
          Customer Reviews
        </Typography>
        <Chip
          label={`${reviewsArray.length} reviews`}
          size="small"
          sx={{
            bgcolor: '#e3f2fd',
            color: '#1976d2',
            fontWeight: 600,
            fontSize: '12px'
          }}
        />
      </Box>
      
      <Grid container spacing={3}>
        {reviewsArray.map((review, index) => {
          const customerName = getCustomerName(review);
          const customerId = getCustomerId(review);
          
          return (
            <Grid item xs={12} key={review.id || review._id || index}>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 3, 
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'box-shadow 0.3s ease'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: '#1976d2',
                      mr: 2,
                      width: 48,
                      height: 48,
                      fontSize: '16px',
                      fontWeight: 600
                    }}
                  >
                    {getCustomerInitials(customerName)}
                  </Avatar>
                  
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 2 }}>
                        {customerName}
                      </Typography>
                      <Chip
                        label={`${review.rating}★`}
                        size="small"
                        sx={{
                          bgcolor: '#fff3e0',
                          color: '#f57c00',
                          fontWeight: 600,
                          fontSize: '12px',
                          height: '24px'
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <StarRating
                        rating={review.rating}
                        size="small"
                        showReviewCount={false}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                        {formatDate(review.createdAt || review.created_at)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    lineHeight: 1.6,
                    color: '#333',
                    fontSize: '14px'
                  }}
                >
                  {review.comment}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ReviewList; 