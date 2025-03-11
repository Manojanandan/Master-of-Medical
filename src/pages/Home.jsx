import React from "react";
import { Box, Typography, Button, Grid, TextField, IconButton, InputAdornment, useMediaQuery, AppBar, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import { useTheme } from "@mui/material/styles";

const Home = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Show MenuIcon only on mobile

    return (
        <Box sx={{width:{xa:'98%',sm:'98%',md:'90%'},margin:'0px auto'}}>
            <AppBar position="static" sx={{ background: "white", boxShadow: "none", borderBottom: "1px solid #ddd" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                    {/* Menu Icon (Visible only on mobile) */}
                    {isMobile ? (
                        <IconButton>
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <Box width="40px" /> // Keeps spacing when MenuIcon is hidden
                    )}

                    {/* Search Bar */}
                    <TextField
                        placeholder="Search for products, categories, or brands..."
                        variant="outlined"
                        size="small"
                        sx={{
                            width: "60%",
                            background: "#f3f4f6",
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

                    {/* Icons on the Right */}
                    <Box display="flex" gap={2}>
                        <IconButton>
                            <AccountCircleIcon />
                        </IconButton>
                        <IconButton>
                            <FavoriteBorderIcon />
                        </IconButton>
                        <IconButton>
                            <ShoppingCartIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <Grid container>
                {/* Sidebar */}
                <Grid item xs={12} md={2}>
                    <Sidebar />
                </Grid>

                {/* Main Content */}
                <Grid item xs={12} md={10} p={3}>
                    <img src="https://png.pngtree.com/thumb_back/fh260/back_pic/00/02/44/5056179b42b174f.jpg" width='100%' alt='banner' />
                    {/* <Box
            sx={{
              backgroundColor: "#0057FF",
              color: "#fff",
              p: 3,
              borderRadius: 2,
              position: "relative",
              textAlign: "left",
            }}
          >
            <Typography variant="caption" sx={{ backgroundColor: "#fff", color: "#000", p: "2px 6px", borderRadius: "4px" }}>
              Weekend Discount
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={2}>
              Get the best quality products at the lowest prices
            </Typography>
            <Typography variant="body1" mt={1}>
              We have prepared special discounts for you on grocery products. Don’t miss these opportunities...
            </Typography>
            <Box display="flex" alignItems="center" mt={2} gap={1}>
              <Typography variant="h6" sx={{ fontWeight: "bold", textDecoration: "line-through", opacity: 0.7 }}>
                500
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                100
              </Typography>
            </Box>
            <Button variant="contained" sx={{ mt: 2, backgroundColor: "#fff", color: "#000", fontWeight: "bold" }}>
              Shop Now
            </Button>
          </Box> */}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
