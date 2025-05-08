import { Box, Button, Checkbox, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';

const CartList = () => {
    const navigate = useNavigate()
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', padding: '2% 0 3% 3%' }}>
            
            <Box sx={{ height: 'auto', width: '1000px', }}>
                <Paper elevation={3}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold', padding: '2% 2% 0' }}>Shopping Cart</Typography>
                    <Box sx={{ height: 'auto', width: '97%', borderBottom: 'solid 1px #2424', display: 'flex', justifyContent: 'space-between', margin: '0 2%', padding: '0.5% 0' }}>
                        <Link to='' style={{ textDecoration: 'none' }}>Select all items</Link>
                        <Typography variant='p' sx={{marginRight:'2%'}}>Price</Typography>
                    </Box>
                    <Box sx={{ height: '300px', width: '97%', margin: '0 2%', borderBottom: 'solid 1px #2424', padding: '1.5% 0', display: 'flex', justifyContent: 'space-around' }}>
                        <Box sx={{ width: '220px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                            />
                            <Box sx={{height:'150px',width:'250px',margin:'1%'}}>
                                <img height='150px' width='90%' src='https://m.media-amazon.com/images/I/61dDx7O3sOL._AC_AA360_.jpg' alt='' />
                            </Box>
                        </Box>
                        <Box sx={{ width: '700px', height: '100%', display:'flex',justifyContent:'space-between'}}>
                            <Box sx={{height:'100%',width:'550px',}}>
                                <Box sx={{height:'auto',width:'100%',}}>
                                    <Typography variant='p' sx={{fontSize:'17px'}}>SAMSUNG Galaxy S24 FE AI Phone, 128GB Unlocked Android Smartphone, High-Res 50MP Camera, Long Battery Life, Brighter Display Screen, US</Typography>
                                </Box>
                                <Box sx={{height:'auto',width:'100%',padding:'10px 0'}}>
                                    <Typography variant='p' sx={{fontSize:'14px',}}>Sold by <Link to="" style={{textDecoration:'none'}}>Oppo Mobiles</Link></Typography><br />
                                    <Typography variant='p' sx={{fontSize:'14px',}}>Gift options not available. <Link to="" style={{textDecoration:'none'}}>Learn more</Link></Typography><br />
                                    <Typography variant='p' sx={{fontSize: '15px',fontWeight:'bold'}}>Colour :</Typography>
                                    <Typography variant='p' sx={{fontSize:'14px', }}> Cast Black & Accent</Typography><br />
                                    <Typography variant='p' sx={{fontSize: '15px',fontWeight:'bold'}}>Size :</Typography>
                                    <Typography variant='p' sx={{fontSize:'14px', }}> Self Start</Typography>
                                </Box>
                                <Box sx={{height:'50px',width:'100%',display:'flex'}} >
                                    <Box sx={{height:'40px',width:'130px',border:'solid 3px #f1ac1b',display:'flex',justifyContent:'space-around',alignItems:'center',borderRadius:'20px'}}>
                                        <DeleteOutlineIcon sx={{cursor:'pointer'}} />
                                        <Typography variant='p' sx={{fontWeight:'bold'}}>1</Typography>
                                        <AddIcon sx={{cursor:'pointer'}} />
                                    </Box>
                                    <Box sx={{width:'80px',height:'25px',borderLeft:'solid 1px black',paddingLeft:'10px',margin:'8px 0 5px 12px'}}>
                                        <Link to='' style={{textDecoration:'none',}}>Delete</Link>
                                    </Box>
                                    <Box sx={{width:'130px',height:'20px',borderLeft:'solid 1px black',paddingLeft:'10px',margin:'10px 0 5px'}}>
                                        <Link to='' style={{textDecoration:'none',}}>Save for later</Link>
                                    </Box>
                                    <Box sx={{width:'100px',height:'20px',borderLeft:'solid 1px black',paddingLeft:'10px',margin:'10px 0 5px'}}>
                                        <Link to='' style={{textDecoration:'none',}}>Share</Link>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{height:'100%',width:'200px',textAlign:'right'}}>
                                <Typography variant='p' sx={{fontWeight:'bold',fontSize:'20px',}}>₹ 68,000.00</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{height:'50px',wdth:'97%',}}>
                        <Box sx={{height:'auto',width:'auto',textAlign:'right',padding:'7px 15px'}} >
                            <Typography variant='p' sx={{fontSize:'20px',textAlign:'right'}}>Subtotal (2 items) : <b>₹ 1,36,000.00</b></Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <Box sx={{ height: '300px', width: '300px', margin: '0 3%' }}>
               <Paper elevation={3}>
                    <Box sx={{fontSize:'20px',padding:'10px 15px'}}>
                        <Typography variant='p' >Subtotal (2 items) :</Typography><br />
                        <Typography variant='p' sx={{fontWeight:'bold'}}>₹ 1,36,000.00</Typography>
                        <Button variant='contained' sx={{backgroundColor:'#f1ac1b',textTransform:'capitalize',padding:'2% 20%',fontSize:'17px',margin:'10px 0',borderRadius:'20px'}} onClick={()=>navigate('/ecommerceDashboard/checkout')}>proceed to Buy</Button>
                    </Box>
                </Paper>
            </Box>

            {/* <Box sx={{ height: 'auto', width: '500px', }}>
                <Box sx={{ height: '150px', width: '200px', margin: '7% auto' }}>
                    <img height='150px' width='200px' src='https://www.svgrepo.com/show/17356/empty-cart.svg' alt='' />
                </Box>
                <Box sx={{ width: '400px', border: 'solid 1px black', margin: '0 auto', textAlign: 'center', color: 'red', padding: '5px 0', fontWeight: 'bold', fontSize: '14px' }}>
                    YOUR CART IS CURRENTLY EMPTY
                </Box>
                <Box sx={{ height: 'auto', width: '140px', margin: '3% auto' }}>
                    <Button variant='contained' sx={{ fontSize: '14px', textTransform: 'capitalize',marginTop:'5%' }}>return to shop</Button>
                </Box>
            </Box> */}
        </div>
    )
}

export default CartList