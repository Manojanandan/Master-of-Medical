import React from 'react'
import { Box, Button, Typography, IconButton } from '@mui/material'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Star from './Star'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCartItemQuantity, removeFromCart } from '../../redux/CartReducer';

const ProductCard = ({offer,image,badge,title,rating,price,originalPrice,id,onClick}) => {
  const dispatch = useDispatch();
  const { loading, items } = useSelector((state) => state.cartReducer);



  // Check if this product is already in the cart
  const cartItem = items.find(item => item.productId === id);
  const isInCart = !!cartItem;
  const currentQuantity = cartItem?.quantity || 0;

  // Debug logging
  console.log(`ProductCard ${id} - Cart state:`, {
    productId: id,
    cartItems: items.length,
    isInCart,
    currentQuantity,
    loading,
    cartItem
  });

  // Calculate offer percentage if originalPrice is provided
  const calculateOfferPercentage = () => {
    if (!originalPrice || !price) return offer || '0%';
    
    const original = parseFloat(originalPrice);
    const current = parseFloat(price);
    
    if (original <= current) return offer || '0%';
    
    const discount = ((original - current) / original) * 100;
    return `${Math.round(discount)}%`;
  };

  const offerPercentage = calculateOfferPercentage();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click when button is clicked
    
    if (!id) {
      console.error('Product ID is required to add to cart. Product:', { title, id });
      return;
    }

    console.log('Adding to cart:', { productId: id, quantity: 1 });
    dispatch(addToCart({ productId: id, quantity: 1 }));
  };

  const handleIncreaseQuantity = (e) => {
    e.stopPropagation();
    if (cartItem) {
      const newQuantity = currentQuantity + 1;
      console.log('Increasing quantity:', { cartItemId: cartItem._id, newQuantity });
      dispatch(updateCartItemQuantity({ cartItemId: cartItem._id, quantity: newQuantity }));
    }
  };

  const handleDecreaseQuantity = (e) => {
    e.stopPropagation();
    if (cartItem) {
      const newQuantity = currentQuantity - 1;
      if (newQuantity <= 0) {
        // Remove item from cart if quantity becomes 0
        console.log('Removing item from cart:', cartItem._id);
        dispatch(removeFromCart(cartItem._id));
      } else {
        console.log('Decreasing quantity:', { cartItemId: cartItem._id, newQuantity });
        dispatch(updateCartItemQuantity({ cartItemId: cartItem._id, quantity: newQuantity }));
      }
    }
  };

  return (
    <React.Fragment>
        <Box 
          sx={{
            height:'auto',
            width:'300px',
            border:'solid 1.5px #2424',
            borderRadius:'10px',
            marginBottom:'1%',
            cursor: 'pointer',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              transform: 'translateY(-2px)',
              transition: 'all 0.3s ease'
            }
          }}
          onClick={onClick}
        >
          <Box sx={{height:'auto',width:'80%',margin:'6% 8% 2%',}}>
            <Box sx={{width:'50px',padding:'3px 10px',borderRadius:'20px',backgroundColor:'#c5225f',color:'#fff',textAlign:'center'}}>
              <Typography variant='p' sx={{fontWeight:'bold',fontSize:'12px'}}>{offerPercentage}</Typography>
            </Box>
            <Box sx={{height:'80%',width:'70%',margin:'2% auto'}}>
              <img height='100%' width='100%' src={image} alt={image} />
            </Box>
            <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{fontWeight:'bold',borderRadius:'20px',backgroundColor:'skyblue',margin:'5% 0 2%'}}>{badge}</Button>
          </Box>
          <Box sx={{height:'auto',width:'80%',margin:'1% 8% 6%'}}>
            <Box sx={{width:'100%',height:'50px'}}>
              <Typography variant='body1' sx={{fontWeight:'bold',textTransform:'capitalize',textOverflow:'ellipsis',overflow: 'hidden', display: '-webkit-box',  WebkitLineClamp: 2,WebkitBoxOrient: 'vertical'}}>{title}</Typography>
            </Box>
            <Star rating={rating} />
            <Box sx={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'3%'}}>
              <Typography variant='h5' sx={{color:'#c5225f',fontWeight:'bold'}}>${price}</Typography>
              {originalPrice && parseFloat(originalPrice) > parseFloat(price) && (
                <Typography variant='span' sx={{color:'#666',fontSize:'14px',fontWeight:'300',textDecoration:'line-through'}}>
                  ${originalPrice}
                </Typography>
              )}
            </Box>
            
            {isInCart ? (
              // Show quantity controls if product is in cart
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '80%',
                margin: '0 auto'
              }}>
                <IconButton 
                  size="small" 
                  onClick={handleDecreaseQuantity}
                  disabled={loading}
                  sx={{
                    border: '1px solid #c5225f',
                    color: '#c5225f',
                    '&:hover': {
                      backgroundColor: '#c5225f',
                      color: 'white'
                    }
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography 
                  variant="h6" 
                  sx={{
                    minWidth: '30px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#c5225f'
                  }}
                >
                  {currentQuantity}
                </Typography>
                <IconButton 
                  size="small" 
                  onClick={handleIncreaseQuantity}
                  disabled={loading}
                  sx={{
                    border: '1px solid #c5225f',
                    color: '#c5225f',
                    '&:hover': {
                      backgroundColor: '#c5225f',
                      color: 'white'
                    }
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            ) : (
              // Show "Add to cart" button if product is not in cart
              <Button 
                endIcon={<AddIcon />} 
                variant='outlined' 
                disabled={loading}
                sx={{width:'80%',borderRadius:'15px',fontWeight:'bold',textTransform:'capitalize'}} 
                onClick={handleAddToCart}
              >
                {loading ? 'Adding...' : 'Add to cart'}
              </Button>
            )}
          </Box>
        </Box>
    </React.Fragment>
  )
}

export default ProductCard