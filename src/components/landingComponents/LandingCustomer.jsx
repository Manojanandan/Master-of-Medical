import React, { useRef } from 'react'
import { Box, Container, Stack, Typography } from '@mui/material'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const settings = {
    dots: false,
    // infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
    arrows: false,
};
const LandingCustomer = () => {
    const sliderRef = useRef(null);
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
    return (
        <React.Fragment>
            <Box style={{ height: 'auto', width: '100%', padding: '3% 0 2% 0%',margin: '4% 0 2%', backgroundColor: '#f1f2f7' }}>
                <Box sx={{ margin: '0 auto 2%', width: '87%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '2rem' }}>What Our Customers <br /> Have to Say</Typography>
                    <Stack direction='row' spacing={2}>
                        <Box
                            sx={{ height: '40px', width: '40px', border: 'solid 1px #2424', backgroundColor: '#2424', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s', '&:active': { backgroundColor: '#c5225f', } }}
                            onClick={handlePrev}
                        >
                            <ArrowBackIcon />
                        </Box>
                        <Box
                            sx={{ height: '40px', width: '40px', border: 'solid 1px #2424', backgroundColor: '#2424', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s', '&:active': { backgroundColor: '#c5225f', }, }}
                            onClick={handleNext}
                        >
                            <ArrowForwardIcon />
                        </Box>
                    </Stack>
                </Box>
                <Box sx={{ width: '87%', margin: '0 auto' }}>
                    <Slider ref={sliderRef} {...settings} >
                        <div className='slide'>
                            <Stack direction='row' sx={{margin:'3% 0'}} spacing={8}>
                                <Box sx={{ height: '100%',width:'600px' }}>
                                    <Box style={{ height: '300px', width: '100%' }}>
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </Box>
                                </Box>
                                <Box sx={{ height: '100%', width:'600px' }}>
                                    <Box style={{ width: '100%', margin: '15% 0',  }}>
                                        <Typography variant='p' component='div' sx={{fontSize:'23px',fontWeight:'bold'}}>DR. RAJEEV MENON</Typography>
                                        <Typography variant='p' component='div' sx={{fontSize:'22px',fontWeight:'bold'}}>Procurement Head,MedLink Hospitals</Typography><br />
                                        <Typography variant='p' component='div' sx={{fontSize:'18px',fontWeight:'bold'}}>Since using Master of Medical,we've cut our procurement time in half and improved our margins significantly.It's a game changer.</Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </div>
                         <div className='slide'>
                            <Stack direction='row' sx={{margin:'3% 0'}} spacing={8}>
                                <Box sx={{ height: '100%',width:'600px' }}>
                                    <Box style={{ height: '300px', width: '100%' }}>
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </Box>
                                </Box>
                                <Box sx={{ height: '100%', width:'600px' }}>
                                    <Box style={{ width: '100%', margin: '15% 0',}}>
                                        <Typography variant='p' component='div' sx={{fontSize:'23px',fontWeight:'bold',textTransform:'uppercase'}}>Dr. Priya Bansal</Typography>
                                        <Typography variant='p' component='div' sx={{fontSize:'22px',fontWeight:'bold'}}>Director, Lifecare Diagnostics</Typography><br />
                                        <Typography variant='p' component='div' sx={{fontSize:'18px',fontWeight:'bold'}}>The platform is intuitive, inventory updates are live, and customer service is top-notch. Highly recommended.</Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </div>
                    </Slider>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default LandingCustomer