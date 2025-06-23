import React, { useRef, useState } from 'react'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import case1 from '../../assets/case1.jpg'
import case2 from '../../assets/case2.jpg'
import case3 from '../../assets/case3.jpg'

const settings = {
  dots: false,
  // infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  // autoplay: true,
  // autoplaySpeed: 2000,
  arrows: false,
};

const featureData = [
  {
    section0: {
      imagePath: case1,
      title: "Utilizing mobile technology in the field",
      description: "I think you should be able to to select more than one reason for rating.",
    },
    section1: {
      imagePath: case2,
      title: "Success Story: Businessman in Harlem",
      description: "I think you should be able to to select more than one reason for rating.",
    },
    section2: {
      imagePath: case3,
      title: "Working from home?Let's get started.",
      description: "I think you should be able to to select more than one reason for rating.",
    },
  },
  {
    section0: {
      imagePath: case1,
      title: "Utilizing mobile technology in the field",
      description: "I think you should be able to to select more than one reason for rating.",
    },
    section1: {
      imagePath: case2,
      title: "Success Story: Businessman in Harlem",
      description: "I think you should be able to to select more than one reason for rating.",
    },
    section2: {
      imagePath: case3,
      title: "Working from home?Let's get started.",
      description: "I think you should be able to to select more than one reason for rating.",
    },
  },
 

]

const LandingFeature = () => {
  const sliderRef = useRef(null);
    const [current, setCurrent] = useState(0);
  
    const handleNext = () => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    };
  
    const handlePrev = () => {
      if (sliderRef.current) {
        sliderRef.current.slickPrev();
      }
    };
  
    // Update current slide index on change
    const sliderSettings = {
      ...settings,
      beforeChange: (oldIndex, newIndex) => setCurrent(newIndex),
    };
    // Calculate width as a percentage
    const progressWidth = featureData?.length
      ? `${((current + 1) / featureData.length) * 100}%`
      : '0%';
  return (
    <React.Fragment>
      <Box sx={{ height: 'auto', width: '100%',}}>
        <Box sx={{ height: '100%', width: '92%', margin: '3% auto' }}>
          <Box sx={{ marginBottom: '2%', textAlign: 'center', width: '50%', margin: '0 auto' }}>
            <Typography variant='p' sx={{ fontWeigh: 'bold', width: '90%', fontSize: '2.2em' }}>CASE <span style={{ color: '#35bfb3' }}>STUDIES</span></Typography><br />
            <Typography variant='p' sx={{ fontSize: '1.4rem', fontWeight: 'semi-bold' }}>Our design  services starts and ends with a best-in-class experience strategy that builds brands.</Typography>
          </Box>
          <Box sx={{ height: 'auto', width: '90%', margin: '4% auto' }}>
            <Slider ref={sliderRef} {...sliderSettings}>
              {featureData?.map((e, i) => {
                return (
                  <div className="slide" key={i}>
                    <Stack direction="row" spacing={4}>
                      {/* Mapping through section0 and section1 */}
                      {Object.keys(e).map((sectionKey) => {
                        const section = e[sectionKey]; // Get section0 or section1

                        return (
                          <Box key={sectionKey} sx={{ height: '100%', width: '400px' }}>
                            {/* Box for the image */}
                            <Box
                              sx={{
                                height: '200px',
                                width: '90%',
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
                            <Box sx={{ margin: '0 4%', }}>
                              <Typography variant="p" sx={{ fontSize: '1.6rem', fontWeight: 'bold', }}>
                                {section.title}
                              </Typography>
                            </Box>

                            {/* Description */}
                            <Box sx={{ height: 'auto', width: '87%', margin: '3% 4%' }}>
                              <Typography variant="p" sx={{ fontSize: '20px', }}>
                                {section.description}
                              </Typography>
                            </Box>


                            {/* Button */}
                            <Button
                            startIcon={<HorizontalRuleIcon size="large" />}
                              variant=""
                              sx={{
                                textTransform: 'capitalize',
                                color: '#02534d',
                                padding: '2% 6%',
                                margin: '4% 5%',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                border: 'solid 2px black',
                                borderRadius: '12px',
                                outline: 'none',
                                border:'none'
                              }}
                            >
                              Continue Reading
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
          <Box sx={{ margin: '1% auto', width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Stack direction='row' spacing={2}>
              <Box
                sx={{ height: '40px', width: '40px', border: 'solid 1px #f1f2f7', backgroundColor: '#f1f2f7', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s', '&:active': { backgroundColor: '#c5225f', } }}
                onClick={handlePrev}
              >
                <ArrowBackIcon />
              </Box>
              <Box
                sx={{ height: '40px', width: '40px', border: 'solid 1px #f1f2f7', backgroundColor: '#f1f2f7', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s', '&:active': { backgroundColor: '#c5225f', }, }}
                onClick={handleNext}
              >
                <ArrowForwardIcon />
              </Box>
            </Stack>
            <Box sx={{ height: '2px', width: '75%', border: 'solid 1.5px #2424' }}>
              <Box sx={{ height: 'auto', width: progressWidth, border: 'solid 1.5px blue', backgroundColor: '#e2edf3', margin: '-1px', transition: 'width 0.5s ease' }}></Box>
            </Box>

            <Button variant="outlined" sx={{ outline: 'solid 1.5px black', color: 'black', textTransform: 'capitalize', fontSize: '17px', fontWeight: 'bold', }}>View all </Button>

          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default LandingFeature