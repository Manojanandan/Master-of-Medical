/* import { Box, Typography } from '@mui/material'
import React from 'react'
import BreadCrumbs from '../../../components/e_commerceComponents/BreadCrumbs'

const Termsofuse = () => {
  return (
    <Box sx={{ height: 'auto', width: '100%', }}>
      <BreadCrumbs title={"TermsOfUse"} />
      <Box sx={{ height: '100%', width: '90%', margin: '2% auto' }}>
        <Typography variant='h5' sx={{ fontWeight: 'bold', margin: '1% 0' }}>Note</Typography>
        <Typography variant='p' sx={{ fontSize: '16px', }}>By accessing and using the M.O.M platform, you agree to the following:</Typography><br />
        <Typography variant='p' sx={{ fontSize: '16px', lineHeight: '50px', marginLeft: '2%' }}>1. 	All users must register with accurate and updated information.</Typography><br />
        <Typography variant='p' sx={{ fontSize: '16px', lineHeight: '50px', marginLeft: '2%' }}>2.	Buyers must use the platform for institutional or business use only.</Typography><br />
        <Typography variant='p' sx={{ fontSize: '16px', lineHeight: '50px', marginLeft: '2%' }}>3.	Sellers are responsible for ensuring their product listings, inventory, and pricing are accurate and compliant with applicable laws.</Typography><br />
        <Typography variant='p' sx={{ fontSize: '16px', lineHeight: '50px', marginLeft: '2%' }}>4.	Any misuse of the platform, false information, or breach of these terms may lead to suspension or legal action.</Typography><br />
        <Typography variant='p' sx={{ fontSize: '16px', lineHeight: '50px' }}>We reserve the right to update these terms as necessary.</Typography><br />

      </Box>
    </Box>
  )
}

export default Termsofuse */


import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import BreadCrumbs from '../../../components/e_commerceComponents/BreadCrumbs';

const Termsofuse = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4 }}>
      <Container maxWidth="lg">
        <BreadCrumbs title="Terms of Use" />
        <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, mt: 3, borderRadius: 2 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              color: '#1a237e',
              textAlign: 'center',
              fontSize: { xs: '1.8rem', md: '2.5rem' },
            }}
          >
            Terms and Conditions
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'medium',
              mb: 2,
              color: '#424242',
              fontSize: { xs: '1.2rem', md: '1.5rem' },
            }}
          >
            Note
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.9rem', md: '1rem' },
              color: '#616161',
              mb: 4,
              lineHeight: 1.8,
            }}
          >
            By accessing and using the M.O.M platform, you agree to comply with the following terms and conditions:
          </Typography>
          <Box sx={{ pl: { xs: 2, md: 4 }, mb: 4 }}>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: '#212121',
                mb: 2,
                lineHeight: 2,
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Box component="span" sx={{ mr: 2, color: '#1a237e' }}>1.</Box>
              All users must register with accurate and updated information.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: '#212121',
                mb: 2,
                lineHeight: 2,
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Box component="span" sx={{ mr: 2, color: '#1a237e' }}>2.</Box>
              Buyers must use the platform for institutional or business use only.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: '#212121',
                mb: 2,
                lineHeight: 2,
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Box component="span" sx={{ mr: 2, color: '#1a237e' }}>3.</Box>
              Sellers are responsible for ensuring their product listings, inventory, and pricing are accurate and compliant with applicable laws.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: '#212121',
                mb: 2,
                lineHeight: 2,
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Box component="span" sx={{ mr: 2, color: '#1a237e' }}>4.</Box>
              Any misuse of the platform, false information, or breach of these terms may lead to suspension or legal action.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: '#212121',
                mt: 2,
                lineHeight: 2,
              }}
            >
              We reserve the right to update these terms as necessary.
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: '0.8rem', md: '0.9rem' },
              color: '#757575',
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

export default Termsofuse;