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
  useMediaQuery,
  Stack,
  Avatar,
  Badge,
  Tooltip,
  Switch,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, clearCart } from '../../../redux/CartReducer';
import { 
  getAllAddresses, 
  createOrder, 
  updateCustomer, 
  updateAddress, 
  createAddress, 
  deleteAddress 
} from '../../../utils/Service';
import { getUserInfoFromToken } from '../../../utils/jwtUtils';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

// Constants
const SHIPPING_COST = 15.00;
const GST_RATE = 0.18;
const FREE_SHIPPING_THRESHOLD = 500;

// Address Dialog Component
function AddressDialog({ open, onClose, address, onSave, loading, error, success }) {
  const [formData, setFormData] = useState({
    building: '',
    address: '',
    country: 'India',
    state: '',
    city: '',
    postalCode: '',
    isDefault: false
  });

  useEffect(() => {
    if (address) {
      setFormData({
        building: address.building || '',
        address: address.address || '',
        country: address.country || 'India',
        state: address.state || '',
        city: address.city || '',
        postalCode: address.postalCode || '',
        isDefault: address.isDefault || false
      });
    } else {
      setFormData({
        building: '',
        address: '',
        country: 'India',
        state: '',
        city: '',
        postalCode: '',
        isDefault: false
      });
    }
  }, [address, open]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.address || !formData.city || !formData.state || !formData.postalCode) {
      return;
    }
    onSave(formData);
  };

  const isFormValid = formData.address && formData.city && formData.state && formData.postalCode;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
              <LocationOnIcon />
            </Avatar>
            <Typography variant="h6" fontWeight={600}>
              {address ? 'Edit Address' : 'Add New Address'}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Building/Apartment/Company"
              fullWidth
              value={formData.building}
              onChange={e => handleChange('building', e.target.value)}
              placeholder="Optional"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Street Address *"
              fullWidth
              multiline
              rows={3}
              value={formData.address}
              onChange={e => handleChange('address', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Country *</InputLabel>
              <Select
                value={formData.country}
                onChange={e => handleChange('country', e.target.value)}
                label="Country *"
                required
              >
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="United States">United States</MenuItem>
                <MenuItem value="United Kingdom">United Kingdom</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="State *"
              fullWidth
              value={formData.state}
              onChange={e => handleChange('state', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City *"
              fullWidth
              value={formData.city}
              onChange={e => handleChange('city', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Postal Code *"
              fullWidth
              value={formData.postalCode}
              onChange={e => handleChange('postalCode', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isDefault}
                  onChange={e => handleChange('isDefault', e.target.checked)}
                  color="primary"
                />
              }
              label="Set as default address"
            />
          </Grid>
        </Grid>
        
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>Address saved successfully!</Alert>}
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} disabled={loading} variant="outlined">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading || !isFormValid}
          startIcon={loading ? null : <SaveIcon />}
        >
          {loading ? <CircularProgress size={20} /> : 'Save Address'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Address Card Component
function AddressCard({ address, isSelected, onSelect, onEdit, onDelete, index }) {
  return (
    <Paper
      elevation={isSelected ? 2 : 0}
      sx={{
        p: 2,
        border: isSelected ? '2px solid' : '1px solid',
        borderColor: isSelected ? 'primary.main' : 'divider',
        borderRadius: 2,
        cursor: 'pointer',
        position: 'relative',
        '&:hover': {
          borderColor: 'primary.main'
        }
      }}
      onClick={onSelect}
    >
      {isSelected && (
        <Chip
          icon={<CheckCircleIcon />}
          label="Selected"
          color="primary"
          size="small"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        />
      )}
      <Box display="flex" alignItems="flex-start">
        <Radio checked={isSelected} value={address._id} />
        <Box ml={1}>
          <Typography variant="subtitle1" fontWeight={600}>
            {address.isDefault ? 'Default Address' : `Address ${index + 1}`}
          </Typography>
          {address.building && (
            <Typography variant="body2" color="text.secondary">
              {address.building}
            </Typography>
          )}
          <Typography variant="body2" mt={1}>
            {address.address}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            {address.city}, {address.state}, {address.country} - {address.postalCode}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" mt={1}>
        <Tooltip title="Edit">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(address);
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(address);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
}

const Checkout = () => {
  const user = getUserInfoFromToken();
  const userId = user?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Redux state
  const { items, loading: cartLoading } = useSelector((state) => state.cartReducer);

  // Local state
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [error, setError] = useState('');

  // Address dialog state
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState('');

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Dialog state for order success
  const [orderSuccessDialogOpen, setOrderSuccessDialogOpen] = useState(false);

  // Calculate order totals
  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * GST_RATE;
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + gst + shipping;

    return { subtotal, gst, shipping, total };
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

    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(fetchCart());

        // Fetch addresses and set default
        const addressesResponse = await getAllAddresses({ customerId: userId });
        if (addressesResponse.data?.success) {
          const addressesData = addressesResponse.data.data;
          setAddresses(addressesData);
          
          // Set default shipping address
          const defaultAddress = addressesData.find(addr => addr.isDefault);
          if (defaultAddress) {
            setSelectedAddress(defaultAddress);
            setDefaultBillingAddress(defaultAddress);
          }
        }
      } catch (error) {
        console.error('Error fetching checkout data:', error);
        setError('Failed to load checkout data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, dispatch]);

  // Address CRUD operations
  const handleSaveAddress = async (formData) => {
    setAddressLoading(true);
    setAddressError('');
    
    try {
      let response;
      
      if (editingAddress) {
        response = await updateAddress({ ...formData, id: editingAddress._id });
      } else {
        response = await createAddress({ ...formData, customerId: userId });
      }
      
      if (response.data?.success) {
        setSnackbar({
          open: true,
          message: editingAddress ? 'Address updated!' : 'Address added!',
          severity: 'success'
        });
        
        // Refresh addresses
        const addressesResponse = await getAllAddresses({ customerId: userId });
        if (addressesResponse.data?.success) {
          const updatedAddresses = addressesResponse.data.data;
          setAddresses(updatedAddresses);
          
          // Update selected address if it was edited
          if (editingAddress && selectedAddress?._id === editingAddress._id) {
            setSelectedAddress(updatedAddresses.find(a => a._id === editingAddress._id));
          }
          
          // Update default address if changed
          const newDefault = updatedAddresses.find(a => a.isDefault);
          if (newDefault) {
            setDefaultBillingAddress(newDefault);
          }
        }
        
        setAddressDialogOpen(false);
      } else {
        setAddressError(response.data?.message || 'Failed to save address.');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      setAddressError('Failed to save address. Please try again.');
    } finally {
      setAddressLoading(false);
    }
  };

  const handleDeleteAddress = async (address) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;

    try {
      const response = await deleteAddress(address._id);
      
      if (response.data?.success) {
        setSnackbar({
          open: true,
          message: 'Address deleted!',
          severity: 'success'
        });
        
        // Update addresses
        const updatedAddresses = addresses.filter(a => a._id !== address._id);
        setAddresses(updatedAddresses);
        
        // Handle if deleted address was selected
        if (selectedAddress?._id === address._id) {
          setSelectedAddress(null);
        }
        
        // Find a new default address if needed
        if (address.isDefault && updatedAddresses.length > 0) {
          const newDefault = updatedAddresses[0];
          setDefaultBillingAddress(newDefault);
        }
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      setSnackbar({
        open: true,
        message: 'Failed to delete address.',
        severity: 'error'
      });
    }
  };

  // Order placement
  const handleConfirmOrder = async () => {
    if (!canPlaceOrder) return;

    try {
      setOrderLoading(true);
      setError('');


      // Build productInfo array as required by backend
      const productInfo = items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subTotal: item.price * item.quantity,
        gst: (item.price * item.quantity) * GST_RATE,
        total: (item.price * item.quantity) * (1 + GST_RATE)
      }));

      const orderData = {
        customerId: userId,
        customerInfo: {
          name: user?.name,
          email: user?.email,
          phone: user?.phone || '',
          address: selectedAddress
        },
        productInfo,
        subTotal: totals.subtotal,
        gstAmount: totals.gst,
        totalCost: totals.total,
        status: 'pending'
      };
      console.log('Order Payload:', orderData);

      const response = await createOrder(orderData);
      if (response.data?.success) {
        dispatch(clearCart()); // Clear the cart after successful order
        setOrderSuccessDialogOpen(true); // Show the dialog
        // navigate('/ecommerceDashboard/checkout'); // Remove this line
      } else {
        setError(response.data?.message || 'Failed to place order.');
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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} sx={{ mb: 2, color: 'primary.main' }} />
      </Box>
    );
  }

  // Error state
  if (error && !userId) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
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
  if (items.length === 0) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="400px">
        <ShoppingCartIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" mb={1}>Your cart is empty</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/ecommerceDashboard')}
          sx={{ mt: 3 }}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'grey.50', py: 3 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
        {/* Header */}
        <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="h4" fontWeight={700}>Checkout</Typography>
          <Typography variant="body1">Review your order and complete your purchase</Typography>
        </Paper>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Grid container spacing={3}>
          {/* Left Column - Address Selection */}
          <Grid item xs={12} md={8}>
            {/* Shipping Address */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={3}>
                  <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                    <LocalShippingIcon />
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="h6" fontWeight={600}>Shipping Address</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Choose where to deliver your order
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => setAddressDialogOpen(true)}
                  >
                    Add Address
                  </Button>
                </Box>

                {addresses.length === 0 ? (
                  <Box textAlign="center" py={6}>
                    <LocationOnIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" mb={1}>No addresses found</Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => setAddressDialogOpen(true)}
                      sx={{ mt: 3 }}
                    >
                      Add Your First Address
                    </Button>
                  </Box>
                ) : (
                  <Grid container spacing={2}>
                    {addresses.map((address, index) => (
                      <Grid item xs={12} key={address._id || index}>
                        <AddressCard
                          address={address}
                          isSelected={String(selectedAddress?._id) === String(address._id)}
                          onSelect={() => setSelectedAddress(address)}
                          onEdit={(addr) => {
                            setEditingAddress(addr);
                            setAddressDialogOpen(true);
                          }}
                          onDelete={async (addr) => {
                            if (!window.confirm('Are you sure you want to delete this address?')) return;
                            try {
                              const response = await deleteAddress(addr._id);
                              if (response.data?.success) {
                                setSnackbar({
                                  open: true,
                                  message: 'Address deleted!',
                                  severity: 'success'
                                });
                                // Update addresses
                                const updatedAddresses = addresses.filter(a => a._id !== addr._id);
                                setAddresses(updatedAddresses);
                                // Handle if deleted address was selected
                                if (selectedAddress?._id === addr._id) {
                                  setSelectedAddress(updatedAddresses[0] || null);
                                }
                              } else {
                                setSnackbar({
                                  open: true,
                                  message: response.data?.message || 'Failed to delete address.',
                                  severity: 'error'
                                });
                              }
                            } catch (error) {
                              console.error('Error deleting address:', error);
                              setSnackbar({
                                open: true,
                                message: 'Failed to delete address.',
                                severity: 'error'
                              });
                            }
                          }}
                          index={index}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={3}>
                  <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                    <BusinessIcon />
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="h6" fontWeight={600}>Billing Address</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Address for billing and invoicing
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" mb={2}>
                  <Switch
                    checked={sameAsShipping}
                    onChange={(e) => setSameAsShipping(e.target.checked)}
                    color="primary"
                  />
                  <Typography>Same as shipping address</Typography>
                </Box>

                {!sameAsShipping && defaultBillingAddress && (
                  <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="subtitle2" fontWeight={600} mb={1}>
                      Default Billing Address
                    </Typography>
                    {defaultBillingAddress.building && (
                      <Typography variant="body2">{defaultBillingAddress.building}</Typography>
                    )}
                    <Typography variant="body2">{defaultBillingAddress.address}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {defaultBillingAddress.city}, {defaultBillingAddress.state}, {defaultBillingAddress.country} - {defaultBillingAddress.postalCode}
                    </Typography>
                  </Paper>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Order Summary */}
          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 20 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={3}>
                  <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                    <PaymentIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>Order Summary</Typography>
                </Box>

                <Stack spacing={2} mb={3}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Subtotal</Typography>
                    <Typography>₹{totals.subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>GST (18%)</Typography>
                    <Typography>₹{totals.gst.toFixed(2)}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Shipping</Typography>
                    <Typography>
                      {totals.shipping === 0 ? 'FREE' : `₹${totals.shipping.toFixed(2)}`}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" justifyContent="space-between" mb={3}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="primary.main">
                    ₹{totals.total.toFixed(2)}
                  </Typography>
                </Box>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="I agree to the terms and conditions"
                  sx={{ mb: 3 }}
                />

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleConfirmOrder}
                  disabled={!canPlaceOrder}
                  sx={{ mb: 2 }}
                >
                  {orderLoading ? (
                    <Box display="flex" alignItems="center">
                      <CircularProgress size={20} color="inherit" sx={{ mr: 2 }} />
                      Processing...
                    </Box>
                  ) : (
                    'Place Order (COD)'
                  )}
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/ecommerceDashboard')}
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Address Dialog */}
        <AddressDialog
          open={addressDialogOpen}
          onClose={() => {
            setAddressDialogOpen(false);
            setEditingAddress(null);
            setAddressError('');
          }}
          address={editingAddress}
          onSave={handleSaveAddress}
          loading={addressLoading}
          error={addressError}
        />

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          <Alert severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Order Success Dialog */}
        <Dialog
          open={orderSuccessDialogOpen}
          onClose={() => setOrderSuccessDialogOpen(false)}
        >
          <DialogTitle>Order Placed Successfully!</DialogTitle>
          <DialogContent>
            <Typography>Your order has been placed. Would you like to continue shopping?</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOrderSuccessDialogOpen(false);
                navigate('/ecommerceDashboard'); // or your shop route
              }}
              variant="contained"
              color="primary"
            >
              Continue Shopping
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Checkout;