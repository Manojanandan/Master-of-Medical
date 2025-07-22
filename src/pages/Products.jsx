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
  InputAdornment,
  Slider,
  Divider,
  Paper
} from "@mui/material";
import ProductCard from "../components/e_commerceComponents/ProductCard";
import { 
  Search, 
  FilterList, 
  Clear, 
  ShoppingCart,
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
import { addToCart, fetchCart, updateCartItemQuantity, removeFromCart } from "../redux/CartReducer";


const categories = ["All", "Surgical", "Medicine", "Equipment"];
const brands = ["All", "Sharpedge", "HealPlus", "BPGuard", "AccuListen"];
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
  
  const { items: cartItems, loading: cartLoading } = useSelector((state) => state.cartReducer);

  // Local state
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [localFilters, setLocalFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    sort: searchParams.get('sort') || 'newest'
  });

  // Use API data
  const displayProducts = products;
  const totalProducts = pagination.total || products.length;
  const totalPages = pagination.totalPages || Math.ceil(totalProducts / 12);
  
  useEffect(() => {
    // Call the actual API
    dispatch(fetchPublicProducts({
      page: pagination.page,
      limit: pagination.limit,
      ...filters
    }));
  }, [dispatch, pagination.page, pagination.limit, filters]);

  // Fetch cart data when component mounts
  useEffect(() => {
    console.log('Fetching cart data in Products component...');
    dispatch(fetchCart());
  }, [dispatch]);

  const handleProductClick = (productId) => {
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
    
    // Dispatch filter update - send empty string for "All" to clear the filter
    const filterValue = value === 'All' ? '' : value;
    dispatch(updateFilters({ [filterType]: filterValue }));
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
          {displayProducts && displayProducts.length > 0 ? (
            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              margin: '1% 3% 1%',
              width: '95%',
              flexWrap: 'wrap',
              gap: '4%'
            }}>
              {displayProducts.map((product) => {
                // Try to find the product ID from various possible field names
                const productId = product._id || product.id || product.productId || product.product_id;
                
                if (!productId) {
                  console.error('No product ID found for product:', product);
                  return null; // Skip this product if no ID is found
                }
                
                // Transform product data to match ProductCard expected format based on actual API structure
                const transformedProduct = {
                  offer: product.offer || '70%',
                  image: product.thumbnailImage || product.image || "https://via.placeholder.com/300x200?text=No+Image",
                  badge: product.badge || product.category?.toLowerCase() || "new arrival",
                  title: product.name || product.title || "Product Title",
                  rating: product.rating || '4.0',
                  price: product.price || '30.00',
                  originalPrice: product.originalPrice || (parseFloat(product.price || '30.00') * 1.5).toFixed(2),
                  id: productId,
                };

                return (
                  <ProductCard 
                    key={productId}
                    offer={transformedProduct.offer} 
                    image={transformedProduct.image} 
                    badge={transformedProduct.badge} 
                    title={transformedProduct.title} 
                    rating={transformedProduct.rating} 
                    price={transformedProduct.price} 
                    originalPrice={transformedProduct.originalPrice}
                    id={transformedProduct.id}
                    onClick={() => handleProductClick(productId)}
                  />
                );
              })}
            </Box>
          ) : (
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
              width: '100%'
            }}>
              <Typography variant="h6" color="text.secondary">
                No products found. Please try adjusting your filters or check back later.
              </Typography>
            </Box>
          )}

          {/* Pagination - only show when there are products and multiple pages */}
          {displayProducts && displayProducts.length > 0 && totalPages > 1 && (
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
          )}
        </>
      )}
    </Container>
  );
};

export default Products;


// approval page(until admin approves profile)
// category , subcategory (load from api)
// expiry (date field)
// country (dropdown)
// update status in profile , test

// customer
// signup - error
// update endpoint from user to customer
