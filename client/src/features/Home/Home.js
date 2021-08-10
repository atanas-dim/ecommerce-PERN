import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { useStyles } from "./Home.styles";
import ProductCard from "../../components/ProductCard/ProductCard";

export default function Home() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h4" component="h2">
        Our best sellers
      </Typography>
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
    </Container>
  );
}
