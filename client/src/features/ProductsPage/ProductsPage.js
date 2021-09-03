import React, { useEffect } from "react";
import { Container, Typography, CircularProgress } from "@material-ui/core";
import { useStyles } from "./ProductsPage.styles";
import ProductList from "../../components/ProductList/ProductList";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  loadBestSellers,
  loadProductsCategory,
  selectIsLoading,
} from "../../store/productsSlice";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function ProductsPage({ title, category }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectIsLoading);
  // const isLoading = true;

  useEffect(() => {
    if (category === "best-sellers") dispatch(loadBestSellers());
    else dispatch(loadProductsCategory(category));
  }, [category, dispatch]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      {isLoading && <CircularProgress color="secondary" />}
      <ProductList products={products} />
    </Container>
  );
}
