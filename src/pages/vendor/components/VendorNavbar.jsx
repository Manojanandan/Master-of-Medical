import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import pharmaLogo from '../../../assets/pharmaSiteLogo.png';
import AccountCircle from '@mui/icons-material/AccountCircle';

const VendorNavbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: '#ffffff',
        color: '#333',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        zIndex: (theme) => theme.zIndex.drawer + 2,
        height: { xs: 56, sm: 64 },
        justifyContent: 'center',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 56, sm: 64 } }}>
        {/* Logo on the left */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/') }>
          <Box component="img" src={pharmaLogo} alt="Pharma Logo" sx={{ height: { xs: 32, sm: 40 }, width: 'auto', mr: 2 }} />
        </Box>
        {/* User icon on the right */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="large" edge="end" color="inherit">
            <Avatar sx={{ bgcolor: '#1976d2', width: 36, height: 36 }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default VendorNavbar; 