import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { fetchVendorOrders, clearError } from '../reducers/VendorOrdersReducer';

const statusOptions = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, totalOrders, currentPage, totalPages } = useSelector((state) => state.vendorOrdersReducer);
  
  // Debug logging
  console.log('Orders component state:', { orders, loading, error, totalOrders, currentPage, totalPages });
  
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Fetch orders on component mount and when filters change
  useEffect(() => {
    const params = {
      page: page + 1, // API uses 1-based pagination
      limit: rowsPerPage,
    };

    // Add filters if they're not default values
    if (search) params.search = search;
    if (status !== 'All') params.status = status;
    if (dateFrom) params.dateFrom = dateFrom;
    if (dateTo) params.dateTo = dateTo;

    dispatch(fetchVendorOrders(params));
  }, [dispatch, page, rowsPerPage, search, status, dateFrom, dateTo]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Handle page change
  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setStatus('All');
    setDateFrom('');
    setDateTo('');
    setSearch('');
    setPage(0);
  };

  return (
    <Box sx={{ background: '#f7f8fa', minHeight: '100vh', width: '100%', p: { xs: 1, sm: 3 } }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Orders</Typography>
      
      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => dispatch(clearError())}>
          {error}
        </Alert>
      )}
      
      {/* Clean Filters and Search */}
      <Paper sx={{ 
        p: 3, 
        mb: 3, 
        borderRadius: 3, 
        boxShadow: 1, 
        border: '1px solid #e0e0e0'
      }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
          Filter Orders
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr auto' }, 
          gap: 2, 
          alignItems: 'end' 
        }}>
          {/* Search Field */}
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search orders, customers, or products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#666' }} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 200 }}
          />
          
          {/* Status Filter */}
          <FormControl size="small">
            <InputLabel>Status</InputLabel>
            <Select 
              value={status} 
              label="Status" 
              onChange={e => setStatus(e.target.value)}
            >
              {statusOptions.map(opt => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* Date From */}
          <TextField
            size="small"
            type="date"
            label="From Date"
            InputLabelProps={{ shrink: true }}
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
          />
          
          {/* Date To */}
          <TextField
            size="small"
            type="date"
            label="To Date"
            InputLabelProps={{ shrink: true }}
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
          />
          
          {/* Reset Button */}
          <Button 
            variant="outlined" 
            startIcon={<FilterAltIcon />} 
            onClick={handleResetFilters}
            sx={{ 
              fontWeight: 600, 
              borderRadius: 2,
              minWidth: 120,
            }}
          >
            Reset
          </Button>
        </Box>
        
        {/* Active Filters Display */}
        {(search || status !== 'All' || dateFrom || dateTo) && (
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="body2" sx={{ color: '#666', mr: 1 }}>
              Active filters:
            </Typography>
            {search && (
              <Box sx={{
                background: '#f5f5f5',
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                fontSize: 12,
                border: '1px solid #e0e0e0',
                color: '#333',
              }}>
                Search: "{search}"
              </Box>
            )}
            {status !== 'All' && (
              <Box sx={{
                background: '#f5f5f5',
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                fontSize: 12,
                border: '1px solid #e0e0e0',
                color: '#333',
              }}>
                Status: {status}
              </Box>
            )}
            {dateFrom && (
              <Box sx={{
                background: '#f5f5f5',
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                fontSize: 12,
                border: '1px solid #e0e0e0',
                color: '#333',
              }}>
                From: {new Date(dateFrom).toLocaleDateString()}
              </Box>
            )}
            {dateTo && (
              <Box sx={{
                background: '#f5f5f5',
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                fontSize: 12,
                border: '1px solid #e0e0e0',
                color: '#333',
              }}>
                To: {new Date(dateTo).toLocaleDateString()}
              </Box>
            )}
          </Box>
        )}
      </Paper>
      {/* Enhanced Orders Table */}
      <Paper sx={{ borderRadius: 3, boxShadow: 2, overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 540 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ 
                background: '#f8f9fa',
                '& th': {
                  color: '#333',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  borderBottom: '2px solid #e0e0e0',
                }
              }}>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount (₹)</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6, color: 'grey.500' }}>
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order, index) => (
                  <TableRow 
                    key={order.id} 
                    hover 
                    sx={{ 
                      transition: 'background 0.2s ease',
                      background: index % 2 === 0 ? '#fafbfc' : '#ffffff',
                      '&:hover': { 
                        background: '#f5f5f5',
                      },
                      '& td': {
                        borderBottom: '1px solid #e0e0e0',
                        py: 2,
                      }
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600, color: '#333' }}>#{order.id}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: '#333' }}>
                          {order.customerInfo?.name || 'N/A'}
                        </Typography>
                        <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>
                          {order.customerInfo?.email || ''}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography sx={{ fontWeight: 500, color: '#333' }}>
                          {order.productInfo?.name || 'N/A'}
                        </Typography>
                        <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>
                          Qty: {order.productInfo?.quantity || 1}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography sx={{ fontWeight: 500, color: '#333' }}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>
                          {new Date(order.createdAt).toLocaleTimeString()}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        px: 2,
                        py: 0.75,
                        borderRadius: 2,
                        fontWeight: 600,
                        color: '#fff',
                        background: order.status === 'delivered' 
                          ? '#4caf50' 
                          : order.status === 'pending' 
                          ? '#ff9800' 
                          : order.status === 'shipped' 
                          ? '#2196f3' 
                          : '#f44336',
                        fontSize: 12,
                        minWidth: 100,
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}>
                        {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'N/A'}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: '#333', fontSize: '1.1rem' }}>
                          ₹{order.totalCost || order.productInfo?.total || '0.00'}
                        </Typography>
                        <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>
                          GST: ₹{order.gstAmount || order.productInfo?.gst || '0.00'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button 
                        variant="outlined" 
                        size="small" 
                        sx={{ 
                          borderRadius: 2, 
                          fontWeight: 600,
                        }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalOrders}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[10, 20, 50]}
          sx={{ 
            px: 3, 
            py: 2, 
            borderTop: '1px solid #e0e0e0',
            background: '#fafbfc',
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              color: '#666',
              fontWeight: 500,
            },
            '& .MuiTablePagination-select': {
              borderRadius: 2,
              border: '1px solid #e0e0e0',
            },
            '& .MuiTablePagination-actions button': {
              borderRadius: 2,
              border: '1px solid #e0e0e0',
              '&:hover': {
                background: '#f5f5f5',
              },
              '&.Mui-disabled': {
                color: '#ccc',
                borderColor: '#f0f0f0',
              },
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default Orders; 