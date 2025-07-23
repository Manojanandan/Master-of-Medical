import React from 'react'
import TitleSection from '../../../components/e_commerceComponents/TitleSection'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import ProductCard from '../../../components/e_commerceComponents/ProductCard'
import { getAllProductsPublic } from '../../../utils/Service'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchCart } from '../../../redux/CartReducer'

const Arrivals = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [arrivalsData, setArrivalsData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    
    const onClick =() =>{
        console.log("arrival")
    }
    
    // Handle product click navigation
    const handleProductClick = (productId) => {
        navigate(`/ecommerceDashboard/product/${productId}`);
    };
    
    // Fetch cart data when component mounts
    React.useEffect(() => {
        console.log('Fetching cart data in Arrivals component...');
        dispatch(fetchCart());
    }, [dispatch]);
    
    // Fetch arrivals data from API
    React.useEffect(() => {
        const fetchArrivalsData = async () => {
            try {
                console.log('Fetching arrivals data from API...');
                const response = await getAllProductsPublic({ newArrival: true });
                console.log('Arrivals API Response:', response);
                console.log('Arrivals API Response Data:', response.data);
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
                
                console.log('Final products data:', productsData);
                console.log('Products count:', productsData.length);
                
                setArrivalsData(productsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching arrivals data:', error);
                setArrivalsData([]);
                setLoading(false);
            }
        };
        
        fetchArrivalsData();
    }, []);
    
    // Console logging for Arrivals component
    React.useEffect(() => {
        console.log('Arrivals component mounted');
        console.log('Arrivals data:', arrivalsData);
    }, [arrivalsData]);
    
    // Transform API data to match ProductCard expected format - limit to 4 products
    const transformedData = arrivalsData
        .slice(0, 5) // Limit to 4 products
        .map((item, index) => ({
            offer: item.offer || '70%',
            image: item.image || item.thumbnailImage || "https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987",
            badge: item.badge || "new arrival",
            title: item.title || item.name || "Product Title",
            rating: item.rating || '4.0',
            price: item.price || '30.00',
            originalPrice: item.originalPrice || (parseFloat(item.price || '30.00') * 1.5).toFixed(2), // Set original price 50% higher if not provided
            id: item.id, // Use the actual ID from API response
        }));
    
    console.log('Transformed data:', transformedData);
    console.log('Transformed data length:', transformedData.length);
    
  return (
    <React.Fragment>
        <Box sx={{
            height: 'auto',
            width: '100%',
            margin: isMobile ? '4% 0' : '2% 0',
        }}>
            <TitleSection title={"New Arrivals"} subTitle={"Don't miss this opportunity at a special discount just for this week."} />
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(1, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
                gap: isMobile ? '20px' : '24px',
                padding: isMobile ? '10px 16px' : '24px 24px',
                width: '100%',
                maxWidth: '100%'
            }}>
                    {loading ? (
                        <div>Loading arrivals...</div>
                    ) : transformedData.length > 0 ? (
                        transformedData?.map((e,i)=>{
                    return(
                                <ProductCard 
                                    key={i} 
                                    offer={e?.offer} 
                                    image={e?.image} 
                                    badge={e?.badge} 
                                    title={e?.title} 
                                    rating={e?.rating} 
                                    price={e?.price} 
                                    originalPrice={e?.originalPrice}
                                    id={e?.id}
                                    onClick={() => handleProductClick(e.id)} 
                                />
                            )
                        })
                    ) : (
                        <div>No new arrivals available at the moment.</div>
                    )}
                </Box>
        </Box>
    </React.Fragment>
  )
}

export default Arrivals