import React from 'react'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
};

const featureData = [
  {
    section0: {
      imagePath: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJ1Z3N8ZW58MHx8MHx8fDA%3D',
      title: "News | MBARC",
      description: "Medikabazaar launches MBARC",
      detail: `7 Sept'22 | 5 min read | 1,220`,
    },
    section1: {
      imagePath: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJ1Z3N8ZW58MHx8MHx8fDA%3D',
      title: "News | MBARC",
      description: "Medikabazaar launches MBARC",
      detail: `7 Sept'22 | 5 min read | 1,220`,
    },
    section2: {
      imagePath: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJ1Z3N8ZW58MHx8MHx8fDA%3D',
      title: "News | MBARC",
      description: "Medikabazaar launches MBARC",
      detail: `7 Sept'22 | 5 min read | 1,220`,
    },
    section3: {
      imagePath: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJ1Z3N8ZW58MHx8MHx8fDA%3D',
      title: "News | MBARC",
      description: "Medikabazaar launches MBARC",
      detail: `7 Sept'22 | 5 min read | 1,220`,
    },
  },
  {
    section0: {
      imagePath: 'https://www.shutterstock.com/image-photo/drug-prescription-treatment-medication-pharmaceutical-260nw-544348294.jpg',
      title: "News | MBARC",
      description: "Medikabazaar launches MBARC",
      detail: `7 Sept'22 | 5 min read | 1,220`,
    },
    section1: {
      imagePath: 'https://www.shutterstock.com/image-photo/drug-prescription-treatment-medication-pharmaceutical-260nw-544348294.jpg',
      title: "News | MBARC",
      description: "Medikabazaar launches MBARC",
      detail: `7 Sept'22 | 5 min read | 1,220`,
    },
    section2: {
      imagePath: 'https://www.shutterstock.com/image-photo/drug-prescription-treatment-medication-pharmaceutical-260nw-544348294.jpg',
      title: "News | MBARC",
      description: "Medikabazaar launches MBARC",
      detail: `7 Sept'22 | 5 min read | 1,220`,
    },
    section3: {
      imagePath: 'https://www.shutterstock.com/image-photo/drug-prescription-treatment-medication-pharmaceutical-260nw-544348294.jpg',
      title: "News | MBARC",
      description: "Medikabazaar launches MBARC",
      detail: `7 Sept'22 | 5 min read | 1,220`,
    },
  }
]

const LandingFeature = () => {
  return (
    <React.Fragment>
      <Box sx={{ height: '600px', width: '100%' }}>
        <Box sx={{ height: '100%', width: '92%', margin: '3% auto' }}>
          <Stack direction='row' sx={{ marginBottom: '2%' }}>
            <Typography variant='p' sx={{ fontWeigh: 'bold', width: '90%', fontSize: '2.5em' }}>Featured Stories</Typography>
            <Button variant='text' sx={{ fontSize: '16px', fontWeight: 'bold', color: '#c5225f', textTransform: 'capitalize', margin: '1% 0', }}>Explore All</Button>
          </Stack>
          <Box sx={{ height: '400px', width: '100%' }}>
            <Slider {...settings}>
              {featureData?.map((e, i) => {
                return (
                  <div className="slide" key={i}>
                    <Stack direction="row">
                      {/* Mapping through section0 and section1 */}
                      {Object.keys(e).map((sectionKey) => {
                        const section = e[sectionKey]; // Get section0 or section1

                        return (
                          <Box key={sectionKey} sx={{ height: '100%', width: '25%' }}>
                            {/* Box for the image */}
                            <Box
                              sx={{
                                height: '150px',
                                width: '85%',
                                margin: '4% 5% 3% 5%',
                              }}
                            >
                              <img
                                src={section.imagePath}
                                alt={sectionKey}
                                height="100%"
                                width="100%"
                              />
                            </Box>

                            {/* Title */}
                            <Typography variant="p" sx={{ margin: '0 6%' }}>
                              {section.title}
                            </Typography>

                            {/* Description */}
                            <Box sx={{ height: 'auto', width: '87%', margin: '3% auto' }}>
                              <Typography variant="p" sx={{ fontSize: '18px' }}>
                                {section.description}
                              </Typography>
                            </Box>

                            {/* Detail */}
                            <Typography variant="p" sx={{ margin: '0 6%' }}>
                              {section.detail}
                            </Typography>

                            {/* Button */}
                            <Button
                              variant="outlined"
                              sx={{
                                textTransform: 'capitalize',
                                color: '#c5225f',
                                padding: '4% 6%',
                                margin: '5% 6% 10% 6%',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                border: 'solid 2px #c5225f',
                                borderRadius: '15px',
                              }}
                            >
                              Read more
                            </Button>
                          </Box>
                        );
                      })}
                    </Stack>
                  </div>
                );
              })}
            </Slider>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default LandingFeature