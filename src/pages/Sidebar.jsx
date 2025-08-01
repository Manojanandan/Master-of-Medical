import React, { useState, useEffect } from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemIcon,
  Skeleton,
  Box,
  Typography,
  Fade,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GridViewIcon from '@mui/icons-material/GridView';
import CategoryIcon from '@mui/icons-material/Category';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getAllCategoriesAndSubcategories } from '../utils/Service';
import { useNavigate } from 'react-router-dom';

// Color theme
const colors = {
  primary: '#de3b6f',
  secondary: '#f49507',
  accent: '#873589',
  text: '#2C3E50',
  lightText: '#7F8C8D',
  background: '#ffffff',
  lightBg: '#f8f9fa',
  border: '#e0e0e0',
};

const Sidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSubcategoryClick = (subcategoryId) => {
    navigate(`/customer/products?subCategory=${subcategoryId}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await getAllCategoriesAndSubcategories();
        if (response.data.success) {
          setCategories(response.data.data);
        } else {
          console.error('Failed to fetch categories:', response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Box
      sx={{
        height: '100%',
        backgroundColor: colors.background,
        borderRadius: '12px',
        border: `1px solid ${colors.border}`,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
        },
      }}
    >
      <List disablePadding sx={{ pt: 0 }}>
        {/* Header */}
        <ListItemButton
          sx={{
            padding: '12px 16px',
            backgroundColor: colors.lightBg,
            borderBottom: `1px solid ${colors.border}`,
            '&:hover': {
              backgroundColor: `${colors.primary}10`,
              '& .MuiListItemIcon-root': {
                color: colors.primary,
                transform: 'scale(1.05)',
              },
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <ListItemIcon
            sx={{
              color: colors.accent,
              minWidth: '32px',
              transition: 'all 0.2s ease',
            }}
          >
            <GridViewIcon sx={{ fontSize: 22 }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: colors.text,
                  fontSize: '15px',
                  letterSpacing: '0.3px',
                }}
              >
                All Categories
              </Typography>
            }
          />
        </ListItemButton>

        <Box sx={{ maxHeight: 'calc(100% - 56px)', overflowY: 'auto', pb: 2 }}>
          {loadingCategories ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Fade in={true} key={index} timeout={300 + index * 100}>
                <Box sx={{ p: '8px 16px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Skeleton variant="circular" width={20} height={20} />
                    <Skeleton variant="text" width="60%" height={24} />
                  </Box>
                </Box>
              </Fade>
            ))
          ) : (
            categories.map((category, i) => (
              <Fade in={true} key={category.id || i} timeout={200 + i * 50}>
                <Box>
                  <ListItemButton
                    onClick={() => handleClick(i)}
                    onMouseEnter={() => setHoveredItem(i)}
                    onMouseLeave={() => setHoveredItem(null)}
                    sx={{
                      padding: '10px 16px',
                      margin: '4px 8px',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: `${colors.primary}08`,
                        transform: 'translateX(4px)',
                        boxShadow: `0 2px 8px ${colors.primary}10`,
                        '& .category-icon': {
                          color: colors.primary,
                          transform: 'scale(1.1)',
                        },
                        '& .category-name': {
                          color: colors.primary,
                          fontWeight: 500,
                        },
                        '& .expand-icon': {
                          color: colors.primary,
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: '32px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <CategoryIcon
                        className="category-icon"
                        sx={{
                          fontSize: 18,
                          color: colors.accent,
                          transition: 'all 0.2s ease',
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          className="category-name"
                          variant="subtitle2"
                          sx={{
                            fontWeight: 500,
                            color: colors.text,
                            fontSize: '13.5px',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {category.name}
                        </Typography>
                      }
                    />
                    {category.SubCategories && category.SubCategories.length > 0 && (
                      <Box
                        className="expand-icon"
                        sx={{
                          transition: 'all 0.2s ease',
                          transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      >
                        {openIndex === i ? (
                          <ExpandLess sx={{ color: colors.lightText, fontSize: 18 }} />
                        ) : (
                          <ExpandMore sx={{ color: colors.lightText, fontSize: 18 }} />
                        )}
                      </Box>
                    )}
                  </ListItemButton>

                  <Collapse
                    in={openIndex === i}
                    timeout={{
                      enter: 300,
                      exit: 200,
                    }}
                    unmountOnExit
                  >
                    <List component="div" disablePadding sx={{ mt: 0.5 }}>
                      {category.SubCategories?.map((subcategory, j) => (
                        <Fade in={true} key={subcategory.id || j} timeout={200 + j * 50}>
                          <ListItemButton
                            sx={{
                              padding: '8px 16px 8px 48px',
                              margin: '2px 12px',
                              borderRadius: '6px',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                backgroundColor: `${colors.secondary}08`,
                                transform: 'translateX(2px)',
                                '& .subcategory-arrow': {
                                  transform: 'translateX(2px)',
                                  color: colors.secondary,
                                },
                                '& .subcategory-name': {
                                  color: colors.secondary,
                                  fontWeight: 500,
                                },
                              },
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                left: '34px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '5px',
                                height: '5px',
                                borderRadius: '50%',
                                backgroundColor: colors.border,
                                transition: 'all 0.2s ease',
                              },
                              '&:hover::before': {
                                backgroundColor: colors.secondary,
                                transform: 'translateY(-50%) scale(1.2)',
                              },
                            }}
                            onClick={() => handleSubcategoryClick(subcategory.id)}
                          >
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <Typography
                                    className="subcategory-name"
                                    variant="body2"
                                    sx={{
                                      color: colors.lightText,
                                      fontSize: '12.5px',
                                      transition: 'all 0.2s ease',
                                    }}
                                  >
                                    {subcategory.name}
                                  </Typography>
                                  <ArrowForwardIosIcon
                                    className="subcategory-arrow"
                                    sx={{
                                      fontSize: 11,
                                      color: colors.border,
                                      transition: 'all 0.2s ease',
                                    }}
                                  />
                                </Box>
                              }
                            />
                          </ListItemButton>
                        </Fade>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              </Fade>
            ))
          )}
        </Box>
      </List>
    </Box>
  );
};

export default Sidebar;