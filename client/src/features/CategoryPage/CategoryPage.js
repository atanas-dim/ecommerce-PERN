import React from "react";
import { Container, Typography } from "@material-ui/core";
import { useStyles } from "./CategoryPage.styles";
import ProductList from "../../components/ProductList/ProductList";

export default function CategoryPage({ title }) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      <ProductList />
    </Container>
  );
}
