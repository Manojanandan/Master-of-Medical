import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Slider,
  Button,
  Divider,
  Skeleton,
  IconButton,
  Chip,
  Checkbox,
  FormControlLabel,
  Badge,
  Fade,
  Collapse
} from "@mui/material";
import { 
  Add, 
  Remove, 
  ArrowForward, 
  FilterList,
  Clear,
  ExpandMore,
  Category,
  LocalOffer,
  TuneRounded
} from "@mui/icons-material";

const colors = {
  primary: '#de3b6f',
  secondary: '#f49507',
  accent: '#873589',
  background: '#fff',
  border: '#f1ac1b',
  text: '#22223b',
  lightText: '#6c757d',
  lightBg: '#f8f9fa',
};

const FilterSidebar = ({
  priceRange,
  setPriceRange,
  handlePriceRangeCommit,
  localFilters,
  handleFilterChange,
  categories,
  loadingCategories,
  expandedCategories,
  handleCategoryToggle,
  handleSubcategorySelect,
  handleClearFilters
}) => {
  const [selectedMainCategories, setSelectedMainCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleMainCategorySelect = (categoryName, categoryId) => {
    setSelectedMainCategories(prev => {
      const isSelected = prev.some(cat => cat.id === categoryId);
      if (isSelected) {
        return prev.filter(cat => cat.id !== categoryId);
      } else {
        return [...prev, { name: categoryName, id: categoryId }];
      }
    });
    
    if (handleFilterChange) {
      handleFilterChange('mainCategories', selectedMainCategories);
    }
  };

  const removeMainCategory = (categoryId) => {
    setSelectedMainCategories(prev => prev.filter(cat => cat.id !== categoryId));
  };

  const clearAllFilters = () => {
    setSelectedMainCategories([]);
    if (handleClearFilters) {
      handleClearFilters();
    }
  };

  const hasActiveFilters = selectedMainCategories.length > 0 || priceRange[0] > 10 || priceRange[1] < 10000;

  return (
    <Box sx={{ 
      width: '100%', 
      bgcolor: colors.background,
      borderRadius: 3,
      border: `1px solid ${colors.border}20`,
      height: 'fit-content',
      boxShadow: '0 8px 32px rgba(34, 34, 59, 0.08)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.accent} 50%, ${colors.secondary} 100%)`,
        borderRadius: '3px 3px 0 0'
      }
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 3,
        pt: 4,
        borderBottom: `1px solid ${colors.border}15`
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{
            p: 1.5,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.accent}10 100%)`,
            border: `1px solid ${colors.primary}20`
          }}>
            <TuneRounded sx={{ color: colors.primary, fontSize: '1.4rem' }} />
          </Box>
          <Typography variant="h5" sx={{ 
            fontWeight: 800, 
            fontSize: '1.4rem',
            color: colors.text,
            letterSpacing: '-0.02em'
          }}>
            Filters
          </Typography>
        </Box>
        {hasActiveFilters && (
          <Button
            onClick={clearAllFilters}
            startIcon={<Clear />}
            size="small"
            sx={{
              color: colors.primary,
              fontSize: '0.75rem',
              fontWeight: 600,
              px: 2,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                bgcolor: `${colors.primary}10`,
                transform: 'scale(1.02)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            Clear All
          </Button>
        )}
      </Box>

      <Box sx={{ p: 3 }}>
        {/* Price Filter */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2, 
            mb: 3,
            p: 2.5,
            bgcolor: `${colors.secondary}08`,
            borderRadius: 2,
            border: `1px solid ${colors.secondary}20`
          }}>
            <LocalOffer sx={{ color: colors.secondary, fontSize: '1.1rem' }} />
            <Typography variant="h6" sx={{ 
              fontWeight: 700, 
              fontSize: '1rem',
              color: colors.text,
              letterSpacing: '-0.01em'
            }}>
              Price Range
            </Typography>
          </Box>

          {/* Min Max Price Inputs */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                size="small"
                label="Min price"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                sx={{ 
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: colors.background,
                    fontWeight: 500,
                    '& fieldset': {
                      borderColor: `${colors.border}40`
                    },
                    '&:hover fieldset': {
                      borderColor: colors.primary
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: colors.primary,
                      borderWidth: '2px'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: colors.lightText,
                    '&.Mui-focused': {
                      color: colors.primary
                    }
                  }
                }}
              />
              <Box sx={{ 
                width: 16, 
                height: 2, 
                bgcolor: colors.border, 
                borderRadius: 1 
              }} />
              <TextField
                size="small"
                label="Max price"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                sx={{ 
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: colors.background,
                    fontWeight: 500,
                    '& fieldset': {
                      borderColor: `${colors.border}40`
                    },
                    '&:hover fieldset': {
                      borderColor: colors.primary
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: colors.primary,
                      borderWidth: '2px'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: colors.lightText,
                    '&.Mui-focused': {
                      color: colors.primary
                    }
                  }
                }}
              />
            </Box>
          </Box>

          {/* Price Range Slider */}
          <Box sx={{ px: 1, mb: 3 }}>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              onChangeCommitted={handlePriceRangeCommit}
              valueLabelDisplay="auto"
              min={10}
              max={10000}
              step={100}
              sx={{ 
                '& .MuiSlider-track': {
                  background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                  height: 6,
                  borderRadius: 3,
                  border: 'none'
                },
                '& .MuiSlider-thumb': {
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                  width: 20,
                  height: 20,
                  border: `2px solid ${colors.background}`,
                  '&:hover': {
                    boxShadow: `0 0 0 8px ${colors.primary}20`
                  },
                  '&::before': {
                    boxShadow: `0 2px 12px ${colors.primary}40`
                  }
                },
                '& .MuiSlider-rail': {
                  bgcolor: `${colors.border}30`,
                  height: 6,
                  borderRadius: 3
                },
                '& .MuiSlider-valueLabel': {
                  bgcolor: colors.text,
                  color: colors.background,
                  fontWeight: 600,
                  '&::before': {
                    borderTopColor: colors.text
                  }
                }
              }}
            />
          </Box>

          {/* Price Display */}
          <Box sx={{ 
            p: 2.5,
            bgcolor: `${colors.primary}08`,
            borderRadius: 2,
            border: `1px solid ${colors.primary}20`,
            mb: 3
          }}>
            <Typography variant="body1" sx={{ 
              fontWeight: 700,
              color: colors.primary,
              fontSize: '1rem',
              textAlign: 'center',
              letterSpacing: '-0.01em'
            }}>
              ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ 
          my: 3, 
          borderColor: `${colors.border}25`,
          borderWidth: 1
        }} />

        {/* Selected Categories Display */}
        {selectedMainCategories.length > 0 && (
          <Fade in={selectedMainCategories.length > 0}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle2" sx={{ 
                mb: 2, 
                fontWeight: 600,
                color: colors.accent,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Selected Categories ({selectedMainCategories.length})
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {selectedMainCategories.map((category) => (
                  <Chip
                    key={category.id}
                    label={category.name}
                    onDelete={() => removeMainCategory(category.id)}
                    sx={{
                      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                      color: colors.background,
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      py: 1,
                      '& .MuiChip-deleteIcon': {
                        color: `${colors.background}80`,
                        '&:hover': {
                          color: colors.background
                        }
                      },
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: `0 4px 16px ${colors.primary}30`
                      },
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Fade>
        )}

        {/* Categories */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2, 
            mb: 3,
            p: 2.5,
            bgcolor: `${colors.accent}08`,
            borderRadius: 2,
            border: `1px solid ${colors.accent}20`
          }}>
            <Category sx={{ color: colors.accent, fontSize: '1.1rem' }} />
            <Typography variant="h6" sx={{ 
              fontWeight: 700, 
              fontSize: '1rem',
              color: colors.text,
              letterSpacing: '-0.01em',
              flex: 1
            }}>
              Product Categories
            </Typography>
            <Badge 
              badgeContent={selectedMainCategories.length} 
              sx={{
                '& .MuiBadge-badge': {
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                  color: colors.background,
                  fontWeight: 700,
                  fontSize: '0.7rem'
                }
              }}
            />
          </Box>

          {loadingCategories ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton 
                  key={index} 
                  variant="rectangular" 
                  height={56} 
                  sx={{ 
                    borderRadius: 2,
                    bgcolor: `${colors.lightBg}`
                  }} 
                />
              ))}
            </Box>
          ) : (
            categories.map((category) => {
              const isMainSelected = selectedMainCategories.some(cat => cat.id === category.id);
              const isSubSelected = localFilters.category === category.name;
              
              return (
                <Box 
                  key={category.id} 
                  sx={{ 
                    mb: 2,
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: isMainSelected ? colors.primary : `${colors.border}30`,
                    bgcolor: isMainSelected ? `${colors.primary}05` : colors.background,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderColor: colors.primary,
                      boxShadow: `0 4px 20px ${colors.primary}15`,
                      transform: 'translateY(-1px)'
                    }
                  }}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  {/* Main Category */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2.5,
                      cursor: 'pointer',
                      bgcolor: isMainSelected ? `${colors.primary}08` : 'transparent',
                      '&:hover': { 
                        bgcolor: isMainSelected ? `${colors.primary}12` : `${colors.primary}06`
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                      <Checkbox
                        checked={isMainSelected}
                        onChange={() => handleMainCategorySelect(category.name, category.id)}
                        sx={{
                          color: colors.border,
                          '&.Mui-checked': {
                            color: colors.primary
                          },
                          '& .MuiSvgIcon-root': {
                            fontSize: '1.3rem'
                          }
                        }}
                      />
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: isMainSelected || isSubSelected ? 700 : 500,
                          color: isMainSelected || isSubSelected ? colors.primary : colors.text,
                          fontSize: '0.95rem',
                          transition: 'all 0.2s ease',
                          letterSpacing: '-0.01em'
                        }}
                        onClick={() => handleMainCategorySelect(category.name, category.id)}
                      >
                        {category.name}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      {category.SubCategories && category.SubCategories.length > 0 && (
                        <Chip
                          label={category.SubCategories.length}
                          size="small"
                          sx={{
                            height: 22,
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            bgcolor: isMainSelected ? colors.primary : `${colors.secondary}20`,
                            color: isMainSelected ? colors.background : colors.secondary,
                            border: `1px solid ${isMainSelected ? colors.primary : colors.secondary}40`
                          }}
                        />
                      )}
                      {category.SubCategories && category.SubCategories.length > 0 && (
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategoryToggle(category.id);
                          }}
                          sx={{ 
                            transform: expandedCategories[category.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            color: isMainSelected ? colors.primary : colors.lightText,
                            '&:hover': {
                              bgcolor: `${colors.primary}15`,
                              transform: expandedCategories[category.id] ? 'rotate(180deg) scale(1.1)' : 'rotate(0deg) scale(1.1)'
                            }
                          }}
                        >
                          <ExpandMore />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                  
                  {/* Subcategories */}
                  <Collapse in={expandedCategories[category.id]} timeout={300}>
                    {category.SubCategories && category.SubCategories.length > 0 && (
                      <Box sx={{ 
                        bgcolor: colors.lightBg,
                        borderTop: `1px solid ${colors.border}20`
                      }}>
                        {category.SubCategories.map((subcategory, index) => (
                          <Box
                            key={subcategory.id}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              p: 2,
                              pl: 4.5,
                              cursor: 'pointer',
                              bgcolor: localFilters.subcategory === subcategory.name ? `${colors.accent}10` : 'transparent',
                              borderBottom: index < category.SubCategories.length - 1 ? `1px solid ${colors.border}15` : 'none',
                              '&:hover': { 
                                bgcolor: `${colors.accent}08`,
                                transform: 'translateX(4px)'
                              },
                              transition: 'all 0.2s ease'
                            }}
                            onClick={() => handleSubcategorySelect(category.name, subcategory.name, subcategory.id)}
                          >
                            <Box sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              bgcolor: localFilters.subcategory === subcategory.name ? colors.accent : colors.border,
                              mr: 2,
                              transition: 'all 0.2s ease'
                            }} />
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                fontSize: '0.85rem',
                                color: localFilters.subcategory === subcategory.name ? colors.accent : colors.lightText,
                                fontWeight: localFilters.subcategory === subcategory.name ? 600 : 400,
                                transition: 'all 0.2s ease',
                                letterSpacing: '-0.01em'
                              }}
                            >
                              {subcategory.name}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Collapse>
                </Box>
              );
            })
          )}
        </Box>
      </Box>

      {/* Filter Button at Bottom */}
      <Box sx={{ 
        p: 3, 
        pt: 0,
        borderTop: `1px solid ${colors.border}15`,
        mt: 2
      }}>
        <Button
          variant="contained"
          onClick={handlePriceRangeCommit}
          fullWidth
          startIcon={<FilterList />}
          sx={{ 
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
            color: colors.background,
            py: 2,
            px: 4,
            fontWeight: 700,
            fontSize: '1rem',
            borderRadius: 2,
            textTransform: 'none',
            letterSpacing: '-0.01em',
            boxShadow: `0 4px 16px ${colors.primary}30`,
            '&:hover': { 
              background: `linear-gradient(135deg, ${colors.primary}dd 0%, ${colors.accent}dd 100%)`,
              transform: 'translateY(-2px)',
              boxShadow: `0 8px 25px ${colors.primary}40`
            },
            '&:active': {
              transform: 'translateY(0px)'
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          Apply All Filters
          {hasActiveFilters && (
            <Chip
              label={selectedMainCategories.length + (priceRange[0] > 10 || priceRange[1] < 10000 ? 1 : 0)}
              size="small"
              sx={{
                ml: 1,
                height: 20,
                bgcolor: `${colors.background}20`,
                color: colors.background,
                fontWeight: 700,
                fontSize: '0.7rem'
              }}
            />
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default FilterSidebar;