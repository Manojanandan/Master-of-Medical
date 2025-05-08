import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import Sidebar from '../../Sidebar';
import Slider from 'react-slick';

import Arrivals from './Arrivals';
import HeroSection from './HeroSection';
import FeatureBrands from './FeatureBrands';
import BestSeller from './BestSeller';

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  return (
    <React.Fragment>
      <div style={{height:'auto',width:'100%',borderBottom:'solid 1.5px #2424',display:'flex',justifyContent:'space-around',padding:'20px'}}>
        <Box sx={{height:'500px',width:'25%',border:'solid 1px #2424',borderRadius:'10px',overflowY:'scroll'}}>
          <Sidebar />
        </Box>
        <Box sx={{height:'450px',width:'65%',borderRadius:'15px',margin:'2rem 0'}}>
          <Slider {...settings}>
            <div className='slide'>
              <img src='https://img.freepik.com/free-vector/realistic-world-health-day-social-media-post-template_52683-83268.jpg?t=st=1743924884~exp=1743928484~hmac=106d8dbf8cc21674c08c1e4510779dfa3d1b471914b1a0f4e14313f26fb5cee8&w=1800' alt='' height='445px' width='100%' style={{borderRadius:'15px'}} />
            </div>
            <div className='slide'>
              <img src='https://img.freepik.com/free-photo/minimalistic-science-banner-with-pills_23-2149431123.jpg?t=st=1743924233~exp=1743927833~hmac=d7ce55bda5fbc639857449df1b9ab8a4a8f1943bf8da8b502e710870b4f33db7&w=1800' alt='' height='445px' width='100%' style={{borderRadius:'15px'}} />
            </div>
          </Slider>
        </Box>
      </div>
      <HeroSection />
      <Arrivals />
      <FeatureBrands />
      <BestSeller />
    </React.Fragment>
  )
}

export default HomePage