import React from 'react'
import TitleSection from '../../../components/e_commerceComponents/TitleSection'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import ProductCard from '../../../components/e_commerceComponents/ProductCard'
import { getAllProductsPublic } from '../../../utils/Service'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCart } from '../../../redux/CartReducer';

const BestSeller = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bestSellerData, setBestSellerData] = React.useState([]);
  const [loadingData, setLoadingData] = React.useState(true);
  
  // Handle product click navigation
  const handleProductClick = (productId) => {
    navigate(`/ecommerceDashboard/product/${productId}`);
  };
  
  // Fetch cart data when component mounts
  React.useEffect(() => {
    console.log('Fetching cart data in BestSeller component...');
    dispatch(fetchCart());
  }, [dispatch]);
  
  // Fetch best seller data from API
  React.useEffect(() => {
    const fetchBestSellerData = async () => {
      try {
        console.log('Fetching best seller data from API...');
        const response = await getAllProductsPublic();
        console.log('BestSeller API Response:', response);
        console.log('BestSeller API Response Data:', response.data);
        console.log('Response data type:', typeof response.data);
        console.log('Is response.data array?', Array.isArray(response.data));
        
        // Handle different possible response structures
        let productsData = [];
        
        if (response.data) {
          if (Array.isArray(response.data)) {
            // Direct array response
            productsData = response.data;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            // Nested data structure: { data: [...] }
            productsData = response.data.data;
          } else if (response.data.products && Array.isArray(response.data.products)) {
            // Nested products structure: { products: [...] }
            productsData = response.data.products;
          } else {
            console.log('Unexpected response structure:', response.data);
          }
        }
        
        console.log('Final best seller products data:', productsData);
        console.log('Best seller products count:', productsData.length);
        
        setBestSellerData(productsData);
        setLoadingData(false);
      } catch (error) {
        console.error('Error fetching best seller data:', error);
        setBestSellerData([]);
        setLoadingData(false);
      }
    };
    
    fetchBestSellerData();
  }, []);
  
  // Console logging for BestSeller component
  React.useEffect(() => {
    console.log('BestSeller component mounted');
    console.log('BestSeller data:', bestSellerData);
  }, [bestSellerData]);
  
  // Transform API data to match ProductCard expected format - limit to 8 products for best sellers
  const transformedData = bestSellerData
    .slice(0, 8) // Limit to 8 products for best sellers
    .map(item => {
      const price = parseFloat(item.price || '30.00');
      const originalPrice = item.originalPrice ? parseFloat(item.originalPrice) : (price * 1.5);
      return {
        offer: item.offer || `${Math.round(((originalPrice - price) / originalPrice) * 100)}%`,
        image: item.image || item.thumbnailImage || "https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987",
        badge: item.badge || "best seller",
        title: item.title || item.name || "Product Title",
        rating: item.rating || '4.0',
        price: price.toFixed(2),
        originalPrice: originalPrice.toFixed(2),
        description: item.description || "Product description goes here",
        id: item.id, // Use the actual ID from API response
      };
    });
  
  console.log('Transformed best seller data:', transformedData);
  console.log('Transformed best seller data length:', transformedData.length);
  
  return (
    <React.Fragment>
      <Box sx={{ 
        height: 'auto', 
        width: '100%', 
        margin: isMobile ? '4% 0' : '3% 0', 
      }}>
        <TitleSection title={"Best Sellers"} subTitle={"Don't miss this current offers until end of March"} />
        {loadingData ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Typography>Loading best sellers...</Typography>
          </Box>
        ) : transformedData.length > 0 ? (
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(1, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
            gap: isMobile ? '20px' : '24px',
            padding: isMobile ? '0 16px' : '0 24px',
            width: '100%',
            maxWidth: '100%'
          }}>
            {transformedData.map((product, index) => (
              <ProductCard 
                key={index} 
                offer={product.offer} 
                image={product.image} 
                badge={product.badge} 
                title={product.title} 
                rating={product.rating} 
                price={product.price} 
                originalPrice={product.originalPrice}
                id={product.id}
                onClick={() => handleProductClick(product.id)} 
              />
            ))}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Typography>No best sellers available at the moment.</Typography>
          </Box>
        )}
      </Box>
    </React.Fragment>
  )
}

export default BestSeller