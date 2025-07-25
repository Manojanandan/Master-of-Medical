import React from 'react';
import BreadCrumbs from '../../components/e_commerceComponents/BreadCrumbs';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Paper,
  Divider,
  Chip
} from '@mui/material';
import { 
  Business, 
  Security, 
  LocalShipping, 
  Support,
  Verified,
  TrendingUp
} from '@mui/icons-material';

const AboutUs = () => {
  const features = [
    {
      icon: <Business sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'B2B Platform',
      description: 'Connecting healthcare institutions with certified medical product manufacturers'
    },
    {
      icon: <Security sx={{ fontSize: 40, color: '#2e7d32' }} />,
      title: 'Verified Suppliers',
      description: 'All manufacturers are certified and verified for quality assurance'
    },
    {
      icon: <LocalShipping sx={{ fontSize: 40, color: '#ed6c02' }} />,
      title: 'Fast Delivery',
      description: 'Streamlined supply chain for quick and reliable delivery'
    },
    {
      icon: <Support sx={{ fontSize: 40, color: '#9c27b0' }} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your needs'
    }
  ];

  const stats = [
    { number: '500+', label: 'Healthcare Institutions' },
    { number: '1000+', label: 'Medical Products' },
    { number: '50+', label: 'Certified Manufacturers' },
    { number: '99%', label: 'Customer Satisfaction' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <BreadCrumbs title="About Us" />
        
        {/* Hero Section */}
        <Paper elevation={0} sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 3
        }}>
          <Typography variant="h3" component="h1" sx={{ 
            fontWeight: 700, 
            mb: 2,
            textAlign: 'center'
          }}>
            About Master of Medical
          </Typography>
          <Typography variant="h6" sx={{ 
            textAlign: 'center',
            opacity: 0.9,
            maxWidth: 800,
            mx: 'auto'
          }}>
            Revolutionizing healthcare procurement through our innovative B2B platform that connects 
            healthcare institutions with certified medical product manufacturers.
          </Typography>
        </Paper>

        {/* Mission & Vision */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ height: '100%', p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                To streamline the healthcare supply chain by providing a transparent, efficient, 
                and cost-effective platform that connects healthcare institutions with verified 
                medical product manufacturers, ensuring quality healthcare products reach those 
                who need them most.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ height: '100%', p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#2e7d32' }}>
                Our Vision
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                To become the leading B2B healthcare procurement platform, setting industry 
                standards for transparency, efficiency, and quality in medical supply chain 
                management across the healthcare sector.
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Features */}
        <Typography variant="h4" sx={{ 
          fontWeight: 600, 
          mb: 3, 
          textAlign: 'center',
          color: '#333'
        }}>
          Why Choose Master of Medical?
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card elevation={2} sx={{ 
                height: '100%', 
                p: 3, 
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 4
                }
              }}>
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Stats */}
        <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 600, 
            mb: 3, 
            textAlign: 'center',
            color: '#333'
          }}>
            Our Impact
          </Typography>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 700, 
                    color: '#1976d2',
                    mb: 1
                  }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Values */}
        <Card elevation={2} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 600, 
            mb: 3, 
            textAlign: 'center',
            color: '#333'
          }}>
            Our Core Values
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Verified sx={{ fontSize: 60, color: '#2e7d32', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Quality Assurance
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We ensure all products meet the highest quality standards and regulatory requirements.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <TrendingUp sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Innovation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Continuously improving our platform to provide the best user experience and efficiency.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Support sx={{ fontSize: 60, color: '#ed6c02', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Customer Focus
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Putting our customers first with exceptional service and support at every step.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default AboutUs; 