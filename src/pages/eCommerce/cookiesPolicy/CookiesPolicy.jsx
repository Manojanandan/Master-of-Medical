<<<<<<< HEAD
/* import React from 'react'
import BreadCrumbs from '../../../components/e_commerceComponents/BreadCrumbs'
import { Box, Typography } from '@mui/material'

const CookiesPolicy = () => {
  return (
    <Box sx={{height:'auto',width:'100%',}}>
        <BreadCrumbs title={"Cookies-Policy"} />
        <Box sx={{height:'100%',width:'90%',margin:'2% auto'}}>
            <Typography variant='h5' sx={{fontWeight:'bold',margin:'1% 0'}}>Consent</Typography>
            <Typography variant='p' sx={{fontSize:'16px',}}>By continuing to use our website www.Master of Medical.com (the "Site") and Master of Medical mobile app (the "app"), you agree that we can store and place cookies on your computer and mobile device to improve your site and app experience. This Cookie Policy covers the information practices of our websites, including how Master of Medical collects, uses, shares and secures the personal information you provide. If you use our websites, we may use various website navigation information including tracking technologies such as cookies and web beacons to collect and store information from you. You are requested to read this cookie policy for more details about the cookies that are placed when you are using this Site.</Typography>
            <Typography variant='h5' sx={{fontWeight:'bold',margin:'1% 0'}}>What are cookies?</Typography>
            <Typography variant='p' sx={{fontSize:'16px',}}>Cookies are small files that are placed on your computer or device by websites that you visit. They are widely used in order to make websites function properly as well as to provide business and marketing information to the owners of the site. Cookies collect Website navigation information that includes standard information from your web browser (such as browser type and browser language), language choices, time zone, your internet protocol (IP) address, actions you take on our websites, URL and page metadata, installation data (such as the operating system type and application version), system crash information, system activity and hardware settings. We may also automatically collect and store certain information in activity logs such as details of how you use our websites, your search queries, and your IP address</Typography>
            <Typography variant='h5' sx={{fontWeight:'bold',margin:'1% 0'}}>Ease of Use</Typography>
            <Typography variant='p' sx={{fontSize:'16px',}}>These cookies are used to enhance the ease of use of the Site.</Typography>
            <Typography variant='h5' sx={{fontWeight:'bold',margin:'1% 0'}}>Performance</Typography>
            <Typography variant='p' sx={{fontSize:'16px',}}>Performance cookies collect information about how you use our Site (e.g., which pages you visit frequently). These cookies do not collect any information that could identify you and are only used to help us improve how our Site works and understand what interests our users.</Typography>
        </Box>
    </Box>
  )
}

export default CookiesPolicy */

import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import BreadCrumbs from '../../../components/e_commerceComponents/BreadCrumbs';

const CookiesPolicy = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4 }}>
      <Container maxWidth="lg">
        <BreadCrumbs title="Cookies Policy" />
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
            Cookies Policy
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
            Consent
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
            By continuing to use our website www.masterofmedical.com (the "Site") and Master of Medical mobile app (the "App"), you agree that we can store and place cookies on your computer and mobile device to improve your Site and App experience. This Cookie Policy covers the information practices of our websites, including how Master of Medical collects, uses, shares, and secures the personal information you provide. If you use our websites, we may use various website navigation information, including tracking technologies such as cookies and web beacons, to collect and store information from you. You are requested to read this Cookie Policy for more details about the cookies that are placed when you are using this Site.
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
            What are Cookies?
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
            Cookies are small files that are placed on your computer or device by websites that you visit. They are widely used to make websites function properly as well as to provide business and marketing information to the owners of the site. Cookies collect website navigation information that includes standard information from your web browser (such as browser type and browser language), language choices, time zone, your internet protocol (IP) address, actions you take on our websites, URL and page metadata, installation data (such as the operating system type and application version), system crash information, system activity, and hardware settings. We may also automatically collect and store certain information in activity logs, such as details of how you use our websites, your search queries, and your IP address.
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
            Ease of Use
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
            These cookies are used to enhance the ease of use of the Site.
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
            Performance
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
            Performance cookies collect information about how you use our Site (e.g., which pages you visit frequently). These cookies do not collect any information that could identify you and are only used to help us improve how our Site works and understand what interests our users.
          </Typography>

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

export default CookiesPolicy;
/* import React from 'react';
=======
import React, { useEffect } from 'react';
>>>>>>> 5914640 (updated on a some ecommerce pages)
import { Box, Typography, Container, Paper } from '@mui/material';


const CookiesPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff' }}>
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
            Cookies Policy
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2, color: '#1e40af', fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
            Consent
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: '#374151', mb: 4, lineHeight: 1.8 }}>
            By continuing to use our website www.masterofmedical.com (the "Site") and Master of Medical mobile app (the "App"), you agree that we can store and place cookies on your computer and mobile device to improve your Site and App experience. This Cookie Policy covers the information practices of our websites, including how Master of Medical collects, uses, shares, and secures the personal information you provide. If you use our websites, we may use various website navigation information, including tracking technologies such as cookies and web beacons, to collect and store information from you. You are requested to read this Cookie Policy for more details about the cookies that are placed when you are using this Site.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2, color: '#1e40af', fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
            What are Cookies?
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: '#374151', mb: 4, lineHeight: 1.8 }}>
            Cookies are small files that are placed on your computer or device by websites that you visit. They are widely used to make websites function properly as well as to provide business and marketing information to the owners of the site. Cookies collect website navigation information that includes standard information from your web browser (such as browser type and browser language), language choices, time zone, your internet protocol (IP) address, actions you take on our websites, URL and page metadata, installation data (such as the operating system type and application version), system crash information, system activity, and hardware settings. We may also automatically collect and store certain information in activity logs, such as details of how you use our websites, your search queries, and your IP address.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2, color: '#1e40af', fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
            Ease of Use
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: '#374151', mb: 4, lineHeight: 1.8 }}>
            These cookies are used to enhance the ease of use of the Site.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2, color: '#1e40af', fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
            Performance
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: '#374151', mb: 4, lineHeight: 1.8 }}>
            Performance cookies collect information about how you use our Site (e.g., which pages you visit frequently). These cookies do not collect any information that could identify you and are only used to help us improve how our Site works and understand what interests our users.
          </Typography>

          <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' }, color: '#6b7280', textAlign: 'center', mt: 4 }}>
            Last updated: July 22, 2025
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

<<<<<<< HEAD
export default CookiesPolicy; */
=======
export default CookiesPolicy;
>>>>>>> 5914640 (updated on a some ecommerce pages)
