import React from 'react'
import { Box, Button, Typography, IconButton, Chip, useTheme, useMediaQuery } from '@mui/material'
import StarRating from './StarRating'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCartItemQuantity, removeFromCart } from '../../redux/CartReducer';

const ProductCard = ({offer,image,badge,title,rating,price,originalPrice,id,onClick,averageRating,reviewCount}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const dispatch = useDispatch();
  const { loading, items } = useSelector((state) => state.cartReducer);

  // Check if this product is already in the cart
  const cartItem = items.find(item => item.productId === id);
  const isInCart = !!cartItem;
  const currentQuantity = cartItem?.quantity || 0;

  // Debug logging
  console.log(`ProductCard ${id} - Cart state:`, {
    productId: id,
    cartItems: items.length,
    isInCart,
    currentQuantity,
    loading,
    cartItem
  });

  // Calculate offer percentage if originalPrice is provided
  const calculateOfferPercentage = () => {
    if (!originalPrice || !price) return offer || '0%';
    
    const original = parseFloat(originalPrice);
    const current = parseFloat(price);
    
    if (original <= current) return offer || '0%';
    
    const discount = ((original - current) / original) * 100;
    return `${Math.round(discount)}%`;
  };

  const offerPercentage = calculateOfferPercentage();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click when button is clicked
    
    if (!id) {
      console.error('Product ID is required to add to cart. Product:', { title, id });
      return;
    }

    console.log('Adding to cart:', { productId: id, quantity: 1 });
    dispatch(addToCart({ productId: id, quantity: 1 }));
  };

  const handleIncreaseQuantity = (e) => {
    e.stopPropagation();
    if (cartItem) {
      const newQuantity = currentQuantity + 1;
      console.log('Increasing quantity:', { cartItemId: cartItem._id, newQuantity });
      dispatch(updateCartItemQuantity({ cartItemId: cartItem._id, quantity: newQuantity }));
    }
  };

  const handleDecreaseQuantity = (e) => {
    e.stopPropagation();
    if (cartItem) {
      const newQuantity = currentQuantity - 1;
      if (newQuantity <= 0) {
        // Remove item from cart if quantity becomes 0
        console.log('Removing item from cart:', cartItem._id);
        dispatch(removeFromCart(cartItem._id));
      } else {
        console.log('Decreasing quantity:', { cartItemId: cartItem._id, newQuantity });
        dispatch(updateCartItemQuantity({ cartItemId: cartItem._id, quantity: newQuantity }));
      }
    }
  };

  // Determine badge color based on badge type
  const getBadgeColor = (badgeText) => {
    const text = badgeText?.toLowerCase();
    if (text?.includes('organic')) return '#4CAF50';
    if (text?.includes('cold sale')) return '#2196F3';
    return '#FF9800'; // default orange
  };

  return (
        <Box 
          sx={{
        width: '100%',
        height: 'auto',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
            cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
            '&:hover': {
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          transform: 'translateY(-4px)',
            }
          }}
          onClick={onClick}
        >
      {/* Discount Badge - Top Left */}
      <Box 
        sx={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          backgroundColor: '#ff4444',
          color: '#ffffff',
          padding: isMobile ? '2px 6px' : '4px 8px',
          borderRadius: '4px',
          fontSize: isMobile ? '10px' : '12px',
          fontWeight: 'bold',
          zIndex: 2,
        }}
      >
        {offerPercentage}
            </Box>

      {/* Product Image Container */}
      <Box 
        sx={{
          position: 'relative',
          height: isMobile ? '150px' : '200px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '15px' : '20px',
        }}
      >
        <img 
          src={image} 
          alt={title}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
            </Box>

      {/* Badge below image */}
      {badge && (
        <Box sx={{ padding: isMobile ? '0 12px' : '0 16px', marginTop: '8px' }}>
          <Chip
            label={badge}
            size="small"
            sx={{
              backgroundColor: getBadgeColor(badge),
              color: '#ffffff',
              fontSize: isMobile ? '8px' : '10px',
              fontWeight: 'bold',
              height: isMobile ? '18px' : '20px',
              '& .MuiChip-label': {
                padding: isMobile ? '0 6px' : '0 8px',
              }
            }}
          />
          </Box>
      )}

      {/* Product Details */}
      <Box sx={{ padding: isMobile ? '12px' : '16px' }}>
        {/* Product Title */}
        <Typography 
          variant="body2" 
          sx={{
            fontWeight: '600',
            fontSize: isMobile ? '12px' : '14px',
            lineHeight: '1.3',
            height: isMobile ? '32px' : '36px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            marginBottom: '8px',
            color: '#333333',
          }}
        >
          {title}
        </Typography>

        {/* Rating - Dynamic based on averageRating */}
        <Box sx={{ marginBottom: '8px' }}>
          <StarRating 
            rating={averageRating || rating || 0}
            reviewCount={reviewCount || 0}
            size={isMobile ? 'small' : 'medium'}
            showReviewCount={true}
          />
        </Box>

        {/* Price Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Typography 
            variant="h6" 
            sx={{
              color: '#ff4444',
              fontWeight: 'bold',
              fontSize: isMobile ? '16px' : '18px',
            }}
          >
            ₹{price}
          </Typography>
              {originalPrice && parseFloat(originalPrice) > parseFloat(price) && (
            <Typography 
              variant="body2" 
              sx={{
                color: '#666666',
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: '300',
                textDecoration: 'line-through',
              }}
            >
              ₹{originalPrice}
                </Typography>
              )}
            </Box>
            
        {/* Add to Cart Button */}
            {isInCart ? (
              // Show quantity controls if product is in cart
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            gap: isMobile ? '8px' : '12px',
            width: '100%',
              }}>
                <IconButton 
                  size="small" 
                  onClick={handleDecreaseQuantity}
                  disabled={loading}
                  sx={{
                border: '1px solid #2196F3',
                color: '#2196F3',
                width: isMobile ? '28px' : '32px',
                height: isMobile ? '28px' : '32px',
                    '&:hover': {
                  backgroundColor: '#2196F3',
                      color: 'white'
                    }
                  }}
                >
              <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography 
                  variant="h6" 
                  sx={{
                    minWidth: '30px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                color: '#2196F3',
                fontSize: isMobile ? '14px' : '16px',
                  }}
                >
                  {currentQuantity}
                </Typography>
                <IconButton 
                  size="small" 
                  onClick={handleIncreaseQuantity}
                  disabled={loading}
                  sx={{
                border: '1px solid #2196F3',
                color: '#2196F3',
                width: isMobile ? '28px' : '32px',
                height: isMobile ? '28px' : '32px',
                    '&:hover': {
                  backgroundColor: '#2196F3',
                      color: 'white'
                    }
                  }}
                >
              <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              // Show "Add to cart" button if product is not in cart
              <Button 
            variant="outlined"
                endIcon={<AddIcon sx={{ fontSize: isMobile ? 16 : 20 }} />} 
                disabled={loading}
            sx={{
              width: '100%',
              borderRadius: '24px',
              fontWeight: 'bold',
              textTransform: 'capitalize',
              borderColor: '#2196F3',
              color: '#2196F3',
              fontSize: isMobile ? '12px' : '14px',
              padding: isMobile ? '6px 12px' : '8px 16px',
              '&:hover': {
                backgroundColor: '#2196F3',
                color: 'white',
                borderColor: '#2196F3',
              }
            }} 
                onClick={handleAddToCart}
              >
                {loading ? 'Adding...' : 'Add to cart'}
              </Button>
            )}
          </Box>
        </Box>
  )
}

export default ProductCard