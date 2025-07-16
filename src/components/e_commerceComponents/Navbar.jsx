import React from "react";
import SearchIcon from "@mui/icons-material/Search"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { AppBar, Badge, Box, IconButton, InputAdornment, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/pharmaSiteLogo.png'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <React.Fragment>
        <AppBar sx={{ backgroundColor: '#ffffff', boxShadow: 'none', color: '#000', padding: '10px 0 0px', borderBottom: 'solid 1.5px #2424' }}>
          <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <Box sx={{ height: 'auto', width: '25%', display: 'flex', alignItems: 'center',justifyContent:'center' }}>
              <Box sx={{ height: 'auto', width: '60%',alignItems:'center' }}>
                <img src={Logo} alt={Logo} width='100%' />
              </Box>
              {/* <Box sx={{ height: '100%', width: '40%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <IconButton sx={{ height: '100%', width: '30%', marginLeft: '7%' }}><LocationOnOutlinedIcon sx={{ fontSize: '2rem', color: '#000' }} /></IconButton>
                  <Box sx={{ height: 'auto', width: '60%', paddingTop: '3%' }}>
                    <Typography varient='p' sx={{ fontSize: '12px' }}>Deliver to</Typography>
                    <Typography variant='span' sx={{ fontSize: '14px', fontWeight: 'bold' }}>All</Typography>
                  </Box>
                </Box>
              </Box> */}
            </Box>
            <Box sx={{ height: 'auto', width: '50%' }}>
              <TextField
                placeholder="Search for products, categories, or brands..."
                variant="outlined"
                size="small"
                sx={{
                  padding: '6px 0',
                  width: "100%",
                  background: "#f3f4f6",
                  borderRadius: '10px',
                  "& fieldset": { border: "none" }, // Removes the outline border
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ height: 'auto', width: '18%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <Box sx={{ height: 'auto', width: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <IconButton sx={{ width: '30%' }}><PersonOutlineIcon sx={{ fontSize: '2rem', color: '#000' }} /></IconButton>
                <Box sx={{ width: 'auto', marginLeft: '8%' }}>
                  <Typography variant='span' sx={{ fontSize: '12px', color: '#323332c2', width: '100%', }}>Sign in</Typography><br />
                  <Typography variant='p' sx={{ fontSize: '14px' }}>Account</Typography>
                </Box>
              </Box>
              {/* <Box sx={{ height: 'auto', width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Badge badgeContent={4} color="secondary">
                  <FavoriteBorderIcon color="action" sx={{ fontSize: '2rem' }} />
                </Badge>
              </Box> */}
              <Box sx={{ height: 'auto', width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center',cursor:'pointer' }} onClick={()=>navigate('/ecommerceDashboard/cart')}>
                <Badge badgeContent={4} color="secondary">
                  <AddShoppingCartIcon color="action" sx={{ fontSize: '2rem' }} />
                </Badge>
              </Box>
            </Box>
          </Toolbar>
          <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', height: 'auto', width: '100%', marginTop: '1%', }}>
            <Box sx={{ width: '51%', height: 'auto', display: 'flex', alignItems: 'center', padding: '7px 10px' }}>
              <Link to='/ecommerceDashboard' style={{ textDecoration: 'none', color: '#242424', fontWeight: 'bold', fontSize: '16px', marginRight: '2%' }}>Home</Link>
              <Link to='' style={{ textDecoration: 'none', color: '#242424', fontWeight: 'bold', fontSize: '16px', marginRight: '2%' }}>Shop</Link>
              <Link to='' style={{ textDecoration: 'none', color: '#242424', fontWeight: 'bold', fontSize: '16px', marginRight: '2%' }}>About Us</Link>
              <Link to='' style={{ textDecoration: 'none', color: '#242424', fontWeight: 'bold', fontSize: '16px', marginRight: '2%' }}>Blog</Link>
              <Link to='' style={{ textDecoration: 'none', color: '#242424', fontWeight: 'bold', fontSize: '16px', marginRight: '2%' }}>Contact Us</Link>
            </Box>
            <Box sx={{ width: '20%', height: 'auto', textAlign: 'center', paddingTop: '7px 0' }}>
              <Link to='/ecommerceDashboard/orderTracking' style={{ textDecoration: 'none', color: '#c5225f', fontSize: '14px', fontWeight: 'bold',marginRight:'10%' }}>Order Tracking</Link>
              <Link to='/ecommerceDashboard/faq' style={{ textDecoration: 'none', color: '#c5225f', fontSize: '14px', fontWeight: 'bold' }}>FAQ</Link>
            </Box>
          </Box>
        </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
