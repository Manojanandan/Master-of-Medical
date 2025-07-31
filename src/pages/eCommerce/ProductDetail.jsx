import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  CardMedia,
  Typography,
  Box,
  Button,
  Rating,
  Skeleton,
  Alert,
  IconButton,
  Breadcrumbs,
  Link,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  LocalShipping,
  ArrowBack,
  CheckCircle,
  Security,
  NavigateNext,
  Remove,
  Add,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicProductById, clearCurrentProduct } from "../../redux/PublicProductReducer";
import { addToCart, fetchCart, removeFromCart, updateCartItemQuantity } from "../../redux/CartReducer";
import { fetchProductReviews, clearReviews } from "../../redux/ReviewReducer";
import StarRating from "../../components/e_commerceComponents/StarRating";
import ReviewForm from "../../components/e_commerceComponents/ReviewForm";
import ReviewList from "../../components/e_commerceComponents/ReviewList";

const ProductDetail = () => {
  // ========================================
  // HOOKS AND STATE MANAGEMENT
  // ========================================
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state selectors
  const { currentProduct, loading, error } = useSelector((state) => state.publicProductReducer);
  const { cart, loading: cartLoading } = useSelector((state) => state.cartReducer);

  // Local state
  const [cartMessage, setCartMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [localQuantity, setLocalQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState('description');

  const product = currentProduct;

  // ========================================
  // DATA FETCHING AND API CALLS
  // ========================================
  useEffect(() => {
    if (id) {
      const productId = parseInt(id) || id;
      console.log('ProductDetail: Fetching product details for productId:', productId);
      dispatch(fetchPublicProductById(productId)); // Fetch product by ID
      
      console.log('ProductDetail: Fetching reviews for productId:', productId);
      dispatch(fetchProductReviews({ productId })); // Fetch reviews by product ID
    }
    
    dispatch(fetchCart()); // Fetch cart data

    // Cleanup function
    return () => {
      dispatch(clearCurrentProduct());
      dispatch(clearReviews());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (product && !isProductInCart()) {
      setLocalQuantity(1);
    }
  }, [cart, product?.id]);

  // ========================================
  // HELPER FUNCTIONS
  // ========================================
  
  // Parse additional information from JSON string with default values
  const getParsedAdditionalInfo = () => {
    if (!product || !product.additionalInformation) return { howToUse: "Not available", sideEffects: "Not available", manufacturer: "Not available" };
    if (typeof product.additionalInformation === 'string') {
      try {
        const parsed = JSON.parse(product.additionalInformation);
        return {
          categoryName: parsed.categoryName || "Unknown Category",
          subCategoryName: parsed.subCategoryName || "Unknown Subcategory",
          howToUse: parsed.howToUse || "Not available",
          sideEffects: parsed.sideEffects || "Not available",
          manufacturer: parsed.manufacturer || "Not available",
          ...parsed
        };
      } catch (error) {
        console.error('Error parsing additionalInformation:', error);
        return { categoryName: "Unknown Category", subCategoryName: "Unknown Subcategory", howToUse: "Not available", sideEffects: "Not available", manufacturer: "Not available" };
      }
    }
    return {
      categoryName: product.additionalInformation.categoryName || "Unknown Category",
      subCategoryName: product.additionalInformation.subCategoryName || "Unknown Subcategory",
      howToUse: product.additionalInformation.howToUse || "Not available",
      sideEffects: product.additionalInformation.sideEffects || "Not available",
      manufacturer: product.additionalInformation.manufacturer || "Not available",
      ...product.additionalInformation
    };
  };

  // ========================================
  // EVENT HANDLERS
  // ========================================
  
  const handleImageChange = (index) => {
    setSelectedImage(index);
  };

  const handleAccordionChange = (panel) => {
    setActiveAccordion(activeAccordion === panel ? null : panel);
  };

  const handleReviewSubmitted = () => {
    if (id) {
      const productId = parseInt(id) || id;
      console.log('ProductDetail: Refreshing reviews with productId:', productId);
      dispatch(fetchProductReviews({ productId }));
    }
  };

  const handleAddToCart = () => {
    if (!product) {
      console.error('Product not available');
      return;
    }
    const productId = product.id;
    if (!productId) {
      console.error('Product ID is required to add to cart');
      return;
    }

    console.log('Adding to cart:', { productId, quantity: localQuantity });
    dispatch(addToCart({ productId, quantity: localQuantity }))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          setCartMessage('Product added to cart successfully!');
          setTimeout(() => setCartMessage(''), 3000);
        } else {
          setCartMessage('Failed to add product to cart');
          setTimeout(() => setCartMessage(''), 3000);
        }
      });
  };

  const handleRemoveFromCart = () => {
    if (!product) {
      console.error('Product not available');
      return;
    }
    const productId = product.id;
    if (!productId) {
      console.error('Product ID is required to remove from cart');
      return;
    }

    console.log('Removing from cart:', { productId });
    dispatch(removeFromCart(productId))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          setCartMessage('Product removed from cart successfully!');
          setTimeout(() => setCartMessage(''), 3000);
          setLocalQuantity(1);
        } else {
          setCartMessage('Failed to remove product from cart');
          setTimeout(() => setCartMessage(''), 3000);
        }
      });
  };

  const handleQuantityChange = (newQuantity) => {
    if (!product) {
      console.error('Product not available');
      return;
    }
    if (newQuantity >= 1 && newQuantity <= (product.quantityAvailable || 10)) {
      if (isProductInCart()) {
        const productId = product.id;
        const cartItem = cart.items.find(item => item.productId === productId);
        if (cartItem) {
          dispatch(updateCartItemQuantity({ cartItemId: cartItem._id, quantity: newQuantity }))
            .then((result) => {
              if (result.meta.requestStatus === 'fulfilled') {
                setCartMessage('Cart updated successfully!');
                setTimeout(() => setCartMessage(''), 3000);
              } else {
                setCartMessage('Failed to update cart');
                setTimeout(() => setCartMessage(''), 3000);
              }
            });
        } else {
          setCartMessage('Product not found in cart');
          setTimeout(() => setCartMessage(''), 3000);
        }
      } else {
        setLocalQuantity(newQuantity);
      }
    }
  };

  // ========================================
  // CART UTILITY FUNCTIONS
  // ========================================
  
  const getCartItemQuantity = () => {
    if (!cart || !cart.items || !product) return 0;
    const productId = product.id;
    const cartItem = cart.items.find(item => item.productId === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const isProductInCart = () => {
    return getCartItemQuantity() > 0;
  };

  const getCurrentQuantity = () => {
    if (isProductInCart()) {
      return getCartItemQuantity();
    }
    return localQuantity;
  };

  // ========================================
  // LOADING STATES
  // ========================================
  
  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, px: 3 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
            <Box sx={{ display: 'flex', gap: '10px', mt: 3 }}>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} variant="rectangular" width={80} height={80} sx={{ borderRadius: 1 }} />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={24} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={60} sx={{ mb: 4 }} />
            <Skeleton variant="text" height={30} sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" height={50} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={50} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, px: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/ecommerceDashboard')}
            sx={{ color: '#666', fontWeight: 500 }}
          >
            Back to Products
          </Button>
        </Box>
        <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
          {error?.message || 'Failed to load product details'}
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, px: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/ecommerceDashboard')}
            sx={{ color: '#666', fontWeight: 500 }}
          >
            Back to Products
          </Button>
        </Box>
        <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
          Product not found
        </Alert>
      </Container>
    );
  }

  // ========================================
  // DATA PARSING
  // ========================================
  
  const parsedAdditionalInfo = getParsedAdditionalInfo();
  console.log('Parsed Additional Info:', parsedAdditionalInfo);
  
  const subCategoryName = product?.subCategoryName || parsedAdditionalInfo.subCategoryName || "Unknown Subcategory"; // Fallback to API or parsed data

  // ========================================
  // MAIN RENDER
  // ========================================
  
  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', py: 2 }}>
      <Container maxWidth="xl" sx={{ px: 3 }}>
        
        {/* ========================================
            MAIN PRODUCT SECTION
        ======================================== */}
        <Box sx={{
          bgcolor: 'white',
          borderRadius: 2,
          p: 1,
          mb: 4,
          mx: { xs: 0, md: 8 }
        }}>
          <Grid container spacing={8}>
            
            {/* ========================================
                LEFT COLUMN - IMAGE GALLERY
            ======================================== */}
            <Grid item xs={12} md={6}>
              <Box sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'flex-start'
              }}>
                
                {/* Thumbnail Images - Left Side */}
                {(product?.galleryImage && product.galleryImage.length > 0) && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      flexShrink: 0
                    }}
                  >
                    {product.galleryImage.map((img, idx) => (
                      <Box
                        key={img}
                        onClick={() => handleImageChange(idx)}
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 1,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: selectedImage === idx ? `2px solid #de3b6f` : '1px solid #e0e0e0',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            border: `2px solid #f49507`,
                            transform: 'scale(1.05)'
                          },
                          bgcolor: 'white'
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={img}
                          alt={`Thumbnail ${idx + 1}`}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                )}

                {/* Main Image - Center */}
                <Box
                  sx={{
                    flex: 1,
                    height: { xs: 300, sm: 400, md: 450 },
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: '#fafafa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product?.galleryImage && product.galleryImage[selectedImage] ? product.galleryImage[selectedImage] : product?.thumbnailImage}
                    alt={product?.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            {/* ========================================
                RIGHT COLUMN - PRODUCT INFORMATION
            ======================================== */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                
                {/* Breadcrumb Navigation */}
                <Box sx={{ mb: 1 }}>
                  <Breadcrumbs
                    separator={<NavigateNext fontSize="small" />}
                    sx={{
                      '& .MuiBreadcrumbs-separator': { color: '#666' },
                      '& .MuiLink-root': {
                        color: '#666',
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        fontWeight: 400,
                        '&:hover': { color: '#de3b6f' }
                      },
                      '& .MuiTypography-root': {
                        color: '#666',
                        fontSize: '0.85rem',
                        fontWeight: 400
                      }
                    }}
                  >
                    <Link
                      color="inherit"
                      onClick={() => navigate('/ecommerceDashboard')}
                      sx={{ cursor: 'pointer' }}
                    >
                      Home
                    </Link>
                    <Link
                      color="inherit"
                      onClick={() => navigate(`/ecommerceDashboard?category=${parsedAdditionalInfo.categoryName}`)}
                      sx={{ cursor: 'pointer' }}
                    >
                      {parsedAdditionalInfo.categoryName || (console.warn('Category name not found in additionalInformation'), 'Category')}
                    </Link>
                    <Link
                      color="inherit"
                      onClick={() => navigate(`/ecommerceDashboard?subCategory=${subCategoryName}`)}
                      sx={{ cursor: 'pointer' }}
                    >
                      {subCategoryName || (console.warn('Subcategory name not found'), 'Sub Category')}
                    </Link>
                    <Typography color="text.primary" sx={{ color: '#666' }}>
                      {product.name}
                    </Typography>
                  </Breadcrumbs>
                </Box>

                {/* Product Title */}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: '#212121',
                    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                    lineHeight: 1.3
                  }}
                >
                  {product?.name}
                </Typography>

                {/* Brand Information */}
                {product.brandName && (
                  <Typography
                    variant="body1"
                    sx={{ color: '#666', mb: 2, fontSize: '0.95rem', fontWeight: 500 }}
                  >
                    BRAND: {product.brandName}
                  </Typography>
                )}

                {/* Reviews Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating
                      value={product.averageRating || 0}
                      precision={0.1}
                      readOnly
                      sx={{
                        '& .MuiRating-iconFilled': { color: '#f49507' },
                        '& .MuiRating-iconHover': { color: '#f49507' }
                      }}
                    />
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                      {product.averageRating || 0}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {product.reviewCount || 0} Ratings & {product.reviewCount || 0} Reviews
                  </Typography>
                </Box>

                {/* Price Section */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#666',
                        textDecoration: 'line-through',
                        fontSize: { xs: '1rem', sm: '1.25rem' }
                      }}
                    >
                      ₹{parsedAdditionalInfo.mrpPrice || (product.price * 1.2).toFixed(0)}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: '#212121',
                        fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                      }}
                    >
                      ₹{product.price}
                    </Typography>
                    {product.priceLable && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#873589',
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          fontStyle: 'italic',
                          ml: 1,
                          px: 1.2,
                          py: 0.2,
                          borderRadius: 1,
                          bgcolor: 'rgba(135,53,137,0.08)',
                          display: 'inline-block',
                        }}
                      >
                        [ {product.priceLable} ]
                      </Typography>
                    )}
                  </Box>
                  {parsedAdditionalInfo.mrpPrice && parsedAdditionalInfo.mrpPrice > product.price && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#873589',
                        fontWeight: 600,
                        fontSize: '0.85rem'
                      }}
                    >
                      {Math.round(((parsedAdditionalInfo.mrpPrice - product.price) / parsedAdditionalInfo.mrpPrice) * 100)}% off
                    </Typography>
                  )}
                </Box>

                {/* Stock Status */}
                <Typography
                  variant="body2"
                  sx={{
                    mb: 2,
                    color: product.quantityAvailable > 0 ? '#2e7d32' : '#d32f2f',
                    fontSize: '0.85rem',
                    fontWeight: 500
                  }}
                >
                  {product.quantityAvailable > 0 ? `In Stock (${product.quantityAvailable} available)` : 'Out of Stock'}
                </Typography>

                {/* Expire Date */}
                {product.expiresOn && (
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      color: '#de3b6f',
                      fontSize: '0.75rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      fontWeight: 500,
                      bgcolor: '#fff1f4',
                      border: '1px solid #873589',
                      borderRadius: 5,
                      p: 0.5,
                      maxWidth: 260,
                      minWidth: 0,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span>⚠️</span>
                    <span><strong>Expires on:</strong> {new Date(product.expiresOn).toLocaleDateString()}</span>
                  </Typography>
                )}

                {/* HSN Code */}
                {product.hsnCode && (
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      color: '#666',
                      fontSize: '0.85rem',
                      fontWeight: 500
                    }}
                  >
                    <strong>HSN Code:</strong> {product.hsnCode}
                  </Typography>
                )}

                {/* Quantity Section */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#212121', fontSize: '0.95rem' }}>
                    Quantity
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        borderRadius: 999,
                        width: 'fit-content',
                        p: 0.5,
                        bgcolor: 'white'
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(getCurrentQuantity() - 1)}
                        disabled={getCurrentQuantity() <= 1 || product.quantityAvailable === 0}
                        sx={{
                          border: '1.5px solid #d1d5db',
                          color: getCurrentQuantity() <= 1 ? '#ccc' : '#de3b6f',
                          borderRadius: '50%',
                          width: 32,
                          height: 32,
                          bgcolor: 'white',
                          '&:hover': {
                            bgcolor: getCurrentQuantity() <= 1 ? 'white' : '#f1f3f6',
                            borderColor: getCurrentQuantity() <= 1 ? '#d1d5db' : '#de3b6f',
                          },
                        }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <Box
                        sx={{
                          minWidth: 36,
                          px: 2,
                          py: 0.5,
                          border: '1.5px solid #d1d5db',
                          borderRadius: '6px',
                          bgcolor: '#fafafa',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 500,
                          color: '#212121',
                          fontSize: '1rem',
                          fontFamily: 'inherit',
                          boxSizing: 'border-box',
                        }}
                      >
                        {getCurrentQuantity()}
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(getCurrentQuantity() + 1)}
                        disabled={getCurrentQuantity() >= (product.quantityAvailable || 10)}
                        sx={{
                          border: '1.5px solid #d1d5db',
                          color: getCurrentQuantity() >= (product.quantityAvailable || 10) ? '#ccc' : '#de3b6f',
                          borderRadius: '50%',
                          width: 32,
                          height: 32,
                          bgcolor: 'white',
                          '&:hover': {
                            bgcolor: getCurrentQuantity() >= (product.quantityAvailable || 10) ? 'white' : '#f1f3f6',
                            borderColor: getCurrentQuantity() >= (product.quantityAvailable || 10) ? '#d1d5db' : '#de3b6f',
                          },
                        }}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Box>

                    {/* Add to Cart Button */}
                    {isProductInCart() ? (
                      <Button
                        variant="outlined"
                        size="large"
                        color="error"
                        onClick={handleRemoveFromCart}
                        disabled={cartLoading || product.quantityAvailable === 0}
                        sx={{
                          py: 2,
                          px: 3,
                          borderRadius: 1,
                          fontWeight: 600,
                          fontSize: '1rem',
                          minWidth: 160,
                          height: 48,
                          borderColor: '#de3b6f',
                          color: '#de3b6f',
                          '&:hover': {
                            borderColor: '#de3b6f',
                            bgcolor: 'rgba(222, 59, 111, 0.04)'
                          }
                        }}
                      >
                        Remove from Cart
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<ShoppingCart />}
                        onClick={handleAddToCart}
                        disabled={cartLoading || product.quantityAvailable === 0}
                        sx={{
                          py: 2,
                          px: 3,
                          borderRadius: 1,
                          fontWeight: 600,
                          fontSize: '1rem',
                          minWidth: 160,
                          height: 48,
                          bgcolor: '#de3b6f',
                          '&:hover': { bgcolor: '#c2185b' }
                        }}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </Box>
                </Box>

                {/* Additional Product Information */}
                {parsedAdditionalInfo.shelfLife && (
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, color: '#666', fontSize: '0.85rem' }}
                  >
                    <strong>Shelf Life:</strong> {parsedAdditionalInfo.shelfLife}
                  </Typography>
                )}
                {parsedAdditionalInfo.country && (
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, color: '#666', fontSize: '0.85rem' }}
                  >
                    <strong>Country of Origin:</strong> {parsedAdditionalInfo.country}
                  </Typography>
                )}

                {/* Spacer to push buttons to bottom */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Cart Message */}
                {cartMessage && (
                  <Alert
                    severity={cartMessage.includes('successfully') ? 'success' : 'error'}
                    sx={{ mb: 2, borderRadius: 1 }}
                    onClose={() => setCartMessage('')}
                  >
                    {cartMessage}
                  </Alert>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* ========================================
            PRODUCT DETAILS ACCORDIONS
        ======================================== */}
        <Box sx={{
          bgcolor: 'white',
          mb: 4,
          borderRadius: 2,
          mx: { xs: 0, md: 11 },
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        }}>
          
          {/* Product Description Accordion */}
          <Accordion
            expanded={activeAccordion === 'description'}
            onChange={() => handleAccordionChange('description')}
            sx={{
              boxShadow: 'none',
              '&:before': { display: 'none' },
              '& .MuiAccordionSummary-root': {
                px: 3,
                py: 1.5,
                borderRadius: 2,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' },
              },
              '& .MuiAccordionDetails-root': {
                px: 3,
                pb: 2,
              },
            }}
          >
            <AccordionSummary
              expandIcon={activeAccordion === 'description' ? <Remove /> : <Add />}
              sx={{ '& .MuiAccordionSummary-content': { margin: 0 } }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#212121' }}>
                Product Description
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {product?.description || "No description available."}
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* How to Use Accordion */}
          <Accordion
            expanded={activeAccordion === 'howToUse'}
            onChange={() => handleAccordionChange('howToUse')}
            sx={{
              boxShadow: 'none',
              '&:before': { display: 'none' },
              '& .MuiAccordionSummary-root': {
                px: 3,
                py: 1.5,
                borderRadius: 2,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' },
              },
              '& .MuiAccordionDetails-root': {
                px: 3,
                pb: 2,
              },
            }}
          >
            <AccordionSummary
              expandIcon={activeAccordion === 'howToUse' ? <Remove /> : <Add />}
              sx={{ '& .MuiAccordionSummary-content': { margin: 0 } }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#212121' }}>
                How to Use
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>
                {parsedAdditionalInfo.howToUse}
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Benefits Accordion */}
          <Accordion
            expanded={activeAccordion === 'benefits'}
            onChange={() => handleAccordionChange('benefits')}
            sx={{
              boxShadow: 'none',
              '&:before': { display: 'none' },
              '& .MuiAccordionSummary-root': {
                px: 3,
                py: 1.5,
                borderRadius: 2,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' },
              },
              '& .MuiAccordionDetails-root': {
                px: 3,
                pb: 2,
              },
            }}
          >
            <AccordionSummary
              expandIcon={activeAccordion === 'benefits' ? <Remove /> : <Add />}
              sx={{ '& .MuiAccordionSummary-content': { margin: 0 } }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#212121' }}>
                Benefits
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>
                {product.benefits || "No benefits available."}
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Side Effects Accordion */}
          <Accordion
            expanded={activeAccordion === 'sideEffects'}
            onChange={() => handleAccordionChange('sideEffects')}
            sx={{
              boxShadow: 'none',
              '&:before': { display: 'none' },
              '& .MuiAccordionSummary-root': {
                px: 3,
                py: 1.5,
                borderRadius: 2,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' },
              },
              '& .MuiAccordionDetails-root': {
                px: 3,
                pb: 2,
              },
            }}
          >
            <AccordionSummary
              expandIcon={activeAccordion === 'sideEffects' ? <Remove /> : <Add />}
              sx={{ '& .MuiAccordionSummary-content': { margin: 0 } }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#212121' }}>
                Side Effects
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>
                {parsedAdditionalInfo.sideEffects}
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Manufacturer Details Accordion */}
          <Accordion
            expanded={activeAccordion === 'manufacturer'}
            onChange={() => handleAccordionChange('manufacturer')}
            sx={{
              boxShadow: 'none',
              '&:before': { display: 'none' },
              '& .MuiAccordionSummary-root': {
                px: 3,
                py: 1.5,
                borderRadius: 2,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' },
              },
              '& .MuiAccordionDetails-root': {
                px: 3,
                pb: 2,
              },
            }}
          >
            <AccordionSummary
              expandIcon={activeAccordion === 'manufacturer' ? <Remove /> : <Add />}
              sx={{ '& .MuiAccordionSummary-content': { margin: 0 } }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#212121' }}>
                Manufacturer Details
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>
                {parsedAdditionalInfo.manufacturer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* ========================================
            SHIPPING INFORMATION
        ======================================== */}
        {product.shipping && (
          <Box sx={{
            bgcolor: 'white',
            borderRadius: 2,
            p: 4,
            mb: 4,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            mx: { xs: 0, md: 8 }
          }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#212121' }}>
              Shipping & Returns
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <LocalShipping sx={{ color: '#de3b6f' }} fontSize="small" />
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }}>
                    {product.shipping.freeShipping ? 'Free Shipping' : `Shipping: ₹${product.shipping.shippingCost || 'TBD'}`}
                  </Typography>
                </Box>
                {product.shipping.deliveryTime && (
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }}>
                    Delivery: {product.shipping.deliveryTime}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Security sx={{ color: '#de3b6f' }} fontSize="small" />
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }}>
                    {product.shipping.returnPolicy}
                  </Typography>
                </Box>
                {product.shipping.warranty && (
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }}>
                    Warranty: {product.shipping.warranty}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
        )}

        {/* ========================================
            CUSTOMER REVIEWS SECTION
        ======================================== */}
        <Box sx={{
          bgcolor: 'white',
          borderRadius: 2,
          p: 4,
          mx: { xs: 0, md: 8 }
        }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#212121', fontSize: '1.25rem' }}>
            Customer Reviews
          </Typography>
          <ReviewForm
            productId={product?.id}
            onReviewSubmitted={handleReviewSubmitted}
          />
          <ReviewList productId={product?.id} />
        </Box>
      </Container>
    </Box>
  );
};

export default ProductDetail;