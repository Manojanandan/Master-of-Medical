import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import LandingNavbar from '../../components/LandingNavbar'
import LandingHero from '../../components/LandingHero'
import LandingTitleBanner from '../../components/LandingTitleBanner'
import LandingCustomer from '../../components/LandingCustomer'
import LandingFooter from '../../components/LandingFooter'
import LandingCallAction from '../../components/LandingCallAction'
import LandingFeature from '../../components/LandingFeature'
import LandingConnect from '../../components/LandingConnect'
import LandingSolution from '../../components/LandingSolution'


const Landing = () => {
  return (
    <React.Fragment>
      <Box style={{ height: '100%', width: "100%", background: "linear-gradient(145deg, rgb(246 186 209) 9%, rgb(252 229 161 / 59%) 89%)" }} >
        <LandingNavbar />
        <LandingHero />
      </Box>
      <LandingTitleBanner text="Our Valued Customers" bgColor="#f9d5cb" />
      <LandingCustomer />
      <LandingTitleBanner text="Our Brand Partners" bgColor="#fcebc8" />
      <LandingSolution />
      <LandingCallAction />
      <LandingFeature />
      <LandingConnect /> 
      <LandingFooter />
    </React.Fragment>
  )
}

export default Landing