import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../App.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
};

const LandingTitleBanner = ({ text, bgColor }) => {

  return (
    <div>
      <Box style={{ height: 'auto', width: '100%', textAlign: 'center', backgroundColor: bgColor }}>
        <Typography variant='h4' sx={{ fontWeight: 'bold', padding: '3% 3% 0' }}>{text}</Typography>
          <Stack direction='row' sx={{ padding: '2%', margin: '1% auto', width: '85%',  }} spacing={5}>
            {/* <Slider {...settings}> */}
                <div className='slide'>
                  <img src='https://murali.mywrk.in/wp-content/uploads/2024/07/yashoda.jpg' alt='https://murali.mywrk.in/wp-content/uploads/2024/07/yashoda.jpg' height='100px' width='150px' />
                </div>
                <div className='slide'>
                  <img src='https://media.telanganatoday.com/wp-content/uploads/2023/09/medicover.jpg' alt='https://upload.wikimedia.org/wikipedia/commons/d/d7/Logo-medicover.png' height='100px' width='150px' />
                </div>
                <div className='slide'>
                  <img src='https://pbs.twimg.com/profile_images/1427869142913142790/zAJZHxhp_400x400.jpg' alt='https://pbs.twimg.com/profile_images/1427869142913142790/zAJZHxhp_400x400.jpg' height='100px' width='150px' />
                </div>
                <div className='slide'>
                  <img src='https://appointment.carehospitals.com/Image/Logo.png' alt='https://appointment.carehospitals.com/Image/Logo.png' height='100px' width='150px' />
                </div>
                <div className='slide'>
                  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU4SDQeNowDirEBmRyRiG8YgMFIgzPu0Cn8g&s' alt='https://appointment.carehospitals.com/Image/Logo.png' height='100px' width='150px' />
                </div>
                <div className='slide'>
                  <img src='https://upload.wikimedia.org/wikipedia/en/d/d8/Jaslok_Hospital_Logo.png' alt='https://appointment.carehospitals.com/Image/Logo.png' height='100px' width='150px' />
                </div>
            {/* </Slider> */}
          </Stack>
      </Box>
    </div>
  )
}

export default LandingTitleBanner