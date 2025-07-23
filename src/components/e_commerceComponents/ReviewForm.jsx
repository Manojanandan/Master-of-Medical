import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Divider,
  Grid
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createProductReview, clearCreateReviewSuccess, clearReviewError } from '../../redux/ReviewReducer';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const dispatch = useDispatch();
  const { createReviewLoading, createReviewError, createReviewSuccess } = useSelector((state) => state.reviewReducer);
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});

  // Get customer ID from session storage
  const getCustomerId = () => {
    try {
      const userData = sessionStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        return parsedUserData.id;
      }
      return null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    
    if (!comment.trim()) {
      newErrors.comment = 'Please write a review comment';
    } else if (comment.trim().length < 10) {
      newErrors.comment = 'Review must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const customerId = getCustomerId();
    if (!customerId) {
      setErrors({ general: 'Please login to submit a review' });
      return;
    }

    const reviewData = {
      productId,
      customerId,
      rating,
      comment: comment.trim()
    };

    try {
      const result = await dispatch(createProductReview(reviewData));
      if (result.meta.requestStatus === 'fulfilled') {
        // Reset form
        setRating(0);
        setComment('');
        setErrors({});
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          dispatch(clearCreateReviewSuccess());
        }, 3000);
        
        // Notify parent component to refresh reviews
        if (onReviewSubmitted) {
          onReviewSubmitted();
        }
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    if (errors.comment) {
      setErrors(prev => ({ ...prev, comment: '' }));
    }
  };

  const getRatingLabel = (rating) => {
    const labels = {
      1: 'Poor',
      2: 'Fair', 
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    };
    return labels[rating] || '';
  };

  return (
    <Paper elevation={2} sx={{ p: 4, mb: 4, border: '1px solid #e0e0e0', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
        Write a Review
      </Typography>
      
      {createReviewSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Review submitted successfully! Thank you for your feedback.
        </Alert>
      )}
      
      {createReviewError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {createReviewError}
        </Alert>
      )}
      
      {errors.general && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errors.general}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
                Overall Rating *
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating
                  name="rating"
                  value={rating}
                  onChange={handleRatingChange}
                  size="large"
                  precision={0.5}
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: '#FFD700',
                    },
                    '& .MuiRating-iconHover': {
                      color: '#FFD700',
                    },
                    mr: 2
                  }}
                />
                {rating > 0 && (
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#1976d2' }}>
                    {getRatingLabel(Math.round(rating))}
                  </Typography>
                )}
              </Box>
              {errors.rating && (
                <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
                  {errors.rating}
                </Typography>
              )}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
                Rating Guide
              </Typography>
              <Box sx={{ fontSize: '14px', color: '#666' }}>
                <Box sx={{ mb: 1 }}>⭐ Poor - Not recommended</Box>
                <Box sx={{ mb: 1 }}>⭐⭐ Fair - Below average</Box>
                <Box sx={{ mb: 1 }}>⭐⭐⭐ Good - Satisfactory</Box>
                <Box sx={{ mb: 1 }}>⭐⭐⭐⭐ Very Good - Above average</Box>
                <Box>⭐⭐⭐⭐⭐ Excellent - Highly recommended</Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
            Review Comment *
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={5}
            value={comment}
            onChange={handleCommentChange}
            placeholder="Share your experience with this product. What did you like or dislike? Would you recommend it to others?"
            variant="outlined"
            error={!!errors.comment}
            helperText={errors.comment || `${comment.length}/500 characters`}
            inputProps={{ maxLength: 500 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={createReviewLoading}
            sx={{
              bgcolor: '#1976d2',
              '&:hover': {
                bgcolor: '#1565c0',
              },
              minWidth: 140,
              height: 44,
              fontSize: '16px',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2
            }}
          >
            {createReviewLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Submit Review'
            )}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ReviewForm; 