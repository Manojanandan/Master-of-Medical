import React from 'react'
import BreadCrumbs from '../../../components/e_commerceComponents/BreadCrumbs'
import { Box, Typography } from '@mui/material'

const OrderTracking = () => {
  return (
    <Box sx={{height:'auto',width:'100%',}}>
        <BreadCrumbs title={"Order Tracking"} />
        <Box sx={{height:'100%',width:'90%',margin:'2% auto'}}>
            <Typography variant='h5' sx={{fontWeight:'bold',margin:'1% 0'}}>Note</Typography>
            <Typography variant='p' sx={{fontSize:'16px',}}>Stay in control with real-time order tracking.</Typography><br />
            <Typography variant='p' sx={{fontSize:'16px',lineHeight:'50px',marginLeft:'2%'}}>1. Log in to your M.O.M account</Typography><br/>
            <Typography variant='p' sx={{fontSize:'16px',lineHeight:'50px',marginLeft:'2%'}}>2.	Navigate to “My Orders”</Typography><br />
            <Typography variant='p' sx={{fontSize:'16px',lineHeight:'50px',marginLeft:'2%'}}>3.	Click “Track Order” for live updates on shipment, delivery, and status</Typography><br />
            <Typography variant='p' sx={{fontSize:'16px',lineHeight:'50px'}}>You’ll also receive notifications via SMS and email at every key stage.</Typography><br />
        </Box>
    </Box>
  )
}

export default OrderTracking