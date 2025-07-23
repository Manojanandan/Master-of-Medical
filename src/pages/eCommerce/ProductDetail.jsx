import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Chip,
  Rating,
  Skeleton,
  Alert,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  useMediaQuery
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  LocalShipping,
  Verified,
  ArrowBack,
  CheckCircle,
  Security,
  Support
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
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentProduct, loading, error } = useSelector((state) => state.publicProductReducer);
  const { cart, loading: cartLoading } = useSelector((state) => state.cartReducer);
  
  const [cartMessage, setCartMessage] = useState('');
  
  // Use current product from Redux
  const product = currentProduct;
  
  // Debug logging
  console.log('ProductDetail Debug Info:', {
    id,
    currentProduct,
    product,
    loading,
    error
  });

  // Local state
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      console.log('ProductDetail: Fetching product and reviews for ID:', id);
      dispatch(fetchPublicProductById(id));
      // Fetch reviews for this product - try both string and number formats
      const productId = parseInt(id) || id;
      console.log('ProductDetail: Fetching reviews with productId:', productId);
      dispatch(fetchProductReviews({ productId }));
    }
    
    // Fetch cart data
    dispatch(fetchCart());

    return () => {
      dispatch(clearCurrentProduct());
      dispatch(clearReviews());
    };
  }, [dispatch, id]);

  // Reset local quantity when product is not in cart
  useEffect(() => {
    if (product && !isProductInCart()) {
      setLocalQuantity(1);
    }
  }, [cart, product?.id]);

  const handleImageChange = (index) => {
    setSelectedImage(index);
  };

  // Handle review submission
  const handleReviewSubmitted = () => {
    // Refresh reviews after a new review is submitted
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



  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log('Wishlist toggled:', !isWishlisted);
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
          // Reset local quantity to 1
          setLocalQuantity(1);
        } else {
          setCartMessage('Failed to remove product from cart');
          setTimeout(() => setCartMessage(''), 3000);
        }
      });
  };

  // Check if product is in cart and get its quantity
  const getCartItemQuantity = () => {
    if (!cart || !cart.items || !product) return 0;
    const productId = product.id;
    const cartItem = cart.items.find(item => item.productId === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const isProductInCart = () => {
    return getCartItemQuantity() > 0;
  };

  // Get current quantity to display (cart quantity or local quantity)
  const getCurrentQuantity = () => {
    if (isProductInCart()) {
      return getCartItemQuantity();
    }
    return localQuantity;
  };

  // Handle quantity change based on whether product is in cart
  const handleQuantityChange = (newQuantity) => {
    if (!product) {
      console.error('Product not available');
      return;
    }
    if (newQuantity >= 1 && newQuantity <= 10) {
      if (isProductInCart()) {
                // Update cart quantity
        const productId = product.id;
        // Find the cart item ID for this product
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
        // Update local quantity
        setLocalQuantity(newQuantity);
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };



  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Helper function to parse additionalInformation JSON string
  const getParsedAdditionalInfo = () => {
    if (!product || !product.additionalInformation) return {};
    
    if (typeof product.additionalInformation === 'string') {
      try {
        return JSON.parse(product.additionalInformation);
      } catch (error) {
        console.error('Error parsing additionalInformation:', error);
        return {};
      }
    }
    
    return product.additionalInformation;
  };

  if (loading) { // Loading state
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={400} />
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} variant="rectangular" width={80} height={80} />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={100} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={50} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={50} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) { // Error state
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/ecommerceDashboard')}
          sx={{ mb: 3, color: 'text.secondary' }}
        >
          Back to Products
        </Button>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error?.message || 'Failed to load product details'}
        </Alert>
      </Container>
    );
  }

  // Check if product data is available
  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/ecommerceDashboard')}
          sx={{ mb: 3, color: 'text.secondary' }}
        >
          Back to Products
        </Button>
        <Alert severity="error" sx={{ mb: 3 }}>
          Product not found
        </Alert>
      </Container>
    );
  }

  const parsedAdditionalInfo = getParsedAdditionalInfo();

  return (
    <Box sx={{ p: { xs: 1, md: 4 }, width: '90%', mx: 'auto' }}>
      {/* Back to Products Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/ecommerceDashboard')}
        sx={{ mb: 3, color: 'text.secondary' }}
      >
        Back to Products
      </Button>
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 3, md: 6 },
        }}
      >
        {/* Main Image Section - 50% width on desktop */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 400,
          }}
        >
          <Card
            elevation={0}
            sx={{
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: { xs: 300, sm: 350, md: 400 },
              mb: 3,
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
                borderRadius: 3,
                background: '#f8f8f8',
              }}
            />
          </Card>

          {/* Thumbnail Images - Now below the main image */}
          {(product?.galleryImage && product.galleryImage.length > 0) && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                flexWrap: 'wrap',
                maxWidth: '100%',
                overflowX: 'auto',
              }}
            >
              {product.galleryImage.map((img, idx) => (
                <Box
                  key={img}
                  onClick={() => setSelectedImage(idx)}
                  sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: selectedImage === idx ? `3px solid ${theme.palette.primary.main}` : '2px solid #e0e0e0',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    width: 80,
                    height: 80,
                    minWidth: 80,
                    maxWidth: 80,
                    minHeight: 80,
                    maxHeight: 80,
                    flex: '0 0 auto',
                    '&:hover': {
                      border: `3px solid ${theme.palette.primary.light}`,
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={img}
                    alt={`Thumbnail ${idx + 1}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Product Info Section - 50% width on desktop */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
              {product?.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              {product.brandName && (
                <Chip
                  label={product.brandName}
                  size="small"
                  variant="outlined"
                />
              )}
              {product.category && (
                <Chip
                  label={product.category}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
              <StarRating 
                rating={product.averageRating || 0}
                reviewCount={product.reviewCount || 0}
                size="large"
                showReviewCount={true}
              />
              {product.totalOrders && (
                <Typography variant="body2" color="text.secondary">
                  Total Orders: {product.totalOrders}
                </Typography>
              )}
            </Box>

            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
              ₹{product.price}
            </Typography>
            {product.priceLable && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {product.priceLable}
              </Typography>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Chip
                label={product.status === 'approved' ? "In Stock" : "Out of Stock"}
                size="small"
                color={product.status === 'approved' ? "success" : "error"}
              />
              {product.expiresOn && (
                <Chip
                  label={`Expires: ${new Date(product.expiresOn).toLocaleDateString()}`}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>

          {/* Quantity Selector */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Quantity
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleQuantityChange(getCurrentQuantity() - 1)}
                disabled={getCurrentQuantity() <= 1}
              >
                -
              </Button>
              <Typography variant="h6" sx={{ minWidth: 40, textAlign: 'center' }}>
                {getCurrentQuantity()}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleQuantityChange(getCurrentQuantity() + 1)}
                disabled={getCurrentQuantity() >= 10}
              >
                +
              </Button>
            </Box>
          </Box>

          {/* Cart Message */}
          {cartMessage && (
            <Alert 
              severity={cartMessage.includes('successfully') ? 'success' : 'error'} 
              sx={{ mb: 2 }}
              onClose={() => setCartMessage('')}
            >
              {cartMessage}
            </Alert>
          )}

          {/* Cart Count Display */}
          {cart && cart.totalItems > 0 && (
            <Box sx={{ mb: 2, p: 2, bgcolor: 'rgba(25, 118, 210, 0.04)', borderRadius: 2, border: '1px solid rgba(25, 118, 210, 0.2)' }}>
              <Typography variant="body2" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ShoppingCart fontSize="small" />
                Cart: {cart.totalItems} item{cart.totalItems !== 1 ? 's' : ''} • Total: ₹{cart.totalCost || 0}
                {isProductInCart() && (
                  <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>
                    • This item: {getCartItemQuantity()}
                  </span>
                )}
              </Typography>
            </Box>
          )}

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            {isProductInCart() ? (
              // Product is in cart - show remove button
              <Button
                variant="outlined"
                size="large"
                color="error"
                onClick={handleRemoveFromCart}
                disabled={cartLoading}
                sx={{ flex: 1 }}
              >
                Remove from Cart
              </Button>
            ) : (
              // Product is not in cart - show add button
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                // disabled={product.status !== 'approved' || cartLoading}
                sx={{ flex: 1 }}
              >
                Add to Cart
              </Button>
            )}
          </Box>

          {/* View Cart Button - Show when product is in cart */}
          {isProductInCart() && (
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={() => navigate('/ecommerceDashboard/cart')}
              sx={{ mb: 2 }}
            >
              View Cart ({cart.totalItems} items)
            </Button>
          )}




        </Box>
      </Box>

      {/* Product Description */}
      {product.description && (
        <Typography variant="body1" sx={{ mb: 3, mt: 8 }}>
          {product.description}
        </Typography>
      )}

      {/* Benefits */}
      {product.benefits && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Key Benefits
          </Typography>
          {Array.isArray(product.benefits) ? (
          <List dense>
            {product.benefits.map((benefit, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckCircle color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={benefit} />
              </ListItem>
            ))}
          </List>
          ) : (
            <Typography variant="body1" sx={{ mb: 2 }}>
              {product.benefits}
            </Typography>
          )}
        </Box>
      )}

      {/* Shipping Info - Only show if shipping data exists */}
      {product.shipping && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Shipping & Returns
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocalShipping color="primary" fontSize="small" />
                <Typography variant="body2">
                  {product.shipping.freeShipping ? 'Free Shipping' : 'Shipping charges apply'}
                </Typography>
              </Box>
              {product.shipping.deliveryTime && (
                <Typography variant="body2" color="text.secondary">
                  Delivery: {product.shipping.deliveryTime}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Security color="primary" fontSize="small" />
                <Typography variant="body2">
                  {product.shipping.returnPolicy}
                </Typography>
              </Box>
              {product.shipping.warranty && (
                <Typography variant="body2" color="text.secondary">
                  Warranty: {product.shipping.warranty}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Product Details Tabs */}
      <Box sx={{ mt: 6 }}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Specifications" />
          <Tab label="How to Use" />
          <Tab label="Additional Info" />
          <Tab label="Package Contents" />
        </Tabs>

        <Paper sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Grid container spacing={2}>
              {product?.specifications && Object.entries(product.specifications).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {key}:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
              {!product?.specifications && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Specifications not available for this product.
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}

          {activeTab === 1 && (
            <Typography variant="body1">
              {parsedAdditionalInfo['How to Use'] || parsedAdditionalInfo.howToUse || "Usage instructions not available."}
            </Typography>
          )}

          {activeTab === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Product Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {product.expiresOn && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Expires On:</Typography>
                      <Typography variant="body2">{product.expiresOn}</Typography>
                    </Box>
                  )}
                  {product.category && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Category:</Typography>
                      <Typography variant="body2">{product.category}</Typography>
                    </Box>
                  )}
                  {product.subCategory && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Sub Category:</Typography>
                      <Typography variant="body2">{product.subCategory}</Typography>
                    </Box>
                  )}
                  {product.status && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Status:</Typography>
                      <Typography variant="body2">{product.status}</Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Safety Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {parsedAdditionalInfo['Side Effects'] || parsedAdditionalInfo.sideEffects || "No known side effects when used as directed."}
                </Typography>
              </Grid>
            </Grid>
          )}

          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                What's Included
              </Typography>
              {parsedAdditionalInfo?.packageContents && Array.isArray(parsedAdditionalInfo.packageContents) ? (
                <List>
                  {parsedAdditionalInfo.packageContents.map((item, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Package contents information not available.
                </Typography>
              )}
            </Box>
          )}


        </Paper>
      </Box>

      {/* Customer Reviews Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Customer Reviews
        </Typography>
        
        {/* Review Form */}
        <ReviewForm 
          productId={product?.id} 
          onReviewSubmitted={handleReviewSubmitted}
        />
        
        {/* Review List */}
        <ReviewList productId={product?.id} />
      </Box>
    </Box>
  );
};

export default ProductDetail; 