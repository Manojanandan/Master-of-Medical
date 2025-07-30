
import React, { useState } from 'react';
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
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  CardMedia
} from '@mui/material';
import { useSelector } from 'react-redux';
import {
  ThumbUp,
  ThumbDown,
  CheckCircle
} from '@mui/icons-material';
import StarRating from './StarRating';

const ReviewList = ({ productId }) => {
  const { reviews, loading, error } = useSelector((state) => state.reviewReducer);

  // Ensure reviews is always an array
  const reviewsArray = Array.isArray(reviews) ? reviews : [];

  // Calculate overall rating and distribution
  const calculateRatingStats = () => {
    if (!reviewsArray.length) return { average: 0, total: 0, distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
    
    const total = reviewsArray.length;
    const sum = reviewsArray.reduce((acc, review) => acc + review.rating, 0);
    const average = (sum / total).toFixed(1);
    
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviewsArray.forEach(review => {
      const rating = Math.round(review.rating);
      distribution[rating] = (distribution[rating] || 0) + 1;
    });
    
    return { average, total, distribution };
  };

  const ratingStats = calculateRatingStats();

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return 'Today';
      if (diffDays === 2) return 'Yesterday';
      if (diffDays <= 7) return `${diffDays - 1} days ago`;
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
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

  const handleHelpful = (reviewId, isHelpful) => {
    console.log(`Marking review ${reviewId} as ${isHelpful ? 'helpful' : 'not helpful'}`);
    // TODO: Implement helpful/dislike functionality
  };

  if (loading) {
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#212121' }}>
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
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#212121' }}>
          Customer Reviews
        </Typography>
        <Alert severity="error">
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Overall Rating Summary */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#212121' }}>
          Customer Reviews
        </Typography>
        
        <Grid container spacing={4}>
          {/* Left Side - Rating Summary */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#212121', mb: 1 }}>
                {ratingStats.average}/5
              </Typography>
              <Rating 
                value={parseFloat(ratingStats.average)} 
                precision={0.1}
                readOnly
                size="large"
                sx={{ 
                  mb: 1,
                  '& .MuiRating-iconFilled': { color: '#f49507' },
                  '& .MuiRating-iconHover': { color: '#f49507' }
                }}
              />
              <Typography variant="body2" sx={{ color: '#666' }}>
                Based on {ratingStats.total} reviews
              </Typography>
            </Box>

            {/* Rating Distribution */}
            <Box>
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = ratingStats.distribution[stars] || 0;
                const percentage = ratingStats.total > 0 ? (count / ratingStats.total) * 100 : 0;
                
                return (
                  <Box key={stars} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ minWidth: 30, color: '#666' }}>
                      {stars} stars
                    </Typography>
                    <Box sx={{ flex: 1, mx: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: '#f0f0f0',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: '#f49507',
                            borderRadius: 4
                          }
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ minWidth: 30, color: '#666', fontWeight: 500 }}>
                      {count}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Reviews List */}
      {!reviewsArray || reviewsArray.length === 0 ? (
        <Paper elevation={1} sx={{ p: 4, textAlign: 'center', bgcolor: '#f8f9fa' }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No reviews yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Be the first to review this product and help other customers make informed decisions!
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={3}>
          {reviewsArray.map((review, index) => {
            const customerName = getCustomerName(review);
            const customerId = getCustomerId(review);
            const hasImage = review.image; // Assuming review.image contains the image URL

            return (
              <React.Fragment key={review.id || review._id || index}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  {/* Left Side - Image or Avatar (Smaller Preview) */}
                  <Box sx={{ minWidth: 60 }}>
                    {hasImage ? (
                      <CardMedia
                        component="img"
                        image={review.image}
                        alt={`Review image by ${customerName}`}
                        sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 2 }}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          bgcolor: '#de3b6f',
                          width: 60,
                          height: 60,
                          fontSize: '18px',
                          fontWeight: 600
                        }}
                      >
                        {getCustomerInitials(customerName)}
                      </Avatar>
                    )}
                  </Box>

                  {/* Right Side - Review Content */}
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#212121' }}>
                        {customerName}
                      </Typography>
                      <CheckCircle sx={{ color: '#4caf50', fontSize: 16 }} />
                      <Chip
                        label="Verified Buyer"
                        size="small"
                        sx={{
                          bgcolor: '#e8f5e8',
                          color: '#4caf50',
                          fontWeight: 500,
                          fontSize: '11px',
                          height: '20px'
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating
                        value={review.rating}
                        readOnly
                        size="small"
                        sx={{ 
                          mr: 1,
                          '& .MuiRating-iconFilled': { color: '#f49507' },
                          '& .MuiRating-iconHover': { color: '#f49507' }
                        }}
                      />
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {review.rating}
                      </Typography>
                    </Box>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        lineHeight: 1.6,
                        color: '#333',
                        fontSize: '14px',
                        mb: 2
                      }}
                    >
                      {review.comment}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        {formatDate(review.createdAt || review.created_at)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {index < reviewsArray.length - 1 && <Divider sx={{ my: 2 }} />}
              </React.Fragment>
            );
          })}
        </Stack>
      )}
    </Box>
  );
};

export default ReviewList;