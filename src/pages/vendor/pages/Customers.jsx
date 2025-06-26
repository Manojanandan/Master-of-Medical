import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Snackbar,
  Alert,
  Divider,
  Fab,
  CircularProgress,
  
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendorProfile, updateVendorProfileData, clearError, clearSuccess } from '../reducers/VendorProfileReducer';
import { getVendorIdFromToken } from '../../../utils/jwtUtils';
import styles from './Profile.module.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error, success, message } = useSelector((state) => state.vendorProfileReducer);
  
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Load profile data on component mount
  useEffect(() => {
    const vendorId = getVendorIdFromToken();
    if (!vendorId) {
      setSnackbar({ 
        open: true, 
        message: 'Authentication error. Please login again.', 
        severity: 'error' 
      });
      return;
    }
    dispatch(fetchVendorProfile());
  }, [dispatch]);

  // Update form when profile data is loaded
  useEffect(() => {
    if (profile && Object.keys(profile).length > 0) {
      setForm(profile);
    }
  }, [profile]);

  // Handle success and error messages
  useEffect(() => {
    if (success && message) {
      setSnackbar({ open: true, message, severity: 'success' });
      dispatch(clearSuccess());
    } else if (error) {
      const errorMessage = error.message || 'An error occurred';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      dispatch(clearError());
    }
  }, [success, error, message, dispatch]);

  const handleEdit = () => {
    setForm(profile);
    setEditMode(true);
    setErrors({});
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Valid email is required';
    if (!form.phone || !/^\d{10,15}$/.test(form.phone)) errs.phone = 'Valid phone is required';
    if (!form.address) errs.address = 'Address is required';
    if (!form.city) errs.city = 'City is required';
    if (!form.state) errs.state = 'State is required';
    if (!form.country) errs.country = 'Country is required';
    if (!form.postalCode || !/^\d{4,10}$/.test(form.postalCode)) errs.postalCode = 'Valid postal code is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validate()) {
      setSnackbar({ open: true, message: 'Please fix the errors.', severity: 'error' });
      return;
    }
    
    const vendorId = getVendorIdFromToken();
    if (!vendorId) {
      setSnackbar({ 
        open: true, 
        message: 'Authentication error. Please login again.', 
        severity: 'error' 
      });
      return;
    }
    
    dispatch(updateVendorProfileData(form));
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm(profile);
    setErrors({});
  };

  // Helper for label/value display
  const renderField = (label, value, name) => (
    <Box sx={{ mb: 1 }}>
      <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, mb: 0.25, fontSize: '0.875rem' }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ color: '#333', fontWeight: 400 }}>
        {value || 'Not provided'}
      </Typography>
    </Box>
  );

  // Helper for status display
  const renderStatus = (label, value) => (
    <Box sx={{ mb: 1 }}>
      <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, mb: 0.25, fontSize: '0.875rem' }}>
        {label}
      </Typography>
      <Chip 
        label={value ? 'Active' : 'Inactive'} 
        color={value ? 'success' : 'error'} 
        size="small" 
        variant="outlined"
        sx={{ 
          borderRadius: '6px',
          fontSize: '0.75rem',
          fontWeight: 500
        }}
      />
    </Box>
  );

  if (loading && !profile.name) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      background: '#fafafa', 
      minHeight: '100vh', 
      width: '100%', 
      p: { xs: 2, sm: 4, md: 6 },
      maxWidth: '1200px',
      mx: 'auto'
    }}>
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
      
      <Box sx={{ width: '100%', position: 'relative' }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 600, 
            mb: 4, 
            fontSize: { xs: '1.75rem', sm: '2rem' }, 
            color: '#1a1a1a',
            letterSpacing: '-0.02em'
          }}
        >
          Profile
        </Typography>
        
        <Paper sx={{ 
          width: '100%', 
          p: { xs: 3, sm: 4, md: 5 }, 
          borderRadius: 2, 
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', 
          background: '#ffffff',
          border: '1px solid #e0e0e0',
          position: 'relative'
        }}>
          {/* Floating Edit Button */}
          {!editMode && (
            <Fab 
              color="primary" 
              size="small" 
              aria-label="edit" 
              onClick={handleEdit} 
              sx={{ 
                position: 'absolute', 
                top: 20, 
                right: 20, 
                background: '#1976d2', 
                color: '#fff', 
                boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
                '&:hover': { 
                  background: '#1565c0',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)'
                }
              }}
            >
              <EditIcon sx={{ fontSize: '1.2rem' }} />
            </Fab>
          )}
          
          <form onSubmit={handleUpdate} autoComplete="off">
            <Stack spacing={2}>
              {/* Personal Info Section */}
              <Box>
                <Typography sx={{ 
                  fontWeight: 600, 
                  fontSize: '1.125rem', 
                  color: '#1976d2', 
                  mb: 1.5,
                  letterSpacing: '-0.01em'
                }}>
                  Personal Information
                </Typography>
                <Divider sx={{ mb: 2, opacity: 0.6 }} />
                
                {!editMode ? (
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    {renderField('Name', profile.name, 'name')}
                    {renderField('Email', profile.email, 'email')}
                    {renderField('Phone', profile.phone, 'phone')}
                  </Box>
                ) : (
                  <Stack spacing={2}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                      <TextField
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name}
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1,
                            '&:hover fieldset': {
                              borderColor: '#1976d2',
                            },
                          },
                        }}
                      />
                      <TextField
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email}
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1,
                            '&:hover fieldset': {
                              borderColor: '#1976d2',
                            },
                          },
                        }}
                      />
                    </Box>
                    <TextField
                      label="Phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone}
                      size="small"
                      sx={{
                        maxWidth: { sm: '50%' },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1,
                          '&:hover fieldset': {
                            borderColor: '#1976d2',
                          },
                        },
                      }}
                    />
                  </Stack>
                )}
              </Box>

              {/* Address Info Section */}
              <Box>
                <Typography sx={{ 
                  fontWeight: 600, 
                  fontSize: '1.125rem', 
                  color: '#1976d2', 
                  mb: 1.5,
                  letterSpacing: '-0.01em'
                }}>
                  Address Information
                </Typography>
                <Divider sx={{ mb: 2, opacity: 0.6 }} />
                
                {!editMode ? (
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                      {renderField('Address', profile.address, 'address')}
                    </Box>
                    {renderField('City', profile.city, 'city')}
                    {renderField('State', profile.state, 'state')}
                    {renderField('Country', profile.country, 'country')}
                    {renderField('Postal Code', profile.postalCode, 'postalCode')}
                  </Box>
                ) : (
                  <Stack spacing={2}>
                    <TextField
                      label="Address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.address}
                      helperText={errors.address}
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1,
                          '&:hover fieldset': {
                            borderColor: '#1976d2',
                          },
                        },
                      }}
                    />
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                      <TextField
                        label="City"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.city}
                        helperText={errors.city}
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1,
                            '&:hover fieldset': {
                              borderColor: '#1976d2',
                            },
                          },
                        }}
                      />
                      <TextField
                        label="State"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.state}
                        helperText={errors.state}
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1,
                            '&:hover fieldset': {
                              borderColor: '#1976d2',
                            },
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                      <TextField
                        label="Country"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.country}
                        helperText={errors.country}
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1,
                            '&:hover fieldset': {
                              borderColor: '#1976d2',
                            },
                          },
                        }}
                      />
                      <TextField
                        label="Postal Code"
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.postalCode}
                        helperText={errors.postalCode}
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1,
                            '&:hover fieldset': {
                              borderColor: '#1976d2',
                            },
                          },
                        }}
                      />
                    </Box>
                  </Stack>
                )}
              </Box>

              {/* Account Info Section */}
              {!editMode && (
                <Box>
                  <Typography sx={{ 
                    fontWeight: 600, 
                    fontSize: '1.125rem', 
                    color: '#1976d2', 
                    mb: 1.5,
                    letterSpacing: '-0.01em'
                  }}>
                    Account Information
                  </Typography>
                  <Divider sx={{ mb: 2, opacity: 0.6 }} />
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    {renderField('Vendor Type', profile.type, 'type')}
                    {renderStatus('Status', profile.isActive)}
                    {renderField('Vendor ID', profile.id, 'id')}
                  </Box>
                </Box>
              )}

              {/* Action Buttons */}
              {editMode && (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  gap: 2,
                  pt: 1,
                  borderTop: '1px solid #e0e0e0'
                }}>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={loading}
                    sx={{ 
                      fontWeight: 500, 
                      borderRadius: 1, 
                      px: 3, 
                      py: 1,
                      textTransform: 'none',
                      fontSize: '0.875rem'
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />} 
                    sx={{ 
                      fontWeight: 500, 
                      borderRadius: 1, 
                      px: 3, 
                      py: 1,
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      background: '#1976d2',
                      '&:hover': {
                        background: '#1565c0'
                      }
                    }}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              )}
            </Stack>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Profile; 