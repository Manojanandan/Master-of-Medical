import React from 'react'
import { useNavigate } from 'react-router-dom';
import pharmaLogo from '../../assets/pharmaSiteLogo.png'
import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-scroll';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';

const LandingNavbar = () => {
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none', padding: '1% 0 0'}}>
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', padding: '0 1.5% 0 2%' }}>
                    <Stack direction='row' spacing={2} sx={{ width: 'auto', height: '100%', }}>
                        <img src={pharmaLogo} alt={pharmaLogo} />
                    </Stack>
                    <Stack direction='row' spacing={3} sx={{}}>
                        <Link to='home' spy={true} smooth={true} offset={-100} duration={500} style={{ textDecoration: 'none', color: '#000', cursor: 'pointer', textTransform: 'uppercase' }}><Typography variant='p' sx={{
                            fontSize: '1.1rem', fontWeight: 'bold', position: 'relative',
                            '&:after': {
                                content: '""',
                                display: 'block',
                                width: 0,
                                height: '3px',
                                background: '#009e92',
                                transition: 'width 0.3s',
                                position: 'absolute',
                                left: 0,
                                bottom: -5,
                            },
                            '&:hover:after': {
                                width: '80%',
                            },
                        }}>Home</Typography></Link>
                        <Link to='solution' spy={true} smooth={true} offset={-100} duration={500} style={{ textDecoration: 'none', color: '#000', cursor: 'pointer', textTransform: 'uppercase' }}> <Typography variant='p' sx={{
                            fontSize: '1.1rem', fontWeight: 'bold', position: 'relative', '&:after': {
                                content: '""',
                                display: 'block',
                                width: 0,
                                height: '3px',
                                background: '#009e92',
                                transition: 'width 0.3s',
                                position: 'absolute',
                                left: 0,
                                bottom: -5,
                            },
                            '&:hover:after': {
                                width: '80%',
                            },
                        }} >Our Solutions
                        </Typography></Link>
                        <Link to='reach' spy={true} smooth={true} offset={-100} duration={500} style={{ textDecoration: 'none', color: '#000', cursor: 'pointer', textTransform: 'uppercase' }}><Typography variant='p' sx={{
                            fontSize: '1.1rem', fontWeight: 'bold', position: 'relative', '&:after': {
                                content: '""',
                                display: 'block',
                                width: 0,
                                height: '3px',
                                background: '#009e92',
                                transition: 'width 0.3s',
                                position: 'absolute',
                                left: 0,
                                bottom: -5,
                            },
                            '&:hover:after': {
                                width: '80%',
                            },
                        }}>
                            Reach Us</Typography></Link>
                    </Stack>
                    <Stack direction='row' spacing={3}>
                        <Box sx={{ height: '50px', width: '150px', borderBottom: 'solid 1.8px #c5225f', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', cursor: 'pointer' }} onClick={() => { navigate('/auth/register'), sessionStorage.setItem("userType", "user") }}>
                            <LocalMallIcon sx={{ color: 'black', fontSize: '1.6rem' }} />
                            <Typography variant='span' component='div' sx={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'black', marginTop: '5px' }}>SHOP NOW</Typography>
                        </Box>
                        <Box sx={{ height: '50px', width: '160px', borderBottom: 'solid 1.8px #009e92', display: 'flex', justifyContent: 'space-around', alignItems: 'center', cursor: 'pointer' }} onClick={() => { navigate('/auth/register'), sessionStorage.setItem("userType", "vendor") }}>
                            <EnhancedEncryptionIcon sx={{ color: 'black', fontSize: '1.8rem' }} />
                            <Typography variant='span' component='div' sx={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'black', marginTop: '5px' }}>BE A SELLER</Typography>
                        </Box>
                    </Stack>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default LandingNavbar