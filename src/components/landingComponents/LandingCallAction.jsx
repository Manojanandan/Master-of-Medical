import React from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import AppleIcon from '@mui/icons-material/Apple';
import mobile from '../../assets/mobile.png'

const LandingCallAction = () => {
  return (
    <React.Fragment>
      <Box style={{ height: '100%', width: '100%', background: '#009e92', display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ height: '100%', width: '600px', margin: '3% 7%', }}>
          <Typography variant='p' sx={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.3rem' }}>Sell On Master of Medical</Typography><br /><br />
          <Typography variant='p' sx={{ color: '#FFFFFF', fontSize: '3rem', fontWeight: 'bold', fontFamily: 'roboto' }}>Expand Your business with Master of Medical</Typography><br />
          <Stack direction='row' spacing={3} sx={{margin: '5% 0'}}>
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-evenly',borderRadius: '10px',height:'auto',width:'auto',backgroundColor:'#fff',gap:'10px',padding:'8px 5px',cursor:'pointer'}}>
              <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'40px',width:'40px',}}>
                <AppleIcon sx={{fontSize:'2.5rem'}} />
              </Box>
              <Box sx={{height:'auto',width:'130px',}}>
                <Typography variant='p' component='div' sx={{fontWeight:'bold',fontSize:'14px',}}>Download on the</Typography>
                <Typography variant='p' component='div' sx={{fontWeight:'bold',fontSize:'1.5rem',lineHeight:'15px'}}>App Store</Typography>
              </Box>
            </Box>
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-evenly',borderRadius: '10px',height:'auto',width:'auto',backgroundColor:'#fff',gap:'10px',padding:'8px 7px 9px 5px',cursor:'pointer'}}>
              <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'40px',width:'40px',}}>
                <img height='40px' width="35px" src='https://freelogopng.com/images/all_img/1664285914google-play-logo-png.png' />
              </Box>
              <Box sx={{height:'auto',width:'auto',}}>
                <Typography variant='p' component='div' sx={{fontWeight:'bold',fontSize:'14px',}}>Get it on</Typography>
                <Typography variant='p' component='div' sx={{fontWeight:'bold',fontSize:'1.3rem',lineHeight:'15px'}}>Google Play</Typography>
              </Box>
            </Box>
          </Stack>
        </Box>
         <Box sx={{ height: '100%', width: '400px', margin: '2% 7%',backgroundPosition:'center' }}>
          <img src={mobile} alt={mobile} />
         </Box>
      </Box>
    </React.Fragment>
  )
}

export default LandingCallAction