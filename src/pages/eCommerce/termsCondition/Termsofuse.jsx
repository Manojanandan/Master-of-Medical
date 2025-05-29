import { Box, Typography } from '@mui/material'
import React from 'react'
import BreadCrumbs from '../../../components/e_commerceComponents/BreadCrumbs'

const Termsofuse = () => {
  return (
    <Box sx={{ height: 'auto', width: '100%', }}>
      <BreadCrumbs title={"TermsOfUse"} />
      <Box sx={{ height: '100%', width: '90%', margin: '2% auto' }}>
        <Typography variant='h5' sx={{ fontWeight: 'bold', margin: '1% 0' }}>Note</Typography>
        <Typography variant='p' sx={{ fontSize: '16px', }}>By accessing and using the M.O.M platform, you agree to the following:</Typography><br />
        <Typography variant='p' sx={{ fontSize: '16px', lineHeight: '50px', marginLeft: '2%' }}>1. 	All users must register with accurate and updated information.</Typography><br />
        <Typography variant='p' sx={{ fontSize: '16px', lineHeight: '50px', marginLeft: '2%' }}>2.	Buyers must use the platform for institutional or business use only.</Typography><br />
        <Typography variant='p' sx={{ fontSize: '16px', lineHeight: '50px', marginLeft: '2%' }}>3.	Sellers are responsible for ensuring their product listings, inventory, and pricing are accurate and compliant with applicable laws.</Typography><br />
        <Typography variant='p' sx={{ fontSize: '16px', lineHeight: '50px', marginLeft: '2%' }}>4.	Any misuse of the platform, false information, or breach of these terms may lead to suspension or legal action.</Typography><br />
        <Typography variant='p' sx={{ fontSize: '16px', lineHeight: '50px' }}>We reserve the right to update these terms as necessary.</Typography><br />

      </Box>
    </Box>
  )
}

export default Termsofuse