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
  Star,
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
import { getProductById } from "../../utils/Service";
import { addToCart } from "../../redux/CartReducer";

// Static product data with more information
const staticProduct = {
  _id: "1",
  name: "Digital Thermometer Professional Grade Medical Device",
  description: "High-precision digital thermometer for accurate temperature readings. This professional-grade thermometer provides quick and accurate readings in just 10 seconds. Features include large LCD display, fever alarm, memory function, and auto-shutoff for battery conservation.",
  price: 299,
  priceLabel: "MRP",
  brandName: "MediCare",
  category: "Diagnostic",
  subCategory: "Temperature Monitoring",
  thumbnailImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  galleryImages: [
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=400&h=300&fit=crop"
  ],
  rating: 4.5,
  reviews: 128,
  inStock: true,
  fastDelivery: true,
  verified: true,
  benefits: [
    "Quick 10-second reading",
    "Large LCD display for easy reading",
    "Fever alarm function",
    "Memory function for last reading",
    "Auto-shutoff to save battery",
    "Waterproof design",
    "CE certified for accuracy",
    "Backlit display for low light"
  ],
  additionalInformation: {
    shelfLife: "5 years",
    country: "India",
    howToUse: "Place the thermometer under the tongue or in the armpit. Wait for the beep sound indicating completion of reading. For accurate results, ensure the sensor is in proper contact with the body.",
    sideEffects: "No known side effects when used as directed. This is a non-invasive device that only measures temperature.",
    manufacturer: "MediCare Industries Ltd.",
    warranty: "2 years manufacturer warranty",
    certifications: ["CE", "ISO 13485", "FDA Approved"],
    packageContents: [
      "1 Digital Thermometer",
      "1 Protective Case",
      "1 User Manual",
      "1 Battery (CR2032)",
      "1 Cleaning Cloth"
    ]
  },
  specifications: {
    "Display": "Large LCD with backlight",
    "Reading Time": "10 seconds",
    "Temperature Range": "32°C - 42.9°C",
    "Accuracy": "±0.1°C",
    "Battery": "1 x CR2032 (included)",
    "Auto Shutoff": "Yes (after 10 minutes)",
    "Memory": "Last reading",
    "Waterproof": "Yes (IPX4)",
    "Dimensions": "12.5 x 2.5 x 1.5 cm",
    "Weight": "15 grams",
    "Material": "Medical grade plastic",
    "Sensor Type": "Digital infrared"
  },
  shipping: {
    freeShipping: true,
    deliveryTime: "2-4 business days",
    returnPolicy: "30 days return policy",
    warranty: "2 years manufacturer warranty"
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentProduct, loading, error } = useSelector((state) => state.publicProductReducer);
  
  // State for API product data
  const [apiProduct, setApiProduct] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  
  // Use API product if available, otherwise fall back to static product
  const product = apiProduct || currentProduct || staticProduct;

  // Safety check for product data
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

  // Local state
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchPublicProductById(id));
    }

    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id]);

  // Call the getProductById API and console log response
  useEffect(() => {
    const fetchProductById = async () => {
      if (id) {
        try {
          setApiLoading(true);
          setApiError(null);
          console.log('Calling getProductById API with ID:', id);
          const response = await getProductById(id);
          console.log('getProductById API Response:', response);
          console.log('getProductById API Response Data:', response.data);
          
          // Extract the actual product data from the nested response structure
          if (response.data && response.data.success && response.data.data) {
            const productData = response.data.data;
            console.log('Extracted product data:', productData);
            setApiProduct(productData);
          } else {
            console.error('Invalid API response structure:', response.data);
            setApiError(new Error('Invalid API response structure'));
          }
        } catch (error) {
          console.error('Error calling getProductById API:', error);
          setApiError(error);
        } finally {
          setApiLoading(false);
        }
      }
    };

    fetchProductById();
  }, [id]);

  const handleImageChange = (index) => {
    setSelectedImage(index);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    const productId = product.id || product._id;
    if (!productId) {
      console.error('Product ID is required to add to cart');
      return;
    }
    
    console.log('Adding to cart:', { productId, quantity });
    dispatch(addToCart({ productId, quantity }));
  };

  const handleBuyNow = () => {
    console.log('Buy now:', { productId: product.id || product._id, quantity });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log('Wishlist toggled:', !isWishlisted);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        sx={{
          fontSize: '1rem',
          color: index < Math.floor(rating) ? '#ffc107' : '#e0e0e0'
        }}
      />
    ));
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Helper function to parse additionalInformation JSON string
  const getParsedAdditionalInfo = () => {
    if (!product.additionalInformation) return {};
    
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

  const parsedAdditionalInfo = getParsedAdditionalInfo();

  if (loading || apiLoading) { // Combine loading states
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

  if (error || apiError) { // Combine error states
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
          {error?.message || apiError?.message || 'Failed to load product details'}
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
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
        {/* Image Showcase Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', md: 'column' },
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 2,
            minWidth: { md: 120 },
            maxWidth: { md: 120 },
            mb: { xs: 2, md: 0 },
            overflowX: { xs: 'auto', md: 'visible' },
          }}
        >
          <Card
            elevation={3}
            sx={{
              p: 1,
              bgcolor: 'background.paper',
              borderRadius: 3,
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: { xs: 'row', md: 'column' },
              gap: 1,
              minWidth: { xs: 0, md: 100 },
              maxWidth: { xs: '100%', md: 100 },
              minHeight: { md: 420 },
              maxHeight: { md: 420 },
              overflow: 'auto',
            }}
          >
            {(product.galleryImage || product.galleryImages || []).map((img, idx) => (
              <Box
                key={img}
                onClick={() => setSelectedImage(idx)}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: selectedImage === idx ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
                  cursor: 'pointer',
                  mb: { xs: 0, md: 1 },
                  mr: { xs: 1, md: 0 },
                  transition: 'border 0.2s',
                  boxShadow: selectedImage === idx ? '0 2px 8px rgba(0,0,0,0.10)' : 'none',
                  width: { xs: 60, md: 80 },
                  height: { xs: 60, md: 80 },
                  flex: '0 0 auto',
                  '&:hover': {
                    border: `2px solid ${theme.palette.primary.light}`,
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
          </Card>
        </Box>

        {/* Main Image Section */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            minHeight: 400,
          }}
        >
          <Card
            elevation={4}
            sx={{
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 4,
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '100%', md: 420 },
              height: { xs: 260, sm: 340, md: 420 },
              maxWidth: 480,
              maxHeight: 480,
            }}
          >
            <CardMedia
              component="img"
              image={(product.galleryImage && product.galleryImage[selectedImage]) || (product.galleryImages && product.galleryImages[selectedImage]) || product.thumbnailImage}
              alt={product.name}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: 3,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                background: '#f8f8f8',
              }}
            />
          </Card>
        </Box>

        {/* Product Info Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              {product.verified && (
                <Chip
                  icon={<Verified />}
                  label="Verified Seller"
                  size="small"
                  sx={{ backgroundColor: 'rgba(76, 175, 80, 0.1)', color: '#4caf50' }}
                />
              )}
              <Chip
                label={product.brandName}
                size="small"
                variant="outlined"
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {renderStars(product.rating)}
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {product.rating} ({product.reviews} reviews)
              </Typography>
            </Box>

            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
              ₹{product.price}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {product.priceLable || product.priceLabel}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              {product.fastDelivery && (
                <Chip
                  icon={<LocalShipping />}
                  label="Fast Delivery"
                  size="small"
                  sx={{ backgroundColor: 'rgba(33, 150, 243, 0.1)', color: '#1976d2' }}
                />
              )}
              <Chip
                label={product.status === 'approved' ? "In Stock" : "Out of Stock"}
                size="small"
                color={product.status === 'approved' ? "success" : "error"}
              />
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
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <Typography variant="h6" sx={{ minWidth: 40, textAlign: 'center' }}>
                {quantity}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10}
              >
                +
              </Button>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              sx={{ flex: 1 }}
            >
              Add to Cart
            </Button>
          </Box>

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleBuyNow}
            disabled={!product.inStock}
            sx={{ mb: 3 }}
          >
            Buy Now
          </Button>




        </Grid>
      </Box>

      {/* Product Description */}
      <Typography variant="body1" sx={{ mb: 3 }}>
        {product.description}
      </Typography>
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

      {/* Shipping Info */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Shipping & Returns
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <LocalShipping color="primary" fontSize="small" />
              <Typography variant="body2">
                {product?.shipping?.freeShipping ? 'Free Shipping' : 'Shipping charges apply'}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Delivery: {product.shipping?.deliveryTime}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Security color="primary" fontSize="small" />
              <Typography variant="body2">
                {product.shipping?.returnPolicy}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Warranty: {product.shipping?.warranty}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
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
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Expires On:</Typography>
                    <Typography variant="body2">{product.expiresOn || 'Not specified'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Category:</Typography>
                    <Typography variant="body2">{product.category}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Sub Category:</Typography>
                    <Typography variant="body2">{product.subCategory}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Status:</Typography>
                    <Typography variant="body2">{product.status}</Typography>
                  </Box>
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
              <List>
                {parsedAdditionalInfo?.packageContents?.map((item, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Trust Indicators */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Why Choose Us
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Verified sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Verified Products
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All products are verified for quality and authenticity
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <LocalShipping sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Fast Delivery
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quick and reliable delivery across India
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Security sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Secure Payment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Multiple secure payment options available
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Support sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                24/7 Support
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Round the clock customer support
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductDetail; 