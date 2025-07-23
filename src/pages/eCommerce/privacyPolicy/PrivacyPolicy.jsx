/* import React from 'react'
import BreadCrumbs from '../../../components/e_commerceComponents/BreadCrumbs'
import { Box, Typography } from '@mui/material'

const PrivacyPolicy = () => {
  return (
    <Box sx={{height:'auto',width:'100%',}}>
        <BreadCrumbs title={"Privacy-Policy"} />
        <Box sx={{height:'100%',width:'90%',margin:'2% auto'}}>
            <Typography variant='h5' sx={{fontWeight:'bold',margin:'1% 0'}}>Note</Typography>
            <Typography variant='p' sx={{fontSize:'16px',}}>At Master of Medical, your data privacy is our priority.</Typography><br />
            <Typography variant='p' sx={{fontSize:'16px',lineHeight:'50px',marginLeft:'2%'}}>1. 	We collect only necessary information to deliver services—such as name, contact, business info, and payment data.</Typography><br/>
            <Typography variant='p' sx={{fontSize:'16px',lineHeight:'50px',marginLeft:'2%'}}>2.	All user data is encrypted and stored securely.</Typography><br />
            <Typography variant='p' sx={{fontSize:'16px',lineHeight:'50px',marginLeft:'2%'}}>3.	We do not sell or share your information with third parties for advertising.</Typography><br />
            <Typography variant='p' sx={{fontSize:'16px',lineHeight:'50px',marginLeft:'2%'}}>4.	Data is used solely to process orders, support logistics, and improve user experience.</Typography><br />
            <Typography variant='p' sx={{fontSize:'16px',lineHeight:'50px'}}>You can request to review or delete your data anytime by contacting our support team.</Typography><br />
        </Box>
    </Box>
  )
}

export default PrivacyPolicy */

import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', py: 4 }}>
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
              fontWeight: 'bold',
              mb: 3,
              color: '#003087',
              textAlign: 'center',
              fontSize: { xs: '1.8rem', md: '2.5rem' },
            }}
          >
            Privacy Policy
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'medium',
              mb: 2,
              color: '#1e40af',
              fontSize: { xs: '1.2rem', md: '1.5rem' },
            }}
          >
            Note
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.9rem', md: '1rem' },
              color: '#374151',
              mb: 4,
              lineHeight: 1.8,
            }}
          >
            At Master of Medical, your data privacy is our top priority.
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
              We collect only necessary information to deliver services—such as name, contact, business info, and payment data.
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
              All user data is encrypted and stored securely.
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
              We do not sell or share your information with third parties for advertising.
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
              Data is used solely to process orders, support logistics, and improve user experience.
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
              You can request to review or delete your data anytime by contacting our support team.
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: '0.8rem', md: '0.9rem' },
              color: '#6b7280',
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