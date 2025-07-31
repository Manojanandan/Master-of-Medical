import React, { useState, useEffect, useCallback } from 'react';
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
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Collapse
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
  deleteAddress,
  getCustomerById,
  getAddressById
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
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecurityIcon from '@mui/icons-material/Security';

// Custom colors
const colors = {
  primary: '#de3b6f',
 
  accent: '#873589',
  background: '#fff',

  text: '#22223b',
  lightText: '#6c757d',
  lightBg: '#f8f9fa',
};

// Constants
const SHIPPING_COST = 15.00;
const GST_RATE = 0.18;
const FREE_SHIPPING_THRESHOLD = 500;

// Validation functions
const validateAddress = (address) => {
  const errors = {};
  
  if (!address.address?.trim()) {
    errors.address = 'Street address is required';
  }
  
  if (!address.city?.trim()) {
    errors.city = 'City is required';
  }
  
  if (!address.state?.trim()) {
    errors.state = 'State is required';
  }
  
  if (!address.postalCode?.trim()) {
    errors.postalCode = 'Postal code is required';
  } else if (!/^\d{6}$/.test(address.postalCode.trim())) {
    errors.postalCode = 'Please enter a valid 6-digit postal code';
  }
  
  return errors;
};

const validateUserDetails = (userData) => {
  const errors = {};
  
  if (!userData.name?.trim()) {
    errors.name = 'Full name is required';
  }
  
  if (!userData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!userData.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\d{10,15}$/.test(userData.phone.trim())) {
    errors.phone = 'Please enter a valid phone number (10-15 digits)';
  }
  
  return errors;
};

// Billing Address Dialog Component
function BillingAddressDialog({ open, onClose, billingData, onSave, loading, error, success }) {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    country: 'India',
    postalCode: ''
  });
  
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (billingData) {
      setFormData({
        address: billingData.address || '',
        city: billingData.city || '',
        state: billingData.state || '',
        country: billingData.country || 'India',
        postalCode: billingData.postalCode || ''
      });
    } else {
      setFormData({
        address: '',
        city: '',
        state: '',
        country: 'India',
        postalCode: ''
      });
    }
    setValidationErrors({});
  }, [billingData, open]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    const errors = validateAddress(formData);
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    onSave(formData);
  };

  const isFormValid = Object.keys(validateAddress(formData)).length === 0;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: colors.primary, color: colors.background }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: colors.background, color: colors.primary, mr: 2 }}>
              <BusinessIcon />
            </Avatar>
            <Typography variant="h6" fontWeight={600}>
              Edit Billing Address
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: colors.background }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ bgcolor: colors.lightBg }}>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Street Address *"
              fullWidth
              multiline
              rows={3}
              value={formData.address}
              onChange={e => handleChange('address', e.target.value)}
              error={!!validationErrors.address}
              helperText={validationErrors.address}
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
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="Australia">Australia</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="State *"
              fullWidth
              value={formData.state}
              onChange={e => handleChange('state', e.target.value)}
              error={!!validationErrors.state}
              helperText={validationErrors.state}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="City *"
              fullWidth
              value={formData.city}
              onChange={e => handleChange('city', e.target.value)}
              error={!!validationErrors.city}
              helperText={validationErrors.city}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Postal Code *"
              fullWidth
              value={formData.postalCode}
              onChange={e => handleChange('postalCode', e.target.value)}
              error={!!validationErrors.postalCode}
              helperText={validationErrors.postalCode}
              required
              inputProps={{ maxLength: 6 }}
            />
          </Grid>
        </Grid>
        
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>Billing address updated successfully!</Alert>}
      </DialogContent>
      
      <DialogActions sx={{ p: 3, bgcolor: colors.lightBg }}>
        <Button 
          onClick={onClose} 
          disabled={loading} 
          variant="outlined"
          sx={{ 
            borderColor: colors.primary,
            color: colors.primary,
            '&:hover': {
              borderColor: colors.primary,
              backgroundColor: `${colors.primary}10`
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading || !isFormValid}
          startIcon={loading ? null : <SaveIcon />}
          sx={{ 
            bgcolor: colors.primary,
            '&:hover': {
              bgcolor: '#c2335d'
            }
          }}
        >
          {loading ? <CircularProgress size={20} /> : 'Update Billing Address'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Address Dialog Component for Shipping
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
  
  const [validationErrors, setValidationErrors] = useState({});

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
    setValidationErrors({});
  }, [address, open]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    const errors = validateAddress(formData);
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    onSave(formData);
  };

  const isFormValid = Object.keys(validateAddress(formData)).length === 0;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: colors.primary, color: colors.background }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: colors.background, color: colors.primary, mr: 2 }}>
              <LocationOnIcon />
            </Avatar>
            <Typography variant="h6" fontWeight={600}>
              {address ? 'Edit Address' : 'Add New Address'}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: colors.background }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ bgcolor: colors.lightBg }}>
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
              error={!!validationErrors.address}
              helperText={validationErrors.address}
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
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="Australia">Australia</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="State *"
              fullWidth
              value={formData.state}
              onChange={e => handleChange('state', e.target.value)}
              error={!!validationErrors.state}
              helperText={validationErrors.state}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="City *"
              fullWidth
              value={formData.city}
              onChange={e => handleChange('city', e.target.value)}
              error={!!validationErrors.city}
              helperText={validationErrors.city}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Postal Code *"
              fullWidth
              value={formData.postalCode}
              onChange={e => handleChange('postalCode', e.target.value)}
              error={!!validationErrors.postalCode}
              helperText={validationErrors.postalCode}
              required
              inputProps={{ maxLength: 6 }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isDefault}
                  onChange={e => handleChange('isDefault', e.target.checked)}
                  color="primary"
                  sx={{ color: colors.primary }}
                />
              }
              label="Set as default address"
            />
          </Grid>
        </Grid>
        
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>Address saved successfully!</Alert>}
      </DialogContent>
      
      <DialogActions sx={{ p: 3, bgcolor: colors.lightBg }}>
        <Button 
          onClick={onClose} 
          disabled={loading} 
          variant="outlined"
          sx={{ 
            borderColor: colors.primary,
            color: colors.primary,
            '&:hover': {
              borderColor: colors.primary,
              backgroundColor: `${colors.primary}10`
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading || !isFormValid}
          startIcon={loading ? null : <SaveIcon />}
          sx={{ 
            bgcolor: colors.primary,
            '&:hover': {
              bgcolor: '#c2335d'
            }
          }}
        >
          {loading ? <CircularProgress size={20} /> : 'Save Address'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// User Details Dialog Component
function UserDetailsDialog({ open, onClose, userData, onSave, loading, error, success }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: ''
      });
    }
    setValidationErrors({});
  }, [userData, open]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    const errors = validateUserDetails(formData);
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    onSave(formData);
  };

  const isFormValid = Object.keys(validateUserDetails(formData)).length === 0;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: colors.primary, color: colors.background }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: colors.background, color: colors.primary, mr: 2 }}>
              <PersonIcon />
            </Avatar>
            <Typography variant="h6" fontWeight={600}>
              Update Personal Details
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: colors.background }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ bgcolor: colors.lightBg }}>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Full Name *"
              fullWidth
              value={formData.name}
              onChange={e => handleChange('name', e.target.value)}
              error={!!validationErrors.name}
              helperText={validationErrors.name}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email Address *"
              fullWidth
              type="email"
              value={formData.email}
              onChange={e => handleChange('email', e.target.value)}
              error={!!validationErrors.email}
              helperText={validationErrors.email}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number *"
              fullWidth
              value={formData.phone}
              onChange={e => handleChange('phone', e.target.value)}
              error={!!validationErrors.phone}
              helperText={validationErrors.phone}
              required
              inputProps={{ maxLength: 15 }}
            />
          </Grid>
        </Grid>
        
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>Details updated successfully!</Alert>}
      </DialogContent>
      
      <DialogActions sx={{ p: 3, bgcolor: colors.lightBg }}>
        <Button 
          onClick={onClose} 
          disabled={loading} 
          variant="outlined"
          sx={{ 
            borderColor: colors.primary,
            color: colors.primary,
            '&:hover': {
              borderColor: colors.primary,
              backgroundColor: `${colors.primary}10`
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading || !isFormValid}
          startIcon={loading ? null : <SaveIcon />}
          sx={{ 
            bgcolor: colors.primary,
            '&:hover': {
              bgcolor: '#c2335d'
            }
          }}
        >
          {loading ? <CircularProgress size={20} /> : 'Update Details'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Address Card Component
function AddressCard({ address, isSelected, onSelect, onEdit, onDelete, index }) {
  return (
    <Paper
      elevation={isSelected ? 4 : 1}
      sx={{
        p: 2,
        border: isSelected ? '2px solid' : '1px solid',
        borderColor: isSelected ? colors.primary : colors.border,
        borderRadius: 2,
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: colors.primary,
          transform: 'translateY(-2px)',
          boxShadow: `0px 4px 20px ${colors.primary}20`
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
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 8,
            bgcolor: colors.primary,
            color: colors.background
          }}
        />
      )}
      
      <Box display="flex" alignItems="flex-start">
        <Radio 
          checked={isSelected} 
          value={address._id || 'billing'} 
          sx={{ 
            color: colors.primary,
            '&.Mui-checked': {
              color: colors.primary,
            }
          }} 
        />
        <Box ml={1} flex={1}>
          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="subtitle1" fontWeight={600} color={colors.text}>
              {address.isBilling ? 'Billing Address' : address.isDefault ? 'Default Address' : `Address ${index + 1}`}
            </Typography>
            {(address.isDefault || address.isBilling) && (
              <Chip 
                label={address.isBilling ? 'Billing' : 'Default'} 
                size="small" 
                sx={{ 
                  ml: 1,
                  bgcolor: colors.accent,
                  color: colors.background
                }} 
              />
            )}
          </Box>
          
          {address.building && !address.isBilling && (
            <Typography variant="body2" color={colors.lightText} mb={0.5}>
              {address.building}
            </Typography>
          )}
          
          <Typography variant="body2" mb={1} color={colors.text}>
            {address.address}
          </Typography>
          
          <Typography variant="body2" color={colors.lightText}>
            {address.city}, {address.state}, {address.country} - {address.postalCode}
          </Typography>

          {address.Customer && !address.isBilling && (
            <Box mt={1} p={1} sx={{ bgcolor: colors.lightBg, borderRadius: 1 }}>
              <Typography variant="caption" color={colors.lightText}>
                Contact: {address.Customer.name} ({address.Customer.email})
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      
      {!address.isBilling && (
        <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
          <Tooltip title="Edit Address">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(address);
              }}
              sx={{ 
                bgcolor: `${colors.primary}10`,
                '&:hover': {
                  bgcolor: `${colors.primary}20`
                }
              }}
            >
              <EditIcon fontSize="small" sx={{ color: colors.primary }} />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Delete Address">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(address);
              }}
              sx={{ 
                bgcolor: `${colors.primary}10`,
                '&:hover': {
                  bgcolor: `${colors.primary}20`
                }
              }}
            >
              <DeleteIcon fontSize="small" sx={{ color: colors.primary }} />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Paper>
  );
}

// User Details Card Component
function UserDetailsCard({ userData, onEdit }) {
  return (
    <Card sx={{ 
      mb: 3, 
      border: `1px solid ${colors.border}`,
      boxShadow: 'none'
    }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ 
              bgcolor: colors.accent, 
              color: colors.background, 
              mr: 2 
            }}>
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600} color={colors.text}>
                Personal Details
              </Typography>
              <Typography variant="body2" color={colors.lightText}>
                Your contact information for this order
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={onEdit}
            size="small"
            sx={{
              borderColor: colors.primary,
              color: colors.primary,
              '&:hover': {
                borderColor: colors.primary,
                backgroundColor: `${colors.primary}10`
              }
            }}
          >
            Edit Details
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="caption" color={colors.lightText} display="block">
                Full Name
              </Typography>
              <Typography variant="body1" color={colors.text} fontWeight={500}>
                {userData?.name || 'Not provided'}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="caption" color={colors.lightText} display="block">
                Email Address
              </Typography>
              <Typography variant="body1" color={colors.text} fontWeight={500}>
                {userData?.email || 'Not provided'}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="caption" color={colors.lightText} display="block">
                Phone Number
              </Typography>
              <Typography variant="body1" color={colors.text} fontWeight={500}>
                {userData?.phone || 'Not provided'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

// Billing Address Card Component
function BillingAddressCard({ billingData, onEdit }) {
  return (
    <Card sx={{ 
      mb: 3, 
      border: `1px solid ${colors.border}`,
      boxShadow: 'none'
    }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ 
              bgcolor: colors.secondary, 
              color: colors.background, 
              mr: 2 
            }}>
              <BusinessIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600} color={colors.text}>
                Billing Address
              </Typography>
              <Typography variant="body2" color={colors.lightText}>
                Address for billing and invoicing
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={onEdit}
            size="small"
            sx={{
              borderColor: colors.primary,
              color: colors.primary,
              '&:hover': {
                borderColor: colors.primary,
                backgroundColor: `${colors.primary}10`
              }
            }}
          >
            Edit Address
          </Button>
        </Box>

        <Paper sx={{ 
          p: 3, 
          bgcolor: colors.lightBg, 
          borderRadius: 2,
          border: `2px solid ${colors.primary}`,
          position: 'relative'
        }}>
          <Chip
            label="Registered Address"
            color="primary"
            size="small"
            sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8,
              bgcolor: colors.primary,
              color: colors.background
            }}
          />
          
          <Box display="flex" alignItems="flex-start">
            <Avatar
              sx={{ 
                bgcolor: colors.primary, 
                color: colors.background, 
                mr: 2,
                mt: 0.5
              }}
            >
              {billingData?.name?.[0]?.toUpperCase() || '?'}
            </Avatar>
            <Box flex={1}>
              <Typography variant="body1" mb={0.5} color={colors.text} fontWeight={500}>
                Name: {billingData?.name || 'Not provided'}
              </Typography>
              <Typography variant="body2" color={colors.lightText} mb={0.5}>
                Email: {billingData?.email || 'Not provided'}
              </Typography>
              <Typography variant="body2" color={colors.lightText} mb={0.5}>
                Phone: {billingData?.phone || 'Not provided'}
              </Typography>
              <Typography variant="body2" color={colors.lightText} mb={0.5}>
                Address: {billingData?.address || 'Not provided'}
              </Typography>
              <Typography variant="body2" color={colors.lightText} mb={0.5}>
                City: {billingData?.city || 'Not provided'}
              </Typography>
              <Typography variant="body2" color={colors.lightText} mb={0.5}>
                State: {billingData?.state || 'Not provided'}
              </Typography>
              <Typography variant="body2" color={colors.lightText} mb={0.5}>
                Country: {billingData?.country || 'Not provided'}
              </Typography>
              <Typography variant="body2" color={colors.lightText} mb={0.5}>
                Postal Code: {billingData?.postalCode || 'Not provided'}
              </Typography>
              <Typography variant="body2" color={colors.lightText} mb={0.5}>
                Type: {billingData?.type || 'Not provided'}
              </Typography>
              <Typography variant="body2" color={colors.lightText}>
                Status: {billingData?.status || 'Not provided'}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </CardContent>
    </Card>
  );
}

// Order Items Summary Component
function OrderItemsSummary({ items, totals }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card sx={{ mb: 3, border: `1px solid ${colors.border}` }}>
      <CardContent>
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="space-between"
          sx={{ cursor: 'pointer' }}
          onClick={() => setExpanded(!expanded)}
        >
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: colors.secondary, color: colors.background, mr: 2 }}>
              <ShoppingCartIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600} color={colors.text}>
                Order Items ({items.length})
              </Typography>
              <Typography variant="body2" color={colors.lightText}>
                Click to {expanded ? 'hide' : 'view'} items
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" color={colors.primary} mr={1}>
              ₹{totals.total.toFixed(2)}
            </Typography>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
        </Box>

        <Collapse in={expanded}>
          <Divider sx={{ my: 2, borderColor: colors.border }} />
          <List>
            {items.map((item, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemAvatar>
                  <Avatar 
                    variant="rounded" 
                    src={item.image} 
                    alt={item.name}
                    sx={{ border: `1px solid ${colors.border}` }}
                  >
                    {(item.name && typeof item.name === 'string' && item.name.length > 0) ? item.name.charAt(0) : '?'}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography color={colors.text}>{item.name || 'Unnamed Product'}</Typography>}
                  secondary={<Typography color={colors.lightText}>{`Quantity: ${item.quantity}`}</Typography>}
                />
                <Typography variant="h6" color={colors.text}>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </CardContent>
    </Card>
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
  const [billingAddress, setBillingAddress] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [error, setError] = useState('');
  // NEW: State to track if billing address should be used as shipping address
  const [useBillingAsShipping, setUseBillingAsShipping] = useState(false);

  // User details state
  const [userDetails, setUserDetails] = useState(null);
  const [userDetailsDialogOpen, setUserDetailsDialogOpen] = useState(false);
  const [userDetailsLoading, setUserDetailsLoading] = useState(false);
  const [userDetailsError, setUserDetailsError] = useState('');
  const [userDetailsSuccess, setUserDetailsSuccess] = useState(false);

  // Billing address dialog state
  const [billingDialogOpen, setBillingDialogOpen] = useState(false);
  const [billingLoading, setBillingLoading] = useState(false);
  const [billingError, setBillingError] = useState('');
  const [billingSuccess, setBillingSuccess] = useState(false);

  // Address dialog state
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [addressSuccess, setAddressSuccess] = useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Dialog state for order success
  const [orderSuccessDialogOpen, setOrderSuccessDialogOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Calculate order totals
  const calculateTotals = useCallback(() => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * GST_RATE;
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + gst + shipping;

    return { subtotal, gst, shipping, total };
  }, [items]);

  const totals = calculateTotals();

  // Check if order can be placed
  const canPlaceOrder = (selectedAddress || useBillingAsShipping) && billingAddress && termsAccepted && !orderLoading && items.length > 0;

  // Fetch initial data
  useEffect(() => {
    if (!userId) {
      setError('Please login to continue');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch customer details from the customer API (for billing address)
        const customerResponse = await getCustomerById(userId);
        console.log('Customer API Response:', customerResponse);
        
        if (customerResponse.data?.success) {
          const userData = customerResponse.data.data || customerResponse.data;
          
          // Set user details
          setUserDetails({
            id: userData.id || userData._id || userId,
            name: userData.name || user?.name || '',
            email: userData.email || user?.email || '',
            phone: userData.phone || user?.phone || ''
          });

          // Set billing address from customer data
          setBillingAddress({
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            address: userData.address || '',
            city: userData.city || '',
            state: userData.state || '',
            country: userData.country || 'India',
            postalCode: userData.postalCode || '',
            type: userData.type,
            status: userData.status,
            createdAt: userData.createdAt,
            // NEW: Add isBilling flag to identify billing address
            isBilling: true
          });
        } else {
          setError('Failed to load customer data. Please try again.');
        }
        
        // Fetch cart items
        await dispatch(fetchCart());

        // Fetch shipping addresses from the address API
        const addressesResponse = await getAllAddresses({ customerId: userId });
        console.log('Addresses API Response:', addressesResponse);
        
        if (addressesResponse.data?.success) {
          const addressesData = addressesResponse.data.data;
          setAddresses(addressesData);
          
          // Set default shipping address
          const defaultAddress = addressesData.find(addr => addr.isDefault);
          if (defaultAddress) {
            setSelectedAddress(defaultAddress);
          } else if (addressesData.length > 0) {
            setSelectedAddress(addressesData[0]);
          } else {
            // NEW: If no addresses, consider using billing address as default
            setUseBillingAsShipping(true);
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

  // User details CRUD operations
  const handleSaveUserDetails = async (formData) => {
    setUserDetailsLoading(true);
    setUserDetailsError('');
    setUserDetailsSuccess(false);
    
    try {
      const response = await updateCustomer({
        id: userId,
        ...formData
      });
      
      if (response.data?.success) {
        setUserDetailsSuccess(true);
        setSnackbar({
          open: true,
          message: 'Personal details updated successfully!',
          severity: 'success'
        });
        
        // Update local user details
        setUserDetails(prev => ({
          ...prev,
          ...formData
        }));

        // Update billing address with new user data
        setBillingAddress(prev => ({
          ...prev,
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        }));
        
        // Close dialog after a short delay to show success message
        setTimeout(() => {
          setUserDetailsDialogOpen(false);
          setUserDetailsSuccess(false);
        }, 1500);
        
      } else {
        setUserDetailsError(response.data?.message || 'Failed to update details. Please try again.');
      }
    } catch (error) {
      console.error('Error updating user details:', error);
      setUserDetailsError('Failed to update details. Please try again.');
    } finally {
      setUserDetailsLoading(false);
    }
  };

  // Billing address operations
  const handleSaveBillingAddress = async (formData) => {
    setBillingLoading(true);
    setBillingError('');
    setBillingSuccess(false);
    
    try {
      const response = await updateCustomer({
        id: userId,
        ...formData
      });
      
      if (response.data?.success) {
        setBillingSuccess(true);
        setSnackbar({
          open: true,
          message: 'Billing address updated successfully!',
          severity: 'success'
        });
        
        // Update local billing address
        setBillingAddress(prev => ({
          ...prev,
          ...formData,
          name: userDetails.name,
          email: userDetails.email,
          phone: userDetails.phone,
          isBilling: true
        }));
        
        // If using billing as shipping, update selected address
        if (useBillingAsShipping) {
          setSelectedAddress({
            ...formData,
            name: userDetails.name,
            email: userDetails.email,
            phone: userDetails.phone,
            isBilling: true
          });
        }
        
        // Close dialog after a short delay to show success message
        setTimeout(() => {
          setBillingDialogOpen(false);
          setBillingSuccess(false);
        }, 1500);
        
      } else {
        setBillingError(response.data?.message || 'Failed to update billing address. Please try again.');
      }
    } catch (error) {
      console.error('Error updating billing address:', error);
      setBillingError('Failed to update billing address. Please try again.');
    } finally {
      setBillingLoading(false);
    }
  };

  // Address CRUD operations
  const handleSaveAddress = async (formData) => {
    console.log('💾 Saving address with data:', formData);
    setAddressLoading(true);
    setAddressError('');
    setAddressSuccess(false);
    
    try {
      let response;
      
      if (editingAddress) {
        console.log('✏️ Updating existing address:', editingAddress._id);
        response = await updateAddress({ ...formData, id: editingAddress._id });
      } else {
        console.log('➕ Creating new address for customer:', userId);
        response = await createAddress({ ...formData, customerId: userId });
      }
      
      console.log('📡 Address save response:', response);
      
      if (response.data?.success) {
        setAddressSuccess(true);
        setSnackbar({
          open: true,
          message: editingAddress ? 'Address updated successfully!' : 'Address added successfully!',
          severity: 'success'
        });
        
        // Refresh addresses
        console.log('🔄 Refreshing addresses after save...');
        const addressesResponse = await getAllAddresses({ customerId: userId });
        console.log('📡 Refresh addresses response:', addressesResponse);
        
        if (addressesResponse.data?.success) {
          const updatedAddresses = addressesResponse.data.data;
          console.log('📋 Updated addresses:', updatedAddresses);
          setAddresses(updatedAddresses);
          
          // Update selected address if it was edited
          if (editingAddress && selectedAddress?._id === editingAddress._id) {
            const updatedAddress = updatedAddresses.find(a => a._id === editingAddress._id);
            console.log('🔄 Updated selected address:', updatedAddress);
            setSelectedAddress(updatedAddress);
          }
          
          // If this is a new address and no address was selected
          if (!editingAddress && !selectedAddress && !useBillingAsShipping) {
            const newAddress = updatedAddresses[updatedAddresses.length - 1];
            console.log('🎯 Setting first address as selected:', newAddress);
            setSelectedAddress(newAddress);
            setUseBillingAsShipping(false); // NEW: Disable billing as shipping if a new address is added
          }
        }
        
        // Close dialog after a short delay to show success message
        setTimeout(() => {
          setAddressDialogOpen(false);
          setEditingAddress(null);
          setAddressSuccess(false);
        }, 1500);
        
      } else {
        console.error('❌ Address save failed:', response.data);
        setAddressError(response.data?.message || 'Failed to save address. Please try again.');
      }
    } catch (error) {
      console.error('💥 Error saving address:', error);
      setAddressError('Failed to save address. Please try again.');
    } finally {
      setAddressLoading(false);
    }
  };

  const handleDeleteAddress = async (address) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this address?');
      if (!confirmDelete) return;

      const response = await deleteAddress(address._id || address.id);

      if (response.data?.success) {
        setSnackbar({
          open: true,
          message: 'Address deleted successfully!',
          severity: 'success'
        });

        // Update addresses
        const updatedAddresses = addresses.filter(
          a => (a._id || a.id) !== (address._id || address.id)
        );
        setAddresses(updatedAddresses);

        // If the deleted address was selected, update selectedAddress
        if (selectedAddress && (selectedAddress._id || selectedAddress.id) === (address._id || address.id)) {
          if (updatedAddresses.length > 0) {
            setSelectedAddress(updatedAddresses[0]);
            setUseBillingAsShipping(false);
          } else {
            setSelectedAddress(null);
            setUseBillingAsShipping(true); // NEW: Default to billing address if no other addresses
          }
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
        message: 'Failed to delete address. Please try again.',
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

      // NEW: Use billing address as shipping address if selected
      const shippingAddress = useBillingAsShipping ? billingAddress : selectedAddress;

      console.log('Placing order with:', {
        customerId: userId,
        shippingAddress: shippingAddress,
        billingAddress: billingAddress,
        items,
      });

      const productInfo = items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subTotal: item.price * item.quantity,
        gst: item.price * item.quantity * GST_RATE,
        total: item.price * item.quantity * (1 + GST_RATE),
      }));

      const orderData = {
        customerId: userId,
        customerInfo: {
          name: userDetails?.name,
          email: userDetails?.email,
          phone: userDetails?.phone || '',
          address: shippingAddress, // NEW: Use the chosen shipping address
        },
        billingAddress: billingAddress,
        productInfo,
        subTotal: totals.subtotal,
        gstAmount: totals.gst,
        shippingCost: totals.shipping,
        totalCost: totals.total,
        status: 'pending',
        paymentMethod: 'COD',
        orderDate: new Date().toISOString(),
      };

      const response = await createOrder(orderData);

      if (response.data?.success) {
        console.log('Order placed successfully, clearing cart');
        setOrderDetails({
          orderId: response.data.orderId || Date.now(),
          total: totals.total,
          itemCount: items.length,
        });
        await dispatch(clearCart());
        console.log('Cart cleared, dispatching fetchCart');
        await dispatch(fetchCart());
        setOrderSuccessDialogOpen(true);
      } else {
        setError(response.data?.message || 'Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setOrderLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Loading state
  if (loading || cartLoading) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} sx={{ mb: 2, color: colors.primary }} />
        <Typography variant="h6" color={colors.lightText}>
          Loading checkout...
        </Typography>
      </Box>
    );
  }

  // Error state - User not logged in
  if (error && !userId) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <Alert severity="error" sx={{ maxWidth: '600px', bgcolor: `${colors.primary}10` }}>
          <Typography variant="h6">Authentication Required</Typography>
          <Typography sx={{ mb: 2 }}>{error}</Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/loginform')}
            sx={{ bgcolor: colors.primary }}
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
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="400px" sx={{ p: 3 }}>
        <ShoppingCartIcon sx={{ fontSize: 120, color: colors.lightText, mb: 3 }} />
        <Typography variant="h4" mb={2} textAlign="center" color={colors.text}>Your cart is empty</Typography>
        <Typography variant="body1" color={colors.lightText} mb={4} textAlign="center">
          Add some items to your cart to proceed with checkout
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          onClick={() => navigate('/customer')}
          sx={{ bgcolor: colors.primary }}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: colors.lightBg, minHeight: '100vh', py: 3 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
        {/* Header */}
        <Paper sx={{ 
          p: 3, 
          mb: 3, 
          bgcolor: colors.primary, 
          color: colors.background, 
          borderRadius: 2,
          boxShadow: `0px 4px 20px ${colors.primary}40`
        }}>
          <Typography variant="h4" fontWeight={700} mb={1}>Checkout</Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Review your order and complete your purchase
          </Typography>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Left Column - User Details, Billing Address, Address Selection & Order Items */}
          <Grid item xs={12} md={8}>
            {/* Order Items Summary (Mobile/Tablet) */}
            {isMobile && (
              <OrderItemsSummary items={items} totals={totals} />
            )}

            {/* User Details */}
            {userDetails && (
              <UserDetailsCard 
                userData={userDetails}
                onEdit={() => setUserDetailsDialogOpen(true)}
              />
            )}

            {/* Billing Address */}
            {billingAddress && (
              <BillingAddressCard 
                billingData={billingAddress}
                onEdit={() => setBillingDialogOpen(true)}
              />
            )}

            {/* Shipping Address */}
            <Card sx={{ 
              mb: 3, 
              border: `1px solid ${colors.border}`,
              boxShadow: 'none'
            }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ 
                      bgcolor: colors.accent, 
                      color: colors.background, 
                      mr: 2 
                    }}>
                      <LocalShippingIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600} color={colors.text}>
                        Shipping Address
                      </Typography>
                      <Typography variant="body2" color={colors.lightText}>
                        Choose where to deliver your order
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      setEditingAddress(null);
                      setAddressDialogOpen(true);
                    }}
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      borderColor: colors.primary,
                      color: colors.primary,
                      '&:hover': {
                        borderColor: colors.primary,
                        backgroundColor: `${colors.primary}10`
                      }
                    }}
                  >
                    Add Address
                  </Button>
                </Box>

                {/* NEW: Checkbox to use billing address as shipping address */}
                {billingAddress && (
                  <Box mb={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={useBillingAsShipping}
                          onChange={(e) => {
                            setUseBillingAsShipping(e.target.checked);
                            if (e.target.checked) {
                              setSelectedAddress({
                                ...billingAddress,
                                isBilling: true
                              });
                            } else if (addresses.length > 0) {
                              const defaultAddress = addresses.find(addr => addr.isDefault);
                              setSelectedAddress(defaultAddress || addresses[0]);
                            } else {
                              setSelectedAddress(null);
                            }
                          }}
                          color="primary"
                          sx={{ color: colors.primary }}
                        />
                      }
                      label="Use billing address as shipping address"
                    />
                  </Box>
                )}

                {addresses.length === 0 && !useBillingAsShipping ? (
                  <Box textAlign="center" py={6}>
                    <LocationOnIcon sx={{ 
                      fontSize: 80, 
                      color: colors.lightText, 
                      mb: 2 
                    }} />
                    <Typography variant="h6" mb={1} color={colors.text}>
                      No addresses found
                    </Typography>
                    <Typography variant="body2" color={colors.lightText} mb={3}>
                      Add your first address to continue with checkout
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => setAddressDialogOpen(true)}
                      sx={{ bgcolor: colors.primary }}
                    >
                      Add Your First Address
                    </Button>
                  </Box>
                ) : (
                  <RadioGroup 
                    value={selectedAddress?._id || (useBillingAsShipping ? 'billing' : '')} 
                    onChange={(e) => {
                      if (e.target.value === 'billing') {
                        setUseBillingAsShipping(true);
                        setSelectedAddress({
                          ...billingAddress,
                          isBilling: true
                        });
                      } else {
                        setUseBillingAsShipping(false);
                        const address = addresses.find(a => a._id === e.target.value);
                        setSelectedAddress(address);
                      }
                    }}
                  >
                    <Grid container spacing={2}>
                      {/* NEW: Include billing address in the list if useBillingAsShipping is checked or no other addresses */}
                      {(useBillingAsShipping || addresses.length === 0) && billingAddress && (
                        <Grid item xs={12}>
                          <AddressCard
                            address={{
                              ...billingAddress,
                              isBilling: true
                            }}
                            isSelected={useBillingAsShipping}
                            onSelect={() => {
                              setUseBillingAsShipping(true);
                              setSelectedAddress({
                                ...billingAddress,
                                isBilling: true
                              });
                            }}
                            onEdit={() => setBillingDialogOpen(true)}
                            onDelete={() => {}} // No delete for billing address
                            index={-1}
                          />
                        </Grid>
                      )}
                      {addresses.map((address, index) => (
                        <Grid item xs={12} key={address._id || index}>
                          <AddressCard
                            address={address}
                            isSelected={selectedAddress?._id === address._id && !useBillingAsShipping}
                            onSelect={() => {
                              setUseBillingAsShipping(false);
                              setSelectedAddress(address);
                            }}
                            onEdit={(addr) => {
                              setEditingAddress(addr);
                              setAddressDialogOpen(true);
                            }}
                            onDelete={handleDeleteAddress}
                            index={index}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </RadioGroup>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Order Summary */}
          <Grid item xs={12} md={4}>
            {/* Order Items Summary (Desktop) */}
            {!isMobile && (
              <OrderItemsSummary items={items} totals={totals} />
            )}

            {/* Order Summary Card */}
            <Card sx={{ 
              position: 'sticky', 
              top: 20, 
              border: `1px solid ${colors.border}`,
              boxShadow: `0px 4px 20px ${colors.primary}20`
            }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={3}>
                  <Avatar sx={{ 
                    bgcolor: colors.primary, 
                    color: colors.background, 
                    mr: 2 
                  }}>
                    <PaymentIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600} color={colors.text}>
                    Order Summary
                  </Typography>
                </Box>

                <Stack spacing={2} mb={3}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography color={colors.text}>Subtotal ({items.length} items)</Typography>
                    <Typography color={colors.text}>₹{totals.subtotal.toFixed(2)}</Typography>
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between">
                    <Typography color={colors.text}>GST (Total)</Typography>
                    <Typography color={colors.text}>₹{totals.gst.toFixed(2)}</Typography>
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between">
                    <Typography color={colors.text}>Shipping</Typography>
                    <Box textAlign="right">
                      <Typography color={colors.text}>
                        {totals.shipping === 0 ? 'FREE' : `₹${totals.shipping.toFixed(2)}`}
                      </Typography>
                      {totals.subtotal < FREE_SHIPPING_THRESHOLD && (
                        <Typography variant="caption" color={colors.secondary}>
                          Add ₹{(FREE_SHIPPING_THRESHOLD - totals.subtotal).toFixed(2)} for free shipping
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Stack>

                <Divider sx={{ my: 2, borderColor: colors.border }} />

                <Box display="flex" justifyContent="space-between" mb={3}>
                  <Typography variant="h6" fontWeight={600} color={colors.text}>
                    Total
                  </Typography>
                  <Typography variant="h6" color={colors.primary} fontWeight={600}>
                    ₹{totals.total.toFixed(2)}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={3} p={2} 
                  sx={{ 
                    bgcolor: `${colors.primary}10`, 
                    borderRadius: 1,
                    border: `1px solid ${colors.primary}20`
                  }}
                >
                  <SecurityIcon sx={{ color: colors.primary, mr: 1 }} />
                  <Typography variant="caption" color={colors.primary}>
                    Your order is secured with 256-bit SSL encryption
                  </Typography>
                </Box>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      color="primary"
                      sx={{ color: colors.primary }}
                    />
                  }
                  label={
                    <Typography variant="body2" color={colors.text}>
                      I agree to the{' '}
                      <Box 
                        component="span" 
                        sx={{ 
                          color: colors.primary, 
                          cursor: 'pointer', 
                          textDecoration: 'underline',
                          '&:hover': {
                            color: '#c2335d'
                          }
                        }}
                      >
                        terms and conditions
                      </Box>
                      {' '}and{' '}
                      <Box 
                        component="span" 
                        sx={{ 
                          color: colors.primary, 
                          cursor: 'pointer', 
                          textDecoration: 'underline',
                          '&:hover': {
                            color: '#c2335d'
                          }
                        }}
                      >
                        privacy policy
                      </Box>
                    </Typography>
                  }
                  sx={{ mb: 3, alignItems: 'flex-start' }}
                />

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleConfirmOrder}
                  disabled={!canPlaceOrder}
                  sx={{ 
                    mb: 2, 
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    bgcolor: colors.primary,
                    '&:hover': {
                      bgcolor: '#c2335d'
                    },
                    '&:disabled': {
                      bgcolor: `${colors.primary}50`,
                      color: `${colors.background}80`
                    }
                  }}
                >
                  {orderLoading ? (
                    <Box display="flex" alignItems="center">
                      <CircularProgress size={20} color="inherit" sx={{ mr: 2 }} />
                      Processing Order...
                    </Box>
                  ) : (
                    'Place Order (Cash on Delivery)'
                  )}
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/customer')}
                  sx={{ 
                    py: 1.5,
                    borderColor: colors.primary,
                    color: colors.primary,
                    '&:hover': {
                      borderColor: colors.primary,
                      backgroundColor: `${colors.primary}10`
                    }
                  }}
                >
                  Continue Shopping
                </Button>

                {/* Order Validation Messages */}
                {!(selectedAddress || useBillingAsShipping) && (
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    Please select a shipping address
                  </Alert>
                )}
                
                {!billingAddress && (
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    Billing address is required
                  </Alert>
                )}
                
                {!termsAccepted && (selectedAddress || useBillingAsShipping) && billingAddress && (
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    Please accept terms and conditions
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <UserDetailsDialog
          open={userDetailsDialogOpen}
          onClose={() => {
            setUserDetailsDialogOpen(false);
            setUserDetailsError('');
            setUserDetailsSuccess(false);
          }}
          userData={userDetails}
          onSave={handleSaveUserDetails}
          loading={userDetailsLoading}
          error={userDetailsError}
          success={userDetailsSuccess}
        />

        <BillingAddressDialog
          open={billingDialogOpen}
          onClose={() => {
            setBillingDialogOpen(false);
            setBillingError('');
            setBillingSuccess(false);
          }}
          billingData={billingAddress}
          onSave={handleSaveBillingAddress}
          loading={billingLoading}
          error={billingError}
          success={billingSuccess}
        />

        <AddressDialog
          open={addressDialogOpen}
          onClose={() => {
            setAddressDialogOpen(false);
            setEditingAddress(null);
            setAddressError('');
            setAddressSuccess(false);
          }}
          address={editingAddress}
          onSave={handleSaveAddress}
          loading={addressLoading}
          error={addressError}
          success={addressSuccess}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert 
            severity={snackbar.severity} 
            onClose={handleCloseSnackbar}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        <Dialog
          open={orderSuccessDialogOpen}
          onClose={() => setOrderSuccessDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              border: `2px solid ${colors.primary}`,
              borderRadius: 2
            }
          }}
        >
          <DialogTitle sx={{ 
            textAlign: 'center', 
            pb: 1,
            bgcolor: colors.primary,
            color: colors.background
          }}>
            <Avatar sx={{ 
              bgcolor: colors.background, 
              color: colors.primary, 
              mx: 'auto', 
              mb: 2, 
              width: 56, 
              height: 56 
            }}>
              <CheckCircleIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography variant="h5" fontWeight={600}>
              Order Placed Successfully!
            </Typography>
          </DialogTitle>
          
          <DialogContent sx={{ 
            textAlign: 'center', 
            pb: 2,
            bgcolor: colors.lightBg
          }}>
            {orderDetails && (
              <Box>
                <Typography variant="body1" mb={2} color={colors.text}>
                  Thank you for your order. Your order has been confirmed and will be processed soon.
                </Typography>
                
                <Paper sx={{ 
                  p: 2, 
                  bgcolor: colors.lightBg, 
                  mb: 3,
                  border: `1px solid ${colors.border}`
                }}>
                  <Typography variant="subtitle2" fontWeight={600} mb={1} color={colors.text}>
                    Order Details
                  </Typography>
                  <Typography variant="body2" mb={0.5} color={colors.text}>
                    Order ID: #{orderDetails.orderId}
                  </Typography>
                  <Typography variant="body2" mb={0.5} color={colors.text}>
                    Items: {orderDetails.itemCount}
                  </Typography>
                  <Typography variant="body2" color={colors.primary} fontWeight={600}>
                    Total: ₹{orderDetails.total.toFixed(2)}
                  </Typography>
                </Paper>
                
                <Typography variant="body2" color={colors.lightText}>
                  You will receive an email confirmation shortly with your order details and tracking information.
                </Typography>
              </Box>
            )}
          </DialogContent>
          
          <DialogActions sx={{ 
            justifyContent: 'center', 
            pb: 3,
            bgcolor: colors.lightBg
          }}>
            <Button
              onClick={() => {
                setOrderSuccessDialogOpen(false);
                navigate('/customer');
              }}
              variant="contained"
              size="large"
              sx={{ 
                px: 4,
                bgcolor: colors.primary,
                '&:hover': {
                  bgcolor: '#c2335d'
                }
              }}
            >
              Continue Shopping
            </Button>
            
            <Button
              onClick={() => {
                setOrderSuccessDialogOpen(false);
                navigate('/customer/profile');
              }}
              variant="outlined"
              size="large"
              sx={{ 
                px: 4,
                borderColor: colors.primary,
                color: colors.primary,
                '&:hover': {
                  borderColor: colors.primary,
                  backgroundColor: `${colors.primary}10`
                }
              }}
            >
              View Orders
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Checkout;