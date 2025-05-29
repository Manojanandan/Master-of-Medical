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


const customerLogos = [
  {
    imagePath0: 'https://appointment.carehospitals.com/Image/Logo.png',
    imagePath1: 'https://media.telanganatoday.com/wp-content/uploads/2023/09/medicover.jpg',
    imagePath2: 'https://pbs.twimg.com/profile_images/1427869142913142790/zAJZHxhp_400x400.jpg',
    imagePath3: 'https://appointment.carehospitals.com/Image/Logo.png',
    imagePath4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU4SDQeNowDirEBmRyRiG8YgMFIgzPu0Cn8g&s',
    imagePath5: 'https://upload.wikimedia.org/wikipedia/en/d/d8/Jaslok_Hospital_Logo.png',
  },
  {
    imagePath0: 'https://appointment.carehospitals.com/Image/Logo.png',
    imagePath1: 'https://media.telanganatoday.com/wp-content/uploads/2023/09/medicover.jpg',
    imagePath2: 'https://pbs.twimg.com/profile_images/1427869142913142790/zAJZHxhp_400x400.jpg',
    imagePath3: 'https://appointment.carehospitals.com/Image/Logo.png',
    imagePath4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU4SDQeNowDirEBmRyRiG8YgMFIgzPu0Cn8g&s',
    imagePath5: 'https://upload.wikimedia.org/wikipedia/en/d/d8/Jaslok_Hospital_Logo.png',
  },
]

const brandLogos = [
  {
    imagePath0: 'https://appointment.carehospitals.com/Image/Logo.png',
    imagePath1: 'https://media.telanganatoday.com/wp-content/uploads/2023/09/medicover.jpg',
    imagePath2: 'https://pbs.twimg.com/profile_images/1427869142913142790/zAJZHxhp_400x400.jpg',
    imagePath3: 'https://appointment.carehospitals.com/Image/Logo.png',
    imagePath4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU4SDQeNowDirEBmRyRiG8YgMFIgzPu0Cn8g&s',
    imagePath5: 'https://upload.wikimedia.org/wikipedia/en/d/d8/Jaslok_Hospital_Logo.png',
  },
  {
    imagePath0: 'https://appointment.carehospitals.com/Image/Logo.png',
    imagePath1: 'https://media.telanganatoday.com/wp-content/uploads/2023/09/medicover.jpg',
    imagePath2: 'https://pbs.twimg.com/profile_images/1427869142913142790/zAJZHxhp_400x400.jpg',
    imagePath3: 'https://appointment.carehospitals.com/Image/Logo.png',
    imagePath4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU4SDQeNowDirEBmRyRiG8YgMFIgzPu0Cn8g&s',
    imagePath5: 'https://upload.wikimedia.org/wikipedia/en/d/d8/Jaslok_Hospital_Logo.png',
  },
]

const Landing = () => {
  return (
    <React.Fragment>
      <Box style={{ height: '100%', width: "100%", backgroundImage: 'linear-gradient(174.2deg, rgb(255, 244, 228) 7.1%, rgb(240, 246, 238) 67.4%)'}} >
        <LandingNavbar />
        <LandingHero />
      </Box>
      <LandingTitleBanner text="Our Valued Customers" bgColor="#fff" data={customerLogos}  />
      <LandingCustomer />
      <LandingTitleBanner text="Our Brand Partners" bgColor="rgb(240, 246, 238)" data={brandLogos} />
      <LandingSolution />
      <LandingCallAction />
      <LandingFeature />
      <LandingConnect /> 
      <LandingFooter />
    </React.Fragment>
  )
}

export default Landing