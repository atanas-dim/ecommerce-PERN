import React, { useEffect, useState } from "react";
import { Container, Typography, Card, Paper } from "@material-ui/core";
import { useStyles } from "./ProductItemPage.styles";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductItem,
  loadProductById,
} from "../ProductsPage/productsSlice";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const productItem = useSelector(selectProductItem);

  useEffect(() => {
    dispatch(loadProductById(id));
  }, [dispatch]);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h4" component="h2">
        {productItem.name}
      </Typography>
      <Card className={classes.card}>
        <Carousel
          autoPlay={false}
          className={classes.carousel}
          indicatorContainerProps={{
            style: {
              position: "absolute",
              bottom: "-25px",
            },
          }}
        >
          {productItem.images &&
            productItem.images.map((image, index) => (
              <Paper className={classes.imageBase} elevation={0}>
                <img
                  src={`${image}`}
                  key={`${productItem.name + index}`}
                  alt={`${productItem.name + index}`}
                  className={classes.productImage}
                />
              </Paper>
            ))}
        </Carousel>{" "}
      </Card>
    </Container>
  );
}
