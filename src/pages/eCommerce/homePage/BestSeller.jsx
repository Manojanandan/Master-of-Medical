import React from 'react'
import TitleSection from '../../../components/e_commerceComponents/TitleSection'
import { Box, Button, IconButton, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Star from '../../../components/e_commerceComponents/Star';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProductsPublic } from '../../../utils/Service'

const BestSeller = () => {
  const navigate = useNavigate();
  const [bestSellerData, setBestSellerData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  // Handle product click navigation
  const handleProductClick = (productId) => {
    navigate(`/ecommerceDashboard/product/${productId}`);
  };
  
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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching best seller data:', error);
        setBestSellerData([]);
        setLoading(false);
      }
    };
    
    fetchBestSellerData();
  }, []);
  
  // Console logging for BestSeller component
  React.useEffect(() => {
    console.log('BestSeller component mounted');
    console.log('BestSeller data:', bestSellerData);
  }, [bestSellerData]);
  
  // Transform API data to match the expected format - limit to 8 products for best sellers
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
      <Box sx={{ height: 'auto', width: '100%', margin: '3% 0', }}>
        <TitleSection title={"Best Sellers"} subTitle={"Don't miss this current offers until end of March"} />
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Typography>Loading best sellers...</Typography>
          </Box>
        ) : transformedData.length > 0 ? (
          <Box sx={{ height: 'auto', width: '95%', margin: '1% auto', display: 'flex', flexWrap: 'wrap', }}>
            {/* First row - 4 products in 2x2 grid */}
            {transformedData.slice(0, 4).map((product, index) => (
              <Box 
                key={index} 
                sx={{ 
                  height: 'auto', 
                  width: '330px', 
                  border: 'solid 1.5px #2424', 
                  borderRadius: '10px', 
                  margin: '0 1% 1.5% 0',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
                onClick={() => handleProductClick(product.id)}
              >
            <Box sx={{ height: '220px', width: '100%', display: 'flex', padding: '10px 0 0', }}>
              <Box sx={{ height: '100%', width: '50%', padding: '0 2px' }}>
                <Box sx={{ width: '100%', padding: '3px 5px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '50px', padding: '0px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                        <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>{product.offer}</Typography>
                  </Box>
           
                </Box>
                <Box sx={{ height: '50%', width: '60%', margin: '5% auto' }}>
                      <img height='100%' width='100%' src={product.image} alt={product.title} />
                </Box>
                    <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{ fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'skyblue', margin: '5% 0 0% 5%', fontSize: '12px' }}>{product.badge}</Button>
              </Box>
              <Box sx={{ height: '100%', width: '50%', padding: '0 3% 0 0' }}>
                <Box sx={{ width: '100%', height: '50px', margin: '25% 0 2%' }}>
                      <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '13px' }}>{product.title}</Typography>
                </Box>
                    <Star rating={product.rating} />
                <Box sx={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'5%'}}>
                  <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', fontSize: '19px' }}>
                    ${product.price}
                  </Typography>
                  {product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price) && (
                    <Typography variant='span' sx={{ color: '#666', fontSize: '14px', fontWeight: '300', textDecoration: 'line-through' }}>
                      ${product.originalPrice}
                    </Typography>
                  )}
                </Box>
                <Button endIcon={<AddIcon />} variant='outlined' sx={{ width: '100%', borderRadius: '15px', fontWeight: 'bold', textTransform: 'capitalize', margin: '4% 0' }}>Add to cart</Button>
                  </Box>
                </Box>
              </Box>
            ))}
            
            {/* Second row - 4 more products in 2x2 grid */}
            {transformedData.slice(4, 8).map((product, index) => (
              <Box 
                key={index + 4} 
                sx={{ 
                  height: 'auto', 
                  width: '330px', 
                  border: 'solid 1.5px #2424', 
                  borderRadius: '10px', 
                  margin: '0 1% 1.5% 0',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
                onClick={() => handleProductClick(product.id)}
              >
            <Box sx={{ height: '220px', width: '100%', display: 'flex', padding: '10px 0 0', }}>
              <Box sx={{ height: '100%', width: '50%', padding: '0 2px' }}>
                <Box sx={{ width: '100%', padding: '3px 5px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '50px', padding: '0px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                        <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>{product.offer}</Typography>
                  </Box>
              
                </Box>
                <Box sx={{ height: '50%', width: '60%', margin: '5% auto' }}>
                      <img height='100%' width='100%' src={product.image} alt={product.title} />
                </Box>
                    <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{ fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'skyblue', margin: '5% 0 0% 5%', fontSize: '12px' }}>{product.badge}</Button>
              </Box>
              <Box sx={{ height: '100%', width: '50%', padding: '0 3% 0 0' }}>
                <Box sx={{ width: '100%', height: '50px', margin: '25% 0 2%' }}>
                      <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '13px' }}>{product.title}</Typography>
                </Box>
                    <Star rating={product.rating} />
                <Box sx={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'5%'}}>
                  <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', fontSize: '19px' }}>
                    ${product.price}
                  </Typography>
                  {product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price) && (
                    <Typography variant='span' sx={{ color: '#666', fontSize: '14px', fontWeight: '300', textDecoration: 'line-through' }}>
                      ${product.originalPrice}
                    </Typography>
                  )}
                </Box>
                <Button endIcon={<AddIcon />} variant='outlined' sx={{ width: '100%', borderRadius: '15px', fontWeight: 'bold', textTransform: 'capitalize', margin: '4% 0' }}>Add to cart</Button>
                  </Box>
                </Box>
              </Box>
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