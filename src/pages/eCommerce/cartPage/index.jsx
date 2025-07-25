import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import CartList from './CartList';
import BreadCrumbs from '../../../components/e_commerceComponents/BreadCrumbs';

const CartPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* <BreadCrumbs title="Shopping Cart" /> */}
        
          <Box sx={{ pt: 1, pb: 3, borderBottom: "1px solid #fff" }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Shopping Cart 
            </Typography>
          </Box>
        <CartList />
      </Container>
    </Box>
  );
};

export default CartPage;