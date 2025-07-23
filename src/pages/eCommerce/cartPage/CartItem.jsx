// This component is now integrated into CartList.jsx as CartItemCard
// Keeping this file for backward compatibility but the main functionality is in CartList.jsx

import React from 'react';
import { Box, Typography } from '@mui/material';

const CartItem = () => {
  return (
    <Box>
      <Typography variant="body2" color="text.secondary">
        CartItem component has been integrated into CartList.jsx as CartItemCard
      </Typography>
    </Box>
  );
};

export default CartItem; 