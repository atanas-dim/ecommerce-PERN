import React from "react";
import { Grid, Typography } from "@material-ui/core";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductList({ products }) {
  if (!products)
    return (
      <Typography variant="body1" component="h2">
        No products available
      </Typography>
    );

  return (
    <Grid container spacing={3}>
      {products.map((product) => {
        return (
          <Grid item xs={12} sm={6} md={3} key={product.name}>
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              images={product.images}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
