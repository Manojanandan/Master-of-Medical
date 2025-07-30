import React, { useEffect } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

const Disclaimer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', py: 0 }}>
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            mt: 0,
            borderRadius: 2,
            bgcolor: '#ffffff',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: '#de3b6f',
              textAlign: 'center',
              fontSize: { xs: '1.8rem', md: '2.5rem' },
            }}
          >
            Disclaimer
          </Typography>

          {/* Divider removed */}

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: '#000000', // Changed to black
              fontSize: { xs: '1.2rem', md: '1.5rem' },
            }}
          >
            Note
          </Typography>

          <Box sx={{ pl: { xs: 2, md: 4 }, mb: 4 }}>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: '#666',
                mb: 2,
                lineHeight: 1.7,
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Box component="span" sx={{ mr: 2, color: '#873589' }}>1.</Box>
              Master of Medical (M.O.M) provides a platform to facilitate transactions between buyers and certified sellers of medical products. While we ensure sellers are verified and compliant, we do not manufacture or directly supply products. Buyers are encouraged to review product details and specifications before placing orders.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: '#666',
                mb: 2,
                lineHeight: 1.7,
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Box component="span" sx={{ mr: 2, color: '#873589' }}>2.</Box>
              M.O.M is not liable for any misuse or off-label usage of the products listed on the platform. All products must be used as per prescribed medical guidelines and under professional supervision.
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: '0.8rem', md: '0.9rem' },
              color: '#873589',
              textAlign: 'center',
              mt: 4,
            }}
          >
            Last updated: July 22, 2025
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Disclaimer;
