import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Pagination,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import {
  Search,
  FilterList,
  MoreVert,
  Edit,
  Delete,
  Visibility as VisibilityIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, clearError } from '../reducers/ProductReducer';
import StarRating from '../../../components/e_commerceComponents/StarRating';

const Products = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  
  // Redux
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.productReducer);

  // Pagination state
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  });

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Handle error messages
  useEffect(() => {
    if (error) {
      // Error will be handled by the snackbar
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Update pagination when products change
  useEffect(() => {
    if (products && products.pagination) {
      setPagination(products.pagination);
    }
  }, [products]);

  const handleChange = (event, value) => {
    setPage(value);
    // TODO: Implement API pagination when backend supports it
    // For now, we'll use client-side pagination
  };

  // Get the actual products array from the response
  const productsList = products?.data || products || [];
  
  // Use API pagination if available, otherwise use client-side pagination
  const PRODUCTS_PER_PAGE = 12;
  const startIdx = (page - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const paginatedProducts = productsList.slice(startIdx, endIdx);
  
  // Use API pagination count if available, otherwise calculate from client-side
  const pageCount = products?.pagination?.totalPages || Math.ceil(productsList.length / PRODUCTS_PER_PAGE);

  // Loading state
  if (loading && productsList.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ background: '#f7f8fa', minHeight: '100vh', p: { xs: 1, sm: 3 }, maxWidth: 1400, mx: 'auto' }}>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => dispatch(clearError())}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {error?.message || 'Failed to fetch products'}
        </Alert>
      </Snackbar>
      
      {/* Header with Add Product Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#222' }}>
          My Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: '#13bfa6',
            borderRadius: '8px',
            fontWeight: 600,
            px: 3,
            py: 1.5,
            fontSize: '1rem',
            boxShadow: 2,
            '&:hover': { 
              background: '#0fa98f',
              transform: 'translateY(-1px)',
              boxShadow: 4
            },
            transition: 'all 0.2s ease-in-out'
          }}
          onClick={() => navigate('/vendorDashboard/products/add')}
        >
          Add Product
        </Button>
      </Box>

      {/* Products Count */}
      {productsList.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" color="text.secondary">
            Showing {productsList.length} of {products?.pagination?.total || productsList.length} product{(products?.pagination?.total || productsList.length) !== 1 ? 's' : ''}
          </Typography>
        </Box>
      )}

      {/* Products Grid */}
      {productsList.length === 0 && !loading ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No products found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Add your first product to get started!
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              borderColor: '#13bfa6',
              color: '#13bfa6',
              '&:hover': {
                borderColor: '#0fa98f',
                background: 'rgba(19, 191, 166, 0.04)'
              }
            }}
            onClick={() => navigate('/vendorDashboard/products/add')}
          >
            Add Your First Product
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {paginatedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={product.id}>
              <Card 
                sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                  }
                }}
              >
                {/* Product Image */}
                <CardMedia
                  component="img"
                  sx={{
                    minWidth: 260,
                    maxWidth: 260,
                    minHeight: 180,
                    maxHeight: 180,
                    width: '100%',
                    height: 180,
                    objectFit: 'cover',
                    background: '#f8fafc',
                    borderBottom: '1px solid #f0f0f0',
                    mx: 'auto',
                    display: 'block'
                  }}
                  image={product.thumbnailImage || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
                
                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                  {/* Price */}
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 700, 
                      color: '#13bfa6',
                      mb: 1,
                      fontSize: '1.5rem'
                    }}
                  >
                    ₹{product.price}
                  </Typography>
                  
                  {/* Price Label */}
                  {product.priceLable && (
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 1.5,
                        fontStyle: 'italic'
                      }}
                    >
                      {product.priceLable}
                    </Typography>
                  )}
                  
                  {/* Product Name */}
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      mb: 1,
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {product.name}
                  </Typography>
                  
                  {/* Brand Name */}
                  {product.brandName && (
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 1.5,
                        fontWeight: 500
                      }}
                    >
                      Brand: {product.brandName}
                    </Typography>
                  )}
                  
                  {/* Rating */}
                  <Box sx={{ mb: 1.5 }}>
                    <StarRating 
                      rating={product.averageRating || 0}
                      reviewCount={product.reviewCount || 0}
                      size="small"
                      showReviewCount={true}
                    />
                  </Box>
                  
                  {/* Category and Subcategory */}
                  <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                    <Chip 
                      label={product.category} 
                      size="small" 
                      sx={{ 
                        background: '#e3f2fd',
                        color: '#1976d2',
                        fontWeight: 500,
                        textTransform: 'capitalize'
                      }} 
                    />
                    {product.subCategory && (
                      <Chip 
                        label={product.subCategory} 
                        size="small" 
                        sx={{ 
                          background: '#f3e5f5',
                          color: '#7b1fa2',
                          fontWeight: 500,
                          textTransform: 'capitalize'
                        }} 
                      />
                    )}
                  </Box>
                  
                  {/* Description */}
                  {product.description && (
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.4
                      }}
                    >
                      {product.description}
                    </Typography>
                  )}
                  
                  {/* Expiry Date */}
                  {product.expiresOn && (
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      sx={{ 
                        display: 'block',
                        mb: 1
                      }}
                    >
                      Expires: {product.expiresOn}
                    </Typography>
                  )}
                </CardContent>
                
                <CardActions sx={{ p: 2.5, pt: 0 }}>
                  <Button
                    variant="outlined"
                    startIcon={<VisibilityIcon />}
                    fullWidth
                    sx={{
                      borderColor: '#13bfa6',
                      color: '#13bfa6',
                      fontWeight: 600,
                      borderRadius: 2,
                      py: 1,
                      '&:hover': {
                        borderColor: '#0fa98f',
                        background: 'rgba(19, 191, 166, 0.04)',
                        transform: 'translateY(-1px)'
                      },
                      transition: 'all 0.2s ease-in-out'
                    }}
                    onClick={() => navigate(`/vendorDashboard/products/${product.id}`)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 3 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChange}
            color="primary"
            shape="rounded"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: 2,
                fontWeight: 600
              },
              '& .Mui-selected': {
                background: '#13bfa6 !important',
                color: 'white !important'
              }
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Products; 