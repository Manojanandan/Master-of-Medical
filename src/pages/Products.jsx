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
  Paper,
  useTheme,
  useMediaQuery,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Drawer,
  IconButton
} from "@mui/material";
import ProductCard from "../components/e_commerceComponents/ProductCard";
import { 
  Search, 
  FilterList, 
  Clear, 
  ShoppingCart,
  Star,
  LocalShipping,
  Verified,
  Close,
  Menu,
  Add,
  Remove,
  Favorite,
  FavoriteBorder,
  ShoppingCartOutlined,
  ViewList,
  ViewModule,
  ArrowForward
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
import { getAllCategoriesAndSubcategories } from "../utils/Service";

const brands = ["Fresh", "NIVEA", "LAKMÉ", "Swiss Beauty"];
const colors = ["Green", "Blue", "Red", "Pink", "Black", "White"];
const sortOptions = [
  { value: "latest", label: "Sort by latest" },
  { value: "oldest", label: "Sort by oldest" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" }
];

const Products = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
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
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([10, 10000]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [localFilters, setLocalFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    subcategory: searchParams.get('subcategory') || '',
    subCategory: searchParams.get('subCategory') || '',
    brand: searchParams.get('brand') || '',
    color: searchParams.get('color') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'latest',
    inStock: true,
    onSale: false
  });

  // Use API data
  const displayProducts = products;
  const totalProducts = pagination.total || products.length;
  const totalPages = pagination.totalPages || Math.ceil(totalProducts / itemsPerPage);
  
  useEffect(() => {
    // Call the actual API
    dispatch(fetchPublicProducts({
      page: pagination.page,
      limit: itemsPerPage,
      ...filters
    }));
  }, [dispatch, pagination.page, itemsPerPage, filters]);

  // Fetch cart data when component mounts
  useEffect(() => {
    console.log('Fetching cart data in Products component...');
    dispatch(fetchCart());
  }, [dispatch]);

  // Check URL parameters and apply filters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    
    // Extract filter parameters from URL
    const urlFilters = {};
    
    if (urlParams.get('search')) urlFilters.search = urlParams.get('search');
    if (urlParams.get('category')) urlFilters.category = urlParams.get('category');
    if (urlParams.get('subCategory')) urlFilters.subCategory = urlParams.get('subCategory');
    if (urlParams.get('brand')) urlFilters.brand = urlParams.get('brand');
    if (urlParams.get('color')) urlFilters.color = urlParams.get('color');
    if (urlParams.get('minPrice')) urlFilters.minPrice = urlParams.get('minPrice');
    if (urlParams.get('maxPrice')) urlFilters.maxPrice = urlParams.get('maxPrice');
    if (urlParams.get('sort')) urlFilters.sort = urlParams.get('sort');
    
    // Apply URL filters to local state
    if (Object.keys(urlFilters).length > 0) {
      setLocalFilters(prev => ({
        ...prev,
        ...urlFilters
      }));
      
      // Update price range if min/max price are in URL
      if (urlFilters.minPrice && urlFilters.maxPrice) {
        setPriceRange([parseInt(urlFilters.minPrice), parseInt(urlFilters.maxPrice)]);
      } else {
        setPriceRange([10, 10000]);
      }
      
      // Dispatch filters to trigger products API call
      dispatch(updateFilters(urlFilters));
    }
  }, []); // Run only on component mount

  // Fetch categories and subcategories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await getAllCategoriesAndSubcategories();
        
        if (response.data.success) {
          setCategories(response.data.data);
        } else {
          console.error('Failed to fetch categories:', response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

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
    // Update URL params with price range
    const newParams = new URLSearchParams(searchParams);
    newParams.set('minPrice', priceRange[0]);
    newParams.set('maxPrice', priceRange[1]);
    setSearchParams(newParams);
    
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
      subcategory: '',
      subCategory: '',
      brand: '',
      color: '',
      sort: 'latest',
      inStock: true,
      onSale: false
    });
    setPriceRange([0, 30]);
    setExpandedCategories({});
    setSearchParams({});
    
    // Dispatch clear filters
    dispatch(clearFilters());
  };

  const handlePageChange = (event, page) => {
    // Dispatch pagination update
    dispatch(updatePagination({ page }));
  };

  const handleRemoveFilter = (filterType) => {
    setLocalFilters(prev => ({ ...prev, [filterType]: '' }));
    dispatch(updateFilters({ [filterType]: '' }));
  };

  const handleCategoryToggle = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleSubcategorySelect = (categoryName, subcategoryName, subcategoryId) => {
    setLocalFilters(prev => ({ 
      ...prev, 
      category: '', // Don't send category when subcategory is selected
      subcategory: subcategoryName,
      subCategory: subcategoryId // API expects subCategory parameter
    }));
    
    // Update URL params - only set subCategory, remove others
    const newParams = new URLSearchParams();
    newParams.set('subCategory', subcategoryId);
    setSearchParams(newParams);
    
    // Dispatch filter update - this will trigger the products API call
    dispatch(updateFilters({ 
      category: '', // Don't send category when subcategory is selected
      subcategory: subcategoryName,
      subCategory: subcategoryId // API expects subCategory parameter
    }));
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

  const FilterSidebar = () => (
    <Box sx={{ 
      width: '100%', 
      bgcolor: 'white',
      borderRadius: 3,
      p: 4,
      border: '1px solid rgba(0,0,0,0.06)',
      height: 'fit-content'
    }}>
      {/* Price Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ 
          mb: 3, 
          fontWeight: 700, 
          fontSize: '1.2rem',
          color: '#1a1a1a',
          borderBottom: '2px solid #f0f0f0',
          pb: 2
        }}>
          Price Filter
        </Typography>

        {/* Min Max Price Inputs */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              size="small"
              label="Min price"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
              sx={{ 
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2'
                  }
                }
              }}
            />
            <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, px: 1 }}>
              -
            </Typography>
            <TextField
              size="small"
              label="Max price"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
              sx={{ 
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2'
                  }
                }
              }}
            />
          </Box>
        </Box>

        {/* Price Range Slider */}
        <Slider
          value={priceRange}
          onChange={handlePriceRangeChange}
          onChangeCommitted={handlePriceRangeCommit}
          valueLabelDisplay="auto"
          min={10}
          max={10000}
          step={100}
          sx={{ 
            mb: 3,
            '& .MuiSlider-track': {
              bgcolor: '#1976d2'
            },
            '& .MuiSlider-thumb': {
              bgcolor: '#1976d2',
              '&:hover': {
                boxShadow: '0 0 0 8px rgba(25, 118, 210, 0.16)'
              }
            },
            '& .MuiSlider-rail': {
              bgcolor: '#e0e0e0'
            }
          }}
        />

        {/* Price Display and Filter Button in same row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Typography variant="body2" sx={{ 
            fontWeight: 600,
            color: '#1976d2',
            fontSize: '1rem',
            flex: 1
          }}>
            Price: ₹{priceRange[0]} - ₹{priceRange[1]}
          </Typography>
          <Button
            variant="contained"
            onClick={handlePriceRangeCommit}
            sx={{ 
              bgcolor: '#f5f5f5',
              color: '#333',
              '&:hover': { 
                bgcolor: '#e0e0e0',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              },
              py: 1,
              px: 3,
              fontWeight: 600,
              borderRadius: 2,
              transition: 'all 0.2s ease',
              border: '1px solid #e0e0e0',
              minWidth: '80px'
            }}
          >
            Filter
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Categories */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ 
          mb: 3, 
          fontWeight: 700, 
          fontSize: '1.2rem',
          color: '#1a1a1a',
          borderBottom: '2px solid #f0f0f0',
          pb: 2
        }}>
          Product Categories
        </Typography>
        {loadingCategories ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} variant="rectangular" height={24} sx={{ borderRadius: 1 }} />
            ))}
          </Box>
        ) : (
          categories.map((category) => (
            <Box key={category.id} sx={{ mb: 1 }}>
              <Box
                sx={{
                  display: 'flex',
      alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  p: 1,
                  borderRadius: 1,
                  '&:hover': { bgcolor: '#f5f5f5' }
                }}
                onClick={() => handleCategoryToggle(category.id)}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: localFilters.category === category.name ? 600 : 400,
                    color: localFilters.category === category.name ? '#1976d2' : 'inherit'
                  }}
                >
                  {category.name}
                </Typography>
                {category.SubCategories && category.SubCategories.length > 0 && (
                  <IconButton
                    size="small"
                    sx={{ 
                      transform: expandedCategories[category.id] ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      color: '#666'
                    }}
                  >
                    <Add />
                  </IconButton>
                )}
              </Box>
              
              {/* Subcategories */}
              {expandedCategories[category.id] && category.SubCategories && category.SubCategories.length > 0 && (
                <Box sx={{ ml: 2, mt: 1 }}>
                  {category.SubCategories.map((subcategory) => (
                    <Box
                      key={subcategory.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 1,
                        borderRadius: 1,
                        cursor: 'pointer',
                        bgcolor: localFilters.subcategory === subcategory.name ? '#e3f2fd' : 'transparent',
                        '&:hover': { bgcolor: '#f5f5f5' }
                      }}
                                             onClick={() => handleSubcategorySelect(category.name, subcategory.name, subcategory.id)}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontSize: '0.875rem',
                          color: localFilters.subcategory === subcategory.name ? '#1976d2' : 'inherit',
                          fontWeight: localFilters.subcategory === subcategory.name ? 500 : 400
                        }}
                      >
                        {subcategory.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ))
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ 
        width: '100%',
      minHeight: '100vh',
      bgcolor: '#fafbfc',
      background: 'linear-gradient(135deg, #fafbfc 0%, #f5f7fa 100%)'
    }}>
      {/* Mobile Layout */}
      {isMobile ? (
        <Box sx={{ width: '100%', p: 3 }}>
          {/* Mobile Filter Section */}
          <Box sx={{ 
            mb: 4,
            bgcolor: 'white',
            borderRadius: 3,
            p: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.06)'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 700,
                color: '#1a1a1a',
                fontSize: '1.25rem'
              }}>
                Filters
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={handleClearFilters}
                sx={{
                  borderColor: '#e0e0e0',
                  color: '#666',
                  '&:hover': {
                    borderColor: '#1976d2',
                    color: '#1976d2',
                    bgcolor: 'rgba(25, 118, 210, 0.04)'
                  }
                }}
              >
                Clear All
              </Button>
            </Box>
            <FilterSidebar />
          </Box>

          {/* Mobile Products Section */}
          <Box>
            {/* Breadcrumbs and Active Filters */}
            <Box sx={{ 
              mb: 4,
              bgcolor: 'white',
              borderRadius: 3,
              p: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.06)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="body2" sx={{ 
                  color: '#666',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}>
                  Home {'>'} Shop {'>'}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleClearFilters}
                  sx={{ 
                    ml: 'auto',
                    borderColor: '#e0e0e0',
                    color: '#666',
                    '&:hover': {
                      borderColor: '#1976d2',
                      color: '#1976d2',
                      bgcolor: 'rgba(25, 118, 210, 0.04)'
                    }
                  }}
                >
                  Clear filters
                </Button>
              </Box>
              
              {/* Active Filter Tags */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {localFilters.category && (
                  <Chip
                    label={localFilters.category}
                    onDelete={() => {
                      handleRemoveFilter('category');
                      handleRemoveFilter('subcategory');
                      handleRemoveFilter('subCategory');
                    }}
                    color="primary"
                    size="small"
                  />
                )}
                                  {localFilters.subcategory && (
                    <Chip
                      label={localFilters.subcategory}
                      onDelete={() => {
                        handleRemoveFilter('subcategory');
                        handleRemoveFilter('subCategory');
                      }}
                      color="secondary"
                      size="small"
                    />
                  )}
                {localFilters.brand && (
                  <Chip
                    label={localFilters.brand}
                    onDelete={() => handleRemoveFilter('brand')}
                    color="primary"
                    size="small"
                  />
                )}
                {localFilters.color && (
                  <Chip
                    label={localFilters.color}
                    onDelete={() => handleRemoveFilter('color')}
                    color="primary"
                    size="small"
                  />
                )}
                {localFilters.minPrice && localFilters.maxPrice && (
                  <Chip
                    label={`₹${localFilters.minPrice} - ₹${localFilters.maxPrice}`}
                    onDelete={() => {
                      handleRemoveFilter('minPrice');
                      handleRemoveFilter('maxPrice');
                      setPriceRange([10, 10000]);
                    }}
                    color="primary"
                    size="small"
                  />
                )}
              </Box>
            </Box>

            {/* Promotional Banner */}
            <Box sx={{ 
              mb: 4, 
              p: 4, 
              bgcolor: 'white',
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              border: '1px solid rgba(0,0,0,0.06)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
              <Box sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2) 0%, transparent 60%)',
                pointerEvents: 'none'
              }} />
              <Chip
                label="Only This Week"
                size="small"
                sx={{ 
                  bgcolor: '#ff6b6b', 
                  color: 'white', 
                  mb: 3,
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  px: 2,
                  py: 0.5
                }}
              />
              <Typography variant="h4" sx={{ 
                mb: 2, 
                fontWeight: 800, 
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                Pharmacy with different treasures
              </Typography>
              <Typography variant="body1" sx={{ 
                mb: 4, 
                color: 'rgba(255,255,255,0.9)',
                fontSize: '1.1rem',
                lineHeight: 1.6
              }}>
                We have prepared special discounts for you on Pharmacy products...
              </Typography>
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{ 
                  bgcolor: 'white',
                  color: '#667eea',
                  '&:hover': { 
                    bgcolor: 'rgba(255,255,255,0.9)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                  },
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: '1rem',
                  borderRadius: 2,
                  transition: 'all 0.3s ease'
                }}
              >
                Shop Now
              </Button>
            </Box>

            {/* Results and Controls */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 4,
              flexWrap: 'wrap',
              gap: 2,
              bgcolor: 'white',
              borderRadius: 3,
              p: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.06)'
            }}>
              <Typography variant="body1" sx={{ 
                fontWeight: 600,
                color: '#1a1a1a'
              }}>
                Showing all {totalProducts} results
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <Select
      value={localFilters.sort}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    displayEmpty
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2'
                        }
                      }
      }}
    >
      {sortOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2'
                        }
                      }
                    }}
                  >
                    <MenuItem value={12}>12 Items</MenuItem>
                    <MenuItem value={20}>20 Items</MenuItem>
                    <MenuItem value={24}>24 Items</MenuItem>
                    <MenuItem value={36}>36 Items</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ 
                  display: 'flex', 
                  border: '1px solid #e0e0e0', 
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  <IconButton
                    size="small"
                    onClick={() => setViewMode('grid')}
                    sx={{ 
                      bgcolor: viewMode === 'grid' ? '#1976d2' : 'transparent',
                      color: viewMode === 'grid' ? 'white' : '#666',
                      borderRadius: 0,
                      px: 2,
                      '&:hover': {
                        bgcolor: viewMode === 'grid' ? '#1565c0' : 'rgba(25, 118, 210, 0.08)',
                        color: viewMode === 'grid' ? 'white' : '#1976d2'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <ViewModule />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setViewMode('list')}
                    sx={{ 
                      bgcolor: viewMode === 'list' ? '#1976d2' : 'transparent',
                      color: viewMode === 'list' ? 'white' : '#666',
                      borderRadius: 0,
                      px: 2,
                      '&:hover': {
                        bgcolor: viewMode === 'list' ? '#1565c0' : 'rgba(25, 118, 210, 0.08)',
                        color: viewMode === 'list' ? 'white' : '#1976d2'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <ViewList />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error.message}
              </Alert>
            )}

            {/* Products Grid */}
            {loading ? (
              <Grid container spacing={2}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <Grid item xs={6} key={index} sx={{ display: 'flex' }}>
                    <Card sx={{ width: '100%', height: '100%' }}>
                      <Skeleton variant="rectangular" height={150} />
                      <CardContent sx={{ minHeight: 120 }}>
                        <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                        <Skeleton variant="text" height={16} sx={{ mb: 1 }} />
                        <Skeleton variant="text" height={16} sx={{ mb: 1 }} />
                        <Skeleton variant="rectangular" height={32} />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <>
                {displayProducts && displayProducts.length > 0 ? (
                  <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 3,
                    width: '100%'
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
                        offer: product.offer || '75%',
                        image: product.thumbnailImage || product.image || "https://via.placeholder.com/300x200?text=No+Image",
                        badge: product.badge || product.category?.toLowerCase() || "new arrival",
                        title: product.name || product.title || "Product Title",
                        rating: product.rating || '5.0',
                        price: product.price || '0.50',
                        originalPrice: product.originalPrice || (parseFloat(product.price || '0.50') * 4).toFixed(2),
                        id: productId,
                        averageRating: product.averageRating || '5.0',
                        reviewCount: product.reviewCount || 0,
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
                          averageRating={transformedProduct.averageRating}
                          reviewCount={transformedProduct.reviewCount}
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
                    minHeight: '300px',
                    width: '100%'
                  }}>
                    <Typography variant="h6" color="text.secondary">
                      No products found. Please try adjusting your filters or check back later.
                    </Typography>
                  </Box>
                )}

                {/* Pagination - only show when there are products and multiple pages */}
                {displayProducts && displayProducts.length > 0 && totalPages > 1 && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      margin: '32px 0 0 0',
        width: '100%',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 500,
                        color: '#1976d2',
        fontSize: 16,
                        letterSpacing: 0.5,
                        alignSelf: 'center',
                      }}
                    >
                      Page {pagination.page} of {totalPages}
      </Typography>
                    <Pagination
                      count={totalPages}
                      page={pagination.page}
                      onChange={handlePageChange}
                      color="primary"
                      size="medium"
                      siblingCount={1}
                      boundaryCount={1}
                      sx={{
                        '& .MuiPaginationItem-root': {
                          fontWeight: 600,
                          fontSize: 16,
                          borderRadius: '6px',
                          margin: '0 2px',
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
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      ) : (
        /* Desktop Layout - 80% screen width with 30% sidebar and 70% products */
        <Box sx={{ 
          width: '90%', 
          margin: '0 auto',
          py: 6
        }}>
          <Box sx={{ 
            display: 'flex', 
            gap: 4,
            width: '100%'
          }}>
            {/* Desktop Sidebar - 30% */}
            <Box sx={{ 
              width: '25%',
              flexShrink: 0
            }}>
              <FilterSidebar />
            </Box>

            {/* Main Content - 70% */}
            <Box sx={{ 
              width: '75%',
              flexGrow: 1
            }}>
              {/* Breadcrumbs and Active Filters */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Home {'>'} Shop {'>'}
                  </Typography>
                <Button
                  variant="outlined"
                    size="small"
                  onClick={handleClearFilters}
                    sx={{ ml: 'auto' }}
                >
                    Clear filters
                </Button>
          </Box>
                
                {/* Active Filter Tags */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {localFilters.category && (
                    <Chip
                      label={localFilters.category}
                      onDelete={() => {
                        handleRemoveFilter('category');
                        handleRemoveFilter('subcategory');
                        handleRemoveFilter('subCategory');
                      }}
                      color="primary"
                      size="small"
                    />
                  )}
                  {localFilters.subcategory && (
                    <Chip
                      label={localFilters.subcategory}
                      onDelete={() => {
                        handleRemoveFilter('subcategory');
                        handleRemoveFilter('subCategory');
                      }}
                      color="secondary"
                      size="small"
                    />
                  )}
                  {localFilters.brand && (
                    <Chip
                      label={localFilters.brand}
                      onDelete={() => handleRemoveFilter('brand')}
                      color="primary"
                      size="small"
                    />
                  )}
                  {localFilters.color && (
                    <Chip
                      label={localFilters.color}
                      onDelete={() => handleRemoveFilter('color')}
                      color="primary"
                      size="small"
                    />
                  )}
                  {localFilters.minPrice && localFilters.maxPrice && (
                    <Chip
                      label={`₹${localFilters.minPrice} - ₹${localFilters.maxPrice}`}
                      onDelete={() => {
                        handleRemoveFilter('minPrice');
                        handleRemoveFilter('maxPrice');
                        setPriceRange([10, 10000]);
                      }}
                      color="primary"
                      size="small"
                    />
                  )}
                </Box>
              </Box>

              {/* Promotional Banner */}
              <Box sx={{ 
                mb: 4, 
                p: 4, 
                bgcolor: '#f5f5f5', 
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)'
              }}>
                <Box sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0,
                  background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                  pointerEvents: 'none'
                }} />
                <Chip
                  label="Only This Week"
                  size="small"
                  sx={{ 
                    bgcolor: '#4caf50', 
                    color: 'white', 
                    mb: 2,
                    fontWeight: 600
                  }}
                />
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: '#333' }}>
                  Pharmacy with different treasures
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: '#666', maxWidth: 600 }}>
                  We have prepared special discounts for you on Pharmacy products...
                </Typography>
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  sx={{ 
                    bgcolor: '#1976d2',
                    '&:hover': { bgcolor: '#1565c0' },
                    px: 3,
                    py: 1.5
                  }}
                >
                  Shop Now
                </Button>
              </Box>

              {/* Results and Controls */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 3,
                flexWrap: 'wrap',
                gap: 2
              }}>
                <Typography variant="body1">
                  Showing all {totalProducts} results
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <Select
                      value={localFilters.sort}
                      onChange={(e) => handleFilterChange('sort', e.target.value)}
                      displayEmpty
                    >
                      {sortOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(e.target.value)}
                    >
                      <MenuItem value={12}>12 Items</MenuItem>
                      <MenuItem value={20}>20 Items</MenuItem>
                      <MenuItem value={24}>24 Items</MenuItem>
                      <MenuItem value={36}>36 Items</MenuItem>
                    </Select>
                  </FormControl>
                  <Box sx={{ display: 'flex', border: '1px solid #ddd', borderRadius: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => setViewMode('grid')}
                      sx={{ 
                        bgcolor: viewMode === 'grid' ? '#1976d2' : 'transparent',
                        color: viewMode === 'grid' ? 'white' : '#666',
                        borderRadius: 0,
                        '&:hover': {
                          bgcolor: viewMode === 'grid' ? '#1565c0' : '#f5f5f5'
                        }
                      }}
                    >
                      <ViewModule />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setViewMode('list')}
                      sx={{ 
                        bgcolor: viewMode === 'list' ? '#1976d2' : 'transparent',
                        color: viewMode === 'list' ? 'white' : '#666',
                        borderRadius: 0,
                        '&:hover': {
                          bgcolor: viewMode === 'list' ? '#1565c0' : '#f5f5f5'
                        }
                      }}
                    >
                      <ViewList />
                    </IconButton>
                  </Box>
                </Box>
              </Box>

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
              display: 'grid',
                      gridTemplateColumns: viewMode === 'grid' 
                        ? 'repeat(4, 1fr)'
                        : '1fr',
                      gap: 3,
                      width: '100%'
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
                          offer: product.offer || '75%',
                  image: product.thumbnailImage || product.image || "https://via.placeholder.com/300x200?text=No+Image",
                  badge: product.badge || product.category?.toLowerCase() || "new arrival",
                  title: product.name || product.title || "Product Title",
                          rating: product.rating || '5.0',
                          price: product.price || '0.50',
                          originalPrice: product.originalPrice || (parseFloat(product.price || '0.50') * 4).toFixed(2),
                  id: productId,
                          averageRating: product.averageRating || '5.0',
                  reviewCount: product.reviewCount || 0,
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
                    averageRating={transformedProduct.averageRating}
                    reviewCount={transformedProduct.reviewCount}
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                margin: '48px 0 0 0',
                width: '100%',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  color: '#1976d2',
                  fontSize: 18,
                  letterSpacing: 0.5,
                  alignSelf: 'center',
                }}
              >
                Page {pagination.page} of {totalPages}
              </Typography>
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
            </Box>
          )}
        </>
      )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
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
