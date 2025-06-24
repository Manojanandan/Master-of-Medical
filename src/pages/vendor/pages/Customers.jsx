import React, { useState } from 'react';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import styles from './Profile.module.css';

const mockProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '9876543210',
  address: '123 Main St',
  city: 'New York',
  state: 'NY',
  country: 'USA',
  postalCode: '10001',
};

const Profile = () => {
  const [profile, setProfile] = useState(mockProfile);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(mockProfile);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

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
    setProfile(form);
    setEditMode(false);
    setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
  };

  // Helper for label/value display
  const renderField = (label, value, name) => (
    <div className={styles.fieldRow}>
      <div className={styles.fieldLabel}>{label}</div>
      <div className={styles.fieldValue}>{value}</div>
    </div>
  );

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
              {editMode && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ mr: 1, fontWeight: 600, borderRadius: 2, px: 4, py: 1.5, fontSize: 18 }}
                    onClick={() => {
                      setEditMode(false);
                      setForm(profile);
                      setErrors({});
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" startIcon={<SaveIcon />} sx={{ fontWeight: 600, borderRadius: 2, px: 4, py: 1.5, fontSize: 18, background: '#13bfa6' }}>
                    Update
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