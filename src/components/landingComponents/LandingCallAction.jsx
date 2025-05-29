import React from 'react'
import {Box, Button, Typography} from '@mui/material'

const LandingCallAction = () => {
  return (
    <React.Fragment>
         <Box style={{height:'100%',width:'100%',background:'linear-gradient(145deg, rgb(246 186 209) 20%, rgb(252 229 161 / 59%) 80%)',display:'flex',justifyContent:'space-between'}}>
          <Box sx={{height:'100%',width:'30%',margin:'3% 7%'}}>
            <Typography variant='h4' sx={{color:'#fff',margin:'2% 0 4%',fontWeight:'bold'}}>Sell On Master of Medical</Typography>
            <Typography variant='h6' sx={{color:'#fff',margin:'2% 0 4%',fontWeight:'bold',fontSize:'17px'}}>Expand Your business with Master of Medical</Typography>
            <Typography variant='p' sx={{color:'#808084',margin:'2% 0 4%',fontWeight:'bold',fontSize:'13px'}}>List your products on Master of Medical and connect with our network of 150K+ hospitals, clinics and individual practitioners</Typography>
            <Button variant='contained' sx={{borderRadius:'15px',backgroundColor:'#c5225f',textTransform:'capitalize',fontWeight:'bold',padding:'8px 20px',margin:'10% 0'}}>Register Now</Button>
          </Box>
        </Box>
    </React.Fragment>
  )
}

export default LandingCallAction