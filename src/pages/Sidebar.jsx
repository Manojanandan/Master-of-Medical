import React, { useState, useEffect } from "react";
import { List, ListItemButton, ListItemText, Collapse, ListItemIcon, Divider, Skeleton, Box } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GridViewIcon from '@mui/icons-material/GridView';
import { getAllCategoriesAndSubcategories } from "../utils/Service";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const navigate = useNavigate();

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSubcategoryClick = (subcategoryId) => {
    navigate(`/ecommerceDashboard/products?subCategory=${subcategoryId}`);
  };

  // Fetch categories and subcategories
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
    <List disablePadding>
      <ListItemButton sx={{padding:'7px 16px'}}>
        <ListItemIcon>
          <GridViewIcon />
        </ListItemIcon>
        <ListItemText primary="All Categories" />
      </ListItemButton>
      <Divider />
      
      {loadingCategories ? (
        // Loading skeletons
        Array.from({ length: 8 }).map((_, index) => (
          <React.Fragment key={index}>
            <Box sx={{ p: 2 }}>
              <Skeleton variant="text" width="80%" height={24} />
            </Box>
            <Divider />
          </React.Fragment>
        ))
      ) : (
        // Actual categories from API
        categories.map((category, i) => (
          <React.Fragment key={category.id || i}>
            <ListItemButton
              onClick={() => handleClick(i)}
              sx={{ padding: "5px 16px" }}
            >
              <ListItemIcon />
              <ListItemText primary={category.name} />
              {category.SubCategories && category.SubCategories.length > 0 && (
                openIndex === i ? <ExpandLess /> : <ExpandMore />
              )}
            </ListItemButton>
            <Divider />

            <Collapse in={openIndex === i} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {category.SubCategories?.map((subcategory, j) => (
                  <ListItemButton 
                    key={subcategory.id || j} 
                    sx={{ padding: "5px 16px 5px 30px" }}
                    onClick={() => handleSubcategoryClick(subcategory.id)}
                  >
                    <ListItemIcon />
                    <ListItemText primary={subcategory.name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
            <Divider />
          </React.Fragment>
        ))
      )}
    </List>
  );
};

export default Sidebar;
