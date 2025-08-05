import React, { useEffect } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', py: 0}}>
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
            Privacy Policy
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
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.9rem', md: '1rem' },
              color: '#666', // Body text color from ReturnsRefundsPolicy
              mb: 4,
              lineHeight: 1.7, // Line height from ReturnsRefundsPolicy
            }}
          >
            At Master of Medical, your data privacy is our top priority.
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
              We collect only necessary information to deliver services—such as name, contact, business info, and payment data.
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
              All user data is encrypted and stored securely.
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
              We do not sell or share your information with third parties for advertising.
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
              Data is used solely to process orders, support logistics, and improve user experience.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: '#666', // Body text color from ReturnsRefundsPolicy
                mt: 2,
                lineHeight: 1.7, // Line height from ReturnsRefundsPolicy
              }}
            >
              You can request to review or delete your data anytime by contacting our support team.
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

export default PrivacyPolicy;