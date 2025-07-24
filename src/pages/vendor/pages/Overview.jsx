import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Avatar, 
  useTheme,
  Chip,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  ShoppingBagOutlined, 
  PeopleOutline, 
  ArrowUpward, 
  AddShoppingCart, 
  LocalShippingOutlined,
  TrendingUp,
  Inventory2Outlined
} from '@mui/icons-material';
import { getAllOrders } from '../../../utils/Service';
import { getVendorIdFromToken } from '../../../utils/jwtUtils';

const salesData = {
  amount: '₹9,328.55',
  orders: 731,
  increase: '+15.6%',
  increaseText: '+1.4k this week',
};

const visitorsData = {
  count: '12,302',
  avgTime: 'Avg. time: 4:30m',
  increase: '+12.7%',
  increaseText: '+1.2k this week',
};

const transactions = [
  { name: 'Liam Johnson', type: 'Delivered', date: '22 Jun 2024', qty: 1, amount: '₹120.50' },
  { name: 'Olivia Smith', type: 'Processing', date: '22 Jun 2024', qty: 2, amount: '₹75.00' },
  { name: 'Noah Williams', type: 'Shipped', date: '21 Jun 2024', qty: 1, amount: '₹350.00' },
  { name: 'Emma Brown', type: 'Delivered', date: '20 Jun 2024', qty: 3, amount: '₹45.00' },
  { name: 'James Jones', type: 'Cancelled', date: '20 Jun 2024', qty: 1, amount: '₹210.20' },
  { name: 'Sophia Lee', type: 'Delivered', date: '19 Jun 2024', qty: 2, amount: '₹180.00' },
  { name: 'William Kim', type: 'Processing', date: '19 Jun 2024', qty: 1, amount: '₹99.99' },
  { name: 'Mia Chen', type: 'Shipped', date: '18 Jun 2024', qty: 4, amount: '₹400.00' },
  { name: 'Benjamin Clark', type: 'Delivered', date: '18 Jun 2024', qty: 2, amount: '₹220.00' },
  { name: 'Ava Patel', type: 'Cancelled', date: '17 Jun 2024', qty: 1, amount: '₹60.00' },
];

// Calculate totals from real orders data (will be updated with API data)
const totalSales = transactions.reduce((sum, t) => sum + Number(t.amount.replace(/[^\d.]/g, '')), 0);
const totalProducts = transactions.reduce((sum, t) => sum + t.qty, 0);

const StatCard = ({ title, value, subtitle, icon, increase, increaseText, dark }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{
      minWidth: '250px',
      borderRadius: 3,
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      backgroundColor: dark ? '#2c3e50' : '#ffffff',
      color: dark ? 'white' : '#333',
      height: '100%',
      transition: 'all 0.3s ease-in-out',
      border: '1px solid #e0e0e0',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        borderColor: dark ? '#34495e' : '#2c3e50',
        '&::before': {
          transform: 'scaleX(1)',
        }
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: dark ? '#3498db' : '#2c3e50',
        transform: 'scaleX(0)',
        transition: 'transform 0.3s ease',
      }
    }}>
      <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ 
              fontWeight: 600, 
              fontSize: '0.875rem',
              color: dark ? 'rgba(255,255,255,0.9)' : '#666',
              mb: 0.5,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {title}
            </Typography>
            <Typography variant="caption" sx={{ 
              color: dark ? 'rgba(255,255,255,0.7)' : '#999', 
              fontSize: '0.75rem',
              fontWeight: 500
            }}>
              {subtitle}
            </Typography>
          </Box>
          <Avatar sx={{ 
            bgcolor: dark ? 'rgba(255,255,255,0.15)' : '#f8f9fa', 
            color: dark ? 'white' : '#2c3e50', 
            borderRadius: 2, 
            width: 48, 
            height: 48,
            transition: 'all 0.3s ease',
            '& .MuiSvgIcon-root': {
              fontSize: '1.4rem'
            }
          }}>
            {icon}
          </Avatar>
        </Box>
        <Typography variant="h4" sx={{ 
          mb: 1, 
          fontWeight: 700,
          fontSize: '2rem',
          color: dark ? 'white' : '#333',
          letterSpacing: '-0.02em'
        }}>
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <TrendingUp sx={{ 
            fontSize: '0.875rem', 
            color: dark ? 'rgba(255,255,255,0.7)' : '#27ae60' 
          }} />
          <Typography variant="body2" sx={{ 
            color: dark ? 'rgba(255,255,255,0.7)' : '#666',
            fontSize: '0.75rem',
            fontWeight: 500
          }}>
            {increaseText}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const Overview = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const vendorId = getVendorIdFromToken();
        
        if (!vendorId) {
          throw new Error('Vendor ID not found. Please login again.');
        }

        const response = await getAllOrders({ 
          vendorId: vendorId,
          page: 1,
          limit: 10 
        });

        if (response.data.success) {
          setOrders(response.data.data || []);
        } else {
          throw new Error('Failed to fetch orders');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Calculate totals from real orders data
  const totalSales = orders.reduce((sum, order) => sum + (order.totalCost || 0), 0);
  const totalProducts = orders.reduce((sum, order) => sum + (order.productInfo?.quantity || 1), 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const shippedOrders = orders.filter(order => order.status === 'shipped').length;

  return (
    <Box sx={{ 
      background: '#f8f9fa', 
      minHeight: '100vh', 
      width: '100%', 
      p: { xs: 1, sm: 2, md: 3 }
    }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 700, 
          fontSize: { xs: '1.75rem', sm: '2.125rem' }, 
          color: '#2c3e50',
          letterSpacing: '-0.02em',
          mb: 1
        }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" sx={{ 
          color: '#666', 
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.6
        }}>
          Monitor your business performance and recent activities
        </Typography>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={2} sx={{ mb: 4, width: '100%', m: 0, p: 0 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Sales"
            value={`₹${totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subtitle={`${orders.length} Orders`}
            icon={<Inventory2Outlined />}
            increaseText="Last 10 orders"
            dark
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value={totalProducts}
            subtitle="Products Sold"
            icon={<ShoppingBagOutlined />}
            increaseText="Last 10 orders"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Orders"
            value={pendingOrders}
            subtitle="Awaiting processing"
            icon={<AddShoppingCart />}
            increaseText="From last 10 orders"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Shipped Orders"
            value={shippedOrders}
            subtitle="In transit"
            icon={<LocalShippingOutlined />}
            increaseText="From last 10 orders"
          />
        </Grid>
      </Grid>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Transaction Table */}
      <Paper sx={{
        width: '100%',
        borderRadius: 3,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        overflow: 'hidden',
        mb: 4,
        mt: 3,
        border: '1px solid #e0e0e0'
      }}>
        <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0', background: '#f8f9fa' }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600,
            fontSize: '1.125rem',
            color: '#2c3e50',
            letterSpacing: '-0.01em'
          }}>
            Recent Orders ({orders.length})
          </Typography>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="orders table">
            <TableHead>
              <TableRow sx={{ background: '#f8f9fa' }}>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.875rem' }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.875rem' }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.875rem' }}>Product</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.875rem' }}>Quantity</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.875rem' }}>Amount</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '0.875rem' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'grey.500' }}>
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order, index) => (
                  <TableRow 
                    key={order.id}
                    sx={{ 
                      '&:nth-of-type(odd)': { background: '#fafbfc' },
                      '&:hover': { background: '#f5f5f5' },
                      transition: 'background 0.2s ease'
                    }}
                  >
                    <TableCell sx={{ color: '#666', fontWeight: 500 }}>#{order.id}</TableCell>
                    <TableCell sx={{ color: '#333', fontWeight: 600 }}>{order.customerInfo?.name || 'N/A'}</TableCell>
                    <TableCell sx={{ color: '#333', fontWeight: 600 }}>{order.productInfo?.name || 'N/A'}</TableCell>
                    <TableCell align="right" sx={{ color: '#666', fontWeight: 500 }}>{order.productInfo?.quantity || 1}</TableCell>
                    <TableCell align="right" sx={{ color: '#333', fontWeight: 600 }}>₹{order.totalCost || order.productInfo?.total || '0.00'}</TableCell>
                    <TableCell align="right">
                      <Chip
                        label={order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'N/A'}
                        size="small"
                        sx={{
                          backgroundColor: getTypeColor(order.status),
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          borderRadius: 2,
                          '& .MuiChip-label': {
                            px: 1.5
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

// Helper function to get color based on order status
function getTypeColor(status) {
  const colors = {
    delivered: '#4caf50',
    pending: '#ff9800',
    shipped: '#2196f3',
    cancelled: '#f44336',
    processing: '#ff9800',
    Delivered: '#4caf50',
    Processing: '#ff9800',
    Shipped: '#2196f3',
    Cancelled: '#f44336',
    Default: '#9e9e9e'
  };
  return colors[status] || colors.Default;
}

export default Overview;