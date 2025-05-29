import React, { useEffect } from 'react'
import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material'
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SpeedIcon from '@mui/icons-material/Speed';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import serviceBanner from '../../assets/services_medical_banner.png'

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
                <Typography variant='h3' sx={{ margin: '4% 0 1%', fontWeight: '500' }}>Our Solutions</Typography>
                <Box sx={{width:'50%',margin:'0 auto'}}><Typography variant='p' sx={{fontSize:'17px',color: '#7f7878' }}>At Master of Medical (M.O.M), we’re not just building a platform—we’re solving a real, critical problem in India’s healthcare supply chain.</Typography></Box>
                <Box sx={{ height: 'auto', width: '90%', margin: '5% auto', display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{ height: '800px', width: '48%',margin:'8% 0', }}>
                        <img src={serviceBanner} alt={serviceBanner} height='100%' width='100%' style={{borderRadius:'10px'}} />
                    </Box>
                    <Box sx={{ height: '100%', width: '48%', textAlign: 'left', }}>
                        <Box sx={{ marginBottom: '3%' }}>
                            <Typography variant='p' sx={{ fontWeight: 'bold', color: '#c5225f', marginBottom: '1%',fontSize:'2rem' }}>The Problem</Typography>
                            {/* <Stack direction='row' spacing={2}>
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
                            </Stack> */}
                            <Box sx={{ height: '100px', width: '90%', margin: '2% 0 1%', fontSize: '16px', color: '#090909', }}>
                                <Typography variant='p' sx={{ lineHeight: '1.6rem' }}>India’s medical procurement ecosystem is traditionally dependent on multiple layers of intermediaries—distributors, stockists, and agents. This leads to inflated costs, delayed deliveries, inconsistent product quality, and lack of real-time visibility.</Typography>
                            </Box>
                            {/* <Stack direction='row' spacing={4} sx={{ height: '100px', width: '85%', margin: '0', fontSize: '15px', }}>
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
                            </Stack> */}
                            {/* <Button variant='contained' sx={{ padding: '2% 5%', color: '#fff', textTransform: 'capitalize', fontWeight: 'bold', borderRadius: '10px', margin: '1% 0', background: 'linear-gradient(90deg, rgba(210,138,74,1) 12%, rgba(210,111,148,1) 92%)' }}>Know More</Button> */}
                        </Box>
                        <Box sx={{ marginBottom: '5%' }}>
                            <Typography variant='p' sx={{ fontWeight: 'bold', color: '#c5225f', marginBottom: '1%',fontSize:'2rem' }}>Our Solution</Typography>
                            <Box sx={{ height: '100%', width: '90%', margin: '2% 0 3%', fontSize: '16px', color: '#090909' }}>
                                <Typography variant='p' sx={{ lineHeight: '1.6rem' }}>We’ve built a tech-powered, direct-from-manufacturer procurement platform that eliminates all unnecessary middlemen. Hospitals, clinics, diagnostic labs, and pharmacies can now:</Typography>
                            </Box>
                            <Box sx={{padding:'0 2%'}}>
                                <ul>
                                    <li style={{listStylePosition:'inside',marginBottom:'1%'}}>Source products directly from certified manufacturers</li>
                                    <li style={{listStylePosition:'inside',marginBottom:'1%'}}>Access live inventory, real-time pricing, and fast delivery</li>
                                    <li style={{listStylePosition:'inside',marginBottom:'1%'}}>Place bulk orders without distributor margins</li>
                                    <li style={{listStylePosition:'inside',marginBottom:'1%'}}>Track orders end-to-end via our integrated logistics system</li>
                                    <li style={{listStylePosition:'inside',marginBottom:'3%'}}>Enjoy greater control, transparency, and cost savings</li>
                                
                                </ul>
                            </Box>
                        </Box>
                        <Box sx={{ marginBottom: '5%' }}>
                            <Typography variant='p' sx={{ fontWeight: 'bold', color: '#c5225f', marginBottom: '1%',fontSize:'2rem' }}>For Sellers</Typography>
                            <Box sx={{ height: '100%', width: '90%', margin: '2% 0 3%', fontSize: '16px', color: '#090909' }}>
                                <Typography variant='p' sx={{ lineHeight: '1.6rem' }}>We empower manufacturers and medical equipment producers to</Typography>
                            </Box>
                             <Box sx={{padding:'0 2%'}}>
                                <ul>
                                    <li style={{listStylePosition:'inside',marginBottom:'1%'}}>List their products with flexible pricing</li>
                                    <li style={{listStylePosition:'inside',marginBottom:'1%'}}>Reach verified institutional buyers across India</li>
                                    <li style={{listStylePosition:'inside',marginBottom:'1%'}}>Manage inventory and shipping with zero middle-agent hassles</li>
                                    <li style={{listStylePosition:'inside',marginBottom:'1%'}}>Boost bulk demand without marketing overheads</li>                                
                                </ul>
                            </Box>
                            <Box sx={{ height: '100%', width: '90%', margin: '2% 0 3%', fontSize: '16px', color: '#090909' }}>
                                <Typography variant='p' sx={{ lineHeight: '1.6rem' }}>With M.O.M, we’re building a single, unified platform where medical buyers and sellers connect, transact, and grow—without friction.</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ marginBottom: '5%' }}>
                            <Typography variant='p' sx={{ fontWeight: 'bold', color: '#c5225f', marginBottom: '1%', fontSize:'2rem' }}>Our Ultimate Goal</Typography>
                            <Box sx={{ height: '100px', width: '90%', margin: '2% 0 0%', fontSize: '16px', color: '#090909' }}>
                                <Typography variant='p' sx={{ lineHeight: '1.6rem' }}>A smarter, faster, and more affordable healthcare system—powered by technology, backed by trust.</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default LandingSolution