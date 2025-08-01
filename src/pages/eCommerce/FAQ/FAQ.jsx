import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const FAQ = () => {
  const [expanded, setExpanded] = useState(null);

  const faqData = [
    {
      title: "What is Master of Medical (M.O.M)?",
      description: 'M.O.M is a B2B web and mobile platform that connects healthcare institutions with certified medical product manufacturers, streamlining the supply chain for better pricing and transparency.'
    },
    {
      title: "Who can use the M.O.M platform?",
      description: 'Our platform is designed for: Hospitals, Clinics, Diagnostic Centres, Pathology Labs, Medical Institutions, Manufacturers of medical and surgical products.'
    },
    {
      title: "What types of products can I purchase?",
      description: 'We offer: Surgical Supplies, Medical Equipment & Instruments, Disposables (Gloves, Masks, Syringes, etc.), Diagnostic Tools, Medical Furniture, Wellness & Preventive Care Products.'
    },
    {
      title: "How do I place an order?",
      description: 'Simply register as a buyer, browse products, check live inventory, and place bulk orders directly from verified sellers.'
    },
    {
      title: "Can I track my order?",
      description: 'Yes, our platform offers real-time order tracking and status updates.'
    },
    {
      title: "Is there a minimum order quantity?",
      description: 'Minimum order requirements vary by manufacturer. Details are visible on each product listing.'
    },
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#ffffff',
      fontFamily: 'Roboto, sans-serif'
    }}>
      <Box sx={{
        maxWidth: '1200px',
        mx: 'auto',
        py: 4,
        px: { xs: 2, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Box
          sx={{
            height: { xs: '200px', md: '360px' },
            width: '100%',
            maxWidth: '900px',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            mb: 4
          }}
        >
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/007/234/999/small/words-with-faq-business-idea-photo.jpg"
            alt="FAQ Banner"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '12px'
            }}
          />
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#212121',
            mb: 3,
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            textAlign: 'center'
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Box sx={{ width: '100%', maxWidth: '900px', mx: 'auto' }}>
          {faqData.map((item, index) => (
            <Accordion
              key={index}
              elevation={2}
              expanded={expanded === index}
              onChange={() => setExpanded(expanded === index ? null : index)}
              sx={{
                mb: 2,
                borderRadius: 2,
                '&:before': { display: 'none' },
                transition: 'all 0.3s ease',
                '&:hover': { boxShadow: '0 6px 16px rgba(0,0,0,0.12)' }
              }}
            >
              <AccordionSummary
                expandIcon={
                  expanded === index ?
                    <RemoveIcon sx={{ color: '#d81b60', fontSize: '1.5rem' }} /> :
                    <AddIcon sx={{ color: '#f9a825', fontSize: '1.5rem' }} />
                }
                sx={{
                  py: 1,
                  px: 3,
                  bgcolor: expanded === index ? '#fce4ec' : '#fff',
                  borderRadius: 2
                }}
              >
                <Typography sx={{
                  fontWeight: 600,
                  color: '#000', // Changed from pink to black
                  fontSize: { xs: '1rem', md: '1.1rem' }
                }}>
                  {item.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, py: 2, bgcolor: '#fafafa' }}>
                <Typography sx={{ color: '#424242', fontSize: '0.95rem' }}>
                  {item.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FAQ;