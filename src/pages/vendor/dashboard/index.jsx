import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import pharmaLogo from '../../../assets/pharmaSiteLogo.png'
import { Outlet, useNavigate } from 'react-router-dom';

const pages = ['Products', 'Reports', 'User Management'];
const settings = ['Profile', 'Logout'];

const index = () => {
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [userName, setUserName] = useState("")

    useEffect(() => {
        if (sessionStorage.getItem("tempData")) {
            const name = sessionStorage.getItem("tempData")
            const getData = JSON.parse(name)
            const firstLetter = getData[0]?.userName.charAt(0)
            setUserName(firstLetter);
        }

    }, [sessionStorage.getItem("tempData")])

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenAvatar = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseAvatar = () => {
        setAnchorElUser(null);
    };
    const handleSettingMenu = (data) => {
        if (data === "Logout") {
            sessionStorage.removeItem("jwt")
            navigate('/')
        }
    }
    return (
        <React.Fragment>
            <Box sx={{ height: '100vh', width: '100%' }}>
                <AppBar position="sticky" sx={{ backgroundColor: '#9cd3f2' }}>
                    <Container maxWidth="xl">
                        <Toolbar>
                            <Box sx={{ height: 'auto', width: 'auto', display: { xs: 'none', md: 'flex' }, mr: 4, flexGrow: 1 }}>
                                <img src={pharmaLogo} alt={pharmaLogo} />
                            </Box>
                            {/* mobile */}
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{ display: { xs: 'block', md: 'none' } }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                                            <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Box sx={{ height: 'auto', width: 'auto', display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                                <img src={pharmaLogo} alt={pharmaLogo} />
                            </Box>
                            {/* mobile */}
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {pages.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2, color: 'black', display: 'block', fontWeight: 'bold', fontSize: '1.1rem', mx: 2, borderBottom: '2px solid transparent', transition: 'border-bottom 0.2s',
                                            '&:hover': {
                                                borderBottom: '2px solid #e91e63',
                                                backgroundColor: 'transparent',
                                            },
                                        }}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Box>
                            <Box sx={{ flexGrow: 1, textAlign: 'right', }}>
                                {/* <Tooltip title="Open settings"> */}
                                <IconButton onClick={handleOpenAvatar} sx={{ p: 0 }}>
                                    <Avatar alt={userName??"M"} src={userName} />
                                </IconButton>
                                {/* </Tooltip> */}
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseAvatar}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseAvatar} sx={{ width: '200px' }} >
                                            <Typography sx={{ textAlign: 'center', fontSize: '20px' }} onClick={() => handleSettingMenu(setting)}>{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Box sx={{ height: '100%', width: '100%', padding: '2% 4%', backgroundColor: '#f3f5f7' }}>
                    <Outlet />
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default index