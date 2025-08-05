import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  Alert,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById, clearError, clearCurrentOrder, updateVendorOrderStatus } from '../reducers/VendorOrdersReducer';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux state
  const { currentOrder, loading, error, success, message } = useSelector((state) => state.vendorOrdersReducer);

  // Local state for status update
  const [statusUpdateOpen, setStatusUpdateOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [localOrderStatus, setLocalOrderStatus] = useState('');

  // Set local status when currentOrder changes
  useEffect(() => {
    if (currentOrder?.status) {
      setLocalOrderStatus(currentOrder.status);
    }
  }, [currentOrder]);

  // Fetch order data on component mount
  useEffect(() => {
    if (id) {
      console.log('Fetching order with ID:', id);
      dispatch(fetchOrderById(id));
    }

    // Cleanup function to clear current order when component unmounts
    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [dispatch, id]);

  // Handle success and error messages
  useEffect(() => {
    if (success && message) {
      // Show success message
      setStatusUpdateOpen(false);
      
      // Update local status immediately
      if (newStatus) {
        setLocalOrderStatus(newStatus);
        console.log('Local status updated to:', newStatus);
      }
      
      setNewStatus('');
      setUpdatingStatus(false);
      
      // If we have a new status and current order, update it immediately
      if (newStatus && currentOrder) {
        console.log('Updating current order status to:', newStatus);
        // The Redux state should already be updated, but we can force a re-render if needed
      }
    } else if (error) {
      // Error will be handled by the alert component
      setUpdatingStatus(false);
      dispatch(clearError());
    }
  }, [success, error, message, dispatch, newStatus, currentOrder]);

  // Handle status update
  const handleStatusUpdate = async () => {
    if (!newStatus || !currentOrder) return;
    
    console.log('Updating order status:', { id: currentOrder.id, status: newStatus });
    setUpdatingStatus(true);
    dispatch(updateVendorOrderStatus({ 
      id: currentOrder.id, 
      status: newStatus 
    }));
  };

  // Loading state
  if (loading && !currentOrder) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ background: '#f7f8fa', minHeight: '100vh', p: { xs: 1, sm: 3 }, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button 
            startIcon={<ArrowBackIosNewIcon />} 
            sx={{ color: '#222', fontWeight: 600, textTransform: 'uppercase', fontSize: 13, pl: 0 }}
            onClick={() => navigate('/vendor/orders')}
          >
            Back to Orders
          </Button>
        </Box>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  // No order found
  if (!currentOrder) {
    return (
      <Box sx={{ background: '#f7f8fa', minHeight: '100vh', p: { xs: 1, sm: 3 }, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button 
            startIcon={<ArrowBackIosNewIcon />} 
            sx={{ color: '#222', fontWeight: 600, textTransform: 'uppercase', fontSize: 13, pl: 0 }}
            onClick={() => navigate('/vendor/orders')}
          >
            Back to Orders
          </Button>
        </Box>
        <Alert severity="warning" sx={{ mt: 2 }}>
          Order not found
        </Alert>
      </Box>
    );
  }

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

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return '#4caf50';
      case 'shipped':
        return '#2196f3';
      case 'pending':
        return '#ff9800';
      case 'rejected':
        return '#f44336';
      case 'cancelled':
        return '#f44336';
      default:
        return '#757575';
    }
  };

  return (
    <Box sx={{ background: '#f7f8fa', minHeight: '100vh', p: { xs: 1, sm: 3 }, width: '100%' }}>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => dispatch(clearError())}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={!!success && !!message} autoHideDuration={3000} onClose={() => dispatch(clearError())}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button 
          startIcon={<ArrowBackIosNewIcon />} 
          sx={{ color: '#222', fontWeight: 600, textTransform: 'uppercase', fontSize: 13, pl: 0 }}
          onClick={() => navigate('/vendor/orders')}
        >
          Back to Orders
        </Button>
      </Box>

      {/* Order Details */}
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4, md: 6 }, borderRadius: 3, boxShadow: 2, background: '#fff' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#222', mb: 1 }}>
              Order Details
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Order ID: #{currentOrder.id || 'N/A'}
            </Typography>
            {currentOrder.customerOrderId && (
              <Typography variant="body2" sx={{ color: '#666' }}>
                Customer Order ID: #{currentOrder.customerOrderId}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={localOrderStatus?.charAt(0).toUpperCase() + localOrderStatus?.slice(1) || 'N/A'}
              sx={{
                background: getStatusColor(localOrderStatus),
                color: 'white',
                fontWeight: 600,
                fontSize: '0.875rem',
                px: 2,
                py: 1,
              }}
            />
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              size="small"
              onClick={() => setStatusUpdateOpen(true)}
              sx={{
                borderColor: '#2c3e50',
                color: '#2c3e50',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#34495e',
                  background: 'rgba(44, 62, 80, 0.04)',
                }
              }}
            >
              Update Status
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Order Information */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', background: '#fafbfc', border: '1px solid #e0e0e0' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#2c3e50' }}>
                  Order Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                      Order Date
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {formatDate(currentOrder.createdAt)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                      Order Status
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {localOrderStatus?.charAt(0).toUpperCase() + localOrderStatus?.slice(1) || 'N/A'}
                    </Typography>
                  </Box>
                  {currentOrder.updatedAt && (
                    <Box>
                      <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                        Last Updated
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {formatDate(currentOrder.updatedAt)}
                      </Typography>
                    </Box>
                  )}
    
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Customer Information */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', background: '#fafbfc', border: '1px solid #e0e0e0' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#2c3e50' }}>
                  Customer Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                      Customer Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {currentOrder.customerInfo?.name || 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {currentOrder.customerInfo?.email || 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                      Phone
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {currentOrder.customerInfo?.phone || 'N/A'}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Product Information */}
          <Grid item xs={12}>
            <Card sx={{ background: '#fafbfc', border: '1px solid #e0e0e0' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#2c3e50' }}>
                  Product Information
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ background: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Product ID</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Quantity</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Subtotal</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>GST</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {currentOrder.productInfo?.name || 'N/A'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            #{currentOrder.productInfo?.productId || 'N/A'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            ₹{currentOrder.productInfo?.price || '0.00'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {currentOrder.productInfo?.quantity || '1'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            ₹{currentOrder.productInfo?.subTotal || currentOrder.subTotal || '0.00'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            ₹{currentOrder.productInfo?.gst || currentOrder.gstAmount || '0.00'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            ₹{currentOrder.productInfo?.total || currentOrder.totalCost || '0.00'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Billing Address */}
          {currentOrder.customerInfo?.billingAddress && (
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', background: '#fafbfc', border: '1px solid #e0e0e0' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#2c3e50' }}>
                    Billing Address
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {currentOrder.customerInfo.billingAddress.name || 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {currentOrder.customerInfo.billingAddress.address || 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {currentOrder.customerInfo.billingAddress.city}, {currentOrder.customerInfo.billingAddress.state}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Postal Code: {currentOrder.customerInfo.billingAddress.postalCode}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {currentOrder.customerInfo.billingAddress.country}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Phone: {currentOrder.customerInfo.billingAddress.phone || 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Email: {currentOrder.customerInfo.billingAddress.email || 'N/A'}
                    </Typography>
                    {currentOrder.customerInfo.billingAddress.type && (
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        Type: {currentOrder.customerInfo.billingAddress.type}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Shipping Address */}
          {currentOrder.customerInfo?.shippingAddress && (
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', background: '#fafbfc', border: '1px solid #e0e0e0' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#2c3e50' }}>
                    Shipping Address
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {currentOrder.customerInfo.shippingAddress.Customer?.name || currentOrder.customerInfo.name || 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {currentOrder.customerInfo.shippingAddress.address || 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {currentOrder.customerInfo.shippingAddress.city}, {currentOrder.customerInfo.shippingAddress.state}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Postal Code: {currentOrder.customerInfo.shippingAddress.postalCode}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {currentOrder.customerInfo.shippingAddress.country}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Phone: {currentOrder.customerInfo.phone || 'N/A'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Payment Information */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', background: '#fafbfc', border: '1px solid #e0e0e0' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#2c3e50' }}>
                  Payment Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Subtotal
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      ₹{currentOrder.subTotal || currentOrder.productInfo?.subTotal || '0.00'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      GST
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      ₹{currentOrder.gstAmount || currentOrder.productInfo?.gst || '0.00'}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                      Total
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                      ₹{currentOrder.totalCost || currentOrder.productInfo?.total || '0.00'}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Additional Information */}
        {currentOrder.remarks && (
          <Box sx={{ mt: 4 }}>
            <Card sx={{ background: '#fafbfc', border: '1px solid #e0e0e0' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2c3e50' }}>
                  Additional Information
                </Typography>
                <Typography variant="body1" sx={{ color: '#666' }}>
                  {currentOrder.remarks}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}
      </Paper>

      {/* Status Update Dialog */}
      <Dialog open={statusUpdateOpen} onClose={() => setStatusUpdateOpen(false)}>
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="status-update-label">New Status</InputLabel>
            <Select
              labelId="status-update-label"
              value={newStatus}
              label="New Status"
              onChange={(e) => setNewStatus(e.target.value)}
              fullWidth
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusUpdateOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleStatusUpdate} color="primary" variant="contained" disabled={updatingStatus}>
            {updatingStatus ? 'Updating...' : 'Update Status'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderDetail; 