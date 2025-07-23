import React from 'react';
import BreadCrumbs from '../../components/e_commerceComponents/BreadCrumbs';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Chip,
  Button,
  Paper,
  Avatar,
  Divider
} from '@mui/material';
import { 
  CalendarToday, 
  Person, 
  ReadMore,
  TrendingUp,
  HealthAndSafety,
  LocalHospital
} from '@mui/icons-material';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Healthcare Procurement: Digital Transformation",
      excerpt: "Discover how digital platforms are revolutionizing the way healthcare institutions procure medical supplies and equipment.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      author: "Dr. Sarah Johnson",
      date: "March 15, 2024",
      category: "Healthcare Technology",
      readTime: "5 min read",
      featured: true
    },
    {
      id: 2,
      title: "Quality Assurance in Medical Supply Chain",
      excerpt: "Learn about the importance of maintaining high standards in medical supply procurement and distribution.",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=250&fit=crop",
      author: "Michael Chen",
      date: "March 12, 2024",
      category: "Quality Control",
      readTime: "4 min read",
      featured: false
    },
    {
      id: 3,
      title: "Cost-Effective Medical Equipment Procurement Strategies",
      excerpt: "Explore strategies for healthcare institutions to optimize their medical equipment procurement budgets.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
      author: "Lisa Rodriguez",
      date: "March 10, 2024",
      category: "Procurement",
      readTime: "6 min read",
      featured: false
    },
    {
      id: 4,
      title: "Sustainable Healthcare: Green Medical Supplies",
      excerpt: "How healthcare institutions can contribute to environmental sustainability through responsible procurement.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      author: "Dr. Emily Watson",
      date: "March 8, 2024",
      category: "Sustainability",
      readTime: "7 min read",
      featured: false
    },
    {
      id: 5,
      title: "Emergency Medical Supply Management",
      excerpt: "Best practices for managing medical supplies during emergencies and crisis situations.",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=250&fit=crop",
      author: "James Wilson",
      date: "March 5, 2024",
      category: "Emergency Care",
      readTime: "5 min read",
      featured: false
    },
    {
      id: 6,
      title: "Digital Health Records and Supply Chain Integration",
      excerpt: "How integrated digital systems are improving efficiency in healthcare supply chain management.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
      author: "Dr. Robert Kim",
      date: "March 3, 2024",
      category: "Digital Health",
      readTime: "6 min read",
      featured: false
    }
  ];

  const categories = [
    "All",
    "Healthcare Technology", 
    "Quality Control", 
    "Procurement", 
    "Sustainability", 
    "Emergency Care",
    "Digital Health"
  ];

  const getCategoryColor = (category) => {
    const colors = {
      "Healthcare Technology": "#1976d2",
      "Quality Control": "#2e7d32",
      "Procurement": "#ed6c02",
      "Sustainability": "#9c27b0",
      "Emergency Care": "#d32f2f",
      "Digital Health": "#0288d1"
    };
    return colors[category] || "#666";
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <BreadCrumbs title="Blog" />
        
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
            Healthcare Insights & Updates
          </Typography>
          <Typography variant="h6" sx={{ 
            textAlign: 'center',
            opacity: 0.9,
            maxWidth: 800,
            mx: 'auto'
          }}>
            Stay informed with the latest trends, insights, and best practices in healthcare 
            procurement and medical supply chain management.
          </Typography>
        </Paper>

        {/* Categories Filter */}
        <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              variant="outlined"
              sx={{
                borderColor: getCategoryColor(category),
                color: getCategoryColor(category),
                '&:hover': {
                  backgroundColor: getCategoryColor(category),
                  color: 'white'
                }
              }}
            />
          ))}
        </Box>

        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map((post) => (
          <Card key={post.id} elevation={3} sx={{ mb: 4, borderRadius: 3 }}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  height="300"
                  image={post.image}
                  alt={post.title}
                  sx={{ objectFit: 'cover' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Chip 
                    label="Featured" 
                    color="primary" 
                    size="small" 
                    sx={{ mb: 2, alignSelf: 'flex-start' }}
                  />
                  <Typography variant="h4" component="h2" sx={{ 
                    fontWeight: 600, 
                    mb: 2,
                    lineHeight: 1.3
                  }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ 
                    mb: 3,
                    lineHeight: 1.6
                  }}>
                    {post.excerpt}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: getCategoryColor(post.category) }}>
                      {post.author.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {post.author}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {post.date} • {post.readTime}
                      </Typography>
                    </Box>
                  </Box>
                  <Button 
                    variant="contained" 
                    endIcon={<ReadMore />}
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    Read Full Article
                  </Button>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        ))}

        {/* Regular Posts */}
        <Typography variant="h5" sx={{ 
          fontWeight: 600, 
          mb: 3,
          color: '#333'
        }}>
          Latest Articles
        </Typography>
        
        <Grid container spacing={3}>
          {blogPosts.filter(post => !post.featured).map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card elevation={2} sx={{ 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 4
                }
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Chip 
                    label={post.category} 
                    size="small" 
                    sx={{ 
                      mb: 2,
                      backgroundColor: getCategoryColor(post.category),
                      color: 'white'
                    }}
                  />
                  <Typography variant="h6" component="h3" sx={{ 
                    fontWeight: 600, 
                    mb: 2,
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    mb: 3,
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {post.excerpt}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ width: 24, height: 24, bgcolor: getCategoryColor(post.category), fontSize: '0.75rem' }}>
                      {post.author.charAt(0)}
                    </Avatar>
                    <Typography variant="caption" color="text.secondary">
                      {post.author}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {post.date}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      •
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {post.readTime}
                    </Typography>
                  </Box>
                  <Button 
                    variant="outlined" 
                    size="small"
                    endIcon={<ReadMore />}
                    sx={{ mt: 1 }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Newsletter Signup */}
        <Paper elevation={2} sx={{ p: 4, mt: 4, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Stay Updated
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Subscribe to our newsletter for the latest healthcare insights and updates.
          </Typography>
          <Button variant="contained" size="large">
            Subscribe to Newsletter
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Blog; 