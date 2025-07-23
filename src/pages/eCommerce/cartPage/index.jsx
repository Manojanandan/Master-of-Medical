import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import CartList from './CartList';
import BreadCrumbs from '../../../components/e_commerceComponents/BreadCrumbs';

const CartPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <BreadCrumbs title="Shopping Cart" />
        <CartList />
      </Container>
    </Box>
  );
};

export default CartPage;