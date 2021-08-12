import React, { useEffect, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { useStyles } from "./CategoryPage.styles";
import ProductList from "../../components/ProductList/ProductList";

export default function CategoryPage({ title, category }) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch(
        `https://pernstore.herokuapp.com/api/products/category/${category}`
      )
        .then((response) => response.json())
        .then((data) => setProducts(data));
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      <ProductList products={products} />
    </Container>
  );
}
