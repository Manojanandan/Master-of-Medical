import React from 'react'
import {Box, Button, Container, Stack, Typography} from '@mui/material'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pharmaLogo from '../assets/pharmaLogo.jpeg'
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from 'react-router-dom';

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
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', height: '100%', width: '100%', margin: '5% 0 0 ' }}>
                <Container maxWidth="sm">
                    <Typography variant='h3' component='div' sx={{ margin: '0 8%', fontWeight: 'bold', color: '#291175' }}>Supply</Typography>
                    <Stack direction='row'>
                        <Typography variant='h3' component='div' sx={{ marginLeft: '8% ', fontWeight: 'bold', color: '#c5225f', lineHeight: '4rem' }}>Health. </Typography>
                        <Typography variant='h3' component='div' sx={{ fontWeight: 'bold', color: '#291175', lineHeight: '4rem' }}>Care</Typography>
                    </Stack>
                    <Stack direction='row' sx={{ margin: '5% 0 0 8%', width: '75%', color: '#7a7a7d' }}>
                        <Typography variant='p'>Empowering Healthcare through tech-driven platform for end to end medical procurement solutions.</Typography>
                    </Stack>
                    <Stack direction='row' sx={{ margin: '5% 0 0 8%', width: '75%', color: '#030303', fontWeight: 'bold' }}>
                        <Typography variant='p'>What we offer?</Typography>
                    </Stack>
                    <Stack direction='row' sx={{ margin: '3% 0 1% 8%', width: '96%' }} spacing={4}>
                        <Typography variant='p' sx={{ color: '#080808', }}>Buy Medical & Veterinary Supplies </Typography>
                        <Typography variant='p' sx={{ color: '#8c8787', }}>Buy Equipment </Typography>
                    </Stack>
                    <Stack direction='row' sx={{ margin: '3% 0 1% 8%', width: '96%' }} spacing={9}>
                        <Typography variant='p' sx={{ color: '#8c8787', }}>Asset Lifecycle Management </Typography>
                        <Typography variant='p' sx={{ color: '#8c8787', }}>Financing Solutions</Typography>
                    </Stack>
                    <Stack direction='row' sx={{ margin: '3% 0 1% 8%', width: '96%' }} spacing={7}>
                        <Typography variant='p' sx={{ color: '#8c8787', }}>Dental Supplies/ Custom Made</Typography>
                        <Typography variant='p' sx={{ color: '#8c8787', }}>AI for Inventory Management </Typography>
                    </Stack>
                    <Stack direction='row' sx={{ margin: '3% 0 4% 8%', width: '96%' }} spacing={9}>
                        <Typography variant='p' sx={{ color: '#8c8787', }}>Value Procurement Optimizer</Typography>
                        <Typography variant='p' sx={{ color: '#8c8787', }}>Turnkey Projects </Typography>
                    </Stack>
                </Container>
                <Container maxWidth="sm" sx={{ height:'400px' }}>
                    <Slider {...settings}>
                        <div><img src="http://web.archive.org/web/20240720115017im_/https://www.medikabazaar.com/static/images/banner1.png" alt={pharmaLogo} style={{backgroundPosition:'center',backgroundSize:'cover',borderRadius:'10%',height:'400px',width:'100%'}} /></div>
                        <div><img src="http://web.archive.org/web/20240720115017im_/https://www.medikabazaar.com/static/images/banner1.png" alt={pharmaLogo} style={{backgroundPosition:'center',backgroundSize:'cover',borderRadius:'10%',height:'400px',width:'100%'}} /></div>
                        <div><img src="http://web.archive.org/web/20240720115017im_/https://www.medikabazaar.com/static/images/banner1.png" alt={pharmaLogo} style={{backgroundPosition:'center',backgroundSize:'cover',borderRadius:'10%',height:'400px',width:'100%'}} /></div>
                    </Slider>
                </Container>
            </Box>
            <Button onClick={() => navigate('/login')} startIcon={<StoreIcon />} variant='contained' sx={{position:'fixed',bottom:'5%',right:'3%',borderRadius:'15px',background: 'linear-gradient(90deg, rgba(210,138,74,1) 12%, rgba(210,111,148,1) 92%)',textTransform:'capitalize',fontWeight:'bold',padding:'10px 20px',fontSize:'15px',zIndex:'2',cursor:'pointer'}}>Shop now</Button>
        </React.Fragment>
    )
}

export default LandingHero