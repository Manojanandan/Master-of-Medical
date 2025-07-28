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
    <Box sx={{ background: '#f8f9fa', minHeight: '100vh', p: { xs: 1, sm: 2, md: 3 }, width: '100%' }}>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => dispatch(clearError())}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {error?.message || 'Failed to fetch products'}
        </Alert>
      </Snackbar>
      
      {/* Header with Add Product Button */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box>
          <Typography variant="h4" sx={{ 
            fontWeight: 700, 
            color: '#2c3e50',
            fontSize: { xs: '1.75rem', sm: '2.125rem' },
            letterSpacing: '-0.02em'
          }}>
            My Products
          </Typography>
          <Typography variant="body1" sx={{ 
            color: '#666', 
            mt: 0.5,
            fontSize: '0.875rem'
          }}>
            Manage your product catalog
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: '#2c3e50',
            borderRadius: '8px',
            fontWeight: 600,
            px: 3,
            py: 1.5,
            fontSize: '1rem',
            boxShadow: '0 4px 12px rgba(44, 62, 80, 0.15)',
            '&:hover': { 
              background: '#34495e',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(44, 62, 80, 0.25)'
            },
            transition: 'all 0.3s ease-in-out'
          }}
          onClick={() => navigate('/vendor/products/add')}
        >
          Add Product
        </Button>
      </Box>

      {/* Products Count */}
      {productsList.length > 0 && (
        <Box sx={{ 
          mb: 3, 
          p: 2, 
          background: '#ffffff', 
          borderRadius: 2, 
          border: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1
        }}>
          <Typography variant="body1" sx={{ 
            color: '#666',
            fontWeight: 500,
            fontSize: '0.875rem'
          }}>
            Showing {productsList.length} of {products?.pagination?.total || productsList.length} product{(products?.pagination?.total || productsList.length) !== 1 ? 's' : ''}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: '#999', fontSize: '0.75rem' }}>
              Sort by:
            </Typography>
            <Select
              size="small"
              value="latest"
              sx={{ 
                minWidth: 120,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0'
                }
              }}
            >
              <MenuItem value="latest">Latest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
            </Select>
          </Box>
        </Box>
      )}

      {/* Products Grid */}
      {productsList.length === 0 && !loading ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          background: '#ffffff',
          borderRadius: 3,
          border: '1px solid #e0e0e0',
          mx: 'auto',
          maxWidth: 500
        }}>
          <Box sx={{ 
            width: 80, 
            height: 80, 
            borderRadius: '50%', 
            background: '#f8f9fa', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mx: 'auto',
            mb: 3
          }}>
            <AddIcon sx={{ fontSize: 40, color: '#999' }} />
          </Box>
          <Typography variant="h5" sx={{ 
            color: '#2c3e50',
            fontWeight: 600,
            mb: 2
          }}>
            No products found
          </Typography>
          <Typography variant="body1" sx={{ 
            color: '#666',
            mb: 4,
            maxWidth: 300,
            mx: 'auto',
            lineHeight: 1.6
          }}>
            Start building your product catalog by adding your first product. It only takes a few minutes!
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              background: '#2c3e50',
              borderRadius: '8px',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(44, 62, 80, 0.15)',
              '&:hover': {
                background: '#34495e',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(44, 62, 80, 0.25)'
              },
              transition: 'all 0.3s ease-in-out'
            }}
            onClick={() => navigate('/vendor/products/add')}
          >
            Add Your First Product
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ width: '100%', m: 0 }}>
          {paginatedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={product.id}>
              <Card 
                sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  border: '1px solid #f0f0f0',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                    borderColor: '#2c3e50',
                    '& .product-image': {
                      transform: 'scale(1.05)'
                    }
                  }
                }}
              >
                {/* Product Image */}
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    className="product-image"
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      background: '#f8fafc',
                      transition: 'transform 0.3s ease-in-out'
                    }}
                    image={product.thumbnailImage || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                  {/* Status Badge */}
                  <Box sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: 'rgba(44, 62, 80, 0.9)',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backdropFilter: 'blur(4px)'
                  }}>
                    Active
                  </Box>
                </Box>
                
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  {/* Price */}
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 700, 
                      color: '#2c3e50',
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
                      sx={{ 
                        mb: 1.5,
                        color: '#666',
                        fontStyle: 'italic',
                        fontSize: '0.875rem'
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
                      mb: 1.5,
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: '#333',
                      fontSize: '1.1rem',
                      maxWidth: '200px'
                    }}
                  >
                    {product.name}
                  </Typography>
                  

                  
                  {/* Category and Subcategory */}
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip 
                      label={product.category} 
                      size="small" 
                      sx={{ 
                        background: '#f8f9fa',
                        color: '#2c3e50',
                        fontWeight: 500,
                        textTransform: 'capitalize',
                        border: '1px solid #e0e0e0'
                      }} 
                    />
                    {product.subCategory && (
                      <Chip 
                        label={product.subCategory} 
                        size="small" 
                        sx={{ 
                          background: '#f8f9fa',
                          color: '#2c3e50',
                          fontWeight: 500,
                          textTransform: 'capitalize',
                          border: '1px solid #e0e0e0'
                        }} 
                      />
                    )}
                  </Box>
                  
                  {/* Description */}
                  {product.description && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.4,
                        color: '#666',
                        fontSize: '0.875rem',
                        maxWidth: '200px'
                      }}
                    >
                      {product.description}
                    </Typography>
                  )}
                  
                  {/* Expiry Date */}
                  {product.expiresOn && (
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block',
                        mb: 2,
                        color: '#999',
                        fontSize: '0.75rem',
                        fontWeight: 500
                      }}
                    >
                      Expires: {product.expiresOn}
                    </Typography>
                  )}
                </CardContent>
                
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    variant="outlined"
                    startIcon={<VisibilityIcon />}
                    fullWidth
                    sx={{
                      borderColor: '#2c3e50',
                      color: '#2c3e50',
                      fontWeight: 600,
                      borderRadius: 2,
                      py: 1.5,
                      fontSize: '0.875rem',
                      '&:hover': {
                        borderColor: '#34495e',
                        background: 'rgba(44, 62, 80, 0.04)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(44, 62, 80, 0.15)'
                      },
                      transition: 'all 0.3s ease-in-out'
                    }}
                    onClick={() => navigate(`/vendor/products/${product.id}`)}
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
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 5, 
          mb: 3,
          p: 3,
          background: '#ffffff',
          borderRadius: 2,
          border: '1px solid #e0e0e0'
        }}>
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
                fontWeight: 600,
                border: '1px solid #e0e0e0',
                '&:hover': {
                  background: '#f8f9fa'
                }
              },
              '& .Mui-selected': {
                background: '#2c3e50 !important',
                color: 'white !important',
                borderColor: '#2c3e50 !important',
                '&:hover': {
                  background: '#34495e !important'
                }
              }
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Products; 