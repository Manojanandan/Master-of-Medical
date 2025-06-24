import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Drawer, Typography, useTheme } from '@mui/material';
import { Home, ShoppingCart, ListAlt, People, ExitToApp, Menu as MenuIcon, ChevronLeft } from '@mui/icons-material';

const menuItems = [
  { text: 'Overview', icon: <Home />, path: '/vendorDashboard' },
  { text: 'Products', icon: <ShoppingCart />, path: '/vendorDashboard/products' },
  { text: 'Orders', icon: <ListAlt />, path: '/vendorDashboard/orders' },
  { text: 'Customers', icon: <People />, path: '/vendorDashboard/customers' },
];

const Sidebar = ({ collapsed, onToggle, isMobile, mobileOpen }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    navigate('/');
  };

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: '24px',
      }}
    >
      <Box>
        {isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                <IconButton onClick={onToggle}>
                    <ChevronLeft sx={{ color: 'white' }} />
                </IconButton>
            </Box>
        )}

        <List sx={{ px: collapsed && !isMobile ? 1 : 2 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                end={item.path === '/vendorDashboard'}
                sx={{
                  minHeight: 48,
                  justifyContent: (collapsed && !isMobile) ? 'center' : 'initial',
                  px: 2.5,
                  my: 1,
                  borderRadius: '12px',
                  color: 'grey.400',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: 'white',
                  },
                  '&.active': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 'bold',
                  },
                  '& .MuiListItemIcon-root': {
                      color: 'inherit',
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: (collapsed && !isMobile) ? 'auto' : 3,
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: (collapsed && !isMobile) ? 0 : 1, transition: 'opacity 0.3s' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ px: collapsed && !isMobile ? 1 : 2, pb: 2 }}>
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                minHeight: 48,
                justifyContent: (collapsed && !isMobile) ? 'center' : 'initial',
                px: 2.5,
                my: 1,
                borderRadius: '12px',
                color: 'grey.400',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: 'white'
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: (collapsed && !isMobile) ? 'auto' : 3,
                  justifyContent: 'center',
                }}
              >
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Log out" sx={{ opacity: (collapsed && !isMobile) ? 0 : 1, transition: 'opacity 0.3s' }} />
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{ 
            textAlign: 'center', 
            p: 2, 
            borderTop: '1px solid #2d2d2d',
            opacity: (collapsed && !isMobile) ? 0 : 1,
            transition: 'opacity 0.3s',
            display: (collapsed && !isMobile) ? 'none' : 'block'
        }}>
          <Typography variant="body2" sx={{color: 'grey.500'}}>Support</Typography>
          <Typography variant="body2" sx={{color: 'grey.500'}}>+91 00000 0000</Typography>
        </Box>
      </Box>
    </Box>
  );

  const drawerWidth = isMobile ? 250 : (collapsed ? 80 : 250);

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={onToggle}
        sx={{ 
            mr: 2, 
            display: { md: 'none' }, 
            position: 'fixed', 
            top: 16, 
            left: 16, 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.7)',
            }
        }}
      >
        <MenuIcon sx={{color: 'white'}} />
      </IconButton>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={isMobile ? onToggle : undefined}
        ModalProps={{
            keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#000000',
            color: 'white',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
            borderRight: 'none',
          },
        }}
      >
        {!isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1, pt: 2}}>
            <IconButton onClick={onToggle}>
              <Box sx={{
                  transition: 'transform 0.3s ease-in-out',
                  transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
              }}>
                <ChevronLeft sx={{ color: 'white' }} />
              </Box>
            </IconButton>
          </Box>
        )}
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar; 