import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const ReturnsRefundsPolicy = () => {
  return (
    <Box sx={{ bgcolor: '#fffff', minHeight: '100vh', py: 0}}>
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#de3b6f', mb: 3, textAlign: 'center' }}>
            Returns and Refunds Policy
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 3 }}>
              At Master of Medical, we stand by the quality of every product sold on our platform. However, in the rare event of issues, our return and refund policy ensures a hassle-free experience.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#000', mb: 2 }}>
              Returns are accepted if:
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              The item is damaged or defective on delivery
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              The wrong item was delivered
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              The item is expired or tampered
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#000', mb: 2 }}>
              To request a return:
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              Raise a return request within 3 days of delivery
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              Share proof (images or video) of the issue
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#000', mb: 2 }}>
              Refunds:
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7, mb: 2 }}>
              Once the returned item is received and inspected, refunds will be processed within 5–7 working days to the original payment method.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#873589', lineHeight: 1.7, mb: 2 }}>
              Note: Opened or used products cannot be returned unless defective
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ReturnsRefundsPolicy;