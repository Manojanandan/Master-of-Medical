import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const settings = {
  dots: false,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

const LandingTitleBanner = ({ text, bgColor, data, slider, subText }) => {
  const sliderRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  // Update current slide index on change
  const sliderSettings = {
    ...settings,
    beforeChange: (oldIndex, newIndex) => setCurrent(newIndex),
  };
  // Calculate width as a percentage
  const progressWidth = data?.length
    ? `${((current + 1) / data.length) * 100}%`
    : '0%';

  return (
    <div>
      <Box style={{ height: 'auto', width: '100%', textAlign: 'center', backgroundColor: bgColor }}>
        <Box sx={{ width: '90%', height: '200px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '3% auto 0' }}>
          <Box sx={{ width: '300px', }}>
            <Typography variant='p' sx={{ fontWeight: 'bold', padding: '3% 3% 0', textTransform: 'uppercase', fontSize: '2rem' }}>{text}</Typography><br />
            <Typography variant='p' sx={{ fontWeight: 'bold', padding: '3% 3% 0', textTransform: 'uppercase', fontSize: '2rem', color: '#35bfb3', lineHeight: '22px' }}>{subText}</Typography>
          </Box>
          <Box sx={{ width: '80%' }}>
            <Slider ref={sliderRef} {...sliderSettings}>
              {data?.map((e, i) => (
                <div className='slide' key={i}>
                  <Stack direction='row' sx={{ padding: '2%', width: '90%', }} spacing={7}>
                    {Object.keys(e).map((key, index) => (
                      key.startsWith('imagePath') ? (
                        <img
                          key={index}
                          src={e[key]}
                          alt={key}
                          height='100%'
                          width='100%'
                        />
                      ) : null
                    ))}
                  </Stack>
                </div>
              ))}
            </Slider>
          </Box>
        </Box>
        <Box sx={{ margin: '1% auto', width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction='row' spacing={2}>
            <Box
              sx={{ height: '40px', width: '40px', border: 'solid 1px #f1f2f7', backgroundColor: '#f1f2f7', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s', '&:active': { backgroundColor: '#c5225f', } }}
              onClick={handlePrev}
            >
              <ArrowBackIcon />
            </Box>
            <Box
              sx={{ height: '40px', width: '40px', border: 'solid 1px #f1f2f7', backgroundColor: '#f1f2f7', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s', '&:active': { backgroundColor: '#c5225f', }, }}
              onClick={handleNext}
            >
              <ArrowForwardIcon />
            </Box>
          </Stack>
          {slider && <Box sx={{ height: '2px', width: '75%', border: 'solid 1.5px #2424' }}>
            <Box sx={{ height: 'auto', width: progressWidth, border: 'solid 1.5px blue', backgroundColor: '#e2edf3', margin: '-1px', transition: 'width 0.5s ease' }}></Box>
          </Box>
          }
          {slider ?
            <Button variant="outlined" sx={{ outline: 'solid 1.5px black', color: 'black', textTransform: 'capitalize', fontSize: '17px', fontWeight: 'bold', }}>View all customers</Button>
            :
            <Stack direction='row' spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Button color="success" variant="contained" sx={{ color: 'white', textTransform: 'capitalize', fontSize: '17px', fontWeight: 'bold', }}>Explore</Button>
              <Typography variant='p' sx={{ fontSize: '18px', fontWeight: 'bold' }}>Trusted by 200+ Brand Partners in Innovation and Grwoth</Typography>
            </Stack>
          }
        </Box>
      </Box>
    </div>
  )
}

export default LandingTitleBanner