import { Box, Typography } from '@mui/material'
import React from 'react'
import BreadCrumbs from '../../../components/e_commerceComponents/BreadCrumbs'

const Termsofuse = () => {
  return (
    <Box sx={{height:'auto',width:'100%',}}>
        <BreadCrumbs title={"TermsOfUse"} />
        <Box sx={{height:'100%',width:'90%',margin:'2% auto'}}>
            <Typography variant='p' sx={{fontSize:'16px',}}>We strive to provide goods and services which comply with the industry standards to our customers and make online shopping a breeze. However, in case you face any issues with the product(s), you can write to us at support@medikabazaar.com and we will try our best to resolve your issue at the earliest. Customer placing the order means any individual or business entity/organization that legally operates in India as a business or in other countries, uses and has the right to use the product and services provided by Medikabazaar. The Company shall entertain returns only in below-mentioned cases:</Typography>
            <Typography variant='h5' sx={{fontWeight:'bold',margin:'1% 0'}}>1. Receipt of short-expiry product(s)</Typography>
            <Typography variant='p' sx={{fontSize:'16px',}}>By registering with the Website you can access or view the prices, product inventories, and purchase orders electronically. You are responsible for using the Website in a secure manner. We will not be liable for any damage or loss caused from any unauthorised account access resulting from your actions, such as not logging out of the account or sharing your account password. We reserve the right to refuse registration or cancel an account at any time.</Typography>
            <Typography variant='h5' sx={{fontWeight:'bold',margin:'1% 0'}}>2. Receipt of product(s) damaged in transit</Typography>
            <Typography variant='p' sx={{fontSize:'16px',}}>Do not accept your order if you receive a tampered consignment as evident from the packaging. If received, after opening the consignment you find that the product(s) is damaged then immediately (within no later than 2 hours from the receipt of the order) click the photo of the damaged product(s) as well as the product label(s) and send it to our email id: support@medikabazaar.com along with the order number and the invoice number. Once we receive the email, an investigation may be initiated at our end. After the investigation, if the issue raised is found to be valid, we will make arrangements to dispatch a new product subject to the availability of the stock. If the stock is not available, then a coupon or credit note will be issued which you can redeem in your next purchase. Please note that you are not required to pay for any additional shipping fees in such a case of reshipment.</Typography>
            <Typography variant='h5' sx={{fontWeight:'bold',margin:'1% 0'}}>3. Receipt of product having manufacturing defect</Typography>
            <Typography variant='p' sx={{fontSize:'16px',}}>If upon receipt of the order you notice that your product(s) has a manufacturing defect, you are required to kindly attach a photo of the product’s label and send it to our email id: support@medikabazaar.com forthwith and within no later than 4 hours from the receipt of the order. Once we receive the email, an investigation may be initiated at our end. Our team/ courier partner / supplier or manufacturer’s representative will collect the product and once it is ascertained that the defect claim is valid we will make arrangements to dispatch a new product subject to the availability of the stock. If the stock is not available then a coupon or credit note will be issued which you can redeem in your next purchase. Please note that you are not required to pay for any additional shipping fees in such a case of reshipment.</Typography>
        </Box>
    </Box>
  )
}

export default Termsofuse