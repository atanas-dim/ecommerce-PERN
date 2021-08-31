import React, { useEffect, useState } from "react";
import { Container, Typography, Card, Box } from "@material-ui/core";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import CartItem from "../../components/CartItem/CartItem";
import { useStyles } from "./Cart.styles";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartProducts,
  selectTempCartProducts,
  loadCartProducts,
  loadTempCartProducts,
} from "../../store/cartSlice";
import { selectUser, selectIsLoggedIn } from "../../store/userSlice";

export default function ShoppingBag() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cartId = user?.user.cart_id;
  const cartProducts = useSelector(selectCartProducts);
  const tempCartProducts = useSelector(selectTempCartProducts);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("dispatch cart products");
      dispatch(loadCartProducts(cartId));
    } else {
      console.log("dispatch temp cart products");
      dispatch(loadTempCartProducts());
    }
  }, [dispatch, user, cartId]);

  // useEffect(() => {
  //   console.log(cartProducts);
  //   console.log(tempCartProducts);
  // }, [cartProducts, tempCartProducts]);

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
          {isLoggedIn
            ? cartProducts?.map((product) => {
                return <CartItem product={product} />;
              })
            : tempCartProducts?.map((product, tempCartProductIndex) => {
                return (
                  <CartItem
                    product={product}
                    tempCartProductIndex={tempCartProductIndex}
                  />
                );
              })}
        </Box>

        <OrderSummary />
      </Box>
    </Container>
  );
}
