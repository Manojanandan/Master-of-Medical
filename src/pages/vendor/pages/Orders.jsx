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
      
      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 3, boxShadow: 2, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search by order, customer, or product"
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 220, flex: 1 }}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Status</InputLabel>
          <Select value={status} label="Status" onChange={e => setStatus(e.target.value)}>
            {statusOptions.map(opt => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          size="small"
          type="date"
          label="From"
          InputLabelProps={{ shrink: true }}
          value={dateFrom}
          onChange={e => setDateFrom(e.target.value)}
          sx={{ minWidth: 120 }}
        />
        <TextField
          size="small"
          type="date"
          label="To"
          InputLabelProps={{ shrink: true }}
          value={dateTo}
          onChange={e => setDateTo(e.target.value)}
          sx={{ minWidth: 120 }}
        />
        <Button 
          variant="outlined" 
          color="primary" 
          startIcon={<FilterAltIcon />} 
          sx={{ fontWeight: 600, borderRadius: 2 }} 
          onClick={handleResetFilters}
        >
          Reset
        </Button>
      </Paper>
      {/* Orders Table */}
      <Paper sx={{ borderRadius: 3, boxShadow: 2 }}>
        <TableContainer sx={{ maxHeight: 540 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ background: '#f7f8fa' }}>
                <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Amount (₹)</TableCell>
                <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Action</TableCell>
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
                orders.map(order => (
                  <TableRow key={order.id} hover sx={{ transition: 'background 0.2s', '&:hover': { background: '#f1f2f7' } }}>
                    <TableCell sx={{ fontWeight: 600 }}>{order.id}</TableCell>
                    <TableCell>{order.customer?.name || order.customerName || 'N/A'}</TableCell>
                    <TableCell>{order.product?.name || order.productName || 'N/A'}</TableCell>
                    <TableCell>{new Date(order.createdAt || order.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Box sx={{
                        display: 'inline-block',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        color: '#fff',
                        background: order.status === 'Delivered' ? '#13bfa6' : order.status === 'Pending' ? '#f1ac1b' : order.status === 'Shipped' ? '#1976d2' : '#e53935',
                        fontSize: 14,
                        minWidth: 90,
                        textAlign: 'center',
                      }}>{order.status}</Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>₹{order.totalAmount || order.amount || '0.00'}</TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" size="small" sx={{ borderRadius: 2, fontWeight: 600 }}>View</Button>
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
          sx={{ px: 2, py: 1, borderTop: '1px solid #eee' }}
        />
      </Paper>
    </Box>
  );
};

export default Orders; 