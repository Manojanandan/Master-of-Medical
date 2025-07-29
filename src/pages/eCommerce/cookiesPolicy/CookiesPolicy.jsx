import React, { useEffect } from 'react';
import { Box, Typography, Container, Paper, Divider } from '@mui/material';

const CookiesPolicy = () => {
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
            Cookies Policy
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
            Consent
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
            By continuing to use our website www.masterofmedical.com (the "Site") and Master of Medical mobile app (the "App"), you agree that we can store and place cookies on your computer and mobile device to improve your Site and App experience. This Cookie Policy covers the information practices of our websites, including how Master of Medical collects, uses, shares, and secures the personal information you provide. If you use our websites, we may use various website navigation information, including tracking technologies such as cookies and web beacons, to collect and store information from you. You are requested to read this Cookie Policy for more details about the cookies that are placed when you are using this Site.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: '#f49507', // Subheading color from ReturnsRefundsPolicy
              fontSize: { xs: '1.2rem', md: '1.5rem' },
            }}
          >
            What are Cookies?
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
            Cookies are small files that are placed on your computer or device by websites that you visit. They are widely used to make websites function properly as well as to provide business and marketing information to the owners of the site. Cookies collect website navigation information that includes standard information from your web browser (such as browser type and browser language), language choices, time zone, your internet protocol (IP) address, actions you take on our websites, URL and page metadata, installation data (such as the operating system type and application version), system crash information, system activity, and hardware settings. We may also automatically collect and store certain information in activity logs, such as details of how you use our websites, your search queries, and your IP address.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: '#f49507', // Subheading color from ReturnsRefundsPolicy
              fontSize: { xs: '1.2rem', md: '1.5rem' },
            }}
          >
            Ease of Use
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
            These cookies are used to enhance the ease of use of the Site.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: '#f49507', // Subheading color from ReturnsRefundsPolicy
              fontSize: { xs: '1.2rem', md: '1.5rem' },
            }}
          >
            Performance
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
            Performance cookies collect information about how you use our Site (e.g., which pages you visit frequently). These cookies do not collect any information that could identify you and are only used to help us improve how our Site works and understand what interests our users.
          </Typography>

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

export default CookiesPolicy;