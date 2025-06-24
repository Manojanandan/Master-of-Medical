import React, { useState } from 'react';
import { Box, Typography, Grid, Button, Pagination, Card, CardContent, CardActions, Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProductCard from '../../../components/e_commerceComponents/ProductCard';
import { useNavigate } from 'react-router-dom';

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: 'Adhesive Bandages',
    price: 1170,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCtqVRh8njZ8hjpxQ-NQ2qVRZPh065Lq4DtQ&s',
    date: '12 jun 2025',
  },
  {
    id: 2,
    name: 'Speculum',
    price: 1170,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCtqVRh8njZ8hjpxQ-NQ2qVRZPh065Lq4DtQ&s',
    date: '12 jun 2025',
  },
  {
    id: 3,
    name: 'Shoe Cover',
    price: 1170,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCtqVRh8njZ8hjpxQ-NQ2qVRZPh065Lq4DtQ&s',
    date: '12 jun 2025',
  },
  // Add 13 more for demo
  ...Array.from({ length: 13 }, (_, i) => ({
    id: i + 4,
    name: `Product ${i + 4}`,
    price: 1170,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCtqVRh8njZ8hjpxQ-NQ2qVRZPh065Lq4DtQ&s',
    date: '12 jun 2025',
  })),
];

const PRODUCTS_PER_PAGE = 12;

const Products = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const handleChange = (event, value) => setPage(value);

  // Pagination logic
  const startIdx = (page - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const paginatedProducts = mockProducts.slice(startIdx, endIdx);
  const pageCount = Math.ceil(mockProducts.length / PRODUCTS_PER_PAGE);

  return (
    <Box sx={{ background: '#f7f8fa', minHeight: '100vh', p: { xs: 1, sm: 3 }, maxWidth: 1400, mx: 'auto' }}>
      {/* Add Product Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: '#13bfa6',
            borderRadius: '6px',
            fontWeight: 'bold',
            px: 3,
            py: 1.2,
            fontSize: '1rem',
            boxShadow: 2,
            '&:hover': { background: '#0fa98f' },
          }}
          onClick={() => navigate('/vendorDashboard/products/add')}
        >
          + Add Product
        </Button>
      </Box>
      {/* Products Grid */}
      <Grid container spacing={3} justifyContent="center">
        {paginatedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={product.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 160 }}>
                <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: 120, objectFit: 'contain' }} />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  ₹{product.price}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {product.date}
                </Typography>
                <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
                  Published
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Link href="#" underline="hover" sx={{ fontWeight: 600, color: '#13bfa6', cursor: 'pointer' }}>
                  View Detail
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChange}
          color="primary"
          shape="rounded"
          size="large"
        />
      </Box>
    </Box>
  );
};

export default Products; 