// Color palette for HomePage and children
const colors = {
  primary: '#de3b6f',
  secondary: '#f49507',
  accent: '#873589',
  background: '#fff',
  border: '#f1ac1b',
  text: '#22223b',
  lightText: '#6c757d',
  lightBg: '#f8f9fa',
};

import { Box, Fade } from '@mui/material';
import React from 'react';
import Sidebar from '../../Sidebar';
import Slider from 'react-slick';
import Arrivals from './Arrivals';
import FeatureHighlights from './FeatureHighlights';
import PromotionalCards from './PromotionalCards';
import FeatureBrands from './FeatureBrands';
import BestSeller from './BestSeller';
import { useTheme, useMediaQuery } from '@mui/material';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    fade: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    dotsClass: 'slick-dots custom-dots',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Box sx={{ backgroundColor: colors.lightBg, minHeight: '100vh', width: '100vw' }}>
      {/* Hero Section */}
      <Box
        sx={{
          width: '100%',
          background: `linear-gradient(135deg, ${colors.background}, ${colors.lightBg})`,
          display: 'flex',
          justifyContent: 'center',
          padding: { xs: '16px', sm: '24px', md: '32px' },
          gap: { xs: '16px', sm: '24px', md: '32px' },
          minHeight: { xs: '360px', sm: '450px', md: '600px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: { xs: '16px', sm: '24px', md: '32px' },
            width: '100%',
            maxWidth: '1920px', // Ensures content doesn't stretch too wide on ultra-wide screens
            flexDirection: { xs: 'column', md: 'row' },
            mx: 'auto',
          }}
        >
          {/* Sidebar */}
          <Box
            sx={{
              height: { xs: '320px', sm: '400px', md: '550px' },
              width: { xs: '100%', md: '25%' },
              minWidth: { md: '260px' },
              position: 'relative',
            }}
          >
            <Sidebar />
          </Box>

          {/* Slider */}
          <Box
            sx={{
              height: { xs: '320px', sm: '400px', md: '550px' },
              width: { xs: '100%', md: '75%' },
              borderRadius: { xs: '12px', sm: '16px' },
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              '& .slick-slider': {
                height: '100%',
              },
              '& .slick-list, & .slick-track': {
                height: '100%',
              },
              '& .custom-dots': {
                bottom: '16px',
                '& li button:before': {
                  color: colors.background,
                  fontSize: { xs: '10px', sm: '12px' },
                  opacity: 0.8,
                  transition: 'all 0.3s ease',
                },
                '& li.slick-active button:before': {
                  color: colors.primary,
                  opacity: 1,
                  transform: 'scale(1.3)',
                },
              },
            }}
          >
            <Slider {...settings}>
              <div className="slide">
                <Box
                  sx={{
                    height: { xs: '320px', sm: '400px', md: '550px' },
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="https://img.freepik.com/free-vector/realistic-world-health-day-social-media-post-template_52683-83268.jpg?t=st=1743924884~exp=1743928484~hmac=106d8dbf8cc21674c08c1e4510779dfa3d1b471914b1a0f4e14313f26fb5cee8&w=1800"
                    alt="Health Day Banner"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '35%',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                      pointerEvents: 'none',
                    }}
                  />
                </Box>
              </div>
              <div className="slide">
                <Box
                  sx={{
                    height: { xs: '320px', sm: '400px', md: '550px' },
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="https://img.freepik.com/free-photo/minimalistic-science-banner-with-pills_23-2149431123.jpg?t=st=1743924233~exp=1743927833~hmac=d7ce55bda5fbc639857449df1b9ab8a4a8f1943bf8da8b502e710870b4f33db7&w=1800"
                    alt="Science Banner"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '35%',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                      pointerEvents: 'none',
                    }}
                  />
                </Box>
              </div>
            </Slider>
          </Box>
        </Box>
      </Box>

      {/* Content Sections */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '1920px',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Fade in={true} timeout={600}>
          <Box sx={{ mt: { xs: 3, sm: 4, md: 5 } }}>
            <Arrivals />
          </Box>
        </Fade>

        <Fade in={true} timeout={800}>
          <Box sx={{ mt: { xs: 3, sm: 4, md: 5 } }}>
            <PromotionalCards />
          </Box>
        </Fade>

        <Fade in={true} timeout={1000}>
          <Box sx={{ mt: { xs: 3, sm: 4, md: 5 } }}>
            <FeatureBrands />
          </Box>
        </Fade>

        <Fade in={true} timeout={1200}>
          <Box sx={{ mt: { xs: 3, sm: 4, md: 5 } }}>
            <BestSeller />
          </Box>
        </Fade>

        <Fade in={true} timeout={1400}>
          <Box sx={{ mt: { xs: 3, sm: 4, md: 5 }, pb: { xs: 4, sm: 5, md: 6 } }}>
            <FeatureHighlights />
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default HomePage;