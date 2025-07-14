import React, { useEffect, useState } from "react";
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Box, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Pagination, 
  Chip, 
  Skeleton,
  Alert,
  IconButton,
  InputAdornment,
  Slider,
  Divider,
  Paper
} from "@mui/material";
import { 
  Search, 
  FilterList, 
  Clear, 
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Star,
  LocalShipping,
  Verified
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  fetchPublicProducts, 
  updateFilters, 
  updatePagination, 
  clearFilters 
} from "../redux/PublicProductReducer";

// Static data for demonstration
const staticProducts = [
  {
    _id: "1",
    name: "Digital Thermometer Professional Grade Medical Device",
    description: "High-precision digital thermometer for with advanced features and professional accuracy",
    price: 299,
    priceLabel: "MRP",
    brandName: "MediCare",
    category: "Diagnostic",
    thumbnailImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    fastDelivery: true,
    verified: true
  },
  {
    _id: "2",
    name: "Blood Pressure Monitor Automatic Digital",
    description: "Automatic digital blood pressure monitor with detection and memory function",
    price: 1299,
    priceLabel: "MRP",
    brandName: "HealthGuard",
    category: "Diagnostic",
    thumbnailImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    rating: 4.3,
    reviews: 89,
    inStock: true,
    fastDelivery: false,
    verified: true
  },
  {
    _id: "3",
    name: "Pulse Oximeter Finger Clip",
    description: "Finger pulse oximeter for measuring oxygen saturation levels with instant readings",
    price: 599,
    priceLabel: "MRP",
    brandName: "OxyCare",
    category: "Diagnostic",
    thumbnailImage: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    fastDelivery: true,
    verified: true
  },
  {
    _id: "4",
    name: "Stethoscope Professional Medical",
    description: "Professional grade stethoscope for medical professionals with superior acoustic performance",
    price: 899,
    priceLabel: "MRP",
    brandName: "MediPro",
    category: "Diagnostic",
    thumbnailImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 203,
    inStock: true,
    fastDelivery: true,
    verified: true
  },
  {
    _id: "5",
    name: "Glucometer Blood Glucose Monitor",
    description: "Digital blood glucose monitoring system with test strips and memory function",
    price: 799,
    priceLabel: "MRP",
    brandName: "SugarCheck",
    category: "Diagnostic",
    thumbnailImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 167,
    inStock: false,
    fastDelivery: false,
    verified: true
  },
  {
    _id: "6",
    name: "First Aid Kit Comprehensive Emergency",
    description: "Comprehensive first aid kit for emergency situations with all essential medical supplies",
    price: 449,
    priceLabel: "MRP",
    brandName: "SafetyFirst",
    category: "Emergency",
    thumbnailImage: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    fastDelivery: true,
    verified: true
  },
  {
    _id: "7",
    name: "Surgical Mask Disposable Medical",
    description: "High-quality disposable surgical masks for medical professionals and general use",
    price: 199,
    priceLabel: "MRP",
    brandName: "MediCare",
    category: "Surgical",
    thumbnailImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    rating: 4.2,
    reviews: 89,
    inStock: true,
    fastDelivery: true,
    verified: true
  },
  {
    _id: "8",
    name: "Dental Mirror Professional",
    description: "Professional dental mirror for dental examinations and procedures",
    price: 349,
    priceLabel: "MRP",
    brandName: "DentalPro",
    category: "Dental",
    thumbnailImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    rating: 4.1,
    reviews: 67,
    inStock: true,
    fastDelivery: false,
    verified: true
  }
];

const categories = ["All", "Diagnostic", "Emergency", "Surgical", "Pharmaceutical", "Dental"];
const brands = ["All", "MediCare", "HealthGuard", "OxyCare", "MediPro", "SugarCheck", "SafetyFirst", "DentalPro"];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" }
];

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Redux state
  const { 
    products, 
    pagination, 
    filters, 
    loading, 
    error 
  } = useSelector((state) => state.publicProductReducer);

  // Local state
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [localFilters, setLocalFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    sort: searchParams.get('sort') || 'newest'
  });

  // Use static data for now
  const displayProducts = staticProducts;
  const totalProducts = staticProducts.length;
  const totalPages = Math.ceil(totalProducts / 12);

  useEffect(() => {
    console.log('Products page loaded - calling API...');
    
    // Call the actual API
    dispatch(fetchPublicProducts({
      page: pagination.page,
      limit: pagination.limit,
      ...filters
    })).then((result) => {
      console.log('API Response:', result);
      if (result.payload) {
        console.log('Products data:', result.payload);
      }
    }).catch((error) => {
      console.error('API Error:', error);
    });
  }, [dispatch, pagination.page, pagination.limit, filters]);

  const handleProductClick = (productId) => {
    console.log('Navigating to product details:', productId);
    navigate(`/ecommerceDashboard/product/${productId}`);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setLocalFilters(prev => ({ ...prev, search: value }));
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('search', value);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
    
    // Dispatch filter update
    dispatch(updateFilters({ search: value }));
  };

  const handleFilterChange = (filterType, value) => {
    setLocalFilters(prev => ({ ...prev, [filterType]: value }));
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'All') {
      newParams.set(filterType, value);
    } else {
      newParams.delete(filterType);
    }
    setSearchParams(newParams);
    
    // Dispatch filter update
    dispatch(updateFilters({ [filterType]: value }));
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceRangeCommit = () => {
    // Dispatch filter update
    dispatch(updateFilters({ 
      minPrice: priceRange[0], 
      maxPrice: priceRange[1] 
    }));
  };

  const handleClearFilters = () => {
    setLocalFilters({
      search: '',
      category: '',
      brand: '',
      sort: 'newest'
    });
    setPriceRange([0, 2000]);
    setSearchParams({});
    
    // Dispatch clear filters
    dispatch(clearFilters());
  };

  const handlePageChange = (event, page) => {
    // Dispatch pagination update
    dispatch(updatePagination({ page }));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        sx={{
          fontSize: '0.875rem',
          color: index < Math.floor(rating) ? '#ffc107' : '#e0e0e0'
        }}
      />
    ));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
          Medical Products
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover high-quality medical supplies and equipment
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <style>
{`
  @media (max-width: 900px) {
    .product-filters-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 600px) {
    .product-filters-grid {
      grid-template-columns: 1fr;
    }
  }
`}
</style>
<div
  style={{
    width: '100%',
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    marginBottom: 24,
    padding: 24,
    boxSizing: 'border-box',
  }}
>
  <div
    className="product-filters-grid"
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
      gap: 16,
      alignItems: 'center',
      width: '100%',
    }}
  >
    <input
      type="text"
      placeholder="Search products..."
      value={localFilters.search}
      onChange={handleSearch}
      style={{
        width: '100%',
        padding: 10,
        borderRadius: 4,
        border: '1px solid #ccc',
        fontSize: 16,
      }}
    />
    <select
      value={localFilters.category}
      onChange={e => handleFilterChange('category', e.target.value)}
      style={{
        width: '100%',
        padding: 10,
        borderRadius: 4,
        border: '1px solid #ccc',
        fontSize: 16,
      }}
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
    <select
      value={localFilters.brand}
      onChange={e => handleFilterChange('brand', e.target.value)}
      style={{
        width: '100%',
        padding: 10,
        borderRadius: 4,
        border: '1px solid #ccc',
        fontSize: 16,
      }}
    >
      <option value="">All Brands</option>
      {brands.map((brand) => (
        <option key={brand} value={brand}>{brand}</option>
      ))}
    </select>
    <select
      value={localFilters.sort}
      onChange={e => handleFilterChange('sort', e.target.value)}
      style={{
        width: '100%',
        padding: 10,
        borderRadius: 4,
        border: '1px solid #ccc',
        fontSize: 16,
      }}
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
    <button
      onClick={() => setShowFilters(!showFilters)}
      style={{
        width: '100%',
        padding: 10,
        borderRadius: 4,
        border: '1px solid #1976d2',
        background: '#1976d2',
        color: '#fff',
        fontWeight: 600,
        fontSize: 16,
        cursor: 'pointer',
      }}
    >
      Filters
    </button>
  </div>
</div>

        {/* Advanced Filters */}
        {showFilters && (
          <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
      </Typography>
                <Slider
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  onChangeCommitted={handlePriceRangeCommit}
                  valueLabelDisplay="auto"
                  min={0}
                  max={2000}
                  step={50}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  variant="outlined"
                  startIcon={<Clear />}
                  onClick={handleClearFilters}
                  sx={{ mr: 2 }}
                >
                  Clear All
                </Button>
                <Typography variant="body2" color="text.secondary">
                  {totalProducts} products found
      </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error.message}
        </Alert>
      )}

      {/* Products Grid */}
      {loading ? (
        <Grid container spacing={3}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ display: 'flex' }}>
              <Card sx={{ width: '100%', height: '100%' }}>
                <Skeleton variant="rectangular" height={200} />
                <CardContent sx={{ minHeight: 200 }}>
                  <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                  <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                  <Skeleton variant="text" height={20} sx={{ mb: 2 }} />
                  <Skeleton variant="rectangular" height={40} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              width: '100%',
            }}
          >
            {displayProducts.map((product) => {
              const [wishlisted, setWishlisted] = React.useState(false);
              return (
                <div
                  key={product._id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#fff',
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    height: '100%',
                    minWidth: 0,
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.2s',
                  }}
                  onClick={() => handleProductClick(product._id)}
                >
                  <div
                    style={{
                      width: '100%',
                      height: 180,
                      minHeight: 180,
                      maxHeight: 180,
                      overflow: 'hidden',
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                      position: 'relative',
                    }}
                  >
                    <img
                      src={product.thumbnailImage}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setWishlisted(w => !w);
                      }}
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        width: 36,
                        height: 36,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                        zIndex: 2,
                      }}
                      aria-label="Add to wishlist"
                    >
                      {wishlisted ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="#e53935" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12.1 8.64l-.1.1-.11-.11C10.14 6.6 7.1 7.24 5.6 9.28c-1.5 2.04-0.44 5.12 3.4 8.36l1.1.99 1.1-.99c3.84-3.24 4.9-6.32 3.4-8.36-1.5-2.04-4.54-2.68-6.4-.64z"/></svg>
                      )}
                    </button>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 16 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 18,
                        marginBottom: 8,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        minHeight: '2.6em',
                        maxHeight: '2.6em',
                      }}
                    >
                      {product.name}
                    </div>
                    <div
                      style={{
                        color: '#666',
                        fontSize: 14,
                        marginBottom: 8,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        minHeight: '2.8em',
                        maxHeight: '2.8em',
                      }}
                    >
                      {product.description}
                    </div>
                    {/* Add your price, rating, chips, and button here as needed */}
                    <div style={{ marginTop: 'auto' }}>
                      <button
                        style={{
                          width: '100%',
                          padding: '10px 0',
                          background: '#1976d2',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 4,
                          fontWeight: 600,
                          cursor: 'pointer',
                          marginTop: 12,
                        }}
                        disabled={!product.inStock}
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination - always visible */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '48px 0 0 0',
              width: '100%',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <span
              style={{
                fontWeight: 500,
                color: '#1976d2',
                fontSize: 18,
                letterSpacing: 0.5,
                alignSelf: 'center',
              }}
            >
              Page {pagination.page} of {totalPages}
            </span>
            <Pagination
              count={totalPages}
              page={pagination.page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              siblingCount={1}
              boundaryCount={1}
              sx={{
                '& .MuiPaginationItem-root': {
                  fontWeight: 600,
                  fontSize: 18,
                  borderRadius: '8px',
                  margin: '0 4px',
                  transition: 'all 0.2s',
                  border: '1px solid #e0e7ef',
                  background: '#fff',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  '&:hover': {
                    background: '#e3e8ee',
                    color: '#1976d2',
                    borderColor: '#1976d2',
                  },
                },
                '& .Mui-selected': {
                  background: '#1976d2',
                  color: '#fff',
                  borderColor: '#1976d2',
                  boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
                },
              }}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default Products;
