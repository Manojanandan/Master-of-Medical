import React from 'react'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import Slider from 'react-slick'
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

const LandingFeature = () => {
  return (
    <React.Fragment>
        <Box sx={{ height: '600px', width: '100%' }}>
        <Box sx={{ height: '100%', width: '92%', margin: '3% auto' }}>
          <Stack direction='row' sx={{ marginBottom: '2%' }}>
            <Typography variant='p' sx={{ fontWeigh: 'bold', width: '90%', fontSize: '2.5em' }}>Featured Stories</Typography>
            <Button variant='text' sx={{ fontSize: '16px', fontWeight: 'bold', color: '#c5225f', textTransform: 'capitalize', margin: '1% 0', }}>Explore All</Button>
          </Stack>
          <Box sx={{ height: '400px', width: '100%'}}>
              <Slider {...settings}>
                <div className='slide'>
                  <Stack direction='row' >
                    <Box sx={{ height: '100%', width: '25%', }}>
                      <Box sx={{ height: '150px', width: '85%', border: 'solid 1px red', margin: '4% 5% 3% 5%' }}></Box>
                      <Typography variant='p' sx={{ margin: '0 6%' }}>News | MBARC</Typography>
                      <Box sx={{ height: 'auto', width: '87%', margin: '3% auto' }}>
                        <Typography variant='p' sx={{ fontSize: '18px' }}>Medikabazaar launches MBARC</Typography>
                      </Box>
                      <Typography variant='p' sx={{ margin: '0 6%' }}>7 Sept'22 | 5 min read | 1,220</Typography>
                      <Button variant='outlined' sx={{ textTransform: 'capitalize', color: '#c5225f', padding: '4% 6%', margin: '5% 6% 10% 6%', fontSize: '16px', fontWeight: 'bold', border: 'solid 2px #c5225f', borderRadius: '15px' }}>Read more</Button>
                    </Box>
                    <Box sx={{ height: '100%', width: '25%', }}>
                      <Box sx={{ height: '150px', width: '85%', border: 'solid 1px red', margin: '4% 5% 3% 5%' }}></Box>
                      <Typography variant='p' sx={{ margin: '0 6%' }}>News | MBARC</Typography>
                      <Box sx={{ height: 'auto', width: '87%', margin: '3% auto' }}>
                        <Typography variant='p' sx={{ fontSize: '18px' }}>Medikabazaar launches MBARC</Typography>
                      </Box>
                      <Typography variant='p' sx={{ margin: '0 6%' }}>7 Sept'22 | 5 min read | 1,220</Typography>
                      <Button variant='outlined' sx={{ textTransform: 'capitalize', color: '#c5225f', padding: '4% 6%', margin: '5% 6% 10% 6%', fontSize: '16px', fontWeight: 'bold', border: 'solid 2px #c5225f', borderRadius: '15px' }}>Read more</Button>
                    </Box>
                    <Box sx={{ height: '100%', width: '25%',  }}>
                      <Box sx={{ height: '150px', width: '85%', border: 'solid 1px red', margin: '4% 5% 3% 5%' }}></Box>
                      <Typography variant='p' sx={{ margin: '0 6%' }}>News | MBARC</Typography>
                      <Box sx={{ height: 'auto', width: '87%', margin: '3% auto' }}>
                        <Typography variant='p' sx={{ fontSize: '18px' }}>Medikabazaar launches MBARC</Typography>
                      </Box>
                      <Typography variant='p' sx={{ margin: '0 6%' }}>7 Sept'22 | 5 min read | 1,220</Typography>
                      <Button variant='outlined' sx={{ textTransform: 'capitalize', color: '#c5225f', padding: '4% 6%', margin: '5% 6% 10% 6%', fontSize: '16px', fontWeight: 'bold', border: 'solid 2px #c5225f', borderRadius: '15px' }}>Read more</Button>
                    </Box>
                    <Box sx={{ height: '100%', width: '25%',  }}>
                      <Box sx={{ height: '150px', width: '85%', border: 'solid 1px red', margin: '4% 5% 3% 5%' }}></Box>
                      <Typography variant='p' sx={{ margin: '0 6%' }}>News | MBARC</Typography>
                      <Box sx={{ height: 'auto', width: '87%', margin: '3% auto' }}>
                        <Typography variant='p' sx={{ fontSize: '18px' }}>Medikabazaar launches MBARC</Typography>
                      </Box>
                      <Typography variant='p' sx={{ margin: '0 6%' }}>7 Sept'22 | 5 min read | 1,220</Typography>
                      <Button variant='outlined' sx={{ textTransform: 'capitalize', color: '#c5225f', padding: '4% 6%', margin: '5% 6% 10% 6%', fontSize: '16px', fontWeight: 'bold', border: 'solid 2px #c5225f', borderRadius: '15px' }}>Read more</Button>
                    </Box>
                  </Stack>
                </div>
                <div className='slide'>
                  <Stack direction='row' >
                    <Box sx={{ height: '100%', width: '25%', }}>
                      <Box sx={{ height: '150px', width: '85%', border: 'solid 1px red', margin: '4% 5% 3% 5%' }}></Box>
                      <Typography variant='p' sx={{ margin: '0 6%' }}>News | MBARC</Typography>
                      <Box sx={{ height: 'auto', width: '87%', margin: '3% auto' }}>
                        <Typography variant='p' sx={{ fontSize: '18px' }}>Medikabazaar launches MBARC</Typography>
                      </Box>
                      <Typography variant='p' sx={{ margin: '0 6%' }}>7 Sept'22 | 5 min read | 1,220</Typography>
                      <Button variant='outlined' sx={{ textTransform: 'capitalize', color: '#c5225f', padding: '4% 6%', margin: '5% 6% 10% 6%', fontSize: '16px', fontWeight: 'bold', border: 'solid 2px #c5225f', borderRadius: '15px' }}>Read more</Button>
                    </Box>
                    <Box sx={{ height: '100%', width: '25%', }}>
                      <Box sx={{ height: '150px', width: '85%', border: 'solid 1px red', margin: '4% 5% 3% 5%' }}></Box>
                      <Typography variant='p' sx={{ margin: '0 6%' }}>News | MBARC</Typography>
                      <Box sx={{ height: 'auto', width: '87%', margin: '3% auto' }}>
                        <Typography variant='p' sx={{ fontSize: '18px' }}>Medikabazaar launches MBARC</Typography>
                      </Box>
                      <Typography variant='p' sx={{ margin: '0 6%' }}>7 Sept'22 | 5 min read | 1,220</Typography>
                      <Button variant='outlined' sx={{ textTransform: 'capitalize', color: '#c5225f', padding: '4% 6%', margin: '5% 6% 10% 6%', fontSize: '16px', fontWeight: 'bold', border: 'solid 2px #c5225f', borderRadius: '15px' }}>Read more</Button>
                    </Box>
                    <Box sx={{ height: '100%', width: '25%',  }}>
                      <Box sx={{ height: '150px', width: '85%', border: 'solid 1px red', margin: '4% 5% 3% 5%' }}></Box>
                      <Typography variant='p' sx={{ margin: '0 6%' }}>News | MBARC</Typography>
                      <Box sx={{ height: 'auto', width: '87%', margin: '3% auto' }}>
                        <Typography variant='p' sx={{ fontSize: '18px' }}>Medikabazaar launches MBARC</Typography>
                      </Box>
                      <Typography variant='p' sx={{ margin: '0 6%' }}>7 Sept'22 | 5 min read | 1,220</Typography>
                      <Button variant='outlined' sx={{ textTransform: 'capitalize', color: '#c5225f', padding: '4% 6%', margin: '5% 6% 10% 6%', fontSize: '16px', fontWeight: 'bold', border: 'solid 2px #c5225f', borderRadius: '15px' }}>Read more</Button>
                    </Box>
                    <Box sx={{ height: '100%', width: '25%',  }}>
                      <Box sx={{ height: '150px', width: '85%', border: 'solid 1px red', margin: '4% 5% 3% 5%' }}></Box>
                      <Typography variant='p' sx={{ margin: '0 6%' }}>News | MBARC</Typography>
                      <Box sx={{ height: 'auto', width: '87%', margin: '3% auto' }}>
                        <Typography variant='p' sx={{ fontSize: '18px' }}>Medikabazaar launches MBARC</Typography>
                      </Box>
                      <Typography variant='p' sx={{ margin: '0 6%' }}>7 Sept'22 | 5 min read | 1,220</Typography>
                      <Button variant='outlined' sx={{ textTransform: 'capitalize', color: '#c5225f', padding: '4% 6%', margin: '5% 6% 10% 6%', fontSize: '16px', fontWeight: 'bold', border: 'solid 2px #c5225f', borderRadius: '15px' }}>Read more</Button>
                    </Box>
                  </Stack>
                </div>
              </Slider>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default LandingFeature