import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
};

const LandingTitleBanner = ({ text, bgColor, data }) => {

  return (
    <div>
      <Box style={{ height: 'auto', width: '100%', textAlign: 'center', backgroundColor: bgColor }}>
        <Typography variant='h4' sx={{ fontWeight: 'bold', padding: '3% 3% 0' }}>{text}</Typography>
            <Slider {...settings}>
              {data?.map((e,i)=>{
                return(
                  <div className='slide' key={i}>
                    <Stack direction='row' sx={{ padding: '2%', margin: '1% auto', width: '80%'}} spacing={5}>
                    {Object.keys(e).map((key, index) => {
                        if (key.startsWith('imagePath')) {
                          return (
                            <img 
                              key={index}
                              src={e[key]} 
                              alt={key} 
                              height='100px' 
                              width='150px' 
                            />
                          );
                        }
                        return null;
                    })}
                    </Stack>
                  </div>
                )
              })}
            </Slider>
      </Box>
    </div>
  )
}

export default LandingTitleBanner