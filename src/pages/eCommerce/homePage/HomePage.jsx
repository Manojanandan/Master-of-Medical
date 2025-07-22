import { Box, Button, IconButton, Stack, Typography, useTheme, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import Sidebar from '../../Sidebar';
import Slider from 'react-slick';

import Arrivals from './Arrivals';
import HeroSection from './HeroSection';
import FeatureBrands from './FeatureBrands';
import BestSeller from './BestSeller';

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
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          arrows: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          dots: true,
          arrows: false,
        }
      }
    ]
  };

  return (
    <>
      {/* Hero Section with Slider and Sidebar */}
      <Box sx={{
        height: 'auto',
        width: '100%',
        borderBottom: 'solid 1.5px #2424',
        display: 'flex',
        justifyContent: 'space-around',
        padding: isMobile ? '10px' : '20px',
        flexWrap: isMobile ? 'wrap' : 'wrap-reverse',
        gap: '20px'
      }}>
        {/* Sidebar */}
        <Box sx={{
          height: isMobile ? '300px' : '500px',
          width: isMobile ? '100%' : isTablet ? '30%' : '25%',
          border: 'solid 1px #2424',
          borderRadius: '10px',
          overflowY: 'scroll',
          minWidth: isMobile ? 'auto' : '250px'
        }}>
          <Sidebar />
        </Box>
        
        {/* Slider */}
        <Box sx={{
          height: isMobile ? '250px' : '450px',
          width: isMobile ? '100%' : isTablet ? '65%' : '65%',
          borderRadius: '15px',
          margin: isMobile ? '0' : '2rem 0'
        }}>
          <Slider {...settings}>
            <div className='slide'>
              <img 
                src='https://img.freepik.com/free-vector/realistic-world-health-day-social-media-post-template_52683-83268.jpg?t=st=1743924884~exp=1743928484~hmac=106d8dbf8cc21674c08c1e4510779dfa3d1b471914b1a0f4e14313f26fb5cee8&w=1800' 
                alt='Health Day Banner' 
                height={isMobile ? '240px' : '445px'} 
                width='100%' 
                style={{
                  borderRadius: '15px',
                  objectFit: 'cover'
                }} 
              />
            </div>
            <div className='slide'>
              <img 
                src='https://img.freepik.com/free-photo/minimalistic-science-banner-with-pills_23-2149431123.jpg?t=st=1743924233~exp=1743927833~hmac=d7ce55bda5fbc639857449df1b9ab8a4a8f1943bf8da8b502e710870b4f33db7&w=1800' 
                alt='Science Banner' 
                height={isMobile ? '240px' : '445px'} 
                width='100%' 
                style={{
                  borderRadius: '15px',
                  objectFit: 'cover'
                }} 
              />
            </div>
          </Slider>
        </Box>
      </Box>
      
      <HeroSection />
      <Arrivals />
      <FeatureBrands />
      <BestSeller />
    </>
  )
}

export default HomePage