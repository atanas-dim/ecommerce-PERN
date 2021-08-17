import React, { useEffect, useState } from "react";
import { Container, Typography, Card, Box } from "@material-ui/core";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import BagItem from "../../components/BagItem/BagItem";
import { useStyles } from "./ShoppingBag.styles";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductItem,
  loadProductById,
} from "../ProductsPage/productsSlice";

export default function ShoppingBag() {
  const classes = useStyles();
  const dispatch = useDispatch();

  /// temporary for dev
  const [id, setId] = useState(3);
  const productItem = useSelector(selectProductItem);

  useEffect(() => {
    dispatch(loadProductById(id));
  }, [dispatch, id]);

  // useEffect(() => {
  //   console.log(productItem);
  // }, [productItem]);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h5" component="h2">
        Shopping bag
      </Typography>
      <Box display="flex" className={classes.cardsContainer}>
        <Box
          display="flex"
          flexDirection="column"
          className={classes.bagItemsContainer}
        >
          {productItem && (
            <>
              <BagItem product={productItem} />
              <BagItem product={productItem} />
              <BagItem product={productItem} />
            </>
          )}
        </Box>

        <OrderSummary />
      </Box>
    </Container>
  );
}
