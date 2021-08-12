import React from "react";
import { Grid } from "@material-ui/core";
import { useStyles } from "./ProductList.styles";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductList() {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ProductCard />
      </Grid>
    </Grid>
  );
}
