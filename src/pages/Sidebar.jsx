import React, { useState } from "react";
import { List, ListItemButton, ListItemText, Collapse, ListItemIcon, Divider } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GridViewIcon from '@mui/icons-material/GridView';

const Sidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categoriesList = [
    {
      name: "Beauty Products",
      children: ["Face Wash", "Creams", "Makeup"],
    },
    {
      name: "Health & Wellness",
      children: ["Supplements", "Fitness", "Diet"],
    },
    {
      name: "New Born",
      children: ["Diapers", "Wipes", "Baby Oil"],
    },
    {
      name: "Medicines",
      children: ["Pain Relief", "Cough", "Allergy"],
    },
    {
      name: "Injections",
      children: [],
    },
    {
      name: "Drips",
      children: [],
    },
    {
      name: "Men's Products",
      children: ["Shaving", "Hair", "Skin"],
    },
    {
      name: "Customer Services",
      children: [],
    },
    {
      name: "Baby & Pregnancy",
      children: ["Prenatal", "Baby Food", "Toys"],
    },
  ];

  
  return (
    <List disablePadding>
      <ListItemButton sx={{padding:'7px 16px'}}>
        <ListItemIcon>
          <GridViewIcon />
        </ListItemIcon>
        <ListItemText primary="All Categories" />
      </ListItemButton>
      <Divider />
      {categoriesList.map((category, i) => (
        <React.Fragment key={i}>
          <ListItemButton
            onClick={() => handleClick(i)}
            sx={{ padding: "5px 16px" }}
          >
            <ListItemIcon />
            <ListItemText primary={category.name} />
            {openIndex === i ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Divider />

          <Collapse in={openIndex === i} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {category.children?.map((child, j) => (
                <ListItemButton key={j} sx={{ padding: "5px 16px 5px 30px" }}>
                  <ListItemIcon />
                  <ListItemText primary={child} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default Sidebar;
