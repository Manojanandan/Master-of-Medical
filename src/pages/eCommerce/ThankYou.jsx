// import React from 'react';
// import { Box, Typography, Button, Card, CardContent } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// const ThankYou = () => {
//   const navigate = useNavigate();

//   return (
//     <Box sx={{ 
//       minHeight: '100vh', 
//       display: 'flex', 
//       alignItems: 'center', 
//       justifyContent: 'center',
//       backgroundColor: '#f5f5f5',
//       padding: 2
//     }}>
//       <Card sx={{ 
//         maxWidth: 600, 
//         width: '100%', 
//         textAlign: 'center',
//         boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
//         borderRadius: 3
//       }}>
//         <CardContent sx={{ p: 4 }}>
//           <CheckCircleOutlineIcon 
//             sx={{ 
//               fontSize: 80, 
//               color: '#4caf50', 
//               mb: 3 
//             }} 
//           />
          
//           <Typography variant="h4" component="h1" sx={{ 
//             fontWeight: 600, 
//             mb: 2,
//             color: '#2e7d32'
//           }}>
//             Thank You!
//           </Typography>
          
//           <Typography variant="h6" sx={{ 
//             mb: 3, 
//             color: '#666',
//             fontWeight: 500
//           }}>
//             Your order has been placed successfully
//           </Typography>
          
//           <Typography variant="body1" sx={{ 
//             mb: 4, 
//             color: '#666',
//             lineHeight: 1.6
//           }}>
//             We have received your order and will process it shortly. 
//             You will receive an email confirmation with your order details.
//             Our team will contact you soon regarding delivery.
//             <br /><br />
//             <strong>Your cart has been cleared and is ready for your next shopping session!</strong>
//           </Typography>
          
//           <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
//             <Button
//               variant="contained"
//               onClick={() => navigate('/ecommerceDashboard')}
//               sx={{ 
//                 borderRadius: 2, 
//                 px: 4, 
//                 py: 1.5,
//                 textTransform: 'none',
//                 fontSize: '16px'
//               }}
//             >
//               Continue Shopping
//             </Button>
            
//             <Button
//               variant="outlined"
//               onClick={() => navigate('/ecommerceDashboard/profile')}
//               sx={{ 
//                 borderRadius: 2, 
//                 px: 4, 
//                 py: 1.5,
//                 textTransform: 'none',
//                 fontSize: '16px'
//               }}
//             >
//               View Orders
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default ThankYou; 


// import React, { useEffect } from 'react';
// import { Box, Typography, Button, Card, CardContent, useTheme } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import { motion } from 'framer-motion';

// const ThankYou = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();

//   useEffect(() => {
//     // Scroll to top on component mount
//     window.scrollTo(0, 0);
//   }, []);

//   const fadeInUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   // const featureItems = [
//   //   {
//   //     icon: <ShoppingBagIcon fontSize="large" />,
//   //     title: "Easy Returns",
//   //     text: "30-day return policy"
//   //   },
//   //   {
//   //     icon: <LocalShippingIcon fontSize="large" />,
//   //     title: "Fast Shipping",
//   //     text: "Delivery in 2-3 business days"
//   //   },
//   //   {
//   //     icon: <EmailIcon fontSize="large" />,
//   //     title: "Order Updates",
//   //     text: "Real-time notifications"
//   //   },
//   //   {
//   //     icon: <HeadsetMicIcon fontSize="large" />,
//   //     title: "24/7 Support",
//   //     text: "Dedicated customer care"
//   //   }
//   // ];

//   return (
//     <Box sx={{ 
//       minHeight: '80vh', 
//       display: 'flex', 
//       alignItems: 'center', 
//       justifyContent: 'center',
//       backgroundColor: theme.palette.background.default,
//       // padding: { xs: 2, md: 4 },
//       backgroundImage: 'radial-gradient(circle at 10% 20%, rgb(255, 255, 255) 0%, rgba(255,255,255,1) 90%)'
//     }}>
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={staggerContainer}
//       >
//         <Card sx={{ 
//           maxWidth: 800, 
//           width: '100%', 
//           textAlign: 'center',
//           boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
//           borderRadius: 4,
//           overflow: 'visible',
//           position: 'relative',
//           '&:before': {
//             content: '""',
//             position: 'absolute',
//             top: -2,
//             left: -2,
//             right: -2,
//             bottom: -2,
//             background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
//             borderRadius: 5,
//             zIndex: -1,
//             opacity: 0.7,
//             filter: 'blur(5px)'
//           }
//         }}>
//           <CardContent sx={{ p: { xs: 3, md: 5 } }}>
//             <motion.div variants={fadeInUp}>
//               <Box sx={{
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 width: 100,
//                 height: 100,
//                 borderRadius: '50%',
//                 backgroundColor: 'rgba(76, 175, 80, 0.1)',
//                 mb: 3,
//                 position: 'relative',
//                 '&:after': {
//                   content: '""',
//                   position: 'absolute',
//                   width: '100%',
//                   height: '100%',
//                   borderRadius: '50%',
//                   border: '2px dashed rgba(76, 175, 80, 0.5)',
//                   animation: 'spin 20s linear infinite',
//                   '@keyframes spin': {
//                     '0%': { transform: 'rotate(0deg)' },
//                     '100%': { transform: 'rotate(360deg)' }
//                   }
//                 }
//               }}>
//                 <CheckCircleOutlineIcon 
//                   sx={{ 
//                     fontSize: 60, 
//                     color: '#4caf50',
//                   }} 
//                 />
//               </Box>
//             </motion.div>
            
//             <motion.div variants={fadeInUp}>
//               <Typography variant="h3" component="h1" sx={{ 
//                 fontWeight: 700, 
//                 mb: 2,
//                 color: theme.palette.text.primary,
//                 fontSize: { xs: '2rem', md: '2.5rem' }
//               }}>
//                 Order Confirmed!
//               </Typography>
//             </motion.div>
            
//             <motion.div variants={fadeInUp}>
//               <Typography variant="h6" sx={{ 
//                 mb: 3, 
//                 color: theme.palette.text.secondary,
//                 fontWeight: 500,
//                 fontSize: { xs: '1.1rem', md: '1.25rem' }
//               }}>
//                 Thank you for your purchase
//               </Typography>
//             </motion.div>
            
//             <motion.div variants={fadeInUp}>
//               <Typography variant="body1" sx={{ 
//                 mb: 4, 
//                 color: theme.palette.text.secondary,
//                 lineHeight: 1.8,
//                 maxWidth: 600,
//                 mx: 'auto',
//                 fontSize: { xs: '0.95rem', md: '1rem' }
//               }}>
//                 Your order #ORD-{Math.floor(Math.random() * 1000000)} has been successfully placed. 
//                 We've sent a confirmation email with all the details. 
//                 Our team is already preparing your package for shipment.
//               </Typography>
//             </motion.div>

//             {/* <motion.div variants={fadeInUp}>
//               <Box sx={{
//                 display: 'grid',
//                 gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
//                 gap: 2,
//                 mb: 4,
//                 textAlign: 'center'
//               }}>
//                 {featureItems.map((item, index) => (
//                   <motion.div 
//                     key={index}
//                     variants={fadeInUp}
//                     whileHover={{ y: -5 }}
//                   >
//                     <Box sx={{
//                       p: 2,
//                       borderRadius: 2,
//                       backgroundColor: theme.palette.background.paper,
//                       boxShadow: '0 5px 15px rgba(0,0,0,0.03)',
//                       height: '100%'
//                     }}>
//                       <Box sx={{ 
//                         color: '#4caf50',
//                         mb: 1
//                       }}>
//                         {item.icon}
//                       </Box>
//                       <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//                         {item.title}
//                       </Typography>
//                       <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
//                         {item.text}
//                       </Typography>
//                     </Box>
//                   </motion.div>
//                 ))}
//               </Box>
//             </motion.div> */}
            
//             <motion.div variants={fadeInUp}>
//               <Box sx={{ 
//                 display: 'flex', 
//                 gap: 2, 
//                 justifyContent: 'center', 
//                 flexWrap: 'wrap',
//                 mt: 3
//               }}>
//                 <Button
//                   variant="contained"
//                   onClick={() => navigate('/ecommerceDashboard')}
//                   sx={{ 
//                     borderRadius: 50, 
//                     px: 4, 
//                     py: 1.5,
//                     textTransform: 'none',
//                     fontSize: '16px',
//                     fontWeight: 600,
//                     minWidth: 200,
//                     background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
//                     boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
//                     '&:hover': {
//                       boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
//                       background: 'linear-gradient(45deg, #3d8b40, #7cb342)'
//                     }
//                   }}
//                 >
//                   Continue Shopping
//                 </Button>
                
//                 <Button
//                   variant="outlined"
//                   onClick={() => navigate('/ecommerceDashboard/profile')}
//                   sx={{ 
//                     borderRadius: 50, 
//                     px: 4, 
//                     py: 1.5,
//                     textTransform: 'none',
//                     fontSize: '16px',
//                     fontWeight: 600,
//                     minWidth: 200,
//                     borderWidth: 2,
//                     '&:hover': {
//                       borderWidth: 2,
//                       backgroundColor: 'rgba(76, 175, 80, 0.08)'
//                     }
//                   }}
//                 >
//                   Track Order
//                 </Button>
//               </Box>
//             </motion.div>

//             <motion.div variants={fadeInUp}>
//               <Typography variant="body2" sx={{ 
//                 mt: 4, 
//                 color: theme.palette.text.secondary,
//                 fontStyle: 'italic'
//               }}>
//                 Need help? <Box component="span" sx={{ color: '#4caf50', fontWeight: 500 }}>Contact our support team</Box>
//               </Typography>
//             </motion.div>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </Box>
//   );
// };

// export default ThankYou;


import React, { useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { motion } from 'framer-motion';

const ThankYou = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Box sx={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: theme.palette.background.default,
      backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 1) 90%)',
      padding: { xs: 2, md: 4 }
    }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <Card sx={{ 
          maxWidth: 800, 
          width: '100%', 
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          borderRadius: 8,
          overflow: 'visible',
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
            borderRadius: 8,
            zIndex: -1,
            opacity: 0.7,
            filter: 'blur(10px)'
          }
        }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <motion.div variants={fadeInUp}>
              <Box sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 100,
                height: 100,
                borderRadius: '50%',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                mb: 3,
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '2px dashed rgba(76, 175, 80, 0.5)',
                  animation: 'spin 20s linear infinite',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                  }
                }
              }}>
                <CheckCircleOutlineIcon 
                  sx={{ 
                    fontSize: 60, 
                    color: '#4caf50',
                  }} 
                />
              </Box>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Typography variant="h4" component="h1" sx={{ 
                fontWeight: 700, 
                mb: 2,
                color: theme.palette.text.primary,
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}>
                Order Confirmed!
              </Typography>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Typography variant="h6" sx={{ 
                mb: 3, 
                color: theme.palette.text.secondary,
                fontWeight: 500,
                fontSize: { xs: '1.1rem', md: '1.25rem' }
              }}>
                Thank you for your purchase!
              </Typography>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Typography variant="body1" sx={{ 
                mb: 4, 
                color: theme.palette.text.secondary,
                lineHeight: 1.8,
                maxWidth: 600,
                mx: 'auto',
                fontSize: { xs: '0.95rem', md: '1rem' }
              }}>
                Your order #ORD-{Math.floor(Math.random() * 1000000)} has been successfully placed. 
                A confirmation email has been sent with all the details. 
                Our team is preparing your medical supplies for shipment.
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                mt: 3
              }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/ecommerceDashboard')}
                  sx={{ 
                    borderRadius: 50, 
                    px: 4, 
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 600,
                    minWidth: 200,
                    background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
                    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
                      background: 'linear-gradient(45deg, #3d8b40, #7cb342)'
                    }
                  }}
                >
                  Continue Shopping
                </Button>
                
                <Button
                  variant="outlined"
                  onClick={() => navigate('/ecommerceDashboard/profile')}
                  sx={{ 
                    borderRadius: 50, 
                    px: 4, 
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 600,
                    minWidth: 200,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      backgroundColor: 'rgba(76, 175, 80, 0.08)'
                    }
                  }}
                >
                  Track Order
                </Button>
              </Box>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography variant="body2" sx={{ 
                mt: 4, 
                color: theme.palette.text.secondary,
                fontStyle: 'italic'
              }}>
                Need assistance? <Box component="span" sx={{ color: '#4caf50', fontWeight: 500 }}>Contact our support team</Box>
              </Typography>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default ThankYou;
