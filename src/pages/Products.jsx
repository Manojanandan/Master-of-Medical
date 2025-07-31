import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  Chip,
  Skeleton,
  Alert,
  useTheme,
  useMediaQuery
} from "@mui/material";
import ProductCard from "../components/e_commerceComponents/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  fetchPublicProducts,
  updateFilters,
  updatePagination,
  clearFilters
} from "../redux/PublicProductReducer";
import { fetchCart } from "../redux/CartReducer";
import { getAllCategoriesAndSubcategories } from "../utils/Service";
import FilterSidebar from "../pages/vendor/FilterSidebar";

// ...existing code...
// Modern color palette
const colors = {
  primary: '#de3b6f',
  secondary: '#f49507',
  accent: '#873589',
  background: '#fff',
  border: '#f1ac1b',
  text: '#22223b',
  lightText: '#6c757d',
  lightBg: '#f8f9fa',
  gradientBg: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f0f2f5 100%)',
  cardShadow: '0 8px 32px rgba(34, 34, 59, 0.1)',
  hoverShadow: '0 12px 40px rgba(34, 34, 59, 0.15)',
};

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

  // Local state
  const [priceRange, setPriceRange] = useState([10, 10000]);
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

  const displayProducts = products;
  const totalProducts = pagination.total || products.length;
  const totalPages = pagination.totalPages || Math.ceil(totalProducts / itemsPerPage);
  
  useEffect(() => {
    dispatch(fetchPublicProducts({
      page: pagination.page,
      limit: itemsPerPage,
      ...filters
    }));
  }, [dispatch, pagination.page, itemsPerPage, filters]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const urlFilters = {};
    
    if (urlParams.get('search')) urlFilters.search = urlParams.get('search');
    if (urlParams.get('category')) urlFilters.category = urlParams.get('category');
    if (urlParams.get('subCategory')) urlFilters.subCategory = urlParams.get('subCategory');
    if (urlParams.get('brand')) urlFilters.brand = urlParams.get('brand');
    if (urlParams.get('color')) urlFilters.color = urlParams.get('color');
    if (urlParams.get('minPrice')) urlFilters.minPrice = urlParams.get('minPrice');
    if (urlParams.get('maxPrice')) urlFilters.maxPrice = urlParams.get('maxPrice');
    if (urlParams.get('sort')) urlFilters.sort = urlParams.get('sort');
    
    if (Object.keys(urlFilters).length > 0) {
      setLocalFilters(prev => ({ ...prev, ...urlFilters }));
      
      if (urlFilters.minPrice && urlFilters.maxPrice) {
        setPriceRange([parseInt(urlFilters.minPrice), parseInt(urlFilters.maxPrice)]);
      } else {
        setPriceRange([10, 10000]);
      }
      
      dispatch(updateFilters(urlFilters));
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await getAllCategoriesAndSubcategories();
        if (response.data.success) {
          setCategories(response.data.data);
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
    navigate(`/customer/products/${productId}`);
  };

  const handleFilterChange = (filterType, value) => {
    setLocalFilters(prev => ({ ...prev, [filterType]: value }));
    
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'All') {
      newParams.set(filterType, value);
    } else {
      newParams.delete(filterType);
    }
    setSearchParams(newParams);
    
    const filterValue = value === 'All' ? '' : value;
    dispatch(updateFilters({ [filterType]: filterValue }));
  };

  const handlePriceRangeCommit = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('minPrice', priceRange[0]);
    newParams.set('maxPrice', priceRange[1]);
    setSearchParams(newParams);
    
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
    dispatch(clearFilters());
  };

  const handlePageChange = (event, page) => {
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
      category: '',
      subcategory: subcategoryName,
      subCategory: subcategoryId
    }));
    
    const newParams = new URLSearchParams();
    newParams.set('subCategory', subcategoryId);
    setSearchParams(newParams);
    
    dispatch(updateFilters({ 
      category: '',
      subcategory: subcategoryName,
      subCategory: subcategoryId
    }));
  };

  // Modern styled components
  const StyledCard = ({ children, sx = {}, ...props }) => (
    <Card 
      sx={{
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(34, 34, 59, 0.08)',
        border: `1px solid ${colors.border}15`,
        background: colors.background,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover': {
          boxShadow: '0 12px 48px rgba(34, 34, 59, 0.12)',
          transform: 'translateY(-6px)',
          '&::before': {
            opacity: 1,
          }
        },
        ...sx
      }}
      {...props}
    >
      {children}
    </Card>
  );

  const StyledChip = ({ label, onDelete, sx = {}, ...props }) => (
    <Chip
      label={label}
      onDelete={onDelete}
      sx={{
        borderRadius: '24px',
        background: `linear-gradient(135deg, ${colors.primary}12 0%, ${colors.secondary}12 100%)`,
        border: `2px solid ${colors.border}30`,
        color: colors.text,
        fontWeight: 600,
        fontSize: '0.875rem',
        padding: '4px 8px',
        height: '36px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.secondary}20 100%)`,
          border: `2px solid ${colors.primary}50`,
          transform: 'translateY(-2px)',
          boxShadow: `0 4px 16px ${colors.primary}25`,
        },
        '& .MuiChip-deleteIcon': {
          color: colors.primary,
          fontSize: '1.2rem',
          transition: 'all 0.2s ease',
          '&:hover': {
            color: colors.accent,
            transform: 'scale(1.1)',
          }
        },
        '& .MuiChip-label': {
          padding: '0 12px',
        },
        ...sx
      }}
      {...props}
    />
  );

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      background: colors.gradientBg,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '200px',
        background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}10 50%, ${colors.accent}10 100%)`,
        zIndex: 0,
      }
    }}>
      {/* Mobile Layout */}
      {isMobile ? (
        <Box sx={{ width: '100%', p: 3, position: 'relative', zIndex: 1 }}>
          {/* Mobile Filter Section */}
          <StyledCard sx={{ mb: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 700,
                color: colors.text,
                fontSize: '1.25rem',
                mb: 3
              }}>
                Filters
              </Typography>
              <FilterSidebar 
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                handlePriceRangeCommit={handlePriceRangeCommit}
                localFilters={localFilters}
                handleFilterChange={handleFilterChange}
                categories={categories}
                loadingCategories={loadingCategories}
                expandedCategories={expandedCategories}
                handleCategoryToggle={handleCategoryToggle}
                handleSubcategorySelect={handleSubcategorySelect}
                handleClearFilters={handleClearFilters}
              />
            </CardContent>
          </StyledCard>

          {/* Active Filters */}
          {(localFilters.category || localFilters.subcategory || localFilters.brand || localFilters.color || (localFilters.minPrice && localFilters.maxPrice)) && (
            <StyledCard sx={{ mb: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {localFilters.category && (
                    <StyledChip
                      label={localFilters.category}
                      onDelete={() => {
                        handleRemoveFilter('category');
                        handleRemoveFilter('subcategory');
                        handleRemoveFilter('subCategory');
                      }}
                      size="small"
                    />
                  )}
                  {localFilters.subcategory && (
                    <StyledChip
                      label={localFilters.subcategory}
                      onDelete={() => {
                        handleRemoveFilter('subcategory');
                        handleRemoveFilter('subCategory');
                      }}
                      size="small"
                    />
                  )}
                  {localFilters.brand && (
                    <StyledChip
                      label={localFilters.brand}
                      onDelete={() => handleRemoveFilter('brand')}
                      size="small"
                    />
                  )}
                  {localFilters.color && (
                    <StyledChip
                      label={localFilters.color}
                      onDelete={() => handleRemoveFilter('color')}
                      size="small"
                    />
                  )}
                  {localFilters.minPrice && localFilters.maxPrice && (
                    <StyledChip
                      label={`₹${localFilters.minPrice} - ₹${localFilters.maxPrice}`}
                      onDelete={() => {
                        handleRemoveFilter('minPrice');
                        handleRemoveFilter('maxPrice');
                        setPriceRange([10, 10000]);
                      }}
                      size="small"
                    />
                  )}
                </Box>
              </CardContent>
            </StyledCard>
          )}



          {/* Error Alert */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: '12px',
                border: `1px solid ${colors.primary}30`,
                '& .MuiAlert-icon': {
                  color: colors.primary
                }
              }}
            >
              {error.message}
            </Alert>
          )}

          {/* Products Grid */}
          {loading ? (
            <Grid container spacing={2}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={6} key={index} sx={{ display: 'flex' }}>
                  <StyledCard sx={{ width: '100%', height: '100%' }}>
                    <Skeleton variant="rectangular" height={150} sx={{ borderRadius: '16px 16px 0 0' }} />
                    <CardContent sx={{ minHeight: 120 }}>
                      <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                      <Skeleton variant="text" height={16} sx={{ mb: 1 }} />
                      <Skeleton variant="text" height={16} sx={{ mb: 1 }} />
                      <Skeleton variant="rectangular" height={32} sx={{ borderRadius: '8px' }} />
                    </CardContent>
                  </StyledCard>
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
                    const productId = product._id || product.id || product.productId || product.product_id;
                    
                    if (!productId) {
                      console.error('No product ID found for product:', product);
                      return null;
                    }
                    
                    const transformedProduct = {
                      offer: product.offer || '75%',
                      image: product.thumbnailImage || product.image || "https://via.placeholder.com/300x200?text=No+Image",
                      badge: product.badge || product.category?.toLowerCase() || "",
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
                <StyledCard sx={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: colors.lightText, textAlign: 'center' }}>
                      No products found. Please try adjusting your filters.
                    </Typography>
                  </CardContent>
                </StyledCard>
              )}

              {/* Simple Pagination */}
              {displayProducts && displayProducts.length > 0 && totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                  <Pagination
                    count={totalPages}
                    page={pagination.page}
                    onChange={handlePageChange}
                    sx={{
                      '& .MuiPaginationItem-root': {
                        borderRadius: '12px',
                        border: `2px solid ${colors.border}30`,
                        background: colors.background,
                        color: colors.text,
                        fontWeight: 600,
                        fontSize: '1rem',
                        margin: '0 4px',
                        padding: '8px 12px',
                        minWidth: '44px',
                        height: '44px',
                        boxShadow: '0 4px 12px rgba(34, 34, 59, 0.08)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}10 100%)`,
                          border: `2px solid ${colors.primary}50`,
                          color: colors.primary,
                          transform: 'translateY(-2px)',
                          boxShadow: `0 6px 20px ${colors.primary}20`,
                        },
                        '&.Mui-selected': {
                          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                          color: colors.background,
                          border: `2px solid ${colors.primary}`,
                          boxShadow: `0 6px 20px ${colors.primary}40`,
                          '&:hover': {
                            background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)`,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 24px ${colors.primary}50`,
                          },
                        },
                        '&.MuiPaginationItem-ellipsis': {
                          border: 'none',
                          background: 'transparent',
                          boxShadow: 'none',
                          color: colors.lightText,
                          '&:hover': {
                            background: 'transparent',
                            transform: 'none',
                            boxShadow: 'none',
                          }
                        }
                      },
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      ) : (
        /* Desktop Layout */
        <Box sx={{ 
          width: '90%', 
          margin: '0 auto',
          py: 6,
          position: 'relative',
          zIndex: 1
        }}>
          <Box sx={{ 
            display: 'flex', 
            gap: 4,
            width: '100%'
          }}>
            {/* Desktop Sidebar - 25% */}
            <Box sx={{ 
              width: '25%',
              flexShrink: 0
            }}>
              <FilterSidebar 
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                handlePriceRangeCommit={handlePriceRangeCommit}
                localFilters={localFilters}
                handleFilterChange={handleFilterChange}
                categories={categories}
                loadingCategories={loadingCategories}
                expandedCategories={expandedCategories}
                handleCategoryToggle={handleCategoryToggle}
                handleSubcategorySelect={handleSubcategorySelect}
                handleClearFilters={handleClearFilters}
              />
            </Box>

            {/* Main Content - 75% */}
            <Box sx={{ 
              width: '75%',
              flexGrow: 1
            }}>
              {/* Active Filters */}
              {(localFilters.category || localFilters.subcategory || localFilters.brand || localFilters.color || (localFilters.minPrice && localFilters.maxPrice)) && (
                <StyledCard sx={{ mb: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {localFilters.category && (
                        <StyledChip
                          label={localFilters.category}
                          onDelete={() => {
                            handleRemoveFilter('category');
                            handleRemoveFilter('subcategory');
                            handleRemoveFilter('subCategory');
                          }}
                          size="small"
                        />
                      )}
                      {localFilters.subcategory && (
                        <StyledChip
                          label={localFilters.subcategory}
                          onDelete={() => {
                            handleRemoveFilter('subcategory');
                            handleRemoveFilter('subCategory');
                          }}
                          size="small"
                        />
                      )}
                      {localFilters.brand && (
                        <StyledChip
                          label={localFilters.brand}
                          onDelete={() => handleRemoveFilter('brand')}
                          size="small"
                        />
                      )}
                      {localFilters.color && (
                        <StyledChip
                          label={localFilters.color}
                          onDelete={() => handleRemoveFilter('color')}
                          size="small"
                        />
                      )}
                      {localFilters.minPrice && localFilters.maxPrice && (
                        <StyledChip
                          label={`₹${localFilters.minPrice} - ₹${localFilters.maxPrice}`}
                          onDelete={() => {
                            handleRemoveFilter('minPrice');
                            handleRemoveFilter('maxPrice');
                            setPriceRange([10, 10000]);
                          }}
                          size="small"
                        />
                      )}
                    </Box>
                  </CardContent>
                </StyledCard>
              )}

              {/* Results and Controls */}
              <StyledCard sx={{ mb: 3, boxShadow: '0 8px 32px rgba(34, 34, 59, 0.10)', background: 'linear-gradient(135deg, #fff 60%, #f8f9fa 100%)', borderRadius: '28px', border: `1.5px solid ${colors.primary}10` }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: colors.primary, fontSize: '1.5rem', letterSpacing: '-0.02em', textShadow: `0 2px 8px ${colors.primary}10` }}>
                        {totalProducts} Results
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <FormControl size="small" sx={{ minWidth: 180 }}>
                          <Select
                            value={localFilters.sort}
                            onChange={(e) => handleFilterChange('sort', e.target.value)}
                            displayEmpty
                            sx={{
                              borderRadius: '18px',
                              height: '48px',
                              background: colors.lightBg,
                              border: `2px solid transparent`,
                              fontWeight: 600,
                              fontSize: '1rem',
                              color: colors.text,
                              boxShadow: '0 4px 16px rgba(34, 34, 59, 0.08)',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  border: 'none',
                                },
                                '&:hover': {
                                  background: colors.background,
                                  border: `2px solid ${colors.primary}40`,
                                  boxShadow: `0 8px 24px ${colors.primary}20`,
                                  transform: 'translateY(-2px)',
                                },
                                '&.Mui-focused': {
                                  background: colors.background,
                                  border: `2px solid ${colors.primary}`,
                                  boxShadow: `0 8px 24px ${colors.primary}30`,
                                  transform: 'translateY(-2px)',
                                }
                              },
                              '& .MuiSelect-select': {
                                padding: '14px 18px',
                                display: 'flex',
                                alignItems: 'center',
                              },
                              '& .MuiSelect-icon': {
                                color: colors.primary,
                                fontSize: '1.6rem',
                                right: '14px',
                              }
                            }}
                          >
                            {sortOptions.map((option) => (
                              <MenuItem 
                                key={option.value} 
                                value={option.value}
                                sx={{
                                  fontWeight: 500,
                                  color: colors.text,
                                  padding: '12px 18px',
                                  fontSize: '1rem',
                                  '&:hover': {
                                    background: `${colors.primary}10`,
                                    color: colors.primary,
                                  },
                                  '&.Mui-selected': {
                                    background: `${colors.primary}15`,
                                    color: colors.primary,
                                    fontWeight: 600,
                                    '&:hover': {
                                      background: `${colors.primary}20`,
                                    }
                                  }
                                }}
                              >
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl size="small" sx={{ minWidth: 140 }}>
                          <Select
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(e.target.value)}
                            sx={{
                              borderRadius: '18px',
                              height: '48px',
                              background: colors.lightBg,
                              border: `2px solid transparent`,
                              fontWeight: 600,
                              fontSize: '1rem',
                              color: colors.text,
                              boxShadow: '0 4px 16px rgba(34, 34, 59, 0.08)',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  border: 'none',
                                },
                                '&:hover': {
                                  background: colors.background,
                                  border: `2px solid ${colors.secondary}40`,
                                  boxShadow: `0 8px 24px ${colors.secondary}20`,
                                  transform: 'translateY(-2px)',
                                },
                                '&.Mui-focused': {
                                  background: colors.background,
                                  border: `2px solid ${colors.secondary}`,
                                  boxShadow: `0 8px 24px ${colors.secondary}30`,
                                  transform: 'translateY(-2px)',
                                }
                              },
                              '& .MuiSelect-select': {
                                padding: '14px 18px',
                                display: 'flex',
                                alignItems: 'center',
                              },
                              '& .MuiSelect-icon': {
                                color: colors.secondary,
                                fontSize: '1.6rem',
                                right: '14px',
                              }
                            }}
                          >
                            <MenuItem value={12} sx={{ fontWeight: 500, color: colors.text, padding: '12px 18px', fontSize: '1rem', '&:hover': { background: `${colors.secondary}10`, color: colors.secondary }, '&.Mui-selected': { background: `${colors.secondary}15`, color: colors.secondary, fontWeight: 600, '&:hover': { background: `${colors.secondary}20` } } }}>12 Items</MenuItem>
                            <MenuItem value={20} sx={{ fontWeight: 500, color: colors.text, padding: '12px 18px', fontSize: '1rem', '&:hover': { background: `${colors.secondary}10`, color: colors.secondary }, '&.Mui-selected': { background: `${colors.secondary}15`, color: colors.secondary, fontWeight: 600, '&:hover': { background: `${colors.secondary}20` } } }}>20 Items</MenuItem>
                            <MenuItem value={24} sx={{ fontWeight: 500, color: colors.text, padding: '12px 18px', fontSize: '1rem', '&:hover': { background: `${colors.secondary}10`, color: colors.secondary }, '&.Mui-selected': { background: `${colors.secondary}15`, color: colors.secondary, fontWeight: 600, '&:hover': { background: `${colors.secondary}20` } } }}>24 Items</MenuItem>
                            <MenuItem value={36} sx={{ fontWeight: 500, color: colors.text, padding: '12px 18px', fontSize: '1rem', '&:hover': { background: `${colors.secondary}10`, color: colors.secondary }, '&.Mui-selected': { background: `${colors.secondary}15`, color: colors.secondary, fontWeight: 600, '&:hover': { background: `${colors.secondary}20` } } }}>36 Items</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                    {/* Enhanced Submenu (Subcategory) Bar Only */}
                    {categories && localFilters.category && categories.find(c => c.name === localFilters.category) && (
                      <Box sx={{
                        display: 'flex',
                        gap: 1.5,
                        flexWrap: 'wrap',
                        mt: 2,
                        p: 1.5,
                        background: 'linear-gradient(90deg, #f8f9fa 60%, #fff 100%)',
                        borderRadius: '16px',
                        boxShadow: '0 2px 12px rgba(34,34,59,0.06)',
                        border: `1px solid ${colors.primary}10`,
                        alignItems: 'center',
                        minHeight: '56px',
                      }}>
                        {categories.find(c => c.name === localFilters.category)?.subcategories?.slice(0, 8).map((sub) => (
                          <Box
                            key={sub.id || sub._id || sub.name}
                            sx={{
                              px: 2.5,
                              py: 1,
                              borderRadius: '24px',
                              background: localFilters.subcategory === sub.name ? `linear-gradient(90deg, ${colors.secondary} 60%, ${colors.primary} 100%)` : colors.lightBg,
                              color: localFilters.subcategory === sub.name ? colors.background : colors.text,
                              fontWeight: 700,
                              fontSize: '1rem',
                              cursor: 'pointer',
                              boxShadow: localFilters.subcategory === sub.name ? `0 4px 16px ${colors.secondary}30` : 'none',
                              border: localFilters.subcategory === sub.name ? `2px solid ${colors.secondary}` : `2px solid ${colors.border}30`,
                              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                              '&:hover': {
                                background: `linear-gradient(90deg, ${colors.secondary}20 60%, ${colors.primary}20 100%)`,
                                color: colors.secondary,
                                border: `2px solid ${colors.secondary}`,
                                transform: 'translateY(-2px) scale(1.04)',
                              },
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.5,
                            }}
                            onClick={() => handleFilterChange('subcategory', sub.name)}
                          >
                            {sub.name}
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </StyledCard>

              {/* Error Alert */}
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    borderRadius: '12px',
                    border: `1px solid ${colors.primary}30`,
                    '& .MuiAlert-icon': {
                      color: colors.primary
                    }
                  }}
                >
                  {error.message}
                </Alert>
              )}

              {/* Products Grid */}
              {loading ? (
                <Grid container spacing={3}>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ display: 'flex' }}>
                      <StyledCard sx={{ width: '100%', height: '100%' }}>
                        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: '16px 16px 0 0' }} />
                        <CardContent sx={{ minHeight: 200 }}>
                          <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                          <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                          <Skeleton variant="text" height={20} sx={{ mb: 2 }} />
                          <Skeleton variant="rectangular" height={40} sx={{ borderRadius: '8px' }} />
                        </CardContent>
                      </StyledCard>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <>
                  {displayProducts && displayProducts.length > 0 ? (
                    <Box sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: 3,
                      width: '100%'
                    }}>
                      {displayProducts.map((product) => {
                        const productId = product._id || product.id || product.productId || product.product_id;
                        
                        if (!productId) {
                          console.error('No product ID found for product:', product);
                          return null;
                        }
                        
                        const transformedProduct = {
                          offer: product.offer || '75%',
                          image: product.thumbnailImage || product.image || "https://via.placeholder.com/300x200?text=No+Image",
                          badge: product.badge || product.category?.toLowerCase() || "",
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
                    <StyledCard sx={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ color: colors.lightText, textAlign: 'center' }}>
                          No products found. Please try adjusting your filters.
                        </Typography>
                      </CardContent>
                    </StyledCard>
                  )}

                  {/* Simple Pagination */}
                  {displayProducts && displayProducts.length > 0 && totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                      <Pagination
                        count={totalPages}
                        page={pagination.page}
                        onChange={handlePageChange}
                        color="primary"
                        sx={{
                          '& .MuiPaginationItem-root': {
                            color: colors.primary,
                            '&.Mui-selected': {
                              backgroundColor: colors.primary,
                              color: colors.background,
                            },
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