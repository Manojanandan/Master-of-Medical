import React from 'react'
import {
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Grid2,
  } from '@mui/material';
  import MailIcon from '@mui/icons-material/Mail';
  import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
  import FacebookIcon from '@mui/icons-material/Facebook';
  import TwitterIcon from '@mui/icons-material/Twitter';
  import InstagramIcon from '@mui/icons-material/Instagram';
  import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate()
  return (
    <React.Fragment>
        <Box
        sx={{
          backgroundColor:'#f3f4f6',
          border:'solid 1px transparent'
        }}
      >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '97%',
              borderBottom: 'solid 1.5px #2424',
              alignItems:'center',
              padding: '2% 0 3%',
              margin:'2%'
            }}
          >
            <Box sx={{ width: '50%',padding:'0 15px' }}>
              <Typography
                variant="h6"
                component="h6"
                sx={{ marginBottom: '2px',fontWeight:'bold' }}
              >
                Join our newsletter for £10 offs
              </Typography>
              <Typography variant="p" component="p" sx={{ fontSize: '14px',color: '#9a9fa8' }}>
                Register how to get latest updates on promotions & coupons.Don't worry,we are not spam!
              </Typography>
            </Box>

            <Box sx={{ width: '42%', textAlign:'end',padding:'0px 15px' }}> 
                <TextField
                  id="outlined-basic"
                  placeholder="Email"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon sx={{ color: 'gray' }} /> {/* Email Icon */}
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          variant="text"
                          sx={{ backgroundColor: 'blue', color: 'white', }}
                        >
                          Send
                        </Button>
                      </InputAdornment>
                    ),
                    sx: {
                      paddingRight: 0, 
                      marginBottom: '10px',
                      backgroundColor:'#fff',
                      width:'350px'
                    },
                  }}
                />
                <Typography variant="p" component="p" sx={{ fontSize: 13,color: '#9a9fa8' }}>
                  By subscribing you agree to our <Link to='/ecommerceDashboard/termsofuse' style={{fontWeight:'bold'}}>Terms & Conditions and </Link><Link to='/ecommerceDashboard/privacyPolicy' style={{fontWeight:'bold'}}>Privacy Policy </Link><Link to='/ecommerceDashboard/cookiesPolicy' style={{fontWeight:'bold'}}>& Cookies Policy.</Link>
                </Typography>
              </Box>
          </Box>
          <Box
            sx={{
              borderBottom: 'solid 1.5px #2424',
              width: '97%',
              margin:'2%',
              paddingBottom: '2%',
            }}
          >
            <Grid2
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid2 size={{ xs: 2, md: 2.5, sm: 3 }}>
                <List>
                  <ListItem>
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{ fontSize: 14, fontWeight: 'bold', }}
                    >
                      Do you need help ?
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="p" component="p" sx={{ fontSize: 13, color:'#6b7280',  }}>
                      simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'start',
                        gap: '10%',
                      }}
                    >
                      <Box>
                        <PhoneInTalkIcon sx={{ fontSize: 25,marginLeft:'30%',marginTop:'20%' }} />
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'Column', }}>
                        <Typography
                          variant="p"
                          component="p"
                          sx={{ fontSize: 12,color:'#6b7280',width:'150px' }}
                        >
                          Monday - friday: 8am-9pm
                        </Typography>
                        <Typography
                          variant="h6"
                          component="h6"
                          sx={{ fontSize: 18, fontWeight: 'bold' }}
                        >
                          0 800 300-353
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                  <ListItem>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10%',
                      }}
                    >
                      <Box>
                        <MailIcon sx={{ color: 'gray',marginLeft:'30%' }} />
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'Column' }}>
                        <Typography
                          variant="p"
                          component="p"
                          sx={{ fontSize: 12,width: '160px' }}
                        >
                          Need help with your order ?
                        </Typography>
                        <Typography
                          variant="h6"
                          component="h6"
                          sx={{ fontSize: 14, fontWeight: 'bold' }}
                        >
                          info@example.com
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                </List>
              </Grid2>
              <Grid2 size={{ xs: 2, md: 2.5, sm: 2.5 }}>
                <List >
                  <ListItem disableGutters>
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{ fontSize: 14, fontWeight: 'bold' }}
                    >
                      Make Money with Us
                    </Typography>
                  </ListItem>

                  {[
                    'Sell on Grogin',
                    'Sell your services on Grogin',
                    'sell your Business on Grogin',
                    'Sell your Apps on Grogin',
                    'Become an Affiliate',
                    'Advertise your Products',
                    'Sell Publish with us',
                    'Become a Browser Vendor',
                  ].map((text, index) => (
                    <ListItem
                      key={index}
                      disableGutters
                      sx={{ padding: '0px 0' }}
                    >
                      <ListItemText
                        sx={{ marginBottom: '2px', marginTop: '2px' }}
                        primary={
                          <Typography variant="body1" sx={{ fontSize: 13, color:'#6b7280', }}>
                            {text}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid2>
              <Grid2 size={{ xs: 2, md: 2, sm: 2.5 }}>
                <List >
                  <ListItem disableGutters >
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{ fontSize: 14, fontWeight: 'bold' }}
                    >
                      Let Us Help You
                    </Typography>
                  </ListItem>

                  {[
                    'Sell on Grogin',
                    'Sell your services on Grogin',
                    'sell your Business on Grogin',
                    'Sell your Apps on Grogin',
                    'Become an Affiliate',
                    'Advertise your Products',
                    'Sell Publish with us',
                    'Become a Browser Vendor',
                  ].map((text, index) => (
                    <ListItem
                      key={index}
                      disableGutters
                      sx={{ padding: '0px 0' }}
                    >
                      <ListItemText
                        sx={{ marginBottom: '2px', marginTop: '2px' }}
                        primary={
                          <Typography variant="body1" sx={{ fontSize: 13, color:'#6b7280', }}>
                            {text}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid2>
              <Grid2 size={{ xs: 2, md: 2, sm: 3 }}>
                <List>
                  <ListItem disableGutters >
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{ fontSize: 14, fontWeight: 'bold' }}
                    >
                      Get to Know Us
                    </Typography>
                  </ListItem>

                  {[
                    'Sell on Grogin',
                    'Sell your services on Grogin',
                    'sell your Business on Grogin',
                    'Sell your Apps on Grogin',
                    'Become an Affiliate',
                    'Advertise your Products',
                    'Sell Publish with us',
                    'Become a Browser Vendor',
                  ].map((text, index) => (
                    <ListItem
                      key={index}
                      disableGutters
                      sx={{ padding: '0px 0' }}
                    >
                      <ListItemText
                        sx={{ marginBottom: '2px', marginTop: '2px' }}
                        primary={
                          <Typography variant="body1" sx={{ fontSize: 13,color:'#6b7280', }}>
                            {text}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid2>
              <Grid2 size={{ xs: 2, md: 2, sm: 2.5 }}>
                <List>
                  <ListItem sx={{ paddingLeft: '0px' }}>
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{ fontSize: 14, fontWeight: 'bold' }}
                    >
                      Download our app
                    </Typography>
                  </ListItem>
                  <ListItem
                    sx={{ paddingLeft: '0px', display: 'flex', gap: '10px',width:'300px' }}
                  >
                    <img
                      component="img"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                      alt="Google Play"
                      height='50px'
                      width='130px'
                      loading="lazy"
                      sx={{
                        width: {
                          xs: '65px',
                          sm: '70px',
                          md: '85px',
                          lg: '85px',
                        },
                        height: 'auto',
                      }}
                    />
                    <Box sx={{ gap: '10px',width:'150px' }}>
                      <Typography
                        variant="p"
                        component="p"
                        sx={{ fontSize: 13, fontWeight: 'bold',color:'#6b7280', }}
                      >
                        Download App Get -20% Discount
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem
                    sx={{
                      paddingLeft: '0px',
                      display: 'flex',
                      gap: '10px',
                      paddingBottom: '50px',
                      width:'300px'
                    }}
                  >
                    <img
                      component="img"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzRNHdGo9kEMQfYp97VJI-cGl0FOb6NiCY3w&s"
                      alt="Google Play"
                      height='50px'
                      width='130px'
                      loading="lazy"
                      sx={{
                        width: {
                          xs: '65px',
                          sm: '70px',
                          md: '85px',
                          lg: '85px',
                        },
                        height: 'auto',
                      }}
                    />
                    <Box sx={{width:'150px'}}>
                      <Typography
                        variant="p"
                        component="p"
                        sx={{ fontSize: 13, fontWeight: 'bold',color:'#6b7280', }}
                      >
                        Download App Get -20% Discount
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem sx={{ padding: '0px 2px' }}>
                    <ListItemText
                      primary={
                        <Typography variant="body1" sx={{ fontSize: 12 }}>
                          Follow us on Social Media
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Box sx={{ display: 'flex',justifyContent:'space-around',width:'150px',marginTop:'2%' }}>
                    <Box>
                      <FacebookIcon sx={{ color: 'blue', fontSize: 28, }} />
                    </Box>
                    <Box>
                      <TwitterIcon sx={{ color: 'skyblue', fontSize: 28 }} />
                    </Box>
                    <Box>
                      <InstagramIcon sx={{ color: 'pink', fontSize: 28 }} />
                    </Box>
                    <Box>
                      <LinkedInIcon sx={{ color: 'blue', fontSize: 28 }} />
                    </Box>
                  </Box>
                </List>
              </Grid2>
            </Grid2>
          </Box>
          <Box sx={{ display: 'flex',width: '97%', margin:'2%',justifyContent:'space-between'}}>
            <Box sx={{ width: '50%' }}>
              <Typography variant="p" component="p" sx={{ fontSize: 13, color:'#6b7280', }}>
                Copyright 2025 © Origin WhoCommerce WordPress Theme. All rights
                reserved Powered by <Link to='' sx={{color:'blue'}}>KLBTHEME</Link>
              </Typography>
            </Box>
            <Box sx={{ width: '30%', textAlign: 'center',color:'blue' }}>
              <Typography variant="p" component="p" sx={{ fontSize: 13,color:'blue',cursor:'pointer'  }}>
                <span
                  style={{ textDecoration: 'underline', marginRight: '6px' }} onClick={()=>navigate('/ecommerceDashboard/termsofuse')}
                >
                  Terms and Conditions
                </span>{' '}
                <span
                  style={{ textDecoration: 'underline', marginRight: '6px' }} onClick={()=>navigate('/ecommerceDashboard/privacyPolicy')}
                >
                  Privacy Policy
                </span>{' '}
                <span
                  style={{ textDecoration: 'underline', marginRight: '6px' }}
                >
                  Order Tracking
                </span>
              </Typography>
            </Box>
          </Box>
      ` </Box>
    </React.Fragment>
  )
}

export default Footer