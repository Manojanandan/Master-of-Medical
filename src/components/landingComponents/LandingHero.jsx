import React from 'react'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner1 from '../../assets/banner1.jpg'
import Banner2 from '../../assets/banner2.jpg'
import Banner3 from '../../assets/banner3.jpg'
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from 'react-router-dom';
import EastIcon from '@mui/icons-material/East';

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

const LandingHero = () => {
    const navigate = useNavigate()
    return (
        <React.Fragment >
            <Slider {...settings}>
            <div>
                <div style={{ height: '700px', width: '90%', margin: '0 auto', }}>
                    <Box sx={{ height: '600px', width: '100%', marginBottom: '5%', backgroundImage: `url(${Banner1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', }}>
                        <Box sx={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
                            <Typography variant='P' component='div' sx={{ margin: '0 5%', fontWeight: 'bold', color: '#00000', fontSize: '2.7rem', textTransform: 'uppercase' }}>REVOLUTIONIZING</Typography>
                            <Typography variant='p' component='div' sx={{ margin: '0 0 0 5%', fontWeight: 'bold', color: '#00000', fontSize: '2.5rem', textTransform: 'uppercase' }}>HEALTHCARE SUPPLY CHAINS</Typography>
                            <Stack direction='row' sx={{ margin: '5% 0' }}>
                                <Typography variant='p' component='div' sx={{ marginLeft: '5% ', fontWeight: 'bold', color: '#00000', fontSize: '1.3rem' }}>Save time, reduce costs, and increase margins with India's fastest-growing B2B medical supply platform.</Typography>
                            </Stack>
                            <Stack onClick={() => alert()} direction='row' sx={{ margin: '2% 0 0 5%', width: '48%', borderBottom: 'solid 2px black', fontSize: '1.3rem', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase' }} spacing={2}>
                                <Typography variant='p' component='div'>EXPLORE TO PRODUCTS</Typography>
                                <EastIcon sx={{ fontSize: '2rem' }} />
                            </Stack>
                        </Box>
                    </Box>
                </div>
            </div>
            <div>
                <div style={{ height: '700px', width: '90%', margin: '0 auto', }}>
                    <Box sx={{ height: '600px', width: '100%', marginBottom: '5%', backgroundImage: `url(${Banner2})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', }}>
                        <Box sx={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography variant='P' component='div' sx={{ margin: '0 5%', fontWeight: 'bold', color: '#00000', fontSize: '2.7rem', textTransform: 'uppercase' }}>Empowering</Typography>
                            <Typography variant='p' component='div' sx={{ margin: '0 0 0 5%', fontWeight: 'bold', color: '#00000', fontSize: '2rem', textTransform: 'uppercase' }}>DIGITAL INDIA Through Smart Procurement</Typography>
                            <Stack direction='row' sx={{ margin: '5% 0  5% 2%', width: '70%' }}>
                                <Typography variant='p' component='div' sx={{ marginLeft: '5% ', fontWeight: 'bold', color: '#00000', fontSize: '1.3rem' }}>With real-time inventory, instant booking, and verified sellers, M.O.M simplifies medical sourcing for hospitals, clinics, and labs.</Typography>
                            </Stack>
                            <Stack onClick={() => alert()} direction='row' sx={{ margin: '0 0 0 5%', width: '17%', borderBottom: 'solid 2px black', fontSize: '1.3rem', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase' }} spacing={2}>
                                <Typography variant='p' component='div'>Join Now </Typography>
                                <EastIcon sx={{ fontSize: '2rem' }} />
                            </Stack>
                        </Box>
                    </Box>
                </div>
            </div>
            <div>
                <div style={{ height: '700px', width: '90%', margin: '0 auto', }}>
                    <Box sx={{ height: '600px', width: '100%', marginBottom: '5%', backgroundImage: `url(${Banner3})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', }}>
                        <Box sx={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
                            <Typography variant='P' component='div' sx={{ margin: '0 5%', fontWeight: 'bold', color: '#00000', fontSize: '2.7rem', textTransform: 'uppercase' }}>Direct from Manufacturers.</Typography>
                            <Typography variant='p' component='div' sx={{ margin: '0 0 0 5%', fontWeight: 'bold', color: '#00000', fontSize: '2rem', textTransform: 'uppercase' }}>Zero Middlemen. Maximum Savings.</Typography>
                            <Stack direction='row' sx={{ margin: '5% 0' }}>
                                <Typography variant='p' component='div' sx={{ marginLeft: '5% ', fontWeight: 'bold', color: '#00000', fontSize: '1.3rem', width: '70%' }}>Our mission is simple: streamline healthcare procurement for better pricing, faster logistics, and trusted quality.</Typography>
                            </Stack>
                            <Stack onClick={() => alert()} direction='row' sx={{ margin: '0 0 0 5%', width: '23%', borderBottom: 'solid 2px black', fontSize: '1.3rem', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase' }} spacing={2}>
                                <Typography variant='p' component='div'>Start Saving </Typography>
                                <EastIcon sx={{ fontSize: '2rem' }} />
                            </Stack>
                        </Box>
                    </Box>
                </div>
            </div>
            </Slider>

            <Button onClick={() => navigate('/login')} startIcon={<StoreIcon />} variant='contained' sx={{ position: 'fixed', bottom: '5%', right: '3%', borderRadius: '15px', background: 'linear-gradient(90deg, rgba(210,138,74,1) 12%, rgba(210,111,148,1) 92%)', textTransform: 'capitalize', fontWeight: 'bold', padding: '10px 20px', fontSize: '15px', zIndex: '2', cursor: 'pointer' }}>Shop now</Button>
        </React.Fragment>
    )
}

export default LandingHero


{/* <Box id='home' sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', width: '90%', margin: '5% auto' }}>
                        <Box sx={{ width: '600px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '5% 0' }}>
                            <Typography variant='P' component='div' sx={{ margin: '0 5%', fontWeight: 'bold', color: '#00000', fontSize: '2.5rem' }}>REVOLUTIONIZING</Typography>
                            <Typography variant='p' component='div' sx={{ margin: '0 0 0 5%', fontWeight: 'bold', color: '#00000', fontSize: '2.3rem' }}>HEALTHCARE SUPPLY CHAINS</Typography>
                            <Stack direction='row' sx={{ margin: '5% 0' }}>
                                <Typography variant='p' component='div' sx={{ marginLeft: '5% ', fontWeight: 'bold', color: '#00000', fontSize: '1.3rem' }}>Save time, reduce costs, and increase margins with India's fastest-growing B2B medical supply platform.</Typography>
                            </Stack>
                            <Stack direction='row' sx={{ margin: '0% 0 0 5%', width: '52%', borderBottom: 'solid 2px black', fontSize: '1.3rem', fontWeight: 'bold', cursor: 'pointer' }} spacing={2}>
                                <Typography variant='p' component='div'>EXPLORE TO PRODUCTS</Typography>
                                <EastIcon sx={{ fontSize: '2rem' }} />
                            </Stack>
                        </Box>
                        <Box sx={{ height: '400px', width: '600px', marginBottom: '5%' }}>
                            <div >
                                <img src={Banner1} alt={Banner1} style={{ height: '400px', width: '600px', backgroundPosition: 'center', backgroundSize: 'cover', }} />
                            </div>
                        </Box>
                    </Box> */}