import React from 'react';
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
  Divider
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

// Calculate total sales and total products
const totalSales = transactions.reduce((sum, t) => sum + Number(t.amount.replace(/[^\d.]/g, '')), 0);
const totalProducts = transactions.reduce((sum, t) => sum + t.qty, 0);

const StatCard = ({ title, value, subtitle, icon, increase, increaseText, dark }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{
      minWidth: '250px',
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      backgroundColor: dark ? '#1976d2' : '#ffffff',
      color: dark ? 'white' : '#1a1a1a',
      height: '100%',
      transition: 'all 0.2s ease-in-out',
      border: '1px solid #e0e0e0',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        borderColor: dark ? '#1565c0' : '#1976d2'
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ 
              fontWeight: 600, 
              fontSize: '0.875rem',
              color: dark ? 'rgba(255,255,255,0.9)' : '#666',
              mb: 0.5
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
            bgcolor: dark ? 'rgba(255,255,255,0.15)' : '#f5f5f5', 
            color: dark ? 'white' : '#1976d2', 
            borderRadius: 1.5, 
            width: 40, 
            height: 40,
            '& .MuiSvgIcon-root': {
              fontSize: '1.2rem'
            }
          }}>
            {icon}
          </Avatar>
        </Box>
        <Typography variant="h4" sx={{ 
          mb: 1, 
          fontWeight: 700,
          fontSize: '1.75rem',
          color: dark ? 'white' : '#1a1a1a',
          letterSpacing: '-0.02em'
        }}>
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <TrendingUp sx={{ 
            fontSize: '0.875rem', 
            color: dark ? 'rgba(255,255,255,0.7)' : '#4caf50' 
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
  return (
    <Box sx={{ 
      background: '#fafafa', 
      minHeight: '100vh', 
      width: '100%', 
      p: { xs: 2, sm: 4, md: 6 }
    }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 600, 
          fontSize: { xs: '1.75rem', sm: '2rem' }, 
          color: '#1a1a1a',
          letterSpacing: '-0.02em',
          mb: 1
        }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" sx={{ 
          color: '#666', 
          fontSize: '0.875rem',
          fontWeight: 400
        }}>
          Monitor your business performance and recent activities
        </Typography>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={2} sx={{ mb: 4, width: '100%', m: 0 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Sales"
            value={`₹${totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subtitle={`${salesData.orders} Orders`}
            icon={<Inventory2Outlined />}

            increaseText={salesData.increaseText}
            dark
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value={totalProducts}
            subtitle="Products Sold"
            icon={<ShoppingBagOutlined />}
            increaseText={visitorsData.increaseText}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="New Orders"
            value="+1,235"
            subtitle="23% from last week"
            icon={<AddShoppingCart />}
            increaseText="+320 this week"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Shipments"
            value="42"
            subtitle="5 shipped today"
            icon={<LocalShippingOutlined />}
            increaseText="+2 this week"
          />
        </Grid>
      </Grid>

      {/* Transaction Table */}
      <Paper sx={{
        width: '100%',
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        overflow: 'hidden',
        mb: 4,
        mt: 3
      }}>
        <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600,
            fontSize: '1.125rem',
            color: '#1a1a1a',
            letterSpacing: '-0.01em'
          }}>
            Recent Orders
          </Typography>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="transaction table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 900 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Product Name</TableCell>
                <TableCell align="right" sx={{ fontWeight: 900 }}>Quantity</TableCell>
                <TableCell align="right" sx={{ fontWeight: 900 }}>Amount</TableCell>
                <TableCell align="right" sx={{ fontWeight: 900 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">
                    <Chip
                      label={row.type}
                      size="small"
                      sx={{
                        backgroundColor: getTypeColor(row.type),
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        borderRadius: 1,
                        '& .MuiChip-label': {
                          px: 1.5
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

// Helper function to get color based on transaction type
function getTypeColor(type) {
  const colors = {
    Delivered: '#4caf50',
    Processing: '#ff9800',
    Shipped: '#2196f3',
    Cancelled: '#f44336',
    Shopping: '#4caf50',
    Food: '#ff9800',
    Sport: '#2196f3',
    Default: '#9e9e9e'
  };
  return colors[type] || colors.Default;
}

export default Overview;