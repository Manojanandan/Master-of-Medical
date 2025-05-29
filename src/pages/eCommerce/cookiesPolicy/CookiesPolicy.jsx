import React from 'react'
import BreadCrumbs from '../../../components/e_commerceComponents/BreadCrumbs'
import { Box, Typography } from '@mui/material'

const CookiesPolicy = () => {
  return (
    <Box sx={{height:'auto',width:'100%',}}>
        <BreadCrumbs title={"Cookies-Policy"} />
        <Box sx={{height:'100%',width:'90%',margin:'2% auto'}}>
            <Typography variant='h5' sx={{fontWeight:'bold',margin:'1% 0'}}>Consent</Typography>
            <Typography variant='p' sx={{fontSize:'16px',}}>By continuing to use our website www.Master of Medical.com (the "Site") and Master of Medical mobile app (the "app"), you agree that we can store and place cookies on your computer and mobile device to improve your site and app experience. This Cookie Policy covers the information practices of our websites, including how Master of Medical collects, uses, shares and secures the personal information you provide. If you use our websites, we may use various website navigation information including tracking technologies such as cookies and web beacons to collect and store information from you. You are requested to read this cookie policy for more details about the cookies that are placed when you are using this Site.</Typography>
            <Typography variant='h5' sx={{fontWeight:'bold',margin:'1% 0'}}>What are cookies?</Typography>
            <Typography variant='p' sx={{fontSize:'16px',}}>Cookies are small files that are placed on your computer or device by websites that you visit. They are widely used in order to make websites function properly as well as to provide business and marketing information to the owners of the site. Cookies collect Website navigation information that includes standard information from your web browser (such as browser type and browser language), language choices, time zone, your internet protocol (IP) address, actions you take on our websites, URL and page metadata, installation data (such as the operating system type and application version), system crash information, system activity and hardware settings. We may also automatically collect and store certain information in activity logs such as details of how you use our websites, your search queries, and your IP address</Typography>
            <Typography variant='h5' sx={{fontWeight:'bold',margin:'1% 0'}}>Ease of Use</Typography>
            <Typography variant='p' sx={{fontSize:'16px',}}>These cookies are used to enhance the ease of use of the Site.</Typography>
            <Typography variant='h5' sx={{fontWeight:'bold',margin:'1% 0'}}>Performance</Typography>
            <Typography variant='p' sx={{fontSize:'16px',}}>Performance cookies collect information about how you use our Site (e.g., which pages you visit frequently). These cookies do not collect any information that could identify you and are only used to help us improve how our Site works and understand what interests our users.</Typography>
        </Box>
    </Box>
  )
}

export default CookiesPolicy