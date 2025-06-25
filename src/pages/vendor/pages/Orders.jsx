import React, { useState } from 'react';
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

// Mock order data
const mockOrders = Array.from({ length: 37 }, (_, i) => ({
  id: 1000 + i,
  customer: `Customer ${i + 1}`,
  product: `Product ${((i % 5) + 1)}`,
  date: `2024-07-${(i % 28) + 1}`,
  status: ['Pending', 'Shipped', 'Delivered', 'Cancelled'][i % 4],
  amount: (Math.random() * 1000 + 100).toFixed(2),
}));

const statusOptions = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];

const Orders = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Filtered data
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.product.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toString().includes(search);
    const matchesStatus = status === 'All' || order.status === status;
    const matchesDate = (!dateFrom || order.date >= dateFrom) && (!dateTo || order.date <= dateTo);
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination
  const paginatedOrders = filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ background: '#f7f8fa', minHeight: '100vh', width: '100%', p: { xs: 1, sm: 3 } }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Orders</Typography>
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
        <Button variant="outlined" color="primary" startIcon={<FilterAltIcon />} sx={{ fontWeight: 600, borderRadius: 2 }} onClick={() => { setStatus('All'); setDateFrom(''); setDateTo(''); setSearch(''); }}>Reset</Button>
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
              {paginatedOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6, color: 'grey.500' }}>
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedOrders.map(order => (
                  <TableRow key={order.id} hover sx={{ transition: 'background 0.2s', '&:hover': { background: '#f1f2f7' } }}>
                    <TableCell sx={{ fontWeight: 600 }}>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.date}</TableCell>
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
                    <TableCell sx={{ fontWeight: 600 }}>{order.amount}</TableCell>
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
          count={filteredOrders.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={e => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[10, 20, 50]}
          sx={{ px: 2, py: 1, borderTop: '1px solid #eee' }}
        />
      </Paper>
    </Box>
  );
};

export default Orders; 