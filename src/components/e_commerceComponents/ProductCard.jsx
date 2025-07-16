import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Star from './Star'
import AddIcon from '@mui/icons-material/Add';

const ProductCard = ({offer,image,badge,title,rating,price,onClick}) => {
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
              <Typography variant='p' sx={{fontWeight:'bold',fontSize:'12px'}}>{offer}</Typography>
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
            <Typography variant='h5' sx={{color:'#c5225f',fontWeight:'bold',marginBottom:'3%'}}>${price}</Typography>
            <Button 
              endIcon={<AddIcon />} 
              variant='outlined' 
              sx={{width:'80%',borderRadius:'15px',fontWeight:'bold',textTransform:'capitalize'}} 
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click when button is clicked
                // You can add cart functionality here later
                console.log('Add to cart clicked');
              }}
            >
              Add to cart
            </Button>
          </Box>
        </Box>
    </React.Fragment>
  )
}

export default ProductCard