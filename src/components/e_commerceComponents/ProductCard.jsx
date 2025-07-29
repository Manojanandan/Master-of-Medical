import React from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  IconButton, 
  Chip, 
  useTheme, 
  useMediaQuery,
  Rating,
  Tooltip
} from '@mui/material';
import { 
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as CartIcon,
  Visibility as ViewIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCartItemQuantity, removeFromCart } from '../../redux/CartReducer';

const ProductCard = ({
  offer,
  image,
  badge,
  title,
  rating,
  price,
  originalPrice,
  id,
  onClick,
  averageRating,
  reviewCount,
  description,
  isFavorited = false
}) => {
  const theme = useTheme();
  
  // Enhanced responsive breakpoints
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // < 600px
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600px - 960px
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg')); // 960px - 1280px
  const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl')); // 1280px - 1920px
  const isXl = useMediaQuery(theme.breakpoints.up('xl')); // > 1920px
  
  // Mobile-first responsive values
  const isMobile = isXs;
  const isTablet = isSm || isMd;
  const isDesktop = isLg || isXl;
  
  const dispatch = useDispatch();
  const { loading, items } = useSelector((state) => state.cartReducer);
  const [favorite, setFavorite] = React.useState(isFavorited);
  const [imageHover, setImageHover] = React.useState(false);

  // Enhanced color theme with better contrast
  const colors = {
    primary: '#de3b6f',
    secondary: '#f49507',
    accent: '#873589',
    text: '#2C3E50',
    lightText: '#7F8C8D',
    background: '#ffffff',
    lightBg: '#F8F9FA',
    border: '#e0e0e0',
    green: '#28a745',
    shadow: 'rgba(222, 59, 111, 0.15)',
    hoverShadow: 'rgba(222, 59, 111, 0.25)'
  };

  // Responsive dimensions
  const dimensions = {
    borderRadius: isMobile ? '12px' : isTablet ? '14px' : '16px',
    cardPadding: isMobile ? '10px' : isTablet ? '14px' : '16px',
    imageHeight: isMobile ? '140px' : isTablet ? '160px' : isDesktop ? '200px' : '180px',
    imagePadding: isMobile ? '12px' : isTablet ? '16px' : '20px',
    badgeTop: isMobile ? '8px' : '10px',
    badgeLeft: isMobile ? '8px' : '10px',
    favoriteTop: isMobile ? '8px' : '10px',
    favoriteRight: isMobile ? '8px' : '10px',
  };

  // Responsive typography
  const typography = {
    discountBadge: {
      fontSize: isMobile ? '8px' : isTablet ? '9px' : '11px',
      padding: isMobile ? '2px 6px' : isTablet ? '4px 8px' : '5px 9px',
    },
    title: {
      fontSize: isMobile ? '12px' : isTablet ? '14px' : isDesktop ? '16px' : '15px',
      lineHeight: isMobile ? '1.2' : '1.3',
      height: isMobile ? '30px' : isTablet ? '36px' : '42px',
    },
    description: {
      fontSize: isMobile ? '9px' : isTablet ? '10px' : '11px',
      height: isMobile ? '24px' : isTablet ? '26px' : '28px',
    },
    price: {
      fontSize: isMobile ? '14px' : isTablet ? '16px' : isDesktop ? '20px' : '18px',
    },
    originalPrice: {
      fontSize: isMobile ? '11px' : isTablet ? '12px' : '13px',
    },
    rating: {
      fontSize: isMobile ? '8px' : isTablet ? '9px' : '10px',
    },
    button: {
      fontSize: isMobile ? '11px' : isTablet ? '12px' : '13px',
      padding: isMobile ? '6px 12px' : isTablet ? '8px 14px' : '10px 16px',
    }
  };

  // Check if this product is already in the cart
  const cartItem = items.find(item => item.productId === id);
  const isInCart = !!cartItem;
  const currentQuantity = cartItem?.quantity || 0;

  // Calculate offer percentage if originalPrice is provided
  const calculateOfferPercentage = () => {
    if (!originalPrice || !price) return offer || '0%';
    
    const original = parseFloat(originalPrice);
    const current = parseFloat(price);
    
    if (original <= current) return offer || '0%';
    
    const discount = ((original - current) / original) * 100;
    return `${Math.round(discount)}%`;
  };

  const offerPercentage = calculateOfferPercentage();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    if (!id) {
      console.error('Product ID is required to add to cart');
      return;
    }

    dispatch(addToCart({ productId: id, quantity: 1 }));
  };

  const handleIncreaseQuantity = (e) => {
    e.stopPropagation();
    if (cartItem) {
      const newQuantity = currentQuantity + 1;
      dispatch(updateCartItemQuantity({ cartItemId: cartItem._id, quantity: newQuantity }));
    }
  };

  const handleDecreaseQuantity = (e) => {
    e.stopPropagation();
    if (cartItem) {
      const newQuantity = currentQuantity - 1;
      if (newQuantity <= 0) {
        dispatch(removeFromCart(cartItem._id));
      } else {
        dispatch(updateCartItemQuantity({ cartItemId: cartItem._id, quantity: newQuantity }));
      }
    }
  };

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    setFavorite(!favorite);
  };

  // Determine badge color based on badge type
  const getBadgeColor = (badgeText) => {
    const text = badgeText?.toLowerCase();
    if (text?.includes('organic')) return colors.secondary;
    if (text?.includes('cold sale')) return colors.accent;
    if (text?.includes('best seller')) return colors.primary;
    if (text?.includes('new arrival')) return colors.secondary;
    return colors.accent;
  };

  // Truncate description with responsive length
  const truncateDescription = (desc, maxLength) => {
    const length = maxLength || (isMobile ? 50 : isTablet ? 60 : 70);
    if (!desc) return 'Premium quality product with excellent features.';
    return desc.length > length ? `${desc.substring(0, length)}...` : desc;
  };

  return (
    <Box 
      sx={{
        width: '100%',
        height: 'auto',
        minHeight: isMobile ? '320px' : isTablet ? '380px' : '420px',
        border: `1px solid ${colors.border}`,
        borderRadius: dimensions.borderRadius,
        backgroundColor: colors.background,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: isMobile 
            ? `0 4px 15px ${colors.shadow}, 0 2px 8px rgba(0,0,0,0.06)`
            : `0 8px 25px ${colors.hoverShadow}, 0 4px 12px rgba(0,0,0,0.08)`,
          transform: isMobile ? 'translateY(-2px)' : 'translateY(-4px)',
          borderColor: colors.primary,
        },
        // Enhanced mobile touch targets
        '@media (hover: none)': {
          '&:active': {
            transform: 'scale(0.98)',
            transition: 'transform 0.1s ease',
          }
        }
      }}
      onClick={onClick}
    >
      {/* Discount Badge - Top Left */}
      {offerPercentage !== '0%' && (
        <Box 
          sx={{
            position: 'absolute',
            top: dimensions.badgeTop,
            left: dimensions.badgeLeft,
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
            color: '#ffffff',
            padding: typography.discountBadge.padding,
            borderRadius: isMobile ? '12px' : '18px',
            fontSize: typography.discountBadge.fontSize,
            fontWeight: '700',
            zIndex: 3,
            boxShadow: `0 2px 8px rgba(222, 59, 111, 0.3)`,
            minWidth: isMobile ? '40px' : '50px',
            textAlign: 'center',
          }}
        >
          {offerPercentage} OFF
        </Box>
      )}

      {/* Favorite Button - Top Right */}
      <Box
        sx={{
          position: 'absolute',
          top: dimensions.favoriteTop,
          right: dimensions.favoriteRight,
          zIndex: 3,
        }}
      >
        <IconButton
          size="small"
          onClick={handleFavoriteToggle}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            width: isMobile ? '32px' : isTablet ? '36px' : '40px',
            height: isMobile ? '32px' : isTablet ? '36px' : '40px',
            minWidth: isMobile ? '32px' : isTablet ? '36px' : '40px',
            '&:hover': {
              backgroundColor: colors.primary,
              transform: 'scale(1.1)',
              '& .MuiSvgIcon-root': {
                color: '#ffffff'
              }
            },
            transition: 'all 0.3s ease',
            // Enhanced mobile touch target
            '@media (hover: none)': {
              '&:active': {
                transform: 'scale(0.95)',
                backgroundColor: colors.primary,
              }
            }
          }}
        >
          {favorite ? (
            <FavoriteIcon sx={{ 
              fontSize: isMobile ? 16 : isTablet ? 18 : 20, 
              color: colors.primary 
            }} />
          ) : (
            <FavoriteBorderIcon sx={{ 
              fontSize: isMobile ? 16 : isTablet ? 18 : 20, 
              color: colors.lightText 
            }} />
          )}
        </IconButton>
      </Box>

      {/* Product Image Container */}
      <Box 
        sx={{
          position: 'relative',
          height: dimensions.imageHeight,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: dimensions.imagePadding,
          overflow: 'hidden',
          flex: '0 0 auto',
        }}
        onMouseEnter={() => !isMobile && setImageHover(true)}
        onMouseLeave={() => !isMobile && setImageHover(false)}
      >
        <img 
          src={image} 
          alt={title}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transition: 'transform 0.4s ease',
            transform: (imageHover && !isMobile) ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        
        {/* Quick Action Buttons - Show on Hover (Desktop only) */}
        {!isMobile && (
          <Box
            sx={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              display: 'flex',
              gap: '6px',
              opacity: imageHover ? 1 : 0,
              transform: imageHover ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.3s ease',
            }}
          >
            <Tooltip title="Quick View">
              <IconButton
                size="small"
                sx={{
                  backgroundColor: `rgba(244, 149, 7, 0.95)`,
                  color: '#ffffff',
                  width: isTablet ? '30px' : '32px',
                  height: isTablet ? '30px' : '32px',
                  '&:hover': {
                    backgroundColor: colors.secondary,
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <ViewIcon sx={{ fontSize: isTablet ? 14 : 16 }} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>

      {/* Content Container - Flexible */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        flex: '1 1 auto',
        padding: dimensions.cardPadding,
        paddingTop: '8px'
      }}>
        {/* Badge below image */}
        {badge && (
          <Box sx={{ marginBottom: '8px' }}>
            <Chip
              label={badge}
              size="small"
              sx={{
                backgroundColor: getBadgeColor(badge),
                color: '#ffffff',
                fontSize: isMobile ? '7px' : isTablet ? '8px' : '10px',
                fontWeight: '600',
                height: isMobile ? '20px' : isTablet ? '22px' : '24px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                '& .MuiChip-label': {
                  padding: isMobile ? '0 6px' : isTablet ? '0 7px' : '0 8px',
                },
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              }}
            />
          </Box>
        )}

        {/* Product Title */}
        <Typography 
          variant="h6" 
          sx={{
            fontWeight: '600',
            fontSize: typography.title.fontSize,
            lineHeight: typography.title.lineHeight,
            height: typography.title.height,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            marginBottom: isMobile ? '6px' : '8px',
            color: colors.text,
            '&:hover': {
              color: colors.primary,
            },
            transition: 'color 0.3s ease',
          }}
        >
          {title}
        </Typography>

        {/* Product Description */}
        <Typography 
          variant="body2" 
          sx={{
            fontSize: typography.description.fontSize,
            color: colors.lightText,
            lineHeight: '1.3',
            marginBottom: isMobile ? '8px' : '10px',
            height: typography.description.height,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {truncateDescription(description)}
        </Typography>

        {/* Enhanced Rating with Stars */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: isMobile ? '4px' : '6px', 
          marginBottom: isMobile ? '8px' : '10px',
          flex: '0 0 auto'
        }}>
          <Rating
            value={parseFloat(averageRating || rating || 0)}
            precision={0.1}
            readOnly
            size={isMobile ? "small" : "medium"}
            icon={<StarIcon sx={{ 
              color: colors.secondary,
              fontSize: isMobile ? 14 : isTablet ? 16 : 18
            }} />}
            emptyIcon={<StarBorderIcon sx={{ 
              color: '#E0E0E0',
              fontSize: isMobile ? 14 : isTablet ? 16 : 18
            }} />}
            sx={{
              '& .MuiRating-iconFilled': {
                color: colors.secondary,
              },
              '& .MuiRating-iconEmpty': {
                color: '#E0E0E0',
              },
            }}
          />
          <Typography 
            variant="caption" 
            sx={{
              color: colors.lightText,
              fontSize: typography.rating.fontSize,
              fontWeight: '500',
            }}
          >
            ({reviewCount || 0})
          </Typography>
        </Box>

        {/* Enhanced Price Section */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: isMobile ? '6px' : '8px', 
          marginBottom: isMobile ? '12px' : '14px',
          flexWrap: 'wrap',
          flex: '0 0 auto'
        }}>
          <Typography 
            variant="h5" 
            sx={{
              color: colors.text,
              fontWeight: '700',
              fontSize: typography.price.fontSize,
            }}
          >
            ₹{price}
          </Typography>
          {originalPrice && parseFloat(originalPrice) > parseFloat(price) && (
            <>
              <Typography 
                variant="body2" 
                sx={{
                  color: colors.lightText,
                  fontSize: typography.originalPrice.fontSize,
                  fontWeight: '400',
                  textDecoration: 'line-through',
                }}
              >
                ₹{originalPrice}
              </Typography>
              <Chip
                label={`Save ₹${(parseFloat(originalPrice) - parseFloat(price)).toFixed(0)}`}
                size="small"
                sx={{
                  backgroundColor: `rgba(40, 167, 69, 0.1)`,
                  color: colors.green,
                  fontSize: isMobile ? '8px' : '9px',
                  fontWeight: '600',
                  height: isMobile ? '18px' : '20px',
                }}
              />
            </>
          )}
        </Box>
            
        {/* Enhanced Add to Cart Section - Flexible */}
        <Box sx={{ marginTop: 'auto' }}>
          {isInCart ? (
            // Quantity Controls
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: isMobile ? '8px' : '10px',
              width: '100%',
              backgroundColor: colors.lightBg,
              borderRadius: isMobile ? '8px' : '10px',
              padding: isMobile ? '4px' : '6px',
            }}>
              <IconButton 
                size="small" 
                onClick={handleDecreaseQuantity}
                disabled={loading}
                sx={{
                  backgroundColor: colors.background,
                  border: `2px solid ${colors.primary}`,
                  color: colors.primary,
                  width: isMobile ? '32px' : isTablet ? '34px' : '36px',
                  height: isMobile ? '32px' : isTablet ? '34px' : '36px',
                  minWidth: isMobile ? '32px' : isTablet ? '34px' : '36px',
                  '&:hover': {
                    backgroundColor: colors.primary,
                    color: '#ffffff',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                  // Enhanced mobile touch
                  '@media (hover: none)': {
                    '&:active': {
                      transform: 'scale(0.95)',
                      backgroundColor: colors.primary,
                      color: '#ffffff',
                    }
                  }
                }}
              >
                <RemoveIcon sx={{ fontSize: isMobile ? 14 : 16 }} />
              </IconButton>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flex: 1,
              }}>
                <Typography 
                  variant="h6" 
                  sx={{
                    fontWeight: '700',
                    color: colors.text,
                    fontSize: isMobile ? '14px' : isTablet ? '16px' : '18px',
                  }}
                >
                  {currentQuantity}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{
                    color: colors.lightText,
                    fontSize: isMobile ? '8px' : '9px',
                  }}
                >
                  in cart
                </Typography>
              </Box>
              
              <IconButton 
                size="small" 
                onClick={handleIncreaseQuantity}
                disabled={loading}
                sx={{
                  backgroundColor: colors.primary,
                  border: `2px solid ${colors.primary}`,
                  color: '#ffffff',
                  width: isMobile ? '32px' : isTablet ? '34px' : '36px',
                  height: isMobile ? '32px' : isTablet ? '34px' : '36px',
                  minWidth: isMobile ? '32px' : isTablet ? '34px' : '36px',
                  '&:hover': {
                    backgroundColor: colors.accent,
                    borderColor: colors.accent,
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                  // Enhanced mobile touch
                  '@media (hover: none)': {
                    '&:active': {
                      transform: 'scale(0.95)',
                      backgroundColor: colors.accent,
                      borderColor: colors.accent,
                    }
                  }
                }}
              >
                <AddIcon sx={{ fontSize: isMobile ? 14 : 16 }} />
              </IconButton>
            </Box>
          ) : (
            // Add to Cart Button
            <Button 
              variant="contained"
              startIcon={<CartIcon sx={{ 
                fontSize: isMobile ? 14 : isTablet ? 16 : 18 
              }} />} 
              disabled={loading}
              sx={{
                width: '100%',
                borderRadius: isMobile ? '8px' : '10px',
                fontWeight: '600',
                textTransform: 'none',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                color: '#ffffff',
                fontSize: typography.button.fontSize,
                padding: typography.button.padding,
                minHeight: isMobile ? '40px' : isTablet ? '44px' : '48px',
                boxShadow: `0 4px 12px rgba(222, 59, 111, 0.3)`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
                  boxShadow: `0 6px 16px rgba(222, 59, 111, 0.4)`,
                  transform: 'translateY(-2px)',
                },
                '&:disabled': {
                  backgroundColor: '#E0E0E0',
                  color: '#9E9E9E',
                },
                transition: 'all 0.3s ease',
                // Enhanced mobile touch
                '@media (hover: none)': {
                  '&:active': {
                    transform: 'scale(0.98)',
                    boxShadow: `0 2px 8px rgba(222, 59, 111, 0.3)`,
                  }
                }
              }} 
              onClick={handleAddToCart}
            >
              {loading ? 'Adding...' : 'Add to Cart'}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;