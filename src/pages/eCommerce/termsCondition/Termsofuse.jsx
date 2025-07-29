import React, { useEffect } from 'react';
import { Box, Typography, Container, Paper, Divider } from '@mui/material';

const TermsOfUse = () => {
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
              color: '#de3b6f', // Title color from ReturnsRefundsPolicy
              textAlign: 'center',
              fontSize: { xs: '1.8rem', md: '2.5rem' },
            }}
          >
            Terms of Use
          </Typography>

          <Divider sx={{ mb: 4 }} /> {/* Divider from ReturnsRefundsPolicy */}

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: '#f49507', // Subheading color from ReturnsRefundsPolicy
              fontSize: { xs: '1.2rem', md: '1.5rem' },
            }}
          >
            Note
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.9rem', md: '1rem' },
              color: '#666', // Body text color from ReturnsRefundsPolicy
              mb: 4,
              lineHeight: 1.7, // Line height from ReturnsRefundsPolicy
            }}
          >
            By accessing and using the M.O.M platform, you agree to the following:
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
              All users must register with accurate and updated information.
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
              Buyers must use the platform for institutional or business use only.
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
              Sellers are responsible for ensuring their product listings, inventory, and pricing are accurate and compliant with applicable laws.
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
              Any misuse of the platform, false information, or breach of these terms may lead to suspension or legal action.
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
              We reserve the right to update these terms as necessary.
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

export default TermsOfUse;