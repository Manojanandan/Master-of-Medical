import React, { useEffect, useCallback, useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItemQuantity, removeFromCart } from '../../../redux/CartReducer';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import StarRating from '../../../components/e_commerceComponents/StarRating';

const CartList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { items, totalItems, totalAmount, loading, error } = useSelector((state) => state.cartReducer);
  const [localItems, setLocalItems] = useState([]);
  const [localTotals, setLocalTotals] = useState({ totalItems: 0, totalAmount: 0 });

  // Constants for calculations
  const SHIPPING_COST = 15.00;
  const GST_RATE = 0.18; // 18% GST
  const FREE_SHIPPING_THRESHOLD = 500; // Free shipping above $500

  // Calculate totals
  const calculateTotals = useCallback((cartItems) => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * GST_RATE;
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + gst + shipping;
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal,
      gst,
      shipping,
      total,
      totalItems
    };
  }, []);

  // Sync local state with Redux state
  useEffect(() => {
    if (items.length > 0 && localItems.length === 0) {
      setLocalItems(items);
      const totals = calculateTotals(items);
      setLocalTotals(totals);
    }
  }, [items, calculateTotals, localItems.length]);

  // Fetch cart data on component mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantityChange = useCallback((cartItemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    
    if (newQuantity >= 1 && newQuantity <= 10) {
      // Update local state immediately for instant feedback
      setLocalItems(prevItems => {
        const updatedItems = prevItems.map(item => 
          item._id === cartItemId 
            ? { ...item, quantity: newQuantity }
            : item
        );
        
        // Update local totals
        const totals = calculateTotals(updatedItems);
        setLocalTotals(totals);
        
        return updatedItems;
      });
      
      dispatch(updateCartItemQuantity({ cartItemId, quantity: newQuantity }));
    }
  }, [dispatch, calculateTotals]);

  const handleRemoveItem = useCallback((cartItemId) => {
    setLocalItems(prevItems => {
      const updatedItems = prevItems.filter(item => item._id !== cartItemId);
      const totals = calculateTotals(updatedItems);
      setLocalTotals(totals);
      return updatedItems;
    });
    
    dispatch(removeFromCart(cartItemId));
  }, [dispatch, calculateTotals]);

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Loading your cart...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Alert severity="error" sx={{ maxWidth: '600px' }}>
          <Typography variant="h6">Cart Error</Typography>
          <Typography>{error}</Typography>
          <Button 
            variant="outlined" 
            sx={{ mt: 2 }}
            onClick={() => dispatch(fetchCart())}
          >
            Retry
          </Button>
        </Alert>
      </Box>
    );
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        textAlign: 'center'
      }}>
        <ShoppingCartOutlinedIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Looks like you haven't added any items to your cart yet.
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          startIcon={<ArrowBackIcon />}
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
      </Box>
    );
  }

  // Use local state for rendering
  const displayItems = localItems.length > 0 ? localItems : items;
  const displayTotals = localTotals.totalItems > 0 ? localTotals : calculateTotals(items);

  return (
    <Grid container spacing={3}>
      {/* Cart Items Section */}
      <Grid item xs={12} lg={8}>
        <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Shopping Cart ({displayTotals.totalItems} items)
            </Typography>
          </Box>
          
          <Box sx={{ maxHeight: '600px', overflowY: 'auto' }}>
            {displayItems.map((item, index) => (
              <CartItemCard
                key={item._id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveItem}
                isLast={index === displayItems.length - 1}
              />
            ))}
          </Box>
        </Paper>
      </Grid>

      {/* Order Summary Section */}
      <Grid item xs={12} lg={4}>
        <Card elevation={2} sx={{ borderRadius: 2, position: 'sticky', top: 20 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Order Summary
            </Typography>

            {/* Price Breakdown */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Subtotal ({displayTotals.totalItems} items)
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  ₹{displayTotals.subtotal.toFixed(2)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  GST (18%)
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  ₹{displayTotals.gst.toFixed(2)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Shipping
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {displayTotals.shipping === 0 ? (
                    <Chip label="FREE" size="small" color="success" />
                  ) : (
                    `₹${displayTotals.shipping.toFixed(2)}`
                  )}
                </Typography>
              </Box>
              
              {displayTotals.subtotal < FREE_SHIPPING_THRESHOLD && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" color="success.main">
                    Add ₹{(FREE_SHIPPING_THRESHOLD - displayTotals.subtotal).toFixed(2)} more for FREE shipping
                  </Typography>
                </Box>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Total */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Total
              </Typography>
              <Typography variant="h6" fontWeight={600} color="primary">
                ₹{displayTotals.total.toFixed(2)}
              </Typography>
            </Box>

            {/* Checkout Button */}
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => navigate('/ecommerceDashboard/checkout')}
              disabled={displayTotals.totalItems === 0}
              sx={{
                borderRadius: 2,
                py: 1.5,
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 600
              }}
            >
              Proceed to Checkout
            </Button>

            {/* Continue Shopping */}
            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => navigate('/ecommerceDashboard')}
              sx={{
                mt: 2,
                borderRadius: 2,
                py: 1.5,
                textTransform: 'none',
                fontSize: '16px'
              }}
            >
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

// Cart Item Card Component
const CartItemCard = ({ item, onQuantityChange, onRemoveItem, isLast }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{
      p: 3,
      borderBottom: isLast ? 'none' : '1px solid #e0e0e0',
      '&:hover': { bgcolor: '#fafafa' }
    }}>
      <Grid container spacing={3}>
        {/* Product Image */}
        <Grid item xs={12} sm={3} md={2}>
          <Box sx={{
            width: '100%',
            height: isMobile ? '120px' : '100px',
            borderRadius: 2,
            overflow: 'hidden',
            bgcolor: '#f5f5f5'
          }}>
            <img
              src={item.product?.thumbnailImage || 'https://via.placeholder.com/150x100?text=Product'}
              alt={item.product?.name || 'Product'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} sm={9} md={7}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, lineHeight: 1.3 }}>
              {item.product?.name || 'Product Name'}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {item.product?.description || 'Product description'}
            </Typography>

            {/* Rating */}
            <Box sx={{ mb: 2 }}>
              <StarRating
                rating={item.product?.averageRating || 0}
                reviewCount={item.product?.reviewCount || 0}
                size="small"
                showReviewCount={true}
              />
            </Box>

            {/* Price */}
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
              ₹{item.price?.toFixed(2) || '0.00'}
            </Typography>
          </Box>
        </Grid>

        {/* Quantity Controls */}
        <Grid item xs={12} sm={6} md={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => onQuantityChange(item._id, item.quantity, -1)}
              disabled={item.quantity <= 1}
              sx={{
                border: '1px solid #e0e0e0',
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            
            <Typography variant="body1" sx={{ 
              minWidth: '40px', 
              textAlign: 'center',
              fontWeight: 600
            }}>
              {item.quantity}
            </Typography>
            
            <IconButton
              size="small"
              onClick={() => onQuantityChange(item._id, item.quantity, 1)}
              disabled={item.quantity >= 10}
              sx={{
                border: '1px solid #e0e0e0',
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>

        {/* Total Price & Remove */}
        <Grid item xs={12} sm={6} md={1}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              ₹{(item.price * item.quantity).toFixed(2)}
            </Typography>
            
            <IconButton
              size="small"
              onClick={() => onRemoveItem(item._id)}
              sx={{
                color: 'error.main',
                '&:hover': { bgcolor: 'error.light', color: 'white' }
              }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartList;