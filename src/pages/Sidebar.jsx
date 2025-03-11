import React from "react";
import { List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const categories = [
  "Beauty Products",
  "Health & Wellness",
  "New Born",
  "Medicines",
  "Injections",
  "Drips",
  "Men's Products",
  "Customer Services",
  "Baby & Pregnancy",
];

const Sidebar = () => {
  const [open, setOpen] = React.useState(null);

  const handleClick = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <List>
      {categories.map((category, index) => (
        <React.Fragment key={index}>
          <ListItemButton onClick={() => handleClick(index)}>
            <ListItemText primary={category} />
            {open === index ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open === index} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Subcategory" />
              </ListItemButton>
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default Sidebar;
