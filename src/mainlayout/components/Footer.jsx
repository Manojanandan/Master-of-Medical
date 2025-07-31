import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Fade,
} from '@mui/material';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import MailIcon from '@mui/icons-material/Mail';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import { getAllCategoriesAndSubcategories } from '../../utils/Service';

const colors = {
  primary: '#de3b6f',
  secondary: '#f49507',
  accent: '#873589',
  background: '#fff',
  border: '#f1ac1b',
  text: '#fff',
  lightText: '#fff',
  lightBg: '#f8f9fa',
};

const Footer = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Categories state
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Fetch categories on component mount
  

  return (
    <Box
      sx={{
        backgroundColor:" #f79300",
        color: "white !important",
        width: '100vw',
        borderTop: `1px solid ${colors.border}`,
        pt: { xs: 2, sm: 3 },
        pb: { xs: 2, sm: 3 },
      }}
    >
      {/* Main Content Section */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '1920px',
          mx: 'auto',
          px: { xs: 2, sm: 4 },
          pb: { xs: 2, sm: 3 },
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <Grid
          container
          spacing={{ xs: 3, sm: 4 }} // Increased spacing for better separation
          columns={{ xs: 4, sm: 5, md: 5 }} // 5 columns in a single row
          sx={{ justifyContent: 'space-between' }} // Ensure even distribution
        >
          {/* Need Help Section */}
          <Grid item xs={4} sm={1} md={1} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <List disablePadding>
              <ListItem disablePadding>
                <Typography
                  variant="h6"
                  sx={{ fontSize: 15, fontWeight: 600, color: colors.text }}
                >
                  Need Help?
                </Typography>
              </ListItem>
              <ListItem disablePadding>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 13, color: colors.lightText, mt: 0.5 }}
                >
                  We're available to answer your queries and assist with your orders.
                </Typography>
              </ListItem>
              <ListItem disablePadding sx={{ mt: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PhoneInTalkIcon sx={{ fontSize: 22, color: colors.primary }} />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: 12, color: colors.lightText }}
                    >
                      Monday - Friday: 8am-9pm
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontSize: 16, fontWeight: 600, color: colors.text }}
                    >
                      +91-XXXXXXXXXX
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontSize: 16, fontWeight: 600, color: colors.text, mt: 0.5 }}
                    >
                      +91-YYYYYYYYYY
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
              <ListItem disablePadding sx={{ mt: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <MailIcon sx={{ fontSize: 22, color: colors.primary }} />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: 12, color: colors.lightText }}
                    >
                      Need help with your order?
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontSize: 14, fontWeight: 600, color: colors.text }}
                    >
                      support@masterofmedical.in
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            </List>
          </Grid>

          {/* Explore More */}
          <Grid item xs={4} sm={1} md={1} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <List disablePadding>
              <ListItem disablePadding>
                <Typography
                  variant="h6"
                  sx={{ fontSize: 15, fontWeight: 600, color: colors.text }}
                >
                  Explore More
                </Typography>
              </ListItem>
              {[
                { text: 'Home', route: '/ecommerceDashboard' },
                { text: 'About us', route: '/ecommerceDashboard/about' },
                { text: 'Shop', route: '/ecommerceDashboard/shop' },
                { text: 'Blogs', route: '/ecommerceDashboard/blogs' },
                { text: 'Contact us', route: '/ecommerceDashboard/contact' },
              ].map((item, index) => (
                <ListItem key={index} disablePadding sx={{ py: 0.3 }}>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: 13,
                          color: colors.lightText,
                          cursor: 'pointer',
                          '&:hover': { color: colors.primary, textDecoration: 'underline' },
                          transition: 'all 0.2s ease',
                        }}
                        onClick={() => navigate(item.route)}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Categories Section */}
          {/* Categories Section */}
<Grid item xs={4} sm={1} md={1} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
  <List disablePadding>
    <ListItem disablePadding>
      <Typography
        variant="h6"
        sx={{ fontSize: 15, fontWeight: 600, color: colors.text }}
      >
        Categories
      </Typography>
    </ListItem>

    {/* Hard-coded categories */}
    {[
      'Consumable',
      'Diagnostic',
      'Dental',
      'Equipment',
      'Ophthalmology',
      'Ortho-Surgery',
      'Veterinary',
      'Furniture'
    ].map((name, index) => (
      <ListItem key={index} disablePadding sx={{ py: 0.3 }}>
        <ListItemText
          primary={
            <Typography
              variant="body2"
              sx={{
                fontSize: 13,
                color: colors.lightText,
                cursor: 'pointer',
                '&:hover': { color: colors.primary, textDecoration: 'underline' },
                transition: 'all 0.2s ease',
              }}
              title={name}
            >
              {name}
            </Typography>
          }
        />
      </ListItem>
    ))}
  </List>
</Grid>

          {/* Help & Support */}
          <Grid item xs={4} sm={1} md={1} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <List disablePadding>
              <ListItem disablePadding>
                <Typography
                  variant="h6"
                  sx={{ fontSize: 15, fontWeight: 600, color: colors.text }}
                >
                  Help & Support
                </Typography>
              </ListItem>
              {[
                { text: 'FAQ', route: '/ecommerceDashboard/faq' },
                { text: 'Returns and refunds policy', route: '/ecommerceDashboard/returns-refunds' },
                { text: 'Order tracking', route: '/ecommerceDashboard/orderTracking' },
                { text: 'Disclaimer', route: '/ecommerceDashboard/disclaimer' },
                { text: 'Terms of use', route: '/ecommerceDashboard/termsofuse' },
                { text: 'Privacy policy', route: '/ecommerceDashboard/privacyPolicy' },
                { text: 'Cookies Policy', route: '/ecommerceDashboard/cookies-policy' },
              ].map((item, index) => (
                <ListItem key={index} disablePadding sx={{ py: 0.3 }}>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: 13,
                          color: colors.lightText,
                          cursor: 'pointer',
                          '&:hover': { color: colors.primary, textDecoration: 'underline' },
                          transition: 'all 0.2s ease',
                        }}
                        onClick={() => navigate(item.route)}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Connect with Us & Download App */}
          <Grid item xs={4} sm={1} md={1} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontSize: 15, fontWeight: 600, color: colors.text, mb: 1 }}
              >
                Download Our App
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box
                  component="img"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                  alt="Google Play"
                  sx={{
                    width: { xs: '110px', sm: '120px' },
                    height: 'auto',
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.8 },
                    transition: 'opacity 0.3s ease',
                  }}
                  onClick={() => window.open('https://play.google.com/store', '_blank')}
                />
                <Box
                  component="img"
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  sx={{
                    width: { xs: '110px', sm: '120px' },
                    height: 'auto',
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.8 },
                    transition: 'opacity 0.3s ease',
                  }}
                  onClick={() => window.open('https://www.apple.com/app-store/', '_blank')}
                />
              </Box>
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{ fontSize: 15, fontWeight: 600, color: colors.text, mb: 1 }}
              >
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {[
                  { Icon: FacebookIcon, url: 'https://www.facebook.com', color: '#4267B2' },
                  { Icon: TwitterIcon, url: 'https://www.twitter.com', color: '#1DA1F2' },
                  { Icon: InstagramIcon, url: 'https://www.instagram.com', color: '#E1306C' },
                  { Icon: LinkedInIcon, url: 'https://www.linkedin.com', color: '#0077B5' },
                  { Icon: YouTubeIcon, url: 'https://www.youtube.com', color: '#FF0000' },
                ].map(({ Icon, url, color }, index) => (
                  <Icon
                    key={index}
                    sx={{
                      fontSize: 28,
                      color,
                      cursor: 'pointer',
                      '&:hover': { color: colors.primary, transform: 'scale(1.1)' },
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => window.open(url, '_blank')}
                    aria-label={`Visit our ${Icon.name} page`}
                    role="link"
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Bottom Section */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '1920px',
          mx: 'auto',
          px: { xs: 2, sm: 4 },
          py: { xs: 1.5, sm: 2 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            fontSize: 13, 
            color: colors.lightText, 
            width: '100%',
            textAlign: 'center',
          }}
        >
          Copyright 2025 © Master of Medical
        </Typography>

      </Box>
    </Box>
  );
};

export default Footer;