import React from 'react';
import { Container, Box } from '@mui/material';
import Checkout from './Checkout';
import BreadCrumbs from '../../../components/e_commerceComponents/BreadCrumbs';

const CheckoutPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <BreadCrumbs title="Checkout" />
        <Checkout />
      </Container>
    </Box>
  );
};

export default CheckoutPage;