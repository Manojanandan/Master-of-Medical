import React from 'react'
import BreadCrumbs from '../../../components/e_commerceComponents/BreadCrumbs'
import { Box, Typography } from '@mui/material'

const PrivacyPolicy = () => {
  return (
    <Box sx={{height:'auto',width:'100%',}}>
        <BreadCrumbs title={"Privacy-Policy"} />
        <Box sx={{height:'100%',width:'90%',margin:'2% auto'}}>
            <Typography variant='h5' sx={{fontWeight:'bold',margin:'1% 0'}}>Note</Typography>
            <Typography variant='p' sx={{fontSize:'16px',}}>At Master of Medical, your data privacy is our priority.</Typography><br />
            <Typography variant='p' sx={{fontSize:'16px',lineHeight:'50px',marginLeft:'2%'}}>1. 	We collect only necessary information to deliver services—such as name, contact, business info, and payment data.</Typography><br/>
            <Typography variant='p' sx={{fontSize:'16px',lineHeight:'50px',marginLeft:'2%'}}>2.	All user data is encrypted and stored securely.</Typography><br />
            <Typography variant='p' sx={{fontSize:'16px',lineHeight:'50px',marginLeft:'2%'}}>3.	We do not sell or share your information with third parties for advertising.</Typography><br />
            <Typography variant='p' sx={{fontSize:'16px',lineHeight:'50px',marginLeft:'2%'}}>4.	Data is used solely to process orders, support logistics, and improve user experience.</Typography><br />
            <Typography variant='p' sx={{fontSize:'16px',lineHeight:'50px'}}>You can request to review or delete your data anytime by contacting our support team.</Typography><br />
        </Box>
    </Box>
  )
}

export default PrivacyPolicy