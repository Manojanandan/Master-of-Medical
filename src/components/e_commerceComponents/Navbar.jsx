import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { AppBar, Badge, Box, IconButton, InputAdornment, Stack, TextField, Toolbar, Typography, Menu, MenuItem, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserInfoFromToken } from '../../utils/jwtUtils';
import Logo from '../../assets/pharmaSiteLogo.png'

const Navbar = () => {
  const navigate = useNavigate();
  const { totalItems } = useSelector((state) => state.cartReducer);
  const [userInfo, setUserInfo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = sessionStorage.getItem('jwt');
      console.log('Navbar - Checking auth status, token exists:', !!token);
      
      if (token) {
        const user = getUserInfoFromToken();
        console.log('Navbar - User info from token:', user);
        
        if (user) {
          setUserInfo(user);
          setIsLoggedIn(true);
          console.log('Navbar - User logged in:', user.name);
        } else {
          console.warn('Navbar - Token exists but no user info found');
          setUserInfo(null);
          setIsLoggedIn(false);
        }
      } else {
        console.log('Navbar - No token found, user not logged in');
        setUserInfo(null);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkAuthStatus);
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, []);

  const handleProfileClick = (event) => {
    if (isLoggedIn) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate('/login');
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuClick = () => {
    handleMenuClose();
    navigate('/ecommerceDashboard/profile');
  };

  const handleLogout = () => {
    handleMenuClose();
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('userType');
    setUserInfo(null);
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <React.Fragment>
        <AppBar sx={{ backgroundColor: '#ffffff', boxShadow: 'none', color: '#000', padding: '10px 0 0px', borderBottom: 'solid 1.5px #2424' }}>
          <Toolbar sx={{ height: 'auto', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ height: 'auto', width: '25%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Box sx={{ height: 'auto', width: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={Logo} alt="Logo" style={{ height: '40px', width: 'auto' }} />
              </Box>
            </Box>
            <Box sx={{ height: 'auto', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ height: 'auto', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TextField
                  placeholder="Search for products..."
                  variant="outlined"
                  size="small"
                  sx={{
                    width: '80%',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '25px',
                      backgroundColor: '#f5f5f5',
                      '& fieldset': {
                        borderColor: 'transparent',
                      },
                      '&:hover fieldset': {
                        borderColor: 'transparent',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'transparent',
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#666' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ height: 'auto', width: '18%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  height: 'auto', 
                  width: 'auto', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={handleProfileClick}
              >
                <IconButton sx={{ width: '30%' }}>
                  {isLoggedIn ? (
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#1976d2' }}>
                      {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : <PersonIcon />}
                    </Avatar>
                  ) : (
                    <PersonOutlineIcon sx={{ fontSize: '2rem', color: '#000' }} />
                  )}
                </IconButton>
                <Box sx={{ width: 'auto', marginLeft: '8%' }}>
                  {isLoggedIn ? (
                    <>
                      <Typography variant='span' sx={{ fontSize: '12px', color: '#323332c2', width: '100%' }}>
                        Welcome back
                      </Typography>
                      <br />
                      <Typography variant='p' sx={{ fontSize: '14px', fontWeight: 500 }}>
                        {userInfo?.name || 'User'}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant='span' sx={{ fontSize: '12px', color: '#323332c2', width: '100%' }}>
                        Sign in
                      </Typography>
                      <br />
                      <Typography variant='p' sx={{ fontSize: '14px' }}>
                        Account
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
              
              {/* Profile Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{
                  '& .MuiPaper-root': {
                    minWidth: 200,
                    mt: 1,
                  }
                }}
              >
                <MenuItem onClick={handleProfileMenuClick}>
                  <PersonIcon sx={{ mr: 2, fontSize: 20 }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <PersonOutlineIcon sx={{ mr: 2, fontSize: 20 }} />
                  Logout
                </MenuItem>
              </Menu>

              <Box sx={{ height: 'auto', width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center',cursor:'pointer' }} onClick={()=>navigate('/ecommerceDashboard/cart')}>
                <Badge badgeContent={totalItems || 0} color="secondary">
                  <AddShoppingCartIcon color="action" sx={{ fontSize: '2rem' }} />
                </Badge>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
    </React.Fragment>
  )
}

export default Navbar
