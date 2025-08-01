import React, { useEffect } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', py: 0 }}>
      <Container maxWidth="lg">
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
            About Us
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: '#000', // Subheading color changed to black
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
                color: '#666', // Body text color from ReturnsRefundsPolicy
                mb: 2,
                lineHeight: 1.7, // Line height from ReturnsRefundsPolicy
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Box component="span" sx={{ mr: 2, color: '#873589' }}>1.</Box> {/* Bullet color updated to #873589 */}
              Master of Medical (M.O.M) is India’s leading B2B medical procurement platform, designed to simplify and streamline the healthcare supply chain.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: '#666', // Body text color from ReturnsRefundsPolicy
                mb: 2,
                lineHeight: 1.7, // Line height from ReturnsRefundsPolicy
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Box component="span" sx={{ mr: 2, color: '#873589' }}>2.</Box> {/* Bullet color updated to #873589 */}
              Built to connect hospitals, clinics, diagnostic centres, and pharmacies directly with verified medical product manufacturers, our platform offers a smarter, faster, and more cost-effective way to source essential medical supplies.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: '#666', // Body text color from ReturnsRefundsPolicy
                mb: 2,
                lineHeight: 1.7, // Line height from ReturnsRefundsPolicy
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Box component="span" sx={{ mr: 2, color: '#873589' }}>3.</Box> {/* Bullet color updated to #873589 */}
              Founded in 2024 by Mr. Arunoday Tiwari, a seasoned professional with nearly a decade in the healthcare sector, M.O.M empowers healthcare providers to save costs and enhance operational efficiency.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: '#666', // Body text color from ReturnsRefundsPolicy
                mb: 2,
                lineHeight: 1.7, // Line height from ReturnsRefundsPolicy
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Box component="span" sx={{ mr: 2, color: '#873589' }}>4.</Box> {/* Bullet color updated to #873589 */}
              We eliminate middlemen, offering products at factory-direct prices with real-time inventory, seamless logistics, and transparent pricing.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: '#666', // Body text color from ReturnsRefundsPolicy
                mb: 2,
                lineHeight: 1.7, // Line height from ReturnsRefundsPolicy
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Box component="span" sx={{ mr: 2, color: '#873589' }}>5.</Box> {/* Bullet color updated to #873589 */}
              Whether you need surgical tools, medical equipment, or disposable supplies, M.O.M ensures top-quality products from certified manufacturers—available at your fingertips.
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: '0.8rem', md: '0.9rem' },
              color: '#873589', // Note color from ReturnsRefundsPolicy
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

export default AboutUs;