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
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
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
    userName: '',
    type: '',
    remarks: '',
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // File management state
  const [files, setFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [removedFiles, setRemovedFiles] = useState([]);
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);

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
      setForm({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        country: profile.country || '',
        postalCode: profile.postalCode || '',
        userName: profile.userName || '',
        type: profile.type || '',
        remarks: profile.remarks || '',
      });
      setFiles(profile.files || []);
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
    setForm({
      name: profile.name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      address: profile.address || '',
      city: profile.city || '',
      state: profile.state || '',
      country: profile.country || '',
      postalCode: profile.postalCode || '',
      userName: profile.userName || '',
      type: profile.type || '',
      remarks: profile.remarks || '',
    });
    setFiles(profile.files || []);
    setNewFiles([]);
    setRemovedFiles([]);
    setEditMode(true);
    setErrors({});
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // File management functions
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setNewFiles(prev => [...prev, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    const fileToRemove = files[index];
    setFiles(prev => prev.filter((_, i) => i !== index));
    setRemovedFiles(prev => [...prev, fileToRemove]);
  };

  const handleRemoveNewFile = (index) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setNewFiles(prev => [...prev, ...droppedFiles]);
    }
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
    
    // Prepare form data with files
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (form[key] !== undefined && form[key] !== null) {
        formData.append(key, form[key]);
      }
    });
    
    // Add new files
    newFiles.forEach(file => {
      formData.append('files', file);
    });
    
    // Add removed files info
    if (removedFiles.length > 0) {
      formData.append('removedFiles', JSON.stringify(removedFiles));
    }
    
    dispatch(updateVendorProfileData(formData));
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm({
      name: profile.name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      address: profile.address || '',
      city: profile.city || '',
      state: profile.state || '',
      country: profile.country || '',
      postalCode: profile.postalCode || '',
      userName: profile.userName || '',
      type: profile.type || '',
      remarks: profile.remarks || '',
    });
    setFiles(profile.files || []);
    setNewFiles([]);
    setRemovedFiles([]);
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
        label={value === 'approved' ? 'Approved' : value === 'pending' ? 'Pending' : 'Rejected'} 
        color={value === 'approved' ? 'success' : value === 'pending' ? 'warning' : 'error'} 
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

  // Helper for type display
  const renderType = (label, value) => (
    <Box sx={{ mb: 1 }}>
      <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, mb: 0.25, fontSize: '0.875rem' }}>
        {label}
      </Typography>
      <Chip 
        label={value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Not specified'} 
        color="primary" 
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

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
            <Stack spacing={3}>
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    {renderField('Name', profile.name, 'name')}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {renderField('Username', profile.userName, 'userName')}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    {renderField('Email', profile.email, 'email')}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    {renderField('Phone', profile.phone, 'phone')}
                    </Grid>
                  </Grid>
                ) : (
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 3,
                    width: '100%'
                  }}>
                    {/* Personal Information Fields */}
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                      <TextField
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name}
                          size="medium"
                          variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              backgroundColor: '#fafbfc',
                              height: '56px',
                              '&:hover': {
                                backgroundColor: '#f8f9fa',
                                '& fieldset': {
                              borderColor: '#1976d2',
                                  borderWidth: '2px',
                                },
                              },
                              '&.Mui-focused': {
                                backgroundColor: '#ffffff',
                                '& fieldset': {
                                  borderColor: '#1976d2',
                                  borderWidth: '2px',
                                },
                              },
                            },
                            '& .MuiInputLabel-root': {
                              fontWeight: 500,
                              color: '#666',
                              '&.Mui-focused': {
                                color: '#1976d2',
                                fontWeight: 600,
                              },
                            },
                            '& .MuiFormHelperText-root': {
                              marginLeft: 0,
                              fontSize: '0.75rem',
                          },
                        }}
                      />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Username"
                          name="userName"
                          value={form.userName}
                          onChange={handleChange}
                          fullWidth
                          size="medium"
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              backgroundColor: '#fafbfc',
                              height: '56px',
                              '&:hover': {
                                backgroundColor: '#f8f9fa',
                                '& fieldset': {
                                  borderColor: '#1976d2',
                                  borderWidth: '2px',
                                },
                              },
                              '&.Mui-focused': {
                                backgroundColor: '#ffffff',
                                '& fieldset': {
                                  borderColor: '#1976d2',
                                  borderWidth: '2px',
                                },
                              },
                            },
                            '& .MuiInputLabel-root': {
                              fontWeight: 500,
                              color: '#666',
                              '&.Mui-focused': {
                                color: '#1976d2',
                                fontWeight: 600,
                              },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email}
                          size="medium"
                          variant="outlined"
                          type="email"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              backgroundColor: '#fafbfc',
                              height: '56px',
                              '&:hover': {
                                backgroundColor: '#f8f9fa',
                                '& fieldset': {
                              borderColor: '#1976d2',
                                  borderWidth: '2px',
                                },
                              },
                              '&.Mui-focused': {
                                backgroundColor: '#ffffff',
                                '& fieldset': {
                                  borderColor: '#1976d2',
                                  borderWidth: '2px',
                                },
                              },
                            },
                            '& .MuiInputLabel-root': {
                              fontWeight: 500,
                              color: '#666',
                              '&.Mui-focused': {
                                color: '#1976d2',
                                fontWeight: 600,
                              },
                            },
                            '& .MuiFormHelperText-root': {
                              marginLeft: 0,
                              fontSize: '0.75rem',
                          },
                        }}
                      />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone}
                          size="medium"
                          variant="outlined"
                          type="tel"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              backgroundColor: '#fafbfc',
                              height: '56px',
                              '&:hover': {
                                backgroundColor: '#f8f9fa',
                                '& fieldset': {
                            borderColor: '#1976d2',
                                  borderWidth: '2px',
                                },
                              },
                              '&.Mui-focused': {
                                backgroundColor: '#ffffff',
                                '& fieldset': {
                                  borderColor: '#1976d2',
                                  borderWidth: '2px',
                                },
                              },
                            },
                            '& .MuiInputLabel-root': {
                              fontWeight: 500,
                              color: '#666',
                              '&.Mui-focused': {
                                color: '#1976d2',
                                fontWeight: 600,
                              },
                            },
                            '& .MuiFormHelperText-root': {
                              marginLeft: 0,
                              fontSize: '0.75rem',
                        },
                      }}
                    />
                      </Grid>
                    </Grid>
                  </Box>
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
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {renderField('Address', profile.address, 'address')}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    {renderField('City', profile.city, 'city')}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    {renderField('State', profile.state, 'state')}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    {renderField('Country', profile.country, 'country')}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    {renderField('Postal Code', profile.postalCode, 'postalCode')}
                    </Grid>
                  </Grid>
                ) : (
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 3,
                    width: '100%'
                  }}>
                    {/* Address Field - Full Width */}
                    <TextField
                      label="Address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.address}
                      helperText={errors.address}
                      size="medium"
                      variant="outlined"
                      multiline
                      rows={3}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#fafbfc',
                          '&:hover': {
                            backgroundColor: '#f8f9fa',
                            '& fieldset': {
                            borderColor: '#1976d2',
                              borderWidth: '2px',
                            },
                          },
                          '&.Mui-focused': {
                            backgroundColor: '#ffffff',
                            '& fieldset': {
                              borderColor: '#1976d2',
                              borderWidth: '2px',
                            },
                          },
                        },
                        '& .MuiInputLabel-root': {
                          fontWeight: 500,
                          color: '#666',
                          '&.Mui-focused': {
                            color: '#1976d2',
                            fontWeight: 600,
                          },
                        },
                        '& .MuiFormHelperText-root': {
                          marginLeft: 0,
                          fontSize: '0.75rem',
                        },
                      }}
                    />
                    
                    {/* City and State Row */}
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                      <TextField
                        label="City"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.city}
                        helperText={errors.city}
                          size="medium"
                          variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              backgroundColor: '#fafbfc',
                              height: '56px',
                              '&:hover': {
                                backgroundColor: '#f8f9fa',
                                '& fieldset': {
                              borderColor: '#1976d2',
                                  borderWidth: '2px',
                                },
                              },
                              '&.Mui-focused': {
                                backgroundColor: '#ffffff',
                                '& fieldset': {
                                  borderColor: '#1976d2',
                                  borderWidth: '2px',
                                },
                              },
                            },
                            '& .MuiInputLabel-root': {
                              fontWeight: 500,
                              color: '#666',
                              '&.Mui-focused': {
                                color: '#1976d2',
                                fontWeight: 600,
                              },
                            },
                            '& .MuiFormHelperText-root': {
                              marginLeft: 0,
                              fontSize: '0.75rem',
                          },
                        }}
                      />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <TextField
                        label="State"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.state}
                        helperText={errors.state}
                          size="medium"
                          variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              backgroundColor: '#fafbfc',
                              height: '56px',
                              '&:hover': {
                                backgroundColor: '#f8f9fa',
                                '& fieldset': {
                              borderColor: '#1976d2',
                                  borderWidth: '2px',
                                },
                              },
                              '&.Mui-focused': {
                                backgroundColor: '#ffffff',
                                '& fieldset': {
                                  borderColor: '#1976d2',
                                  borderWidth: '2px',
                                },
                              },
                            },
                            '& .MuiInputLabel-root': {
                              fontWeight: 500,
                              color: '#666',
                              '&.Mui-focused': {
                                color: '#1976d2',
                                fontWeight: 600,
                              },
                            },
                            '& .MuiFormHelperText-root': {
                              marginLeft: 0,
                              fontSize: '0.75rem',
                          },
                        }}
                      />
                      </Grid>
                    </Grid>
                    
                    {/* Country and Postal Code Row */}
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                      <TextField
                        label="Country"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.country}
                        helperText={errors.country}
                          size="medium"
                          variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              backgroundColor: '#fafbfc',
                              height: '56px',
                              '&:hover': {
                                backgroundColor: '#f8f9fa',
                                '& fieldset': {
                              borderColor: '#1976d2',
                                  borderWidth: '2px',
                                },
                              },
                              '&.Mui-focused': {
                                backgroundColor: '#ffffff',
                                '& fieldset': {
                                  borderColor: '#1976d2',
                                  borderWidth: '2px',
                                },
                              },
                            },
                            '& .MuiInputLabel-root': {
                              fontWeight: 500,
                              color: '#666',
                              '&.Mui-focused': {
                                color: '#1976d2',
                                fontWeight: 600,
                              },
                            },
                            '& .MuiFormHelperText-root': {
                              marginLeft: 0,
                              fontSize: '0.75rem',
                          },
                        }}
                      />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <TextField
                        label="Postal Code"
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.postalCode}
                        helperText={errors.postalCode}
                          size="medium"
                          variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              backgroundColor: '#fafbfc',
                              height: '56px',
                              '&:hover': {
                                backgroundColor: '#f8f9fa',
                                '& fieldset': {
                              borderColor: '#1976d2',
                                  borderWidth: '2px',
                                },
                              },
                              '&.Mui-focused': {
                                backgroundColor: '#ffffff',
                                '& fieldset': {
                                  borderColor: '#1976d2',
                                  borderWidth: '2px',
                                },
                              },
                            },
                            '& .MuiInputLabel-root': {
                              fontWeight: 500,
                              color: '#666',
                              '&.Mui-focused': {
                                color: '#1976d2',
                                fontWeight: 600,
                              },
                            },
                            '& .MuiFormHelperText-root': {
                              marginLeft: 0,
                              fontSize: '0.75rem',
                          },
                        }}
                      />
                      </Grid>
                    </Grid>
                    </Box>
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      {renderType('Type', profile.type)}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {renderStatus('Status', profile.status)}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {renderField('User ID', profile.id, 'id')}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {renderField('Created At', formatDate(profile.createdAt), 'createdAt')}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {renderField('Updated At', formatDate(profile.updatedAt), 'updatedAt')}
                    </Grid>
                    {profile.remarks && (
                      <Grid item xs={12}>
                        {renderField('Remarks', profile.remarks, 'remarks')}
                      </Grid>
                    )}
                  </Grid>
                  </Box>
              )}

              {/* Files Section */}
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Typography sx={{ 
                    fontWeight: 600, 
                    fontSize: '1.125rem', 
                    color: '#1976d2', 
                    letterSpacing: '-0.01em'
                  }}>
                    Files
                  </Typography>
                  {editMode && (
                    <Button
                      variant="outlined"
                      startIcon={<AddPhotoAlternateIcon />}
                      onClick={() => setFileDialogOpen(true)}
                      size="small"
                      sx={{
                        borderColor: '#1976d2',
                        color: '#1976d2',
                        '&:hover': {
                          borderColor: '#1565c0',
                          background: 'rgba(25, 118, 210, 0.04)',
                        }
                      }}
                    >
                      Add Files
                    </Button>
                  )}
                </Box>
                <Divider sx={{ mb: 2, opacity: 0.6 }} />
                
                {!editMode ? (
                  // View mode - display files
                  profile.files && profile.files.length > 0 ? (
                    <Grid container spacing={2}>
                      {profile.files.map((file, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Card sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                              transform: 'translateY(-2px)',
                              transition: 'all 0.3s ease-in-out'
                            }
                          }}>
                            <CardMedia
                              component="img"
                              height="140"
                              image={file}
                              alt={`File ${index + 1}`}
                              sx={{ objectFit: 'cover' }}
                            />
                            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                              <Typography variant="body2" sx={{ 
                                color: '#666', 
                                fontSize: '0.875rem',
                                textAlign: 'center'
                              }}>
                                File {index + 1}
                              </Typography>
                              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                                <IconButton 
                                  size="small" 
                                  onClick={() => window.open(file, '_blank')}
                                  sx={{ 
                                    color: '#1976d2',
                                    '&:hover': { background: 'rgba(25, 118, 210, 0.1)' }
                                  }}
                                >
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 4, color: '#666' }}>
                      <CloudUploadIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                      <Typography variant="body1">No files uploaded</Typography>
                    </Box>
                  )
                ) : (
                  // Edit mode - manage files
                  <Box>
                    {/* Existing Files */}
                    {files.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ mb: 2, color: '#666', fontWeight: 600 }}>
                          Existing Files
                        </Typography>
                        <Grid container spacing={2}>
                          {files.map((file, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                              <Card sx={{ 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column',
                                borderRadius: 2,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                position: 'relative'
                              }}>
                                <CardMedia
                                  component="img"
                                  height="140"
                                  image={file}
                                  alt={`File ${index + 1}`}
                                  sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                  <Typography variant="body2" sx={{ 
                                    color: '#666', 
                                    fontSize: '0.875rem',
                                    textAlign: 'center'
                                  }}>
                                    File {index + 1}
                                  </Typography>
                                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
                                    <IconButton 
                                      size="small" 
                                      onClick={() => window.open(file, '_blank')}
                                      sx={{ 
                                        color: '#1976d2',
                                        '&:hover': { background: 'rgba(25, 118, 210, 0.1)' }
                                      }}
                                    >
                                      <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton 
                                      size="small" 
                                      onClick={() => handleRemoveFile(index)}
                                      sx={{ 
                                        color: '#f44336',
                                        '&:hover': { background: 'rgba(244, 67, 54, 0.1)' }
                                      }}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                </Box>
              )}

                    {/* New Files */}
                    {newFiles.length > 0 && (
                      <Box>
                        <Typography variant="subtitle2" sx={{ mb: 2, color: '#666', fontWeight: 600 }}>
                          New Files to Upload
                        </Typography>
                        <Grid container spacing={2}>
                          {newFiles.map((file, index) => (
                            <Grid item xs={12} sm={6} md={4} key={`new-${index}`}>
                              <Card sx={{ 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column',
                                borderRadius: 2,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                border: '2px dashed #1976d2',
                                background: 'rgba(25, 118, 210, 0.02)'
                              }}>
                                <CardMedia
                                  component="img"
                                  height="140"
                                  image={URL.createObjectURL(file)}
                                  alt={`New File ${index + 1}`}
                                  sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                  <Typography variant="body2" sx={{ 
                                    color: '#1976d2', 
                                    fontSize: '0.875rem',
                                    textAlign: 'center',
                                    fontWeight: 600
                                  }}>
                                    {file.name}
                                  </Typography>
                                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                                    <IconButton 
                                      size="small" 
                                      onClick={() => handleRemoveNewFile(index)}
                                      sx={{ 
                                        color: '#f44336',
                                        '&:hover': { background: 'rgba(244, 67, 54, 0.1)' }
                                      }}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}

                    {/* Empty state */}
                    {files.length === 0 && newFiles.length === 0 && (
                      <Box sx={{ textAlign: 'center', py: 4, color: '#666' }}>
                        <CloudUploadIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                        <Typography variant="body1">No files uploaded</Typography>
                        <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                          Click "Add Files" to upload new files
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>

              {/* Action Buttons */}
              {editMode && (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  gap: 3,
                  pt: 3,
                  borderTop: '2px solid #f0f0f0',
                  background: '#fafbfc',
                  mx: -5,
                  px: 5,
                  py: 3,
                  borderRadius: '0 0 8px 8px'
                }}>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={loading}
                    sx={{ 
                      fontWeight: 600, 
                      borderRadius: 2, 
                      px: 4, 
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      borderColor: '#d0d7de',
                      color: '#656d76',
                      minWidth: 120,
                      '&:hover': {
                        borderColor: '#656d76',
                        backgroundColor: '#f6f8fa',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      },
                      '&:disabled': {
                        borderColor: '#d0d7de',
                        color: '#8c959f',
                      },
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SaveIcon />} 
                    sx={{ 
                      fontWeight: 600, 
                      borderRadius: 2, 
                      px: 4, 
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                      minWidth: 140,
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                      },
                      '&:disabled': {
                        background: '#e0e0e0',
                        color: '#9e9e9e',
                        boxShadow: 'none',
                        transform: 'none',
                      },
                      transition: 'all 0.2s ease-in-out'
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

      {/* File Upload Dialog */}
      <Dialog open={fileDialogOpen} onClose={() => setFileDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Files</DialogTitle>
        <DialogContent>
          <Box
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            sx={{
              border: dragActive ? '2px dashed #1976d2' : '2px dashed #ccc',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              background: dragActive ? 'rgba(25, 118, 210, 0.02)' : '#fafafa',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                borderColor: '#1976d2',
                background: 'rgba(25, 118, 210, 0.02)'
              }
            }}
            onClick={() => document.getElementById('file-input').click()}
          >
            <CloudUploadIcon sx={{ fontSize: 48, color: '#1976d2', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, color: '#1976d2' }}>
              Drop files here or click to browse
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Support for JPG, PNG, PDF files
            </Typography>
            <input
              id="file-input"
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFileDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile; 