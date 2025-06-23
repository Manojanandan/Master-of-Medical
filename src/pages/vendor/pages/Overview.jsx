import React from 'react';
import { Box, Card, CardContent, Grid, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, useTheme } from '@mui/material';
import { ShoppingBagOutlined, PeopleOutline, ArrowUpward, AddShoppingCart, LocalShippingOutlined } from '@mui/icons-material';

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
];

const StatCard = ({ title, value, subtitle, icon, increase, increaseText, dark }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{
      minWidth: '250px',
      borderRadius: '16px',
      boxShadow: '0 8px 32px 0 rgba(0,0,0,0.05)',
      backgroundColor: dark ? theme.palette.primary.dark : 'background.paper',
      color: dark ? 'white' : 'text.primary',
      height: '100%',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 40px 0 rgba(0,0,0,0.1)'
      }
    }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: { xs: '0.875rem', sm: '1rem' } }}>{title}</Typography>
            <Typography variant="caption" sx={{ color: dark ? 'grey.400' : 'text.secondary', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{subtitle}</Typography>
          </Box>
          <Avatar sx={{ 
            bgcolor: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)', 
            color: dark ? 'white' : theme.palette.primary.main, 
            borderRadius: '12px', 
            width: { xs: 40, sm: 48 }, 
            height: { xs: 40, sm: 48 } 
          }}>
            {icon}
          </Avatar>
        </Box>
        <Typography variant="h5" sx={{ 
          my: 2, 
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } 
        }}>
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ 
            ml: 1, 
            color: dark ? 'grey.400' : 'text.secondary',
            fontSize: { xs: '0.75rem', sm: '0.875rem' } 
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
      flexGrow: 1, 
      p: { xs: 2, sm: 3, md: 4 },
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Shared container for stat boxes and table */}
      <Box sx={{ width: '100%', maxWidth: 1200 }}>
        {/* Stat Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Total Sales"
              value={salesData.amount}
              subtitle={`${salesData.orders} Orders`}
              icon={<ShoppingBagOutlined />}
              increaseText={salesData.increaseText}
              dark
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Visitors"
              value={visitorsData.count}
              subtitle={visitorsData.avgTime}
              icon={<PeopleOutline />}
              increaseText={visitorsData.increaseText}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="New Orders"
              value="+1,235"
              subtitle="23% from last week"
              icon={<AddShoppingCart />}
              increaseText="+320 this week"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
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
        <Grid container sx={{ mt: 4 }}>
          <Grid item xs={12}>
            <Paper sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: '16px',
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.05)',
              overflowX: 'auto',
              width: '100%',
            }}>
              <Typography variant="h6" sx={{ 
                mb: 3, 
                fontWeight: 'bold',
                fontSize: { xs: '1.1rem', sm: '1.25rem' } 
              }}>
                Recent Orders
              </Typography>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="transaction table">
                  <TableHead>
                    <TableRow sx={{ 
                      '& .MuiTableCell-root': { 
                        borderBottom: 'none', 
                        color: 'text.secondary', 
                        fontWeight: 'bold', 
                        py: 2,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      } 
                    }}>
                      <TableCell>Product name</TableCell>
                      <TableCell align="right">Date</TableCell>
                      <TableCell align="right">Type</TableCell>
                      <TableCell align="right">Qty</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((row, index) => (
                      <TableRow 
                        key={row.name} 
                        sx={{ 
                          '&:last-child td, &:last-child th': { border: 0 }, 
                          '& .MuiTableCell-root': { 
                            py: 2,
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                          },
                          '&:hover': {
                            backgroundColor: 'action.hover'
                          }
                        }}
                      >
                        <TableCell sx={{ fontWeight: 'bold' }}>{row.name}</TableCell>
                        <TableCell align="right">{row.date}</TableCell>
                        <TableCell align="right">
                          <Box sx={{
                            display: 'inline-block',
                            px: 1,
                            py: 0.5,
                            borderRadius: '4px',
                            backgroundColor: getTypeColor(row.type),
                            color: 'white',
                            fontSize: '0.75rem'
                          }}>
                            {row.type}
                          </Box>
                        </TableCell>
                        <TableCell align="right">{row.qty}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{row.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
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