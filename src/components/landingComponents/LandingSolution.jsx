import React, { useEffect } from 'react'
import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material'
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SpeedIcon from '@mui/icons-material/Speed';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';

const LandingSolution = () => {
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 400) {
    
          } else {
          }
        };
      
        window.addEventListener('scroll', handleScroll);
      
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [])
    return (
        <React.Fragment >
            <Box sx={{ height: 'auto', width: '100%', textAlign: 'center' }} id='solution'>
                <Typography variant='h3' sx={{ margin: '4% 0 3%', fontWeight: '500' }}>Our Solutions</Typography>
                <Box sx={{ height: 'auto', width: '90%', margin: '5% auto', display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ height: '100%', width: '40%' }}></Box>
                    <Box sx={{ height: '100%', width: '55%', textAlign: 'left' }}>
                        <Box sx={{ marginBottom: '8%' }}>
                            <Typography variant='h3' sx={{ fontWeight: 'bold', color: '#c5225f', marginBottom: '1%' }}>MARKETPLACE</Typography>
                            <Stack direction='row' spacing={2}>
                                <Box sx={{ height: '30px', width: '200px', borderRight: 'solid 1px #6f6ade', display: 'flex', justifyContent: 'left' }}>
                                    <IconButton><LocalAtmIcon sx={{ fontSize: '2rem', color: '#6f6ade' }} /></IconButton>
                                    <Typography variant='p' sx={{ color: '#6f6ade', fontSize: '18px', fontWeight: 'bold', margin: '2px 0 0 15px' }}>Best Price</Typography>
                                </Box>
                                <Box sx={{ height: '30px', width: '200px', borderRight: 'solid 1px #6f6ade', display: 'flex', justifyContent: 'left' }}>
                                    <IconButton><SpeedIcon sx={{ fontSize: '2rem', color: '#6f6ade' }} /></IconButton>
                                    <Typography variant='p' sx={{ color: '#6f6ade', fontSize: '18px', fontWeight: 'bold', margin: '2px 0 0 15px' }}>Fast Delivery</Typography>
                                </Box>
                                <Box sx={{ height: '30px', width: '200px', display: 'flex', justifyContent: 'left' }}>
                                    <IconButton><WifiTetheringIcon sx={{ fontSize: '2rem', color: '#6f6ade' }} /></IconButton>
                                    <Typography variant='p' sx={{ color: '#6f6ade', fontSize: '18px', fontWeight: 'bold', margin: '2px 0 0 15px' }}>Widest Range</Typography>
                                </Box>
                            </Stack>
                            <Box sx={{ height: '100px', width: '85%', margin: '5% 0 1%', fontSize: '15px', color: '#7f7878' }}>
                                <Typography variant='p' sx={{ lineHeight: '1.6rem' }}>Our marketplace boasts an extensive catalogue of medical supplies and equipment, catering to diverse needs across various medical specialties. From basic consumables to sophisticated medical devices, you can find it all in one place.</Typography>
                            </Box>
                            <Stack direction='row' spacing={4} sx={{ height: '100px', width: '85%', margin: '0', fontSize: '15px', }}>
                                <Box sx={{ height: '80px', width: '120px', }}>
                                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#f1ac1b', marginBottom: '7%' }}>150K+</Typography>
                                    <Typography variant='p' sx={{ margin: '2% 5%', fontSize: '14px', color: '#4d4646' }}>Customers</Typography>
                                </Box>
                                <Box sx={{ height: '80px', width: '120px', }}>
                                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#f1ac1b', marginBottom: '7%' }}>900K+</Typography>
                                    <Typography variant='p' sx={{ margin: '2% 5%', fontSize: '14px', color: '#4d4646' }}>SKUs</Typography>
                                </Box>
                                <Box sx={{ height: '80px', width: '150px', }}>
                                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#f1ac1b', marginBottom: '7%' }}>40K+</Typography>
                                    <Typography variant='p' sx={{ margin: '2% 5%', fontSize: '14px', color: '#4d4646' }}>Fulfilment Location</Typography>
                                </Box>
                                <Box sx={{ height: '80px', width: '120px', }}>
                                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#f1ac1b', marginBottom: '7%' }}>20K+</Typography>
                                    <Typography variant='p' sx={{ margin: '2% 5%', fontSize: '14px', color: '#4d4646' }}>Sellers</Typography>
                                </Box>
                            </Stack>
                            <Button variant='contained' sx={{ padding: '2% 5%', color: '#fff', textTransform: 'capitalize', fontWeight: 'bold', borderRadius: '10px', margin: '1% 0', background: 'linear-gradient(90deg, rgba(210,138,74,1) 12%, rgba(210,111,148,1) 92%)' }}>Know More</Button>
                        </Box>
                        <Box sx={{ marginBottom: '8%' }}>
                            <Typography variant='h3' sx={{ fontWeight: 'bold', color: '#c5225f', marginBottom: '1%' }}>MBARC</Typography>
                            <Stack direction='row' spacing={2}>
                                <Box sx={{ height: '30px', width: '250px', borderRight: 'solid 1px #6f6ade', display: 'flex', justifyContent: 'left' }}>
                                    <IconButton><LocalAtmIcon sx={{ fontSize: '2rem', color: '#6f6ade' }} /></IconButton>
                                    <Typography variant='p' sx={{ color: '#6f6ade', fontSize: '18px', fontWeight: 'bold', margin: '2px 0 0 15px' }}>Certified engineers</Typography>
                                </Box>
                                <Box sx={{ height: '30px', width: '220px', borderRight: 'solid 1px #6f6ade', display: 'flex', justifyContent: 'left' }}>
                                    <IconButton><SpeedIcon sx={{ fontSize: '2rem', color: '#6f6ade' }} /></IconButton>
                                    <Typography variant='p' sx={{ color: '#6f6ade', fontSize: '18px', fontWeight: 'bold', margin: '2px 0 0 15px' }}>Trusted service</Typography>
                                </Box>
                                <Box sx={{ height: '30px', width: '200px', display: 'flex', justifyContent: 'left' }}>
                                    <IconButton><WifiTetheringIcon sx={{ fontSize: '2rem', color: '#6f6ade' }} /></IconButton>
                                    <Typography variant='p' sx={{ color: '#6f6ade', fontSize: '18px', fontWeight: 'bold', margin: '2px 0 0 15px' }}>Fair price</Typography>
                                </Box>
                            </Stack>
                            <Box sx={{ height: '100%', width: '85%', margin: '5% 0 3%', fontSize: '15px', color: '#7f7878' }}>
                                <Typography variant='p' sx={{ lineHeight: '1.6rem' }}>MB Asset management recycle, and care is an on-demand marketplace for equipment service, spares AMC/CMC, pre-owned equipment sale and comprehensive asset management. With the help of advanced app-based solution and technical support through on ground team of 500+ Bio Medical Engineers, ensuring a longer efficient life for your medical equipment.</Typography>
                            </Box>
                            <Stack direction='row' spacing={4} sx={{ height: '100px', width: '90%', margin: '0', fontSize: '15px', }}>
                                <Box sx={{ height: '80px', width: '120px', }}>
                                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#f1ac1b', marginBottom: '7%' }}>10K+</Typography>
                                    <Typography variant='p' sx={{ margin: '2% 5%', fontSize: '14px', color: '#4d4646' }}>Customers</Typography>
                                </Box>
                                <Box sx={{ height: '80px', width: '150px', }}>
                                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#f1ac1b', marginBottom: '7%' }}>500K+</Typography>
                                    <Typography variant='p' sx={{ margin: '2% 5%', fontSize: '14px', color: '#4d4646' }}>Certified Engineers</Typography>
                                </Box>
                                <Box sx={{ height: '80px', width: '150px', }}>
                                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#f1ac1b', marginBottom: '7%' }}>50K+</Typography>
                                    <Typography variant='p' sx={{ margin: '2% 5%', fontSize: '14px', color: '#4d4646' }}>Completed Jobs</Typography>
                                </Box>
                                <Box sx={{ height: '80px', width: '150px', }}>
                                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#f1ac1b', marginBottom: '7%' }}>5K+</Typography>
                                    <Typography variant='p' sx={{ margin: '2% 5%', fontSize: '14px', color: '#4d4646' }}>Pre-owned Devices</Typography>
                                </Box>
                            </Stack>
                            <Button variant='contained' sx={{ padding: '2% 5%', color: '#fff', textTransform: 'capitalize', fontWeight: 'bold', borderRadius: '10px', margin: '1% 0', background: 'linear-gradient(90deg, rgba(210,138,74,1) 12%, rgba(210,111,148,1) 92%)' }}>Know More</Button>
                        </Box>
                        <Box sx={{ marginBottom: '8%' }}>
                            <Typography variant='h3' sx={{ fontWeight: 'bold', color: '#c5225f', marginBottom: '1%' }}>VIZI</Typography>
                            <Stack direction='row' spacing={2}>
                                <Box sx={{ height: '30px', width: '250px', borderRight: 'solid 1px #6f6ade', display: 'flex', justifyContent: 'left' }}>
                                    <IconButton><LocalAtmIcon sx={{ fontSize: '2rem', color: '#6f6ade' }} /></IconButton>
                                    <Typography variant='p' sx={{ color: '#6f6ade', fontSize: '18px', fontWeight: 'bold', margin: '2px 0 0 15px' }}>Certified engineers</Typography>
                                </Box>
                                <Box sx={{ height: '30px', width: '220px', borderRight: 'solid 1px #6f6ade', display: 'flex', justifyContent: 'left' }}>
                                    <IconButton><SpeedIcon sx={{ fontSize: '2rem', color: '#6f6ade' }} /></IconButton>
                                    <Typography variant='p' sx={{ color: '#6f6ade', fontSize: '18px', fontWeight: 'bold', margin: '2px 0 0 15px' }}>Trusted service</Typography>
                                </Box>
                                <Box sx={{ height: '30px', width: '200px', display: 'flex', justifyContent: 'left' }}>
                                    <IconButton><WifiTetheringIcon sx={{ fontSize: '2rem', color: '#6f6ade' }} /></IconButton>
                                    <Typography variant='p' sx={{ color: '#6f6ade', fontSize: '18px', fontWeight: 'bold', margin: '2px 0 0 15px' }}>Fair price</Typography>
                                </Box>
                            </Stack>
                            <Box sx={{ height: '100%', width: '85%', margin: '5% 0 3%', fontSize: '15px', color: '#7f7878' }}>
                                <Typography variant='p' sx={{ lineHeight: '1.6rem' }}>MB Asset management recycle, and care is an on-demand marketplace for equipment service, spares AMC/CMC, pre-owned equipment sale and comprehensive asset management. With the help of advanced app-based solution and technical support through on ground team of 500+ Bio Medical Engineers, ensuring a longer efficient life for your medical equipment.</Typography>
                            </Box>
                            <Stack direction='row' spacing={4} sx={{ height: '100px', width: '90%', margin: '0', fontSize: '15px', }}>
                                <Box sx={{ height: '80px', width: '120px', }}>
                                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#f1ac1b', marginBottom: '7%' }}>10K+</Typography>
                                    <Typography variant='p' sx={{ margin: '2% 5%', fontSize: '14px', color: '#4d4646' }}>Customers</Typography>
                                </Box>
                                <Box sx={{ height: '80px', width: '150px', }}>
                                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#f1ac1b', marginBottom: '7%' }}>500K+</Typography>
                                    <Typography variant='p' sx={{ margin: '2% 5%', fontSize: '14px', color: '#4d4646' }}>Certified Engineers</Typography>
                                </Box>
                                <Box sx={{ height: '80px', width: '150px', }}>
                                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#f1ac1b', marginBottom: '7%' }}>50K+</Typography>
                                    <Typography variant='p' sx={{ margin: '2% 5%', fontSize: '14px', color: '#4d4646' }}>Completed Jobs</Typography>
                                </Box>
                                <Box sx={{ height: '80px', width: '150px', }}>
                                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#f1ac1b', marginBottom: '7%' }}>5K+</Typography>
                                    <Typography variant='p' sx={{ margin: '2% 5%', fontSize: '14px', color: '#4d4646' }}>Pre-owned Devices</Typography>
                                </Box>
                            </Stack>
                            <Button variant='contained' sx={{ padding: '2% 5%', color: '#fff', textTransform: 'capitalize', fontWeight: 'bold', borderRadius: '10px', margin: '1% 0', background: 'linear-gradient(90deg, rgba(210,138,74,1) 12%, rgba(210,111,148,1) 92%)' }}>Know More</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default LandingSolution