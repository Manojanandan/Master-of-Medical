import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  InputAdornment,
  IconButton,
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
    <div className={styles.fieldRow}>
      <div className={styles.fieldLabel}>{label}</div>
      <div className={styles.fieldValue}>{value || 'Not provided'}</div>
    </div>
  );

  // Helper for status display
  const renderStatus = (label, value, color = 'default') => (
    <div className={styles.fieldRow}>
      <div className={styles.fieldLabel}>{label}</div>
      <div className={styles.fieldValue}>
        <Chip 
          label={value ? 'Active' : 'Inactive'} 
          color={value ? 'success' : 'error'} 
          size="small" 
          variant="outlined"
        />
      </div>
    </div>
  );

  if (loading && !profile.name) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ background: '#f7f8fa', minHeight: '100vh', width: '100%', p: { xs: 1, sm: 3 } }}>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
      <Box sx={{ width: '100%', position: 'relative' }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, fontSize: { xs: 30, sm: 38 }, letterSpacing: 1, color: '#222' }}>Profile</Typography>
        <Paper sx={{ width: '100%', p: { xs: 3, sm: 5, md: 7 }, borderRadius: 4, boxShadow: 4, background: 'linear-gradient(90deg, #f7f8fa 60%, #e9f5f3 100%)', borderLeft: '6px solid #13bfa6', minHeight: 400, position: 'relative' }}>
          {/* Floating Edit Button */}
          {!editMode && (
            <Fab color="primary" size="medium" aria-label="edit" onClick={handleEdit} sx={{ position: 'absolute', top: 24, right: 24, background: '#13bfa6', color: '#fff', boxShadow: 3, '&:hover': { background: '#0fa98f' } }}>
              <EditIcon />
            </Fab>
          )}
          <form onSubmit={handleUpdate} autoComplete="off">
            <Stack spacing={2}>
              {/* Personal Info Section */}
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#13bfa6', mb: 2, letterSpacing: 0.5 }}>Personal Info</Typography>
                <Divider sx={{ mb: 3 }} />
                {!editMode ? (
                  <div className={styles.fieldGrid}>
                    {renderField('Name', profile.name, 'name')}
                    {renderField('Email', profile.email, 'email')}
                  </div>
                ) : (
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                    <TextField
                      label="Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name}
                      InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '1.1rem' } }}
                    />
                    <TextField
                      label="Email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email}
                      InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '1.1rem' } }}
                    />
                  </Stack>
                )}
                <Box sx={{ mt: 3 }}>
                  {!editMode ? (
                    <div className={styles.fieldGrid}>
                      {renderField('Phone', profile.phone, 'phone')}
                    </div>
                  ) : (
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                      <TextField
                        label="Phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone}
                        InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '1.1rem' } }}
                      />
                    </Stack>
                  )}
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              {/* Address Info Section */}
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#13bfa6', mb: 2, letterSpacing: 0.5 }}>Address Info</Typography>
                <Divider sx={{ mb: 3 }} />
                {!editMode ? (
                  <div className={styles.fieldGrid}>
                    {renderField('Address', profile.address, 'address')}
                    <div className={styles.fieldGrid}>
                      {renderField('City', profile.city, 'city')}
                      {renderField('State', profile.state, 'state')}
                    </div>
                    <div className={styles.fieldGrid}>
                      {renderField('Country', profile.country, 'country')}
                      {renderField('Postal Code', profile.postalCode, 'postalCode')}
                    </div>
                  </div>
                ) : (
                  <>
                    <TextField
                      label="Address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.address}
                      helperText={errors.address}
                      InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '1.1rem' } }}
                      sx={{ mb: 3 }}
                    />
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                      <TextField
                        label="City"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.city}
                        helperText={errors.city}
                        InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '1.1rem' } }}
                      />
                      <TextField
                        label="State"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.state}
                        helperText={errors.state}
                        InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '1.1rem' } }}
                      />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mt: 3 }}>
                      <TextField
                        label="Country"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.country}
                        helperText={errors.country}
                        InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '1.1rem' } }}
                      />
                      <TextField
                        label="Postal Code"
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.postalCode}
                        helperText={errors.postalCode}
                        InputLabelProps={{ sx: { fontWeight: 'bold', fontSize: '1.1rem' } }}
                      />
                    </Stack>
                  </>
                )}
              </Box>
              <Divider sx={{ my: 2 }} />
              {/* Account Info Section */}
              {!editMode && (
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#13bfa6', mb: 2, letterSpacing: 0.5 }}>Account Info</Typography>
                  <Divider sx={{ mb: 3 }} />
                  <div className={styles.fieldGrid}>
                    {renderField('Vendor Type', profile.type, 'type')}
                    {renderStatus('Status', profile.isActive)}
                    {renderField('Vendor ID', profile.id, 'id')}
                  </div>
                </Box>
              )}
              {editMode && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ mr: 1, fontWeight: 600, borderRadius: 2, px: 4, py: 1.5, fontSize: 18 }}
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />} 
                    sx={{ fontWeight: 600, borderRadius: 2, px: 4, py: 1.5, fontSize: 18, background: '#13bfa6' }}
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update'}
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