import React from "react";
import { Container, Typography } from "@mui/material";

const Products = () => {
  return (
    <Container>
      <Typography variant="h4" mt={4}>
        Products Page
      </Typography>
      <Typography variant="body1">
        List of all available products will be displayed here.
      </Typography>
    </Container>
  );
};

export default Products;
