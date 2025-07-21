import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Alert,
  Snackbar,
  CircularProgress,
  Divider,
  Avatar,
  Card,
  CardContent,
  IconButton,
  Chip,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemSecondaryAction,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip
} from '@mui/material';
import {
  Person as PersonIcon,
  ShoppingBag as OrdersIcon,
  Logout as LogoutIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Home as HomeIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  LocationCity as AddressIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getUserInfoFromToken } from '../../utils/jwtUtils';
import { 
  updateCustomer, 
  getCustomerById,
  getAllAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  getAllOrders
} from '../../utils/Service';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [showMessage, setShowMessage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Address management states
  const [addresses, setAddresses] = useState([]);
  const [fetchingAddresses, setFetchingAddresses] = useState(false);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: ''
  });
  
  // Orders management states
  const [orders, setOrders] = useState([]);
  const [fetchingOrders, setFetchingOrders] = useState(false);
  const [orderPagination, setOrderPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });
  const [orderFilters, setOrderFilters] = useState({
    status: '',
    search: ''
  });
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const [profileData, setProfileData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: ''
  });

  const [originalData, setOriginalData] = useState({});

  // Fetch customer details from API
  const fetchCustomerDetails = async (customerId) => {
    try {
      console.log('Fetching customer details for ID:', customerId);
      const response = await getCustomerById(customerId);
      console.log('Customer details API response:', response);
      
      if (response.data && response.data.success) {
        const customerData = response.data.data || response.data;
        console.log('Customer data received:', customerData);
        
        const profileDataObj = {
          id: customerData.id || customerData._id || customerId,
          name: customerData.name || '',
          email: customerData.email || '',
          phone: customerData.phone || '',
          address: customerData.address || '',
          city: customerData.city || '',
          state: customerData.state || '',
          country: customerData.country || '',
          postalCode: customerData.postalCode || ''
        };
        
        console.log('Setting profile data from API:', profileDataObj);
        setProfileData(profileDataObj);
        setOriginalData(profileDataObj);
      } else {
        console.warn('Failed to fetch customer details:', response.data);
        // Fallback to JWT data if API fails
        loadUserDataFromJWT();
      }
    } catch (error) {
      console.error('Error fetching customer details:', error);
      // Fallback to JWT data if API fails
      loadUserDataFromJWT();
    } finally {
      setFetchingData(false);
    }
  };

  // Fetch addresses for customer
  const fetchAddresses = async (customerId) => {
    try {
      setFetchingAddresses(true);
      console.log('Fetching addresses for customer ID:', customerId);
      const response = await getAllAddresses({ customerId });
      console.log('Addresses API response:', response);
      
      if (response.data && response.data.success) {
        const addressesData = response.data.data || response.data.addresses || [];
        console.log('Addresses data received:', addressesData);
        setAddresses(addressesData);
      } else {
        console.warn('Failed to fetch addresses:', response.data);
        setAddresses([]);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setAddresses([]);
    } finally {
      setFetchingAddresses(false);
    }
  };

  // Fetch orders for customer
  const fetchOrders = async (customerId, page = 1, filters = {}) => {
    try {
      setFetchingOrders(true);
      console.log('Fetching orders for customer ID:', customerId);
      console.log('Page:', page);
      console.log('Filters:', filters);
      
      const params = {
        customerId,
        page,
        limit: orderPagination.limit,
        ...filters
      };
      
      console.log('API params being sent:', params);
      const response = await getAllOrders(params);
      console.log('Orders API response:', response);
      
      if (response.data && response.data.success) {
        const ordersData = response.data.data || [];
        const paginationData = response.data.pagination || {};
        
        console.log('Orders data received:', ordersData);
        console.log('Pagination data:', paginationData);
        
        setOrders(ordersData);
        setOrderPagination({
          total: paginationData.total || 0,
          page: paginationData.page || 1,
          limit: paginationData.limit || 10,
          totalPages: paginationData.totalPages || 0
        });
      } else {
        console.warn('Failed to fetch orders:', response.data);
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setFetchingOrders(false);
    }
  };

  // Load user data from JWT token (fallback)
  const loadUserDataFromJWT = () => {
    const userInfo = getUserInfoFromToken();
    console.log('Loading user data from JWT (fallback):', userInfo);
    
    if (userInfo) {
      const profileDataObj = {
        id: userInfo.id || userInfo._id || '',
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone: userInfo.phone || '',
        address: userInfo.address || '',
        city: userInfo.city || '',
        state: userInfo.state || '',
        country: userInfo.country || '',
        postalCode: userInfo.postalCode || ''
      };
      
      console.log('Setting profile data from JWT:', profileDataObj);
      setProfileData(profileDataObj);
      setOriginalData(profileDataObj);
    } else {
      console.warn('No user info found in JWT token');
    }
    setFetchingData(false);
  };

  // Get user info and fetch customer details
  useEffect(() => {
    const userInfo = getUserInfoFromToken();
    console.log('Profile component - User info from JWT:', userInfo);
    
    if (userInfo && (userInfo.id || userInfo._id)) {
      const customerId = userInfo.id || userInfo._id;
      console.log('Customer ID found, fetching details:', customerId);
      fetchCustomerDetails(customerId);
      fetchAddresses(customerId);
      fetchOrders(customerId);
    } else {
      console.warn('No customer ID found in JWT, using fallback data');
      loadUserDataFromJWT();
    }
  }, []);

  // Auto-apply search filter with debounce
  useEffect(() => {
    const userInfo = getUserInfoFromToken();
    const customerId = userInfo?.id || userInfo?._id;
    
    if (customerId && orderFilters.search !== undefined) {
      const timeoutId = setTimeout(() => {
        fetchOrders(customerId, 1, orderFilters);
      }, 500); // 500ms delay
      
      return () => clearTimeout(timeoutId);
    }
  }, [orderFilters.search]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressInputChange = (field, value) => {
    setAddressForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await updateCustomer(profileData);
      console.log('Update customer response:', response);
      
      if (response.data && response.data.success) {
        setMessage('Profile updated successfully!');
        setSeverity('success');
        setIsEditing(false);
        setOriginalData({ ...profileData });
        
        // Update the stored user data
        const updatedUserData = { ...originalData, ...profileData };
        sessionStorage.setItem('userData', JSON.stringify(updatedUserData));
      } else {
        setMessage(response.data?.message || 'Failed to update profile');
        setSeverity('error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage(error.response?.data?.message || 'An error occurred while updating profile');
      setSeverity('error');
    } finally {
      setLoading(false);
      setShowMessage(true);
    }
  };

  const handleCancel = () => {
    setProfileData({ ...originalData });
    setIsEditing(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('userType');
    navigate('/login');
  };

  const handleTabChange = (event, newValue) => {
    if (newValue === 3) { // Logout tab
      handleLogout();
    } else {
      setActiveTab(newValue);
    }
  };

  // Address management functions
  const openAddressDialog = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setAddressForm({
        address: address.address || '',
        city: address.city || '',
        state: address.state || '',
        country: address.country || '',
        postalCode: address.postalCode || ''
      });
    } else {
      setEditingAddress(null);
      setAddressForm({
        address: '',
        city: '',
        state: '',
        country: '',
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
      city: '',
      state: '',
      country: '',
      postalCode: ''
    });
  };

  const handleSaveAddress = async () => {
    try {
      const userInfo = getUserInfoFromToken();
      const customerId = userInfo?.id || userInfo?._id;
      
      if (editingAddress) {
        // Update existing address
        const response = await updateAddress({
          id: editingAddress.id || editingAddress._id,
          ...addressForm
        });
        
        if (response.data && response.data.success) {
          setMessage('Address updated successfully!');
          setSeverity('success');
          fetchAddresses(customerId); // Refresh addresses
        } else {
          setMessage(response.data?.message || 'Failed to update address');
          setSeverity('error');
        }
      } else {
        // Create new address
        const response = await createAddress({
          customerId,
          ...addressForm
        });
        
        if (response.data && response.data.success) {
          setMessage('Address added successfully!');
          setSeverity('success');
          fetchAddresses(customerId); // Refresh addresses
        } else {
          setMessage(response.data?.message || 'Failed to add address');
          setSeverity('error');
        }
      }
      
      closeAddressDialog();
      setShowMessage(true);
    } catch (error) {
      console.error('Error saving address:', error);
      setMessage(error.response?.data?.message || 'An error occurred while saving address');
      setSeverity('error');
      setShowMessage(true);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        const response = await deleteAddress(addressId);
        
        if (response.data && response.data.success) {
          setMessage('Address deleted successfully!');
          setSeverity('success');
          
          // Refresh addresses
          const userInfo = getUserInfoFromToken();
          const customerId = userInfo?.id || userInfo?._id;
          fetchAddresses(customerId);
        } else {
          setMessage(response.data?.message || 'Failed to delete address');
          setSeverity('error');
        }
        setShowMessage(true);
      } catch (error) {
        console.error('Error deleting address:', error);
        setMessage(error.response?.data?.message || 'An error occurred while deleting address');
        setSeverity('error');
        setShowMessage(true);
      }
    }
  };

  // Order management functions
  const handleOrderFilterChange = (field, value) => {
    const newFilters = {
      ...orderFilters,
      [field]: value
    };
    setOrderFilters(newFilters);
    
    // Apply status filter immediately, search will be handled by useEffect
    if (field === 'status') {
      const userInfo = getUserInfoFromToken();
      const customerId = userInfo?.id || userInfo?._id;
      fetchOrders(customerId, 1, newFilters);
    }
  };

  const handleOrderSearch = () => {
    const userInfo = getUserInfoFromToken();
    const customerId = userInfo?.id || userInfo?._id;
    fetchOrders(customerId, 1, orderFilters);
  };

  // Handle search input with debounce
  const handleSearchInputChange = (value) => {
    setOrderFilters(prev => ({
      ...prev,
      search: value
    }));
  };

  // Apply search with Enter key or button click
  const handleSearchSubmit = () => {
    const userInfo = getUserInfoFromToken();
    const customerId = userInfo?.id || userInfo?._id;
    fetchOrders(customerId, 1, orderFilters);
  };

  // Clear all filters
  const handleClearFilters = () => {
    const clearedFilters = {
      status: '',
      search: ''
    };
    setOrderFilters(clearedFilters);
    
    const userInfo = getUserInfoFromToken();
    const customerId = userInfo?.id || userInfo?._id;
    fetchOrders(customerId, 1, clearedFilters);
  };

  const handleOrderPageChange = (newPage) => {
    const userInfo = getUserInfoFromToken();
    const customerId = userInfo?.id || userInfo?._id;
    fetchOrders(customerId, newPage, orderFilters);
  };

  const openOrderDialog = (order) => {
    setSelectedOrder(order);
    setOrderDialogOpen(true);
  };

  const closeOrderDialog = () => {
    setOrderDialogOpen(false);
    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const renderProfileContent = () => (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      {fetchingData ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CircularProgress size={60} sx={{ mb: 3 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Loading Profile Data...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please wait while we fetch your profile information.
          </Typography>
        </Box>
      ) : (
        <>
          {/* Header */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: '#1976d2', 
                fontSize: '2rem',
                mx: 'auto',
                mb: 2
              }}
            >
              {profileData.name ? profileData.name.charAt(0).toUpperCase() : <PersonIcon />}
            </Avatar>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
              {profileData.name || 'User Profile'}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Manage your account information and preferences
            </Typography>
            
            {!isEditing ? (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
                sx={{ borderRadius: 2, px: 3 }}
              >
                Edit Profile
              </Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  disabled={loading}
                  sx={{ borderRadius: 2, px: 3 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                  onClick={handleSave}
                  disabled={loading}
                  sx={{ borderRadius: 2, px: 3 }}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            )}
          </Box>

          {/* Profile Form */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon color="primary" />
                Personal Information
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    value={profileData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <HomeIcon color="primary" />
                Address Information
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Street Address"
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    multiline
                    rows={3}
                    InputProps={{
                      startAdornment: <HomeIcon sx={{ mr: 1, color: 'text.secondary', alignSelf: 'flex-start', mt: 1 }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="City"
                    value={profileData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="State/Province"
                    value={profileData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    value={profileData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );

  const renderOrdersContent = () => (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 3 }}>
        Order History
      </Typography>

      {/* Filters and Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Search Orders"
                placeholder="Search by order ID, product name..."
                value={orderFilters.search}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit();
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        onClick={handleSearchSubmit}
                        disabled={fetchingOrders}
                      >
                        Search
                      </Button>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status Filter</InputLabel>
                <Select
                  value={orderFilters.status}
                  onChange={(e) => handleOrderFilterChange('status', e.target.value)}
                  label="Status Filter"
                >
                  <MenuItem value="">All Status</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                  <MenuItem value="shipped">Shipped</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={handleSearchSubmit}
                disabled={fetchingOrders}
              >
                Apply Filters
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleClearFilters}
                disabled={fetchingOrders}
              >
                Clear Filters
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right' }}>
                Total Orders: {orderPagination.total}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          {fetchingOrders ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <CircularProgress size={60} sx={{ mb: 3 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                Loading Orders...
              </Typography>
            </Box>
          ) : orders.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <OrdersIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                No Orders Found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {orderFilters.search || orderFilters.status 
                  ? 'No orders match your current filters. Try adjusting your search criteria.'
                  : 'Your order history will appear here once you make your first purchase.'
                }
              </Typography>
              {!orderFilters.search && !orderFilters.status && (
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/ecommerceDashboard')}
                  sx={{ borderRadius: 2, px: 3 }}
                >
                  Start Shopping
                </Button>
              )}
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Products</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Total Amount</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id} hover>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            #{order.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {formatDate(order.createdAt)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box>
                            {order.productInfo?.slice(0, 2).map((product, index) => (
                              <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                                {product.name} (x{product.quantity})
                              </Typography>
                            ))}
                            {order.productInfo?.length > 2 && (
                              <Typography variant="body2" color="text.secondary">
                                +{order.productInfo.length - 2} more items
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {formatCurrency(order.totalCost)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={order.status}
                            color={getStatusColor(order.status)}
                            size="small"
                            sx={{ textTransform: 'capitalize' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip title="View Order Details">
                            <IconButton
                              size="small"
                              onClick={() => openOrderDialog(order)}
                              sx={{ color: '#1976d2' }}
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              {orderPagination.totalPages > 1 && (
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Showing {((orderPagination.page - 1) * orderPagination.limit) + 1} to{' '}
                    {Math.min(orderPagination.page * orderPagination.limit, orderPagination.total)} of{' '}
                    {orderPagination.total} orders
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      onClick={() => handleOrderPageChange(1)}
                      disabled={orderPagination.page === 1}
                      size="small"
                    >
                      <FirstPageIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOrderPageChange(orderPagination.page - 1)}
                      disabled={orderPagination.page === 1}
                      size="small"
                    >
                      <ArrowBackIcon />
                    </IconButton>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
                      <Typography variant="body2">
                        Page {orderPagination.page} of {orderPagination.totalPages}
                      </Typography>
                    </Box>
                    
                    <IconButton
                      onClick={() => handleOrderPageChange(orderPagination.page + 1)}
                      disabled={orderPagination.page === orderPagination.totalPages}
                      size="small"
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOrderPageChange(orderPagination.totalPages)}
                      disabled={orderPagination.page === orderPagination.totalPages}
                      size="small"
                    >
                      <LastPageIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );

  const renderAddressesContent = () => (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          My Addresses
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => openAddressDialog()}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Add New Address
        </Button>
      </Box>

      {fetchingAddresses ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CircularProgress size={60} sx={{ mb: 3 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Loading Addresses...
          </Typography>
        </Box>
      ) : addresses.length === 0 ? (
        <Card>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <AddressIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              No Addresses Found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              You haven't added any addresses yet. Add your first address to get started.
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => openAddressDialog()}
              sx={{ borderRadius: 2, px: 3 }}
            >
              Add Your First Address
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {addresses.map((address, index) => (
            <Card key={address.id || address._id || index} sx={{ width: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationIcon color="primary" />
                    Address {index + 1}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => openAddressDialog(address)}
                      sx={{ color: '#1976d2' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteAddress(address.id || address._id)}
                      sx={{ color: '#d32f2f' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 1, 
                    fontWeight: 500,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  title={address.address}
                >
                  {address.address}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 0.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  title={`${address.city}, ${address.state}`}
                >
                  {address.city}, {address.state}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 0.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  title={address.country}
                >
                  {address.country}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  title={address.postalCode}
                >
                  {address.postalCode}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: 'calc(100vh - 200px)' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* User Info Header */}
        <Card sx={{ mb: 4, p: 3, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <Avatar 
              sx={{ 
                width: 64, 
                height: 64, 
                bgcolor: '#1976d2',
                mr: 3,
                fontSize: '1.5rem'
              }}
            >
              {profileData.name ? profileData.name.charAt(0).toUpperCase() : <PersonIcon />}
            </Avatar>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                {profileData.name || 'User'}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                {profileData.email || 'user@example.com'}
              </Typography>
              <Chip 
                label="Customer Account" 
                size="small" 
                color="primary" 
                variant="outlined"
              />
            </Box>
          </Box>
        </Card>

        {/* Tabs */}
        <Card sx={{ mb: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                minHeight: 64,
                fontSize: '1rem',
                fontWeight: 500,
                textTransform: 'none',
                '&.Mui-selected': {
                  color: '#1976d2',
                  fontWeight: 600,
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#1976d2',
                height: 3
              }
            }}
          >
            <Tab 
              icon={<PersonIcon />} 
              label="Profile" 
              iconPosition="start"
            />
            <Tab 
              icon={<OrdersIcon />} 
              label="Orders" 
              iconPosition="start"
            />
            <Tab 
              icon={<AddressIcon />} 
              label="Addresses" 
              iconPosition="start"
            />
            <Tab 
              icon={<LogoutIcon />} 
              label="Logout" 
              iconPosition="start"
            />
          </Tabs>
        </Card>

        {/* Tab Content */}
        <Box>
          {activeTab === 0 && renderProfileContent()}
          {activeTab === 1 && renderOrdersContent()}
          {activeTab === 2 && renderAddressesContent()}
        </Box>
      </Container>

      {/* Address Dialog */}
      <Dialog 
        open={addressDialogOpen} 
        onClose={closeAddressDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingAddress ? 'Edit Address' : 'Add New Address'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                value={addressForm.address}
                onChange={(e) => handleAddressInputChange('address', e.target.value)}
                multiline
                rows={3}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="City"
                value={addressForm.city}
                onChange={(e) => handleAddressInputChange('city', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="State/Province"
                value={addressForm.state}
                onChange={(e) => handleAddressInputChange('state', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Country"
                value={addressForm.country}
                onChange={(e) => handleAddressInputChange('country', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Postal Code"
                value={addressForm.postalCode}
                onChange={(e) => handleAddressInputChange('postalCode', e.target.value)}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={closeAddressDialog} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSaveAddress} variant="contained">
            {editingAddress ? 'Update Address' : 'Add Address'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Order Details Dialog */}
      <Dialog 
        open={orderDialogOpen} 
        onClose={closeOrderDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <OrdersIcon color="primary" />
            Order Details - #{selectedOrder?.id}
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box sx={{ mt: 2 }}>
              {/* Order Summary */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Order Summary
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Order Date
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {formatDate(selectedOrder.createdAt)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Status
                      </Typography>
                      <Chip
                        label={selectedOrder.status}
                        color={getStatusColor(selectedOrder.status)}
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Customer Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Name
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {selectedOrder.customerInfo?.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {selectedOrder.customerInfo?.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Delivery Address
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {selectedOrder.customerInfo?.address?.address}, {selectedOrder.customerInfo?.address?.city}, {selectedOrder.customerInfo?.address?.state}, {selectedOrder.customerInfo?.address?.country} - {selectedOrder.customerInfo?.address?.postalCode}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Products */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Products
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Quantity</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedOrder.productInfo?.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {product.name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {formatCurrency(product.price)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {product.quantity}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {formatCurrency(product.total)}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>

              {/* Order Total */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Order Total
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Subtotal
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {formatCurrency(selectedOrder.subTotal)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        GST Amount
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {formatCurrency(selectedOrder.gstAmount)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        Total Amount: {formatCurrency(selectedOrder.totalCost)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={closeOrderDialog} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for messages */}
      <Snackbar
        open={showMessage}
        autoHideDuration={6000}
        onClose={() => setShowMessage(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowMessage(false)} 
          severity={severity} 
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile; 