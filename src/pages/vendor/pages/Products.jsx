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
  CircularProgress,
  Tooltip,
  Divider
} from '@mui/material';
import {
  Search,
  FilterList,
  MoreVert,
  Edit,
  Delete,
  Visibility as VisibilityIcon,
  Add as AddIcon,
  LocalOffer,
  CalendarToday,
  Category,
  PriceCheck
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, clearError } from '../reducers/ProductReducer';

const Products = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const navigate = useNavigate();
  
  // Redux
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.productReducer);

  // Pagination state
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
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
  
  // Filter and sort products
  const filteredProducts = productsList.filter(product => 
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brandName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case 'oldest':
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      case 'price-high':
        return (b.price || 0) - (a.price || 0);
      case 'price-low':
        return (a.price || 0) - (b.price || 0);
      default:
        return 0;
    }
  });
  
  // Use API pagination if available, otherwise use client-side pagination
  const PRODUCTS_PER_PAGE = 12;
  const startIdx = (page - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIdx, endIdx);
  
  // Use API pagination count if available, otherwise calculate from client-side
  const pageCount = products?.pagination?.totalPages || Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

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

      {/* Search and Filter Bar */}
      <Box sx={{ 
        mb: 3, 
        p: 3, 
        background: '#ffffff', 
        borderRadius: 3, 
        border: '1px solid #e0e0e0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search products by name, description, or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#666' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#2c3e50',
                  },
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBy}
                label="Sort by"
                onChange={(e) => setSortBy(e.target.value)}
                sx={{
                  borderRadius: 2,
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
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip 
                label={`${sortedProducts.length} products`} 
                size="small" 
                sx={{ 
                  background: '#f8f9fa',
                  color: '#2c3e50',
                  fontWeight: 500
                }} 
              />
              {searchTerm && (
                <Chip 
                  label={`"${searchTerm}"`} 
                  size="small" 
                  onDelete={() => setSearchTerm('')}
                  sx={{ 
                    background: '#e3f2fd',
                    color: '#1976d2',
                    fontWeight: 500
                  }} 
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Products Count */}
      {sortedProducts.length > 0 && (
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
            Showing {paginatedProducts.length} of {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
            {searchTerm && ` matching "${searchTerm}"`}
          </Typography>
          <Typography variant="body2" sx={{ 
            color: '#999', 
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}>
            <CalendarToday sx={{ fontSize: 14 }} />
            Last updated: {formatDate(new Date())}
          </Typography>
        </Box>
      )}

      {/* Products Grid */}
      {sortedProducts.length === 0 && !loading ? (
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
            {searchTerm ? 'No products found' : 'No products yet'}
          </Typography>
          <Typography variant="body1" sx={{ 
            color: '#666',
            mb: 4,
            maxWidth: 300,
            mx: 'auto',
            lineHeight: 1.6
          }}>
            {searchTerm 
              ? `No products match your search "${searchTerm}". Try different keywords.`
              : 'Start building your product catalog by adding your first product. It only takes a few minutes!'
            }
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
            {searchTerm ? 'Clear Search' : 'Add Your First Product'}
          </Button>
        </Box>
      ) : (
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
          },
          gap: 3,
          width: '100%'
        }}>
          {paginatedProducts.map((product) => (
            <Box key={product.id} sx={{ 
              display: 'flex',
              minWidth: { xs: '280px', sm: '300px', md: '320px' },
              maxWidth: { xs: '100%', sm: '400px', md: '420px', lg: '380px' }
            }}>
              <Card 
                sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)', 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  border: '1px solid #f0f0f0',
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#ffffff',
                  width: '100%',
                  minHeight: '500px',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
                    borderColor: '#2c3e50',
                    '& .product-image': {
                      transform: 'scale(1.08)'
                    },
                    '& .product-actions': {
                      opacity: 1,
                      transform: 'translateY(0)'
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
                      height: 220,
                      objectFit: 'cover',
                      background: '#f8fafc',
                      transition: 'transform 0.4s ease-in-out'
                    }}
                    image={product.thumbnailImage || 'https://via.placeholder.com/300x220?text=No+Image'}
                    alt={product.name}
                    // onError={(e) => {
                    //   e.target.src = 'https://via.placeholder.com/300x220?text=No+Image';
                    // }}
                  />
                  
                  {/* Status Badge */}
                  <Box sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: 'rgba(44, 62, 80, 0.95)',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}>
                    <LocalOffer sx={{ fontSize: 14 }} />
                    {product.status || 'Active'}
                  </Box>

                  {/* Price Badge */}
                  <Box sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: 'rgba(25, 118, 210, 0.95)',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}>
                    <PriceCheck sx={{ fontSize: 16 }} />
                    ₹{product.price}
                  </Box>
                </Box>
                
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  {/* Product Name */}
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1.5,
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: '#2c3e50',
                      fontSize: '1.1rem',
                      minHeight: '2.6em'
                    }}
                  >
                    {product.name}
                  </Typography>

                  {/* Brand Name */}
                  {product.brandName && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: 1.5,
                        color: '#666',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      <Category sx={{ fontSize: 16 }} />
                      {product.brandName}
                    </Typography>
                  )}
                  
                  {/* Price Label */}
                  {product.priceLable && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: 1.5,
                        color: '#666',
                        fontStyle: 'italic',
                        fontSize: '0.875rem',
                        background: '#f8f9fa',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        display: 'inline-block'
                      }}
                    >
                      {product.priceLable}
                    </Typography>
                  )}
                  
                  {/* Category and Subcategory */}
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    {product.category && (
                      <Chip 
                        label={product.category} 
                        size="small" 
                        sx={{ 
                          background: '#e3f2fd',
                          color: '#1976d2',
                          fontWeight: 600,
                          textTransform: 'capitalize',
                          border: '1px solid #bbdefb'
                        }} 
                      />
                    )}
                    {product.subCategory && (
                      <Chip 
                        label={product.subCategory} 
                        size="small" 
                        sx={{ 
                          background: '#f3e5f5',
                          color: '#7b1fa2',
                          fontWeight: 600,
                          textTransform: 'capitalize',
                          border: '1px solid #e1bee7'
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
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.5,
                        color: '#666',
                        fontSize: '0.875rem',
                        minHeight: '3.9em'
                      }}
                    >
                      {product.description}
                    </Typography>
                  )}
                  
                  {/* Expiry Date */}
                  {product.expiresOn && (
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 0.5,
                      mb: 2,
                      p: 1,
                      background: '#fff3e0',
                      borderRadius: 1,
                      border: '1px solid #ffcc02'
                    }}>
                      <CalendarToday sx={{ fontSize: 14, color: '#f57c00' }} />
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: '#e65100',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        Expires: {formatDate(product.expiresOn)}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
                
                <Divider sx={{ mx: 3 }} />
                
                <CardActions sx={{ p: 3, pt: 2 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 1, 
                    width: '100%',
                    '& .MuiButton-root': {
                      flex: 1,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      py: 1.5,
                      transition: 'all 0.3s ease-in-out'
                    }
                  }}>
                    <Button
                      variant="outlined"
                      startIcon={<VisibilityIcon />}
                      sx={{
                        borderColor: '#2c3e50',
                        color: '#2c3e50',
                        '&:hover': {
                          borderColor: '#34495e',
                          background: 'rgba(44, 62, 80, 0.04)',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 4px 12px rgba(44, 62, 80, 0.15)'
                        }
                      }}
                      onClick={() => navigate(`/vendor/products/${product.id}`)}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<Edit />}
                      sx={{
                        background: '#2c3e50',
                        '&:hover': {
                          background: '#34495e',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 4px 12px rgba(44, 62, 80, 0.25)'
                        }
                      }}
                      onClick={() => navigate(`/vendor/products/${product.id}?edit=true`)}
                    >
                      Edit
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
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
          borderRadius: 3,
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChange}
            color="primary"
            shape="rounded"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: 2,
                fontWeight: 600,
                border: '1px solid #e0e0e0',
                margin: '0 2px',
                '&:hover': {
                  background: '#f8f9fa',
                  borderColor: '#2c3e50'
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