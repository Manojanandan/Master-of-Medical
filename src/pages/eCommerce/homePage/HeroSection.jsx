import React from 'react'
import { Link } from 'react-router-dom';
import { Box, Button, IconButton, Stack, Typography, useTheme, useMediaQuery } from '@mui/material'
import { 
    Payment, 
    LocalOffer, 
    Verified, 
    LocalShipping,
    ShoppingCart
} from '@mui/icons-material'

const HeroSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    
    const featureList = [
        {
            icon: <Payment sx={{ fontSize: isMobile ? 30 : 40, color: '#1976d2' }} />,
            heading: "Payment only online",
            description: "Tasigförsamhet beteendedesign Mobile checkout. Ylig kärrtorpa."
        },
        {
            icon: <LocalOffer sx={{ fontSize: isMobile ? 30 : 40, color: '#1976d2' }} />,
            heading: "New stocks and sales",
            description: "Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa."
        },
        {
            icon: <Verified sx={{ fontSize: isMobile ? 30 : 40, color: '#1976d2' }} />,
            heading: "Quality assurance",
            description: "Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa."
        },
        {
            icon: <LocalShipping sx={{ fontSize: isMobile ? 30 : 40, color: '#1976d2' }} />,
            heading: "Delivery from 1 hour",
            description: "Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa."
        }
    ]

    const promotionalCards = [
        {
            badge: "Only This Week",
            title: "Quality Injections at an affordable price",
            description: "Don't Miss it......",
            image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            badge: "MVP",
            title: "Products that nourishes our mind and body",
            description: "Shine the morning...",
            image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            badge: "#1 contentor product",
            title: "Unbeatable quality, unbeatable prices.",
            description: "Only this week. Don't miss...",
            image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            badge: "Hall of Fame",
            title: "Unbeatable quality, unbeatable prices.",
            description: "Only this week. Don't miss...",
            image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        }
    ]

    return (
        <React.Fragment>
            <Box sx={{ 
                height: 'auto', 
                width: '100%', 
                padding: isMobile ? '4% 2%' : '2% 3%' 
            }}>
                {/* Feature Section */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    width: '100%',
                    flexWrap: 'wrap',
                    gap: isMobile ? '4%' : '2%',
                    marginBottom: '4%'
                }}>
                    {featureList?.map((feature, i) => (
                        <Box key={i} sx={{ 
                            height: 'auto', 
                            width: isMobile ? '48%' : isTablet ? '48%' : '23%', 
                            minWidth: isMobile ? 'auto' : '250px',
                            padding: isMobile ? '15px' : '20px',
                            borderRadius: '10px',
                            backgroundColor: '#f8f9fa',
                            border: '1px solid #e9ecef',
                            marginBottom: isMobile ? '15px' : '0'
                        }}>
                            <Stack direction={isMobile ? 'column' : 'row'} sx={{ 
                                height: 'auto', 
                                width: '100%' 
                            }} spacing={isMobile ? 1 : 2}>
                                <Box sx={{ 
                                    height: isMobile ? '40px' : '60px', 
                                    width: isMobile ? '100%' : '80px', 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: isMobile ? 'center' : 'center'
                                }}>
                                    {feature.icon}
                                </Box>
                                <Box sx={{ height: 'auto', width: '100%' }}>
                                    <Typography variant='h6' sx={{ 
                                        fontWeight: 'bold', 
                                        width: '100%',
                                        fontSize: isMobile ? '14px' : '16px',
                                        marginBottom: '8px',
                                        textAlign: isMobile ? 'center' : 'left'
                                    }}>
                                        {feature.heading}
                                    </Typography>
                                    <Typography variant='body2' sx={{ 
                                        fontSize: isMobile ? '12px' : '14px',
                                        color: '#6c757d',
                                        lineHeight: '1.4',
                                        textAlign: isMobile ? 'center' : 'left'
                                    }}>
                                        {feature.description}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    ))}
                </Box>

                {/* Promotional Cards Section */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    width: '100%',
                    flexWrap: 'wrap',
                    gap: isMobile ? '4%' : '2%'
                }}>
                    {promotionalCards?.map((card, i) => (
                        <Box key={i} sx={{ 
                            height: isMobile ? '250px' : '200px', 
                            width: isMobile ? '48%' : isTablet ? '48%' : '23%', 
                            minWidth: isMobile ? 'auto' : '250px',
                            position: 'relative',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s ease',
                            marginBottom: isMobile ? '15px' : '0',
                            '&:hover': {
                                transform: 'translateY(-5px)'
                            }
                        }}>
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundImage: `url(${card.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                zIndex: 1
                            }} />
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                                zIndex: 2,
                                padding: isMobile ? '15px' : '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                                <Box>
                                    <Typography variant='caption' sx={{ 
                                        color: '#ff6b35',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        fontSize: isMobile ? '10px' : '12px'
                                    }}>
                                        {card.badge}
                                    </Typography>
                                    <Typography variant='h6' sx={{ 
                                        fontWeight: 'bold',
                                        color: '#2c3e50',
                                        marginTop: '8px',
                                        fontSize: isMobile ? '14px' : '18px',
                                        lineHeight: '1.3'
                                    }}>
                                        {card.title}
                                    </Typography>
                                    <Typography variant='body2' sx={{ 
                                        color: '#7f8c8d',
                                        marginTop: '8px',
                                        fontSize: isMobile ? '12px' : '14px'
                                    }}>
                                        {card.description}
                                    </Typography>
                                </Box>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        borderColor: '#2c3e50',
                                        borderRadius: '24px',
                                        color: '#2c3e50',
                                        backgroundColor: 'white',
                                        '&:hover': {
                                            backgroundColor: '#2c3e50',
                                            color: 'white',
                                            borderColor: '#2c3e50'
                                        },
                                        alignSelf: 'flex-start',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        fontSize: isMobile ? '12px' : '14px',
                                        padding: isMobile ? '6px 12px' : '8px 16px'
                                    }}
                                    endIcon={<ShoppingCart sx={{ fontSize: isMobile ? 16 : 20 }} />}
                                >
                                    Shop Now
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default HeroSection