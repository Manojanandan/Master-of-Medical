import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Checkout from './Checkout';
import BreadCrumbs from '../../../components/e_commerceComponents/BreadCrumbs';

const CheckoutPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* <BreadCrumbs title="Checkout" /> */}
        
          <Box sx={{ pt: 1, pb: 3, borderBottom: "1px solid #fff" }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Checkout 
            </Typography>
          </Box>
        <Checkout />
      </Container>
    </Box>
  );
};

export default CheckoutPage;