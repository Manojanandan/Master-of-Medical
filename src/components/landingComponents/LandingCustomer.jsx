import React from 'react'
import {Box, Container, Stack, Typography} from '@mui/material'
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
const LandingCustomer = () => {
  return (
    <React.Fragment>
        <Box style={{height: 'auto',width:'100%',padding:'3% 0 2% 5%'}}>
            <Typography variant='h4' sx={{fontWeight:'bold',marginBottom:'2%'}}>What Our Customers Have to Say</Typography>
            <Slider {...settings}> 
                <div className='slide'>
                    <Stack direction='row'>
                        <Container maxWidth='sm' sx={{height:'100%',padding:'2%'}}>
                            <Box style={{height:'300px',width:'100%'}}>
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            </Box>
                        </Container>
                        <Container maxWidth='sm' sx={{height:'100%',padding:'2%'}}>
                            <Box style={{width:'80%',margin:'20% auto'}}>
                            <Typography variant='p' sx={{fontStyle:'italic',color:"#534d4d"}}>"Since using Master of Medical, we’ve cut our procurement time in half and improved our margins significantly. It’s a game changer."</Typography><br /><br/>
                            <Typography variant='p' sx={{fontStyle:'italic',color:"#534d4d",fontSize:'15px'}}><b>Dr. Rajeev Menon,</b> Procurement Head, MedLink Hospitals</Typography><br/>
                            </Box>
                        </Container>
                    </Stack>
                </div>
                <div className='slide'>
                    <Stack direction='row'>
                        <Container maxWidth='sm' sx={{height:'100%',padding:'2%'}}>
                            <Box style={{height:'300px',width:'100%'}}>
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            </Box>
                        </Container>
                        <Container maxWidth='sm' sx={{height:'100%',padding:'2%'}}>
                            <Box style={{width:'80%',margin:'20% auto'}}>
                            <Typography variant='p' sx={{fontStyle:'italic',color:"#534d4d"}}>"The platform is intuitive, inventory updates are live, and customer service is top-notch. Highly recommended."</Typography><br /><br/>
                            <Typography variant='p' sx={{fontStyle:'italic',color:"#534d4d",fontSize:'15px'}}><b>Dr. Priya Bansal,</b> Director, Lifecare Diagnostics</Typography><br/>
                            </Box>
                        </Container>
                    </Stack>
                </div>
            </Slider>
        </Box>
    </React.Fragment>
  )
}

export default LandingCustomer