import { Box } from '@mui/material'
import React from 'react'
import LandingNavbar from '../../components/landingComponents/LandingNavbar'
import LandingHero from '../../components/landingComponents/LandingHero'
import LandingTitleBanner from '../../components/landingComponents/LandingTitleBanner'
import LandingCustomer from '../../components/landingComponents/LandingCustomer'
import LandingSolution from '../../components/landingComponents/LandingSolution'
import LandingFeature from '../../components/landingComponents/LandingFeature'
import LandingConnect from '../../components/landingComponents/LandingConnect'
import LandingFooter from '../../components/landingComponents/LandingFooter'
import LandingCallAction from '../../components/landingComponents/LandingCallAction'
import c1 from '../../assets/c1.jpg'
import c2 from '../../assets/c2.jpg'
import c3 from '../../assets/c3.jpg'
import c4 from '../../assets/c4.jpg'
import c5 from '../../assets/c5.jpg'


const customerLogos = [
  {
    imagePath0: c1,
    imagePath1: c2,
    imagePath2: c3,
    imagePath3: c4,
    imagePath4: c5,
  },
  {
    imagePath0: c1,
    imagePath1: c2,
    imagePath2: c3,
    imagePath3: c4,
    imagePath4: c5,
  },
  {
    imagePath0: c1,
    imagePath1: c2,
    imagePath2: c3,
    imagePath3: c4,
    imagePath4: c5,
  },
]

const brandLogos = [
  {
    imagePath0: c1,
    imagePath1: c2,
    imagePath2: c3,
    imagePath3: c4,
    imagePath4: c5,
  },
  {
    imagePath0: c1,
    imagePath1: c2,
    imagePath2: c3,
    imagePath3: c4,
    imagePath4: c5,
  },
]

const Landing = () => {
  return (
    <React.Fragment>
      <Box style={{ height: 'auto', width: "100%", backgroundColor: '#e2edf3'}} >
        <LandingNavbar />
        <LandingHero />
      </Box>
      <LandingTitleBanner text="Our Valued" bgColor="#fff" data={customerLogos} slider={true} subText="Customers"  />
      <LandingCustomer />
      <LandingTitleBanner text="Our Brand" bgColor="#fff" data={brandLogos} slider={false} subText="Partners" />
      <LandingSolution />
      <LandingFeature />
      <LandingCallAction />
      {/* <LandingConnect />  */}
      <LandingFooter />
    </React.Fragment>
  )
}

export default Landing