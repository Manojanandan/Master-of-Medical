import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  Stack
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  Phone,
  Email,
  LocationOn
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', path: '/ecommerceDashboard/about-us' },
      { name: 'Contact Us', path: '/ecommerceDashboard/contact' },
      { name: 'Blog', path: '/ecommerceDashboard/blog' },
      { name: 'Careers', path: '#' }
    ],
    support: [
      { name: 'Help & Support', path: '/ecommerceDashboard/help-support' },
      { name: 'Order Tracking', path: '/ecommerceDashboard/orderTracking' },
      { name: 'Returns & Refunds', path: '/ecommerceDashboard/returns-refunds' },
      { name: 'FAQ', path: '/ecommerceDashboard/faq' }
    ],
    legal: [
      { name: 'Terms & Conditions', path: '/ecommerceDashboard/termsofuse' },
      { name: 'Privacy Policy', path: '/ecommerceDashboard/privacyPolicy' },
      { name: 'Cookies Policy', path: '/ecommerceDashboard/cookiesPolicy' },
      { name: 'Disclaimer', path: '/ecommerceDashboard/disclaimer' }
    ],
    categories: [
      { name: 'Medical Supplies', path: '/ecommerceDashboard/products?category=medical-supplies' },
      { name: 'Personal Care', path: '/ecommerceDashboard/products?category=personal-care' },
      { name: 'Health & Wellness', path: '/ecommerceDashboard/products?category=health-wellness' },
      { name: 'Equipment', path: '/ecommerceDashboard/products?category=equipment' }
    ]
  };

  const socialLinks = [
    { icon: <Facebook />, url: '#', label: 'Facebook' },
    { icon: <Twitter />, url: '#', label: 'Twitter' },
    { icon: <Instagram />, url: '#', label: 'Instagram' },
    { icon: <LinkedIn />, url: '#', label: 'LinkedIn' },
    { icon: <YouTube />, url: '#', label: 'YouTube' }
  ];

  return (
    <Box sx={{ bgcolor: '#1a1a1a', color: 'white', mt: 'auto' }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#de3b6f', mb: 2 }}>
                Master of Medical
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc', lineHeight: 1.6, mb: 3 }}>
                Your trusted partner for high-quality medical supplies and healthcare products. 
                We are committed to providing the best products and service to healthcare professionals and individuals.
              </Typography>
              
              {/* Contact Info */}
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone sx={{ color: '#de3b6f', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#ccc' }}>
                    +91-1800-123-4567
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ color: '#de3b6f', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#ccc' }}>
                    support@masterofmedical.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <LocationOn sx={{ color: '#de3b6f', fontSize: 20, mt: 0.5 }} />
                  <Typography variant="body2" sx={{ color: '#ccc', lineHeight: 1.4 }}>
                    Plot No. 12, Industrial Area, Sector 64, Noida, Uttar Pradesh – 201301
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 3 }}>
              Company
            </Typography>
            <Stack spacing={1}>
              {footerLinks.company.map((link, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    color: '#ccc',
                    textDecoration: 'none',
                    '&:hover': { color: '#de3b6f' },
                    transition: 'color 0.3s ease'
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 3 }}>
              Support
            </Typography>
            <Stack spacing={1}>
              {footerLinks.support.map((link, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    color: '#ccc',
                    textDecoration: 'none',
                    '&:hover': { color: '#de3b6f' },
                    transition: 'color 0.3s ease'
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 3 }}>
              Legal
            </Typography>
            <Stack spacing={1}>
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    color: '#ccc',
                    textDecoration: 'none',
                    '&:hover': { color: '#de3b6f' },
                    transition: 'color 0.3s ease'
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 3 }}>
              Categories
            </Typography>
            <Stack spacing={1}>
              {footerLinks.categories.map((link, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    color: '#ccc',
                    textDecoration: 'none',
                    '&:hover': { color: '#de3b6f' },
                    transition: 'color 0.3s ease'
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: '#333' }} />

        {/* Bottom Section */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', md: 'flex-start' }, gap: 2 }}>
          {/* Copyright */}
          <Typography variant="body2" sx={{ color: '#999', textAlign: { xs: 'center', md: 'left' } }}>
            © {new Date().getFullYear()} Master of Medical. All rights reserved.
          </Typography>

          {/* Social Links */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {socialLinks.map((social, index) => (
              <IconButton
                key={index}
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#ccc',
                  '&:hover': { 
                    color: '#de3b6f',
                    bgcolor: 'rgba(222, 59, 111, 0.1)'
                  },
                  transition: 'all 0.3s ease'
                }}
                aria-label={social.label}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* Additional Info */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 1 }}>
            ISO 13485:2016 Certified | FDA Registered | CE Marked Products
          </Typography>
          <Typography variant="caption" sx={{ color: '#666' }}>
            Secure Payment | Fast Delivery | 24/7 Customer Support
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 