import React from 'react'
import { useNavigate } from 'react-router-dom';
import pharmaLogo from '../../assets/pharmaLogo.jpeg'
import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material'
import {Link} from 'react-scroll';

const LandingNavbar = () => {
    const navigate = useNavigate()
  return (
    <React.Fragment>
        <AppBar position="static" sx={{background:'transparent',boxShadow:'none'}}>
            <Toolbar disableGutters sx={{display:'flex',justifyContent:'space-around',width:'100%',margin:'auto'}}>
                <Stack direction='row' spacing={2}>
                    <img src={pharmaLogo} alt={pharmaLogo} width='50' height='50' />
                </Stack>
                <Stack direction='row' spacing={4}>
                    <Link to='home' spy={true} smooth={true} offset={-100} duration={500} style={{textDecoration:'none',color:'#000',cursor:'pointer'}}><Typography variant='h6' sx={{fontSize:'1.1rem'}}>Home</Typography></Link>
                    <Link to='solution' spy={true} smooth={true} offset={-100} duration={500} style={{textDecoration:'none',color:'#000',cursor:'pointer'}}> <Typography variant='h6' sx={{fontSize:'1.1rem'}} >Our Solutions
                    </Typography></Link>
                    <Link to='reach' spy={true} smooth={true} offset={-100} duration={500} style={{textDecoration:'none',color:'#000',cursor:'pointer'}}><Typography variant='h6' sx={{fontSize:'1.1rem'}}>
                        Reach Us</Typography></Link>
                </Stack>
                <Stack direction='row' spacing={2}>
                    <Button variant="contained" sx={{borderRadius:'20px',backgroundColor:'#c5225f',textTransform:'capitalize',fontWeight:'bold',padding:'8px 20px',cursor:'pointer'}} onClick={() => navigate('/login')}>Shop Now</Button>
                    <Button variant="contained" sx={{borderRadius:'20px',backgroundColor:'#f1ac1b',textTransform:'capitalize',fontWeight:'bold',padding:'8px 20px',cursor:'pointer'}}>Sell Now</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    </React.Fragment>
  )
}

export default LandingNavbar