import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import VendorNavbar from '../components/VendorNavbar';

const VendorDashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [collapsed, setCollapsed] = useState(isMobile);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);

    }
  };

  return (
    <>
      <VendorNavbar />
      <Box sx={{ display: 'flex', pt: { xs: '56px', sm: '64px' }, minHeight: '100vh', background: '#fafbfc' }}>
        <Sidebar
          collapsed={collapsed && !isMobile}
          isMobile={isMobile}
          mobileOpen={mobileOpen}
          onToggle={handleToggleSidebar}
        />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3, 
            width: '100%',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default VendorDashboardLayout; 