import { useNavigate } from 'react-router-dom';
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
  useMediaQuery,
  Badge,
  Avatar,
  Skeleton,
  Slide,
  Fade,
  Tooltip,
  LinearProgress,
  Snackbar,
  Stack,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Collapse
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItemQuantity, removeFromCart, clearCartAsync } from '../../../redux/CartReducer';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import StarRating from '../../../components/e_commerceComponents/StarRating';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockIcon from '@mui/icons-material/Lock';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import VerifiedIcon from '@mui/icons-material/Verified';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ReceiptIcon from '@mui/icons-material/Receipt';

// Enhanced professional color palette with original theme
const colors = {
  primary: '#de3b6f',
  primaryLight: '#e85a81',
  primaryDark: '#c4335f',
  secondary: '#f49507',
  accent: '#873589',
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  background: '#fff',
  surface: '#f8f9fa',
  surfaceVariant: '#f5f6fa',
  border: '#e9ecef',
  borderLight: '#f1f3f4',
  borderAccent: '#f1ac1b',
  text: '#22223b',
  textSecondary: '#6c757d',
  textTertiary: '#adb5bd',
  lightText: '#6c757d',
  lightBg: '#f8f9fa',
  cardBg: '#ffffff',
  gradient: 'linear-gradient(135deg, #de3b6f 0%, #873589 100%)',
  gradientLight: 'linear-gradient(135deg, #e85a81 0%, #de3b6f 100%)',
  gradientSubtle: 'linear-gradient(135deg, #de3b6f08 0%, #87358908 100%)',
  shadowPrimary: 'rgba(222, 59, 111, 0.15)',
  shadowSecondary: 'rgba(135, 53, 137, 0.1)',
  shadowLight: 'rgba(0, 0, 0, 0.08)',
  shadowMedium: 'rgba(0, 0, 0, 0.12)',
  shadowStrong: 'rgba(0, 0, 0, 0.16)',
};

const CartList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const { items, totalItems, totalAmount, loading, error } = useSelector((state) => state.cartReducer);
  const [localItems, setLocalItems] = useState([]);
  const [localTotals, setLocalTotals] = useState({ totalItems: 0, totalAmount: 0 });
  const [animateItems, setAnimateItems] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [removingItem, setRemovingItem] = useState(null);
  const [showGSTBreakdown, setShowGSTBreakdown] = useState(false);

  // Enhanced constants
  const SHIPPING_COST = 15.00;
  const GST_RATE = 0.18;
  const FREE_SHIPPING_THRESHOLD = 500;
  const DISCOUNT_AMOUNT = 50.00;
  const PREMIUM_THRESHOLD = 1000;

  // Calculate individual item GST and totals
  const calculateEnhancedTotals = useCallback((cartItems) => {
    const itemsWithGST = cartItems.map(item => {
      const itemSubtotal = item.price * item.quantity;
      const itemGST = itemSubtotal * GST_RATE;
      const itemTotal = itemSubtotal + itemGST;
      
      return {
        ...item,
        itemSubtotal,
        itemGST,
        itemTotal
      };
    });

    const subtotal = itemsWithGST.reduce((sum, item) => sum + item.itemSubtotal, 0);
    const totalGST = itemsWithGST.reduce((sum, item) => sum + item.itemGST, 0);
    const discount = subtotal > 300 ? DISCOUNT_AMOUNT : 0;
    const premiumDiscount = subtotal > PREMIUM_THRESHOLD ? subtotal * 0.05 : 0;
    const totalDiscount = discount + premiumDiscount;
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + totalGST + shipping - totalDiscount;
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const savings = totalDiscount + (subtotal >= FREE_SHIPPING_THRESHOLD ? SHIPPING_COST : 0);

    return {
      itemsWithGST,
      subtotal,
      gst: totalGST,
      shipping,
      total,
      totalItems,
      discount: totalDiscount,
      savings,
      premiumDiscount
    };
  }, []);

  useEffect(() => {
    if (items.length > 0 && localItems.length === 0) {
      setLocalItems(items);
      const totals = calculateEnhancedTotals(items);
      setLocalTotals(totals);
      setTimeout(() => setAnimateItems(true), 100);
    }
  }, [items, calculateEnhancedTotals, localItems.length]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantityChange = useCallback((cartItemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;

    if (newQuantity >= 1 && newQuantity <= 10) {
      setLocalItems(prevItems => {
        const updatedItems = prevItems.map(item =>
          item._id === cartItemId ? { ...item, quantity: newQuantity } : item
        );
        const totals = calculateEnhancedTotals(updatedItems);
        setLocalTotals(totals);
        return updatedItems;
      });

      dispatch(updateCartItemQuantity({ cartItemId, quantity: newQuantity }));
      
      const action = change > 0 ? 'increased' : 'decreased';
      setSnackbar({
        open: true,
        message: `Quantity ${action} successfully! GST updated accordingly.`,
        severity: 'success'
      });
    }
  }, [dispatch, calculateEnhancedTotals]);

  const handleRemoveItem = useCallback((cartItemId) => {
    setRemovingItem(cartItemId);
    
    setTimeout(() => {
      setLocalItems(prevItems => {
        const updatedItems = prevItems.filter(item => item._id !== cartItemId);
        const totals = calculateEnhancedTotals(updatedItems);
        setLocalTotals(totals);
        return updatedItems;
      });

      dispatch(removeFromCart(cartItemId));
      setRemovingItem(null);
      setSnackbar({
        open: true,
        message: 'Item removed from cart!',
        severity: 'info'
      });
    }, 300);
  }, [dispatch, calculateEnhancedTotals]);

  const handleClearCart = useCallback(() => {
    const confirmClear = window.confirm('Are you sure you want to clear your entire cart?');
    if (confirmClear) {
      setLocalItems([]);
      setLocalTotals({ totalItems: 0, totalAmount: 0 });
      dispatch(clearCartAsync());
      setSnackbar({
        open: true,
        message: 'Cart cleared successfully!',
        severity: 'info'
      });
    }
  }, [dispatch]);

  const EnhancedLoadingState = () => (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: 3, 
              p: 4,
              border: `1px solid ${colors.border}`,
              boxShadow: `0 2px 12px ${colors.shadowLight}`
            }}
          >
            <Skeleton variant="text" width="40%" height={40} sx={{ mb: 3 }} />
            {[1, 2, 3].map((i) => (
              <Box key={i} sx={{ display: 'flex', gap: 3, mb: 4, alignItems: 'center' }}>
                <Skeleton variant="rectangular" width={120} height={120} sx={{ borderRadius: 2 }} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="80%" height={28} />
                  <Skeleton variant="text" width="60%" height={20} sx={{ my: 1 }} />
                  <Skeleton variant="text" width="40%" height={24} />
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: 3, 
              p: 4,
              border: `1px solid ${colors.border}`,
              boxShadow: `0 2px 12px ${colors.shadowLight}`,
              position: 'sticky',
              top: 24
            }}
          >
            <Skeleton variant="text" width="70%" height={32} sx={{ mb: 3 }} />
            {[1, 2, 3, 4].map((i) => (
              <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Skeleton variant="text" width="50%" height={20} />
                <Skeleton variant="text" width="30%" height={20} />
              </Box>
            ))}
            <Skeleton variant="rectangular" width="100%" height={56} sx={{ borderRadius: 2, mt: 3 }} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );

  if (loading) {
    return <EnhancedLoadingState />;
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Fade in timeout={500}>
          <Alert 
            severity="error" 
            sx={{ 
              borderRadius: 3,
              border: `1px solid ${colors.error}`,
              boxShadow: `0 4px 24px ${colors.shadowLight}`,
              p: 3,
              '& .MuiAlert-icon': {
                color: colors.error
              }
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Something went wrong
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: colors.textSecondary }}>
              {error}
            </Typography>
            <Button
              variant="contained"
              sx={{ 
                background: colors.gradient,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: `0 4px 16px ${colors.shadowPrimary}`
              }}
              onClick={() => dispatch(fetchCart())}
            >
              Try Again
            </Button>
          </Alert>
        </Fade>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Fade in timeout={800}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            py: 8
          }}>
            <Box sx={{
              position: 'relative',
              mb: 4
            }}>
              <Avatar sx={{ 
                bgcolor: `${colors.primary}10`, 
                width: 120, 
                height: 120,
                border: `4px solid ${colors.borderAccent}`,
                boxShadow: `0 8px 32px ${colors.shadowPrimary}`
              }}>
                <ShoppingCartOutlinedIcon sx={{ fontSize: 60, color: colors.primary }} />
              </Avatar>
              <Chip
                label="0"
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  background: colors.gradient,
                  color: colors.background,
                  fontWeight: 700,
                  minWidth: 32,
                  height: 32
                }}
              />
            </Box>

            <Typography variant="h3" sx={{ 
              mb: 2, 
              fontWeight: 700, 
              color: colors.text,
              fontSize: { xs: '2rem', md: '3rem' }
            }}>
              Your cart is empty
            </Typography>
            
            <Typography variant="h6" sx={{ 
              mb: 4,
              color: colors.textSecondary,
              maxWidth: '500px',
              fontSize: '1.1rem',
              lineHeight: 1.6
            }}>
              Discover amazing products and start your shopping journey with us
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<TrendingUpIcon />}
              onClick={() => navigate('/customer')}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                background: colors.gradient,
                boxShadow: `0 8px 32px ${colors.shadowPrimary}`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 12px 40px ${colors.shadowPrimary}`
                },
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              Start Shopping
            </Button>
          </Box>
        </Fade>
      </Container>
    );
  }

  const displayItems = localItems.length > 0 ? localItems : items;
  const displayTotals = localTotals.totalItems > 0 ? localTotals : calculateEnhancedTotals(items);
  const shippingProgress = Math.min((displayTotals.subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4} alignItems="flex-start">
        {/* Cart Items Section */}
        <Grid item xs={12} lg={8}>
          <Slide direction="right" in={true} timeout={600}>
            <Paper 
              elevation={0} 
              sx={{ 
                borderRadius: 3, 
                overflow: 'hidden',
                border: `1px solid ${colors.border}`,
                boxShadow: `0 4px 20px ${colors.shadowLight}`,
                bgcolor: colors.background
              }}
            >
              <Box sx={{ 
                p: 4, 
                borderBottom: `1px solid ${colors.borderLight}`,
                background: colors.surface
              }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocalMallOutlinedIcon sx={{ mr: 2, color: colors.primary, fontSize: 28 }} />
                    <Box>
                      <Typography variant="h5" sx={{ 
                        fontWeight: 700, 
                        color: colors.text,
                        mb: 0.5
                      }}>
                        Shopping Cart
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                        Review your items before checkout
                      </Typography>
                    </Box>
                  </Box>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Chip
                      label={`${displayTotals.totalItems} ${displayTotals.totalItems === 1 ? 'item' : 'items'}`}
                      sx={{
                        background: colors.gradient,
                        color: colors.background,
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        height: 36,
                        px: 2
                      }}
                    />
                   
                  </Stack>
                </Stack>
              </Box>

              <Box sx={{ maxHeight: '800px', overflowY: 'auto' }}>
                {displayTotals.itemsWithGST?.map((item, index) => (
                  <Slide
                    key={item._id}
                    direction="up"
                    in={animateItems}
                    timeout={400 + (index * 100)}
                  >
                    <div>
                      <EnhancedCartItemCard
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onRemoveItem={handleRemoveItem}
                        isLast={index === displayTotals.itemsWithGST.length - 1}
                        isRemoving={removingItem === item._id}
                      />
                    </div>
                  </Slide>
                )) || displayItems.map((item, index) => (
                  <Slide
                    key={item._id}
                    direction="up"
                    in={animateItems}
                    timeout={400 + (index * 100)}
                  >
                    <div>
                      <EnhancedCartItemCard
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onRemoveItem={handleRemoveItem}
                        isLast={index === displayItems.length - 1}
                        isRemoving={removingItem === item._id}
                      />
                    </div>
                  </Slide>
                ))}
              </Box>
            </Paper>
          </Slide>
        </Grid>

        {/* Enhanced Order Summary */}
        <Grid item xs={12} lg={4}>
          <Slide direction="left" in={true} timeout={800}>
            <Paper 
              elevation={0} 
              sx={{ 
                borderRadius: 3,
                border: `1px solid ${colors.border}`,
                boxShadow: `0 4px 20px ${colors.shadowLight}`,
                bgcolor: colors.background,
                position: 'sticky',
                top: 24
              }}
            >
              <Box sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 700, 
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  color: colors.text
                }}>
                  <SecurityIcon sx={{ mr: 1.5, color: colors.primary }} />
                  Order Summary
                </Typography>

                {/* Shipping Progress */}
                {displayTotals.subtotal < FREE_SHIPPING_THRESHOLD && (
                  <Box sx={{ mb: 4, p: 3, bgcolor: colors.surface, borderRadius: 2, border: `1px solid ${colors.borderLight}` }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocalShippingIcon sx={{ mr: 1, color: colors.primary, fontSize: 20 }} />
                        <Typography variant="body2" sx={{ color: colors.text, fontWeight: 600 }}>
                          Free Shipping Progress
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 700 }}>
                        {Math.round(shippingProgress)}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={shippingProgress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: `${colors.primary}15`,
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          background: colors.gradient
                        }
                      }}
                    />
                    <Typography variant="body2" sx={{ 
                      mt: 2,
                      color: colors.textSecondary,
                      textAlign: 'center'
                    }}>
                      Add ₹{(FREE_SHIPPING_THRESHOLD - displayTotals.subtotal).toFixed(2)} more for FREE shipping 🚚
                    </Typography>
                  </Box>
                )}

                {/* Price Breakdown */}
                <Stack spacing={2.5} sx={{ mb: 3 }}>
                  <PriceRow label="Subtotal" value={displayTotals.subtotal} />
                  
                  {/* GST Breakdown with Toggle */}
                  <Box>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        cursor: 'pointer',
                        p: 1,
                        borderRadius: 1,
                        '&:hover': {
                          bgcolor: colors.surface
                        }
                      }}
                      onClick={() => setShowGSTBreakdown(!showGSTBreakdown)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ReceiptIcon sx={{ mr: 1, fontSize: 18, color: colors.textSecondary }} />
                        <Typography variant="body1" sx={{ 
                          color: colors.textSecondary,
                          fontWeight: 500
                        }}>
                          GST (Total)
                        </Typography>
                        {showGSTBreakdown ? <ExpandLessIcon sx={{ ml: 1, fontSize: 18 }} /> : <ExpandMoreIcon sx={{ ml: 1, fontSize: 18 }} />}
                      </Box>
                      <Typography variant="body1" sx={{ 
                        fontWeight: 600,
                        color: colors.text 
                      }}>
                        ₹{displayTotals.gst?.toFixed(2) || '0.00'}
                      </Typography>
                    </Box>

                    {/* GST Breakdown Table */}
                    <Collapse in={showGSTBreakdown}>
                      <Box sx={{ mt: 2, p: 2, bgcolor: colors.surface, borderRadius: 2, border: `1px solid ${colors.borderLight}` }}>
                        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: colors.text }}>
                          GST Breakdown by Item
                        </Typography>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>Item</TableCell>
                              <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>Qty</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>GST</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {displayTotals.itemsWithGST?.map((item) => (
                              <TableRow key={item._id}>
                                <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>
                                  {item.product?.name?.substring(0, 20) || 'Product'}...
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: '0.75rem', py: 0.5 }}>
                                  {item.quantity}
                                </TableCell>
                                <TableCell align="right" sx={{ fontSize: '0.75rem', py: 0.5, fontWeight: 600 }}>
                                  ₹{item.itemGST?.toFixed(2)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </Box>
                  
                  {displayTotals.discount > 0 && (
                    <PriceRow 
                      label="Discount Applied" 
                      value={-displayTotals.discount} 
                      isDiscount 
                      icon={<DiscountOutlinedIcon />}
                    />
                  )}
                  
                  <PriceRow 
                    label="Shipping" 
                    value={displayTotals.shipping} 
                    isFree={displayTotals.shipping === 0}
                    icon={<LocalShippingIcon />}
                  />
                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* Total */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 4,
                  p: 3,
                  borderRadius: 2,
                  bgcolor: colors.surface,
                  border: `2px solid ${colors.primary}15`,
                  background: colors.gradientSubtle
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: colors.text }}>
                    Total Amount
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: colors.primary }}>
                    ₹{displayTotals.total?.toFixed(2) || '0.00'}
                  </Typography>
                </Box>

                {/* Action Buttons */}
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => navigate('/customer/checkout')}
                    disabled={displayTotals.totalItems === 0}
                    sx={{
                      borderRadius: 3,
                      py: 2,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      background: colors.gradient,
                      boxShadow: `0 4px 20px ${colors.shadowPrimary}`,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 28px ${colors.shadowPrimary}`
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <LockIcon sx={{ mr: 1 }} />
                    Secure Checkout
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    onClick={() => navigate('/customer')}
                    sx={{
                      borderRadius: 3,
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderWidth: '2px',
                      borderColor: colors.primary,
                      color: colors.primary,
                      '&:hover': {
                        borderWidth: '2px',
                        bgcolor: `${colors.primary}08`,
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    <ArrowBackIcon sx={{ mr: 1 }} />
                    Continue Shopping
                  </Button>
                </Stack>

                {/* Trust Indicators */}
                <Box sx={{ 
                  mt: 4,
                  p: 3,
                  bgcolor: colors.surface,
                  borderRadius: 2,
                  border: `1px solid ${colors.borderLight}`,
                  background: `linear-gradient(135deg, ${colors.success}08 0%, ${colors.primary}05 100%)`
                }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <VerifiedIcon sx={{ color: colors.success, fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: colors.text }}>
                      100% Secure & Protected
                    </Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                    SSL encrypted • Money-back guarantee • 24/7 support
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Slide>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            boxShadow: `0 4px 20px ${colors.shadowPrimary}`
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

// Enhanced Price Row Component
const PriceRow = ({ label, value, isDiscount = false, isFree = false, icon }) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {icon && React.cloneElement(icon, { 
        sx: { mr: 1, fontSize: 18, color: colors.textSecondary } 
      })}
      <Typography variant="body1" sx={{ 
        color: colors.textSecondary,
        fontWeight: 500
      }}>
        {label}
      </Typography>
    </Box>
    <Typography variant="body1" sx={{ 
      fontWeight: 600,
      color: isDiscount ? colors.success : colors.text 
    }}>
      {isFree ? (
        <Chip 
          label="FREE" 
          size="small" 
          sx={{ 
            fontWeight: 600,
            bgcolor: colors.success,
            color: colors.background,
            fontSize: '0.75rem'
          }}
        />
      ) : (
        `${isDiscount ? '-' : ''}₹${Math.abs(value).toFixed(2)}`
      )}
    </Typography>
  </Stack>
);

// Enhanced Cart Item Component
const EnhancedCartItemCard = ({ item, onQuantityChange, onRemoveItem, isLast, isRemoving }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const goToProduct = () => {
    if (item.product?._id || item.product?.id) {
      navigate(`/customer/product/${item.product._id || item.product.id}`);
    }
  };

  return (
    <Box sx={{
      p: 4,
      borderBottom: isLast ? 'none' : `1px solid ${colors.borderLight}`,
      transition: 'all 0.3s ease',
      transform: isRemoving ? 'translateX(-100%)' : 'translateX(0)',
      opacity: isRemoving ? 0 : 1,
      '&:hover': {
        bgcolor: colors.surface,
        borderLeft: `4px solid ${colors.primary}`
      }
    }}>
      <Grid container spacing={3} alignItems="center">
        {/* Product Image */}
        <Grid item xs={12} sm={3} md={2}>
          <Box
            onClick={goToProduct}
            sx={{
              width: '100%',
              aspectRatio: '1/1',
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: colors.surface,
              position: 'relative',
              cursor: 'pointer',
              border: `1px solid ${colors.border}`,
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: `0 6px 24px ${colors.shadowPrimary}`,
                borderColor: colors.borderAccent
              },
              transition: 'all 0.3s ease'
            }}
          >
            {!imageLoaded && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
              />
            )}
            <img
              src={item.product?.thumbnailImage || 'https://via.placeholder.com/150?text=Product'}
              alt={item.product?.name || 'Product'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: imageLoaded ? 'block' : 'none'
              }}
              onLoad={() => setImageLoaded(true)}
            />
            <Chip
              label={`×${item.quantity}`}
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: colors.gradient,
                color: colors.background,
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
            />
          </Box>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} sm={9} md={6}>
          <Stack spacing={1.5}>
            <Typography
              variant="h6"
              onClick={goToProduct}
              sx={{
                fontWeight: 600,
                lineHeight: 1.3,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                cursor: 'pointer',
                color: colors.text,
                '&:hover': {
                  color: colors.primary
                },
                transition: 'color 0.2s ease'
              }}
            >
              {item.product?.name || 'Product Name'}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                color: colors.textSecondary,
                lineHeight: 1.4
              }}
            >
              {item.product?.description || 'Product description not available'}
            </Typography>

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <StarRating
                rating={item.product?.averageRating || 0}
                reviewCount={item.product?.reviewCount || 0}
                size="small"
                showReviewCount={false}
              />
              {item.product?.reviewCount > 0 && (
                <Typography variant="caption" sx={{ color: colors.textTertiary }}>
                  ({item.product.reviewCount} reviews)
                </Typography>
              )}
            </Box>

            {/* Price Display */}
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: colors.primary
                }}
              >
                ₹{item.price?.toFixed(2) || '0.00'}
              </Typography>
              
              {item.originalPrice && item.originalPrice > item.price && (
                <>
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: 'line-through',
                      color: colors.textTertiary,
                      fontWeight: 500
                    }}
                  >
                    ₹{item.originalPrice.toFixed(2)}
                  </Typography>
                  <Chip
                    label={`${Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF`}
                    size="small"
                    sx={{
                      bgcolor: colors.success,
                      color: colors.background,
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  />
                </>
              )}
            </Stack>

            {/* Individual Item GST Display */}
            {item.itemGST && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                p: 1, 
                bgcolor: `${colors.info}10`, 
                borderRadius: 1,
                border: `1px solid ${colors.info}20`
              }}>
                <ReceiptIcon sx={{ color: colors.info, fontSize: 16, mr: 1 }} />
                <Typography variant="caption" sx={{ color: colors.info, fontWeight: 600 }}>
                  GST (18%): ₹{item.itemGST.toFixed(2)} | Item Total: ₹{item.itemTotal?.toFixed(2)}
                </Typography>
              </Box>
            )}

            {/* Stock Status */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon sx={{ color: colors.success, fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption" sx={{ color: colors.success, fontWeight: 600 }}>
                In Stock • Ready to ship
              </Typography>
            </Box>
          </Stack>
        </Grid>

        {/* Quantity Controls */}
        <Grid item xs={12} sm={6} md={2}>
          <Stack spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1,
              bgcolor: colors.surface,
              borderRadius: 2,
              border: `2px solid ${colors.borderAccent}15`,
              background: colors.gradientSubtle
            }}>
              <Tooltip title="Decrease quantity">
                <span>
                  <IconButton
                    size="small"
                    onClick={() => onQuantityChange(item._id, item.quantity, -1)}
                    disabled={item.quantity <= 1}
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: colors.background,
                      border: `1px solid ${colors.borderLight}`,
                      '&:hover': {
                        bgcolor: colors.primary,
                        borderColor: colors.primary,
                        color: colors.background,
                        transform: 'scale(1.1)'
                      },
                      '&:disabled': {
                        opacity: 0.4
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>

              <Typography sx={{
                minWidth: '32px',
                textAlign: 'center',
                fontWeight: 600,
                color: colors.text,
                fontSize: '1rem'
              }}>
                {item.quantity}
              </Typography>

              <Tooltip title="Increase quantity">
                <span>
                  <IconButton
                    size="small"
                    onClick={() => onQuantityChange(item._id, item.quantity, 1)}
                    disabled={item.quantity >= 10}
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: colors.background,
                      border: `1px solid ${colors.borderLight}`,
                      '&:hover': {
                        bgcolor: colors.primary,
                        borderColor: colors.primary,
                        color: colors.background,
                        transform: 'scale(1.1)'
                      },
                      '&:disabled': {
                        opacity: 0.4
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>

            {/* Quantity Limit Warning */}
            {item.quantity >= 8 && (
              <Typography variant="caption" sx={{ 
                color: colors.secondary, 
                textAlign: 'center',
                fontWeight: 600,
                bgcolor: `${colors.secondary}15`,
                px: 1,
                py: 0.5,
                borderRadius: 1
              }}>
                Max 10 items
              </Typography>
            )}
          </Stack>
        </Grid>

        {/* Total Price & Actions */}
        <Grid item xs={12} sm={6} md={2}>
          <Stack spacing={2} alignItems={{ xs: 'flex-start', sm: 'flex-end' }}>
            {/* Item Total */}
            <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
              <Typography
                variant="caption"
                sx={{
                  color: colors.textSecondary,
                  display: 'block',
                  fontWeight: 500,
                  mb: 0.5
                }}
              >
                Item Subtotal
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: colors.text
                }}
              >
                ₹{(item.price * item.quantity).toFixed(2)}
              </Typography>
              
              {/* Item Total with GST */}
              {item.itemTotal && (
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.primary,
                    fontWeight: 600,
                    display: 'block'
                  }}
                >
                  With GST: ₹{item.itemTotal.toFixed(2)}
                </Typography>
              )}
              
              {/* Savings Display */}
              {item.originalPrice && item.originalPrice > item.price && (
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.success,
                    fontWeight: 600,
                    display: 'block'
                  }}
                >
                  Save ₹{((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                </Typography>
              )}
            </Box>

            {/* Remove Button */}
            <Tooltip title="Remove from cart">
              <Button
                variant="outlined"
                size="small"
                startIcon={<DeleteOutlineIcon />}
                onClick={() => onRemoveItem(item._id)}
                sx={{
                  color: colors.primary,
                  borderColor: `${colors.primary}40`,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  minWidth: 'auto',
                  px: isMobile ? 1.5 : 2,
                  '&:hover': {
                    bgcolor: `${colors.primary}08`,
                    borderColor: colors.primary,
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                {isMobile ? '' : 'Remove'}
              </Button>
            </Tooltip>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartList;