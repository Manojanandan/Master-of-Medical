import { Box, Button, Paper, Typography, CircularProgress, Alert } from '@mui/material'
import React, { useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItemQuantity, removeFromCart } from '../../../redux/CartReducer';

const CartList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items, totalItems, totalAmount, loading, error } = useSelector((state) => state.cartReducer);
    const [localItems, setLocalItems] = React.useState([]);
    const [localTotals, setLocalTotals] = React.useState({ totalItems: 0, totalAmount: 0 });

    // Sync local state with Redux state only when items change (not quantity updates)
    React.useEffect(() => {
        if (items.length > 0 && localItems.length === 0) {
            setLocalItems(items);
            setLocalTotals({ totalItems, totalAmount });
        }
    }, [items, totalItems, totalAmount, localItems.length]);

    // Debug: Log cart state
    React.useEffect(() => {
        console.log('CartList - Cart state:', { items, totalItems, totalAmount, loading, error });
    }, [items, totalItems, totalAmount, loading, error]);

    // Fetch cart data on component mount
    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleQuantityChange = useCallback((cartItemId, currentQuantity, change) => {
        const newQuantity = currentQuantity + change;
        console.log('Quantity change request:', { cartItemId, currentQuantity, change, newQuantity });
        
        if (newQuantity >= 1 && newQuantity <= 10) {
            console.log('Dispatching updateCartItemQuantity with:', { cartItemId, quantity: newQuantity });
            
            // Update local state immediately for instant feedback
            setLocalItems(prevItems => 
                prevItems.map(item => 
                    item._id === cartItemId 
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
            
            // Update local totals
            setLocalTotals(prev => {
                const item = localItems.find(item => item._id === cartItemId);
                if (item) {
                    const quantityDifference = newQuantity - currentQuantity;
                    return {
                        totalItems: prev.totalItems + quantityDifference,
                        totalAmount: prev.totalAmount + (item.price * quantityDifference)
                    };
                }
                return prev;
            });
            
            dispatch(updateCartItemQuantity({ cartItemId, quantity: newQuantity }));
        } else {
            console.log('Quantity change rejected:', { newQuantity, min: 1, max: 10 });
        }
    }, [dispatch, localItems]);

    const handleRemoveItem = useCallback((cartItemId) => {
        dispatch(removeFromCart(cartItemId));
    }, [dispatch]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <Alert severity="error" sx={{ maxWidth: '600px' }}>
                    <Typography variant="h6">Cart Error</Typography>
                    <Typography>{error}</Typography>
                    <Button 
                        variant="outlined" 
                        sx={{ mt: 2 }}
                        onClick={() => dispatch(fetchCart())}
                    >
                        Retry
                    </Button>
                </Alert>
            </Box>
        );
    }

    if (items.length === 0) {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', padding: '2% 0 3% 3%' }}>
                <Box sx={{ height: 'auto', width: '500px', }}>
                    <Box sx={{ height: '150px', width: '200px', margin: '7% auto' }}>
                        <img height='150px' width='200px' src='https://www.svgrepo.com/show/17356/empty-cart.svg' alt='' />
                    </Box>
                    <Box sx={{ width: '400px', border: 'solid 1px black', margin: '0 auto', textAlign: 'center', color: 'red', padding: '5px 0', fontWeight: 'bold', fontSize: '14px' }}>
                        YOUR CART IS CURRENTLY EMPTY
                    </Box>
                    <Box sx={{ height: 'auto', width: '140px', margin: '3% auto' }}>
                        <Button 
                            variant='contained' 
                            sx={{ fontSize: '14px', textTransform: 'capitalize', marginTop: '5%' }}
                            onClick={() => navigate('/ecommerceDashboard')}
                        >
                            return to shop
                        </Button>
                    </Box>
                </Box>
            </div>
        );
    }

    // Use local state for rendering to prevent re-renders
    const displayItems = localItems.length > 0 ? localItems : items;
    const displayTotals = localTotals.totalItems > 0 ? localTotals : { totalItems, totalAmount };

    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', padding: '2% 0 3% 3%' }}>
            
            <Box sx={{ height: 'auto', width: '1000px', }}>
                <Paper elevation={3}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold', padding: '2% 2% 0' }}>Shopping Cart</Typography>
                    <Box sx={{ height: 'auto', width: '97%', borderBottom: 'solid 1px #2424', display: 'flex', justifyContent: 'space-between', margin: '0 2%', padding: '0.5% 0' }}>
                        <Typography variant='p' sx={{marginRight:'2%'}}>Price</Typography>
                    </Box>
                    
                    {displayItems.map((item, index) => (
                        <Box key={item._id} sx={{ height: '300px', width: '97%', margin: '0 2%', borderBottom: 'solid 1px #2424', padding: '1.5% 0', display: 'flex', justifyContent: 'space-around' }}>
                            <Box sx={{ width: '220px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{height:'150px',width:'250px',margin:'1%'}}>
                                    <img height='150px' width='90%' src={item.product?.thumbnailImage || 'https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987'} alt={item.product?.name || 'Product'} />
                                </Box>
                            </Box>
                            <Box sx={{ height: '100%', width: '60%', display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ height: '100%', width: '70%', padding: '2% 0' }}>
                                    <Typography variant='h6' sx={{ fontWeight: 'bold', marginBottom: '2%' }}>
                                        {item.product?.name || 'Product Name'}
                                    </Typography>
                                    <Typography variant='body2' sx={{ color: '#666', marginBottom: '2%' }}>
                                        {item.product?.description || 'Product description'}
                                    </Typography>
                                    <Typography variant='h6' sx={{ color: '#c5225f', fontWeight: 'bold', marginBottom: '2%' }}>
                                        ${item.price || '0.00'}
                                    </Typography>
                                    <Box sx={{height:'50px',width:'100%',display:'flex'}} >
                                        <Box sx={{height:'40px',width:'130px',border:'solid 3px #f1ac1b',display:'flex',justifyContent:'space-around',alignItems:'center',borderRadius:'20px'}}>
                                            <DeleteOutlineIcon 
                                                sx={{cursor:'pointer'}} 
                                                onClick={() => handleQuantityChange(item._id, item.quantity, -1)}
                                            />
                                            <Typography variant='p' sx={{fontWeight:'bold'}}>
                                                {item.quantity}
                                            </Typography>
                                            <AddIcon 
                                                sx={{cursor:'pointer'}} 
                                                onClick={() => handleQuantityChange(item._id, item.quantity, 1)}
                                            />
                                        </Box>
                                        <Box sx={{width:'80px',height:'25px',borderLeft:'solid 1px black',paddingLeft:'10px',margin:'8px 0 5px 12px'}}>
                                            <Link 
                                                to='' 
                                                style={{textDecoration:'none'}}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleRemoveItem(item._id);
                                                }}
                                            >
                                                Delete
                                            </Link>
                                        </Box>
                                        <Box sx={{width:'130px',height:'20px',borderLeft:'solid 1px black',paddingLeft:'10px',margin:'10px 0 5px'}}>
                                            <Link to='' style={{textDecoration:'none'}}>Save for later</Link>
                                        </Box>
                                        <Box sx={{width:'100px',height:'20px',borderLeft:'solid 1px black',paddingLeft:'10px',margin:'10px 0 5px'}}>
                                            <Link to='' style={{textDecoration:'none'}}>Share</Link>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{height:'100%',width:'200px',textAlign:'right'}}>
                                    <Typography variant='p' sx={{fontWeight:'bold',fontSize:'20px',}}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                    
                    <Box sx={{height:'50px',wdth:'97%',}}>
                        <Box sx={{height:'auto',width:'auto',textAlign:'right',padding:'7px 15px'}} >
                            <Typography variant='p' sx={{fontSize:'20px',textAlign:'right'}}>
                                Subtotal ({displayTotals.totalItems} items) : <b>${displayTotals.totalAmount.toFixed(2)}</b>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <Box sx={{ height: '300px', width: '300px', margin: '0 3%' }}>
               <Paper elevation={3}>
                    <Box sx={{fontSize:'20px',padding:'10px 15px'}}>
                        <Typography variant='p' >Subtotal ({displayTotals.totalItems} items) :</Typography><br />
                        <Typography variant='p' sx={{fontWeight:'bold'}}>${displayTotals.totalAmount.toFixed(2)}</Typography>
                        <Button 
                            variant='contained' 
                            sx={{backgroundColor:'#f1ac1b',textTransform:'capitalize',padding:'2% 20%',fontSize:'17px',margin:'10px 0',borderRadius:'20px'}} 
                            onClick={()=>navigate('/ecommerceDashboard/checkout')}
                            disabled={displayTotals.totalItems === 0}
                        >
                            proceed to Buy
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </div>
    )
}

export default CartList