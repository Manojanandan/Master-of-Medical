import React, { useState, useEffect } from "react";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Paper,
  CircularProgress,
  Fade,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonIcon from "@mui/icons-material/Person";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserInfoFromToken } from "../../utils/jwtUtils";
import { getPublicProducts } from "../../utils/Service"; // Import the service function
import Logo from "../../assets/pharmaSiteLogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { totalItems } = useSelector((state) => state.cartReducer);
  const [userInfo, setUserInfo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [anchorHelp, setAnchorHelp] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search functionality states
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchAnchor, setSearchAnchor] = useState(null);

  // Color theme
  const colors = {
    primary: "#de3b6f",
    secondary: "#f49507",
    accent: "#873589",
    text: "#2C3E50",
    lightText: "#7F8C8D",
    background: "#ffffff",
    lightBg: "#f8f9fa",
    border: "#e0e0e0",
  };

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = sessionStorage.getItem("jwt");
      if (token) {
        const user = getUserInfoFromToken();
        if (user) {
          setUserInfo(user);
          setIsLoggedIn(true);
        } else {
          setUserInfo(null);
          setIsLoggedIn(false);
        }
      } else {
        setUserInfo(null);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);
    return () => window.removeEventListener("storage", checkAuthStatus);
  }, []);

  // Debounced search effect
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchValue.trim() && searchValue.length > 2) {
        performSearch(searchValue.trim());
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchValue]);

  // Perform search API call
  const performSearch = async (query) => {
    if (!query || query.length < 3) return;

    setIsSearching(true);
    try {
      const response = await getPublicProducts({
        search: query, // Use 'search' parameter as expected by getPublicProducts
        limit: 8,
        page: 1,
      });

      console.log("🔍 Search dropdown API response:", response);

      // Handle the API response structure
      let products = [];
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        products = response.data.data;
      }

      console.log("🔍 Parsed products for dropdown:", products);

      if (products.length > 0) {
        setSearchResults(products);
        setShowSearchResults(true);
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
      setShowSearchResults(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleProfileClick = (event) => {
    if (isLoggedIn) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate("/login");
    }
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleProfileMenuClick = () => {
    handleMenuClose();
    navigate("/customer/profile");
  };

  const handleLogout = () => {
    handleMenuClose();
    sessionStorage.clear();
    setUserInfo(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      setShowSearchResults(false);
      // navigate(`/customer/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setShowSearchResults(false);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Set anchor for search results dropdown
    if (value.trim() && !searchAnchor) {
      setSearchAnchor(e.currentTarget);
    }
  };

  const handleSearchResultClick = (product) => {
    setShowSearchResults(false);
    setSearchValue("");
    navigate(`/customer/product/${product.id}`);
  };

  const clearSearch = () => {
    setSearchValue("");
    setSearchResults([]);
    setShowSearchResults(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuItemClick = (action) => {
    setMobileMenuOpen(false);
    if (action) action();
  };

  const mobileMenuItems = [
    {
      icon: <StorefrontOutlinedIcon />,
      text: "Shop",
      action: () => navigate("/customer/products"),
    },
    {
      icon: <LocationOnOutlinedIcon />,
      text: "Delivery Location",
      action: () => {}, // Add your location action here
      subText: "Deliver to all",
    },
    {
      icon: <HelpOutlineIcon />,
      text: "Help & Support",
      action: () => setAnchorHelp(document.body), // Will trigger help menu
      subText: "079-480-58625",
    },
    {
      icon: <ShoppingCartOutlinedIcon />,
      text: "Cart",
      action: () => navigate("/customer/cart"),
      badge: totalItems || 0,
    },
    {
      icon: isLoggedIn ? (
        <Avatar
          sx={{
            bgcolor: colors.primary,
            width: 24,
            height: 24,
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {userInfo?.name?.charAt(0).toUpperCase()}
        </Avatar>
      ) : (
        <PersonOutlineIcon />
      ),
      text: isLoggedIn && userInfo?.name ? userInfo.name : "Account",
      action: handleProfileClick,
    },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: colors.background,
          color: colors.accent,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Toolbar
            sx={{
              py: { xs: 1, md: 2 },
              px: { xs: 2, sm: 2, md: 4 },
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: { xs: "60px !important", md: "85px !important" },
            }}
          >
            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                onClick={toggleMobileMenu}
                sx={{
                  color: colors.accent,
                  mr: 1,
                  "&:hover": {
                    backgroundColor: colors.lightBg,
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Box
              onClick={() => navigate("/customer")}
              sx={{
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <img
                src={Logo}
                alt="Logo"
                style={{
                  height: isMobile ? "35px" : "45px",
                  width: "auto",
                }}
              />
            </Box>

            {/* Desktop Delivery Location */}
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexShrink: 0,
                  ml: 2,
                }}
              >
                <LocationOnOutlinedIcon
                  sx={{ fontSize: 24, color: colors.lightText }}
                />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.lightText,
                      lineHeight: 1.2,
                      fontSize: "12px",
                      display: "block",
                    }}
                  >
                    Deliver to
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: colors.text,
                      fontSize: "14px",
                      lineHeight: 1.2,
                    }}
                  >
                    all
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Enhanced Search Bar */}
            <Box
              sx={{
                flex: "1 1 auto",
                maxWidth: { xs: "none", md: "500px" },
                mx: { xs: 1, md: 2 },
                minWidth: 0,
                position: "relative",
              }}
            >
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchValue}
                onChange={handleSearchInputChange}
                onKeyPress={handleKeyPress}
                onFocus={(e) => {
                  if (searchValue.trim() && searchResults.length > 0) {
                    setShowSearchResults(true);
                    setSearchAnchor(e.currentTarget);
                  }
                }}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    backgroundColor: colors.lightBg,
                    height: { xs: "40px", md: "48px" },
                    paddingRight: "4px !important",
                    "&.Mui-focused": {
                      backgroundColor: colors.background,
                      borderColor: colors.primary,
                      boxShadow: `0 0 0 3px ${colors.primary}20`,
                    },
                    "& fieldset": {
                      border: `2px solid ${colors.border}`,
                      borderRadius: "50px",
                    },
                    "&:hover fieldset": {
                      borderColor: colors.primary,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.primary,
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    padding: { xs: "10px 16px", md: "12px 16px" },
                    fontSize: { xs: "14px", md: "15px" },
                    fontWeight: 500,
                    "&::placeholder": {
                      color: colors.lightText,
                      opacity: 1,
                    },
                  },
                }}
                InputProps={{
                  startAdornment: searchValue && (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={clearSearch}
                        size="small"
                        sx={{
                          color: colors.lightText,
                          "&:hover": { color: colors.accent },
                        }}
                      >
                        <ClearIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end" sx={{ mr: 0 }}>
                      <IconButton
                        onClick={handleSearch}
                        disabled={isSearching}
                        sx={{
                          backgroundColor: colors.primary,
                          color: colors.background,
                          borderRadius: "50%",
                          width: { xs: "32px", md: "40px" },
                          height: { xs: "32px", md: "40px" },
                          mr: 0,
                          ml: 0,
                          "&:hover": {
                            backgroundColor: colors.accent,
                            transform: "scale(1.08)",
                            boxShadow: `0 4px 12px ${colors.primary}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.lightText,
                            color: colors.background,
                          },
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          boxShadow: `0 2px 8px ${colors.primary}30`,
                        }}
                      >
                        {isSearching ? (
                          <CircularProgress
                            size={16}
                            sx={{ color: colors.background }}
                          />
                        ) : (
                          <SearchIcon sx={{ fontSize: { xs: 16, md: 20 } }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Search Results Dropdown */}
              <Fade in={showSearchResults && searchResults.length > 0}>
                <Paper
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    mt: 1,
                    maxHeight: "400px",
                    overflowY: "auto",
                    zIndex: 1300,
                    borderRadius: 3,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.background,
                  }}
                >
                  {searchResults.map((product, index) => (
                    <Box
                      key={product.id || index}
                      onClick={() => handleSearchResultClick(product)}
                      sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        cursor: "pointer",
                        borderBottom:
                          index < searchResults.length - 1
                            ? `1px solid ${colors.border}`
                            : "none",
                        "&:hover": {
                          backgroundColor: colors.lightBg,
                        },
                      }}
                    >
                      {product.thumbnailImage && (
                        <Box
                          component="img"
                          src={product.thumbnailImage}
                          alt={product.name}
                          sx={{
                            width: 40,
                            height: 40,
                            objectFit: "cover",
                            borderRadius: 1,
                            border: `1px solid ${colors.border}`,
                          }}
                        />
                      )}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: colors.text,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {product.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: colors.lightText,
                            display: "block",
                          }}
                        >
                          {product.brandName} • ₹{product.price}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                  {searchValue.trim() && (
                    <Box
                      onClick={handleSearch}
                      sx={{
                        p: 2,
                        textAlign: "center",
                        cursor: "pointer",
                        borderTop: `1px solid ${colors.border}`,
                        backgroundColor: colors.lightBg,
                        "&:hover": {
                          backgroundColor: colors.border,
                        },
                      }}
                    >
                  
                    </Box>
                  )}
                </Paper>
              </Fade>
            </Box>

            {/* Desktop Navigation Icons */}
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  flexShrink: 0,
                }}
              >
                {/* Shop */}
                <Box
                  onClick={() => navigate("/customer/products")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    padding: "10px 16px",
                    borderRadius: "12px",
                    "&:hover": {
                      backgroundColor: colors.lightBg,
                      transform: "translateY(-2px)",
                      boxShadow: `0 4px 12px ${colors.accent}20`,
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <StorefrontOutlinedIcon
                    sx={{ fontSize: 22, color: colors.accent }}
                  />
                  <Typography
                    sx={{
                      color: colors.accent,
                      fontSize: "15px",
                      fontWeight: 600,
                    }}
                  >
                    Shop
                  </Typography>
                </Box>

                {/* Help */}
                <Box
                  onClick={(e) => setAnchorHelp(e.currentTarget)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    padding: "10px 16px",
                    borderRadius: "12px",
                    "&:hover": {
                      backgroundColor: colors.lightBg,
                      transform: "translateY(-2px)",
                      boxShadow: `0 4px 12px ${colors.accent}20`,
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <HelpOutlineIcon sx={{ fontSize: 22, color: colors.accent }} />
                  <Typography
                    sx={{
                      color: colors.accent,
                      fontSize: "15px",
                      fontWeight: 600,
                    }}
                  >
                    Help
                  </Typography>
                </Box>

                {/* Cart */}
                <Box
                  onClick={() => navigate("/customer/cart")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    "&:hover": {
                      backgroundColor: colors.lightBg,
                      transform: "translateY(-2px)",
                      boxShadow: `0 4px 12px ${colors.accent}20`,
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <Badge
                    badgeContent={totalItems || 0}
                    color="error"
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: "12px",
                        fontWeight: 700,
                        minWidth: "20px",
                        minHeight: "20px",
                        // padding: "4px",
                        borderRadius: "50%",
                        backgroundColor: colors.primary,
                        color: colors.background,
                        top: -6,
                        right: -6,
                        border: `2px solid ${colors.background}`,
                      },
                    }}
                  >
                    <ShoppingCartOutlinedIcon
                      sx={{ fontSize: 24, color: colors.accent }}
                    />
                  </Badge>
                  <Typography
                    sx={{
                      color: colors.accent,
                      fontSize: "15px",
                      fontWeight: 600,
                      ml: 1,
                    }}
                  >
                    Cart
                  </Typography>
                </Box>

                {/* Account */}
                <Box
                  onClick={handleProfileClick}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    padding: "10px 16px",
                    borderRadius: "12px",
                    "&:hover": {
                      backgroundColor: colors.lightBg,
                      transform: "translateY(-2px)",
                      boxShadow: `0 4px 12px ${colors.accent}20`,
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {isLoggedIn ? (
                    <Avatar
                      sx={{
                        bgcolor: colors.primary,
                        width: 24,
                        height: 24,
                        fontSize: "13px",
                        fontWeight: 600,
                        border: `2px solid ${colors.background}`,
                        boxShadow: `0 2px 8px ${colors.primary}30`,
                      }}
                    >
                      {userInfo?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  ) : (
                    <PersonOutlineIcon
                      sx={{ fontSize: 22, color: colors.accent }}
                    />
                  )}
                  <Typography
                    sx={{
                      color: colors.accent,
                      fontSize: "15px",
                      fontWeight: 600,
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {isLoggedIn && userInfo?.name ? userInfo.name : "Account"}
                  </Typography>
                </Box>
              </Box>
            )}
          </Toolbar>
        </Container>

        {/* Help Menu */}
        <Menu
          anchorEl={anchorHelp}
          open={Boolean(anchorHelp)}
          onClose={() => setAnchorHelp(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          PaperProps={{
            sx: {
              p: 2.5,
              borderRadius: 4,
              boxShadow: "0px 12px 32px rgba(0,0,0,0.15)",
              minWidth: { xs: 280, md: 320 },
              mt: 1,
              border: `1px solid ${colors.border}`,
            },
          }}
        >
          <Box sx={{ mb: 2.5 }}>
            <Box display="flex" alignItems="center" gap={2} mb={1}>
              <CallOutlinedIcon sx={{ color: colors.primary, fontSize: 20 }} />
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ fontSize: "16px" }}
              >
                079-480-58625
              </Typography>
            </Box>
            <Typography
              variant="caption"
              color={colors.lightText}
              sx={{
                ml: 5,
                display: "block",
                fontSize: "13px",
              }}
            >
              Available from 9:00AM - 7:00PM
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <MailOutlineIcon sx={{ color: colors.primary, fontSize: 20 }} />
            <Typography variant="body2" sx={{ fontSize: "15px" }}>
              support@medikabazaar.com
            </Typography>
          </Box>
        </Menu>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 4,
              boxShadow: "0px 12px 32px rgba(0,0,0,0.15)",
              minWidth: { xs: 160, md: 180 },
              overflow: "visible",
              border: `1px solid ${colors.border}`,
            },
          }}
        >
          <MenuItem
            onClick={handleProfileMenuClick}
            sx={{
              px: 2.5,
              py: 2,
              gap: 2,
              "&:hover": {
                backgroundColor: colors.lightBg,
                transform: "translateX(4px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <PersonIcon sx={{ color: colors.primary, fontSize: 20 }} />
            <Typography
              variant="body2"
              sx={{ fontSize: "15px", fontWeight: 600 }}
            >
              My Profile
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{
              px: 2.5,
              py: 2,
              gap: 2,
              "&:hover": {
                backgroundColor: colors.lightBg,
                transform: "translateX(4px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <PersonOutlineIcon sx={{ color: colors.primary, fontSize: 20 }} />
            <Typography
              variant="body2"
              sx={{ fontSize: "15px", fontWeight: 600 }}
            >
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: colors.background,
            boxShadow: "0px 8px 32px rgba(0,0,0,0.12)",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${colors.border}`,
            backgroundColor: colors.lightBg,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src={Logo}
              alt="Logo"
              style={{ height: "32px", width: "auto" }}
            />
            <Typography
              variant="h6"
              sx={{
                color: colors.accent,
                fontWeight: 600,
                fontSize: "18px",
              }}
            >
              Menu
            </Typography>
          </Box>
          <IconButton
            onClick={() => setMobileMenuOpen(false)}
            sx={{ color: colors.accent }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ pt: 0 }}>
          {mobileMenuItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                component="button"
                onClick={() => handleMobileMenuItemClick(item.action)}
                sx={{
                  py: 2,
                  px: 3,
                  transition: "all 0.3s ease",
                  borderLeft: `4px solid transparent`,
                  "&:hover": {
                    borderLeft: `4px solid ${colors.primary}`,
                    backgroundColor: colors.lightBg,
                    transform: "translateX(8px)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 50,
                    color: colors.accent,
                    position: "relative",
                  }}
                >
                  {item.badge > 0 ? (
                    <Badge
                      badgeContent={item.badge}
                      color="error"
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: colors.primary,
                          color: colors.background,
                          fontSize: "11px",
                          fontWeight: 700,
                        },
                      }}
                    >
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: colors.text,
                        fontSize: "16px",
                      }}
                    >
                      {item.text}
                    </Typography>
                  }
                  secondary={
                    item.subText && (
                      <Typography
                        sx={{
                          color: colors.lightText,
                          fontSize: "13px",
                          mt: 0.5,
                        }}
                      >
                        {item.subText}
                      </Typography>
                    )
                  }
                />
              </ListItem>
              {index < mobileMenuItems.length - 1 && (
                <Divider
                  sx={{
                    mx: 2,
                    borderColor: colors.border,
                    opacity: 0.6,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </List>

        {/* Mobile Help Section */}
        <Box
          sx={{
            mt: "auto",
            p: 3,
            backgroundColor: colors.lightBg,
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              mb: 2,
              color: colors.text,
              fontSize: "15px",
            }}
          >
            Need Help?
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Box display="flex" alignItems="center" gap={2} mb={1}>
              <CallOutlinedIcon sx={{ color: colors.primary, fontSize: 18 }} />
              <Typography
                variant="body2"
                sx={{ fontSize: "14px", fontWeight: 600 }}
              >
                079-480-58625
              </Typography>
            </Box>
            <Typography
              variant="caption"
              color={colors.lightText}
              sx={{
                ml: 4,
                fontSize: "12px",
              }}
            >
              9:00AM - 7:00PM
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <MailOutlineIcon sx={{ color: colors.primary, fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontSize: "13px" }}>
              support@medikabazaar.com
            </Typography>
          </Box>
        </Box>
      </Drawer>

      {/* Backdrop for search results */}
      {showSearchResults && (
        <Box
          onClick={() => setShowSearchResults(false)}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1200,
            backgroundColor: "transparent",
          }}
        />
      )}
    </>
  );
};

export default Navbar;