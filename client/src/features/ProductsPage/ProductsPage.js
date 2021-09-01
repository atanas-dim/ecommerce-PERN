import React, { useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { useStyles } from "./ProductsPage.styles";
import ProductList from "../../components/ProductList/ProductList";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  loadBestSellers,
  loadProductsCategory,
} from "../../store/productsSlice";

export default function ProductsPage({ title, category }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    if (category === "best-sellers") dispatch(loadBestSellers());
    else dispatch(loadProductsCategory(category));
  }, [category, dispatch]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      <ProductList products={products} />
    </Container>
  );
}
