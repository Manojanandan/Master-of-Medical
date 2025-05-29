import React from 'react'
import {Box, Button, List, ListItemIcon, ListItemText, Typography} from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const LandingFooter = () => {
  return (
    <React.Fragment>
        <Box style={{height:'100%',width:'100%',backgroundColor: '#2b3036'}}>
          <Box style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
            <Box sx={{height:'130px',width:'120px',margin:'7% 2%'}} >
              <Typography variant='h6' sx={{fontWeight:'bold',color:'#fff',marginBottom:'3%',fontSize:'16px'}}>ABOUT US</Typography>
              <List>
                <ListItemText sx={{color:'#cacac4'}}>Our Story</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>Contact Us</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>Blog</ListItemText>
              </List>
            </Box>
            <Box sx={{height:'320px',width:'200px',margin:'7% 2%'}} >
              <Typography variant='h6' sx={{fontWeight:'bold',color:'#fff',marginBottom:'3%',fontSize:'16px'}}>ONLINE SHOP</Typography>
              <List>
                <ListItemText sx={{color:'#cacac4'}}>Dental</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>Lab and Diagnostics</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>Consumables & Disposables</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>Medical Device & Equipment</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>Ophthalmology</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>Nephrology</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>Physiotherapy</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>Refurbished Devices</ListItemText>
              </List>
            </Box>
            <Box sx={{height:'300px',width:'300px',margin:'7% 2%'}} >
              <Typography variant='h6' sx={{fontWeight:'bold',color:'#fff',marginBottom:'3%',fontSize:'16px'}}>DIGITAL SERVICES</Typography>
              <List>
                <ListItemText sx={{color:'#cacac4'}}>MBARC - Asset Management</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>VIZI - Inventory Analytics</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>VPO - Value Procurement Optimizer</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>MB FREEDOM - Easy Financing</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>MB International</ListItemText>
              </List>
              <Box style={{height:'100px',width:'100%',margin:'5% 0 0'}}>
                <Typography variant='h6' sx={{fontWeight:'bold',color:'#fff',marginBottom:'2%',fontSize:'16px'}}>SOCIAL MEDIA</Typography>
                <List>
                  <ListItemIcon sx={{minWidth:'40px',color:'#fff',cursor:'pointer'}}><TwitterIcon /></ListItemIcon>
                  <ListItemIcon sx={{minWidth:'40px',color:'#fff',cursor:'pointer'}}><LinkedInIcon /></ListItemIcon>
                  <ListItemIcon sx={{minWidth:'40px',color:'#fff',cursor:'pointer'}}><FacebookIcon /></ListItemIcon>
                  <ListItemIcon sx={{minWidth:'40px',color:'#fff',cursor:'pointer'}}><InstagramIcon /></ListItemIcon>
                  <ListItemIcon sx={{minWidth:'40px',color:'#fff',cursor:'pointer'}}><YouTubeIcon /></ListItemIcon>
                </List>
              </Box>
            </Box>
            <Box sx={{height:'300px',width:'200px',margin:'7% 2%'}} >
              <Typography variant='h6' sx={{fontWeight:'bold',color:'#fff',marginBottom:'4%',fontSize:'16px'}}>DOWNLOAD APP</Typography>
              <Button variant="contained" startIcon={<PlayArrowIcon />} sx={{backgroundColor:'#fff',textTransform:'capitalize',fontSize:'14px',fontWeight:'bold',color:'#000'}}>
                Google Play
              </Button>
              <Box style={{height:'80px',width:'100%',marginTop:'25%'}}>
                <Typography variant='h6' sx={{fontWeight:'bold',color:'#fff',marginBottom:'4%',fontSize:'16px'}}>HELP US IMPROVE</Typography>
                <Button variant='container' sx={{backgroundColor:'#fff',textTransform:'capitalize',fontSize:'14px',fontWeight:'bold'}}>Give us feedback</Button>
              </Box>
            </Box>
            <Box sx={{height:'300px',width:'200px',margin:'7% 2%'}} >
              <Typography variant='h6' sx={{fontWeight:'bold',color:'#fff',marginBottom:'3%',fontSize:'16px'}}>POLICY & FAQ</Typography>
              <List>
                <ListItemText sx={{color:'#cacac4'}}>FAQ</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>Returns and refunds policy</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>Order tracking</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>Disclaimer</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>Terms of use</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>Privacy policy</ListItemText>
                <ListItemText sx={{color:'#cacac4'}}>Cookies Policy</ListItemText>
              </List>
            </Box>
          </Box>
          <Box style={{height:'30px',width:'50%',margin:'0 auto',textAlign:'center',color:'#fff',fontSize:'10px',letterSpacing:'5px',paddingBottom:'10%'}}>
            <Typography variant='p'>COPYRIGHTS @Master Of Medical</Typography>
          </Box>
        </Box>
    </React.Fragment>
  )
}

export default LandingFooter