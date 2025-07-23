import React, { useState, useEffect } from 'react';
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
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../../redux/CartReducer';
import { getAllAddresses, createOrder } from '../../../utils/Service';
import { getUserInfoFromToken } from '../../../utils/jwtUtils';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StarRating from '../../../components/e_commerceComponents/StarRating';
import AddressDialog from '../profileTabs/AddressDialog';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Redux state
  const { items, totalItems, totalAmount, loading: cartLoading } = useSelector((state) => state.cartReducer);

  // Local state
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [error, setError] = useState('');

  // Address dialog state
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    address: '',
    country: '',
    state: '',
    city: '',
    postalCode: ''
  });

  // Constants for calculations
  const SHIPPING_COST = 15.00;
  const GST_RATE = 0.18; // 18% GST
  const FREE_SHIPPING_THRESHOLD = 500; // Free shipping above ₹500

  // Get user info
  const user = getUserInfoFromToken();
  const userId = user?.id;

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * GST_RATE;
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + gst + shipping;

    return {
      subtotal,
      gst,
      shipping,
      total,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0)
    };
  };

  const totals = calculateTotals();

  // Check if order can be placed
  const canPlaceOrder = selectedAddress && termsAccepted && !orderLoading && items.length > 0;

  useEffect(() => {
    if (!userId) {
      setError('Please login to continue');
      setLoading(false);
      return;
    }

    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch cart data
      await dispatch(fetchCart());

      // Fetch addresses
      const addressesResponse = await getAllAddresses({ customerId: userId });
      if (addressesResponse.data.success) {
        setAddresses(addressesResponse.data.data);
      }

    } catch (error) {
      console.error('Error fetching checkout data:', error);
      setError('Failed to load checkout data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  // Address dialog handlers
  const openAddressDialog = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setAddressForm({
        address: address.address || '',
        country: address.country || '',
        state: address.state || '',
        city: address.city || '',
        postalCode: address.postalCode || ''
      });
    } else {
      setEditingAddress(null);
      setAddressForm({
        address: '',
        country: '',
        state: '',
        city: '',
        postalCode: ''
      });
    }
    setAddressDialogOpen(true);
  };

  const closeAddressDialog = () => {
    setAddressDialogOpen(false);
    setEditingAddress(null);
    setAddressForm({
      address: '',
      country: '',
      state: '',
      city: '',
      postalCode: ''
    });
  };

  const handleAddressInputChange = (field, value) => {
    setAddressForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveAddress = async () => {
    try {
      // This would typically call an API to save the address
      // For now, we'll just close the dialog and refresh addresses
      closeAddressDialog();
      await fetchData(); // Refresh addresses
    } catch (error) {
      console.error('Error saving address:', error);
      setError('Failed to save address. Please try again.');
    }
  };

  const handleConfirmOrder = async () => {
    if (!canPlaceOrder) return;

    try {
      setOrderLoading(true);
      setError('');

      const orderData = {
        customerId: userId,
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: selectedAddress,
        totalAmount: totals.total,
        paymentMethod: 'cod' // Cash on Delivery
      };

      const response = await createOrder(orderData);

      if (response.data.success) {
        // Navigate to thank you page
        navigate('/ecommerceDashboard/thankyou', { 
          state: { orderId: response.data.orderId }
        });
      } else {
        setError('Failed to place order. Please try again.');
      }

    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setOrderLoading(false);
    }
  };

  // Loading state
  if (loading || cartLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Loading checkout details...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Error state
  if (error && !userId) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Alert severity="error" sx={{ maxWidth: '600px' }}>
          <Typography variant="h6">Authentication Required</Typography>
          <Typography>{error}</Typography>
          <Button 
            variant="outlined" 
            sx={{ mt: 2 }}
            onClick={() => navigate('/loginform')}
          >
            Go to Login
          </Button>
        </Alert>
      </Box>
    );
  }

  // Empty cart state
  if (!items || items.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        textAlign: 'center'
      }}>
        <ShoppingCartIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Add some items to your cart to proceed with checkout.
        </Typography>
        <Button 
          variant="contained" 
          size="large"
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

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Left Column - Address Selection & Order Details */}
        <Grid item xs={12} lg={8}>
          {/* Address Selection */}
          <Card elevation={2} sx={{ borderRadius: 2, mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LocationOnIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Delivery Address
                </Typography>
              </Box>

              {addresses.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <LocationOnIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    No addresses found
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Please add a delivery address to continue with checkout.
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => openAddressDialog()}
                    sx={{ borderRadius: 2, textTransform: 'none' }}
                  >
                    Add Address
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Select a delivery address
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => openAddressDialog()}
                      sx={{ borderRadius: 2, textTransform: 'none' }}
                    >
                      Add New Address
                    </Button>
                  </Box>

                  <RadioGroup
                    value={selectedAddress?._id || selectedAddress?.id || ''}
                    onChange={(e) => {
                      const address = addresses.find(addr => 
                        addr._id === e.target.value || addr.id === e.target.value
                      );
                      handleAddressSelect(address);
                    }}
                  >
                    <Grid container spacing={2}>
                      {addresses.map((address, index) => (
                        <Grid item xs={12} sm={6} key={address._id || address.id}>
                          <Paper
                            elevation={selectedAddress?._id === address._id || selectedAddress?.id === address.id ? 3 : 1}
                            sx={{
                              p: 2,
                              border: selectedAddress?._id === address._id || selectedAddress?.id === address.id 
                                ? '2px solid' 
                                : '1px solid',
                              borderColor: selectedAddress?._id === address._id || selectedAddress?.id === address.id 
                                ? 'primary.main' 
                                : '#e0e0e0',
                              borderRadius: 2,
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                borderColor: 'primary.main',
                                boxShadow: 2
                              }
                            }}
                            onClick={() => handleAddressSelect(address)}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Radio
                          value={address._id || address.id}
                                sx={{ mt: -0.5 }}
                              />
                              <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    Address {index + 1}
                                  </Typography>
                          {selectedAddress?._id === address._id || selectedAddress?.id === address.id && (
                                    <Chip label="Selected" size="small" color="primary" />
                                  )}
                                </Box>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                  {address.address}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {address.city}, {address.state}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {address.country} - {address.postalCode}
                                </Typography>
                              </Box>
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </RadioGroup>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <ShoppingCartIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Order Items ({totals.totalItems})
                </Typography>
              </Box>

              <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                {items.map((item, index) => (
                  <Box key={item._id || index} sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    py: 2,
                    borderBottom: index < items.length - 1 ? '1px solid #e0e0e0' : 'none'
                  }}>
                    <Box sx={{ 
                      width: 80, 
                      height: 80, 
                      borderRadius: 2, 
                      overflow: 'hidden',
                      bgcolor: '#f5f5f5',
                      mr: 2
                    }}>
                      <img
                        src={item.product?.thumbnailImage || 'https://via.placeholder.com/80x80?text=Product'}
                        alt={item.product?.name || 'Product'}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {item.product?.name || 'Product Name'}
                      </Typography>
                      <Box sx={{ mb: 1 }}>
                        <StarRating
                          rating={item.product?.averageRating || 0}
                          reviewCount={item.product?.reviewCount || 0}
                          size="small"
                          showReviewCount={true}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Qty: {item.quantity} × ₹{item.price?.toFixed(2)}
        </Typography>
                    </Box>
                    
                    <Typography variant="h6" sx={{ fontWeight: 600, ml: 2 }}>
                      ₹{(item.price * item.quantity).toFixed(2)}
          </Typography>
        </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Order Summary */}
        <Grid item xs={12} lg={4}>
          <Card elevation={2} sx={{ borderRadius: 2, position: 'sticky', top: 20 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PaymentIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Order Summary
                </Typography>
              </Box>

              {/* Price Breakdown */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Subtotal ({totals.totalItems} items)
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    ₹{totals.subtotal.toFixed(2)}
          </Typography>
        </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    GST (18%)
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    ₹{totals.gst.toFixed(2)}
          </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Shipping
          </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {totals.shipping === 0 ? (
                      <Chip label="FREE" size="small" color="success" />
                    ) : (
                      `₹${totals.shipping.toFixed(2)}`
                    )}
          </Typography>
        </Box>

                {totals.subtotal < FREE_SHIPPING_THRESHOLD && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="success.main">
                      Add ₹{(FREE_SHIPPING_THRESHOLD - totals.subtotal).toFixed(2)} more for FREE shipping
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
                  ₹{totals.total.toFixed(2)}
                </Typography>
        </Box>

              {/* Terms and Conditions */}
              <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                      checked={termsAccepted}
                      onChange={handleTermsChange}
                      color="primary"
              />
            }
            label={
                    <Typography variant="body2">
                      I agree to the{' '}
                      <a href="#" style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}>
                  terms and conditions
                </a>
              </Typography>
            }
          />
        </Box>

        {/* Place Order Button */}
        <Button
          variant="contained"
          fullWidth
                size="large"
                onClick={handleConfirmOrder}
                disabled={!canPlaceOrder}
                startIcon={orderLoading ? <CircularProgress size={20} color="inherit" /> : <LocalShippingIcon />}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                {orderLoading ? 'Placing Order...' : 'Place Order'}
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

      {/* Address Dialog */}
      <AddressDialog
        addressDialogOpen={addressDialogOpen}
        closeAddressDialog={closeAddressDialog}
        editingAddress={editingAddress}
        addressForm={addressForm}
        handleAddressInputChange={handleAddressInputChange}
        handleSaveAddress={handleSaveAddress}
      />
    </Box>
  );
};

export default Checkout;