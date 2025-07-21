import React, { useState, useCallback } from 'react';
import { Box, Typography, Link } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { updateCartItemQuantity, removeFromCart } from '../../../redux/CartReducer';

const CartItem = React.memo(({ item, onQuantityChange, onRemoveItem }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [localQuantity, setLocalQuantity] = useState(item.quantity);

    const handleQuantityChange = useCallback(async (change) => {
        const newQuantity = localQuantity + change;
        
        if (newQuantity >= 1 && newQuantity <= 10) {
            setIsUpdating(true);
            
            // Update local state immediately for instant feedback
            setLocalQuantity(newQuantity);
            
            try {
                await onQuantityChange(item._id, newQuantity);
            } catch (error) {
                // Revert local state if API call fails
                setLocalQuantity(item.quantity);
                console.error('Failed to update quantity:', error);
            } finally {
                setIsUpdating(false);
            }
        }
    }, [localQuantity, item._id, item.quantity, onQuantityChange]);

    const handleRemove = useCallback(() => {
        onRemoveItem(item._id);
    }, [item._id, onRemoveItem]);

    return (
        <Box sx={{ height: '300px', width: '97%', margin: '0 2%', borderBottom: 'solid 1px #2424', padding: '1.5% 0', display: 'flex', justifyContent: 'space-around' }}>
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
                                sx={{cursor: isUpdating ? 'not-allowed' : 'pointer', opacity: isUpdating ? 0.5 : 1}} 
                                onClick={() => !isUpdating && handleQuantityChange(-1)}
                            />
                            <Typography variant='p' sx={{fontWeight:'bold'}}>
                                {isUpdating ? '...' : localQuantity}
                            </Typography>
                            <AddIcon 
                                sx={{cursor: isUpdating ? 'not-allowed' : 'pointer', opacity: isUpdating ? 0.5 : 1}} 
                                onClick={() => !isUpdating && handleQuantityChange(1)}
                            />
                        </Box>
                        <Box sx={{width:'80px',height:'25px',borderLeft:'solid 1px black',paddingLeft:'10px',margin:'8px 0 5px 12px'}}>
                            <Link 
                                to='' 
                                style={{textDecoration:'none'}}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleRemove();
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
                        ${(item.price * localQuantity).toFixed(2)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
});

CartItem.displayName = 'CartItem';

export default CartItem; 