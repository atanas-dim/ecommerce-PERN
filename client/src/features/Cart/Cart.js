import React, { useEffect, useState } from "react";
import { Container, Typography, Card, Box } from "@material-ui/core";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import CartItem from "../../components/CartItem/CartItem";
import { useStyles } from "./Cart.styles";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { selectCartProducts, loadCartProducts } from "../../store/cartSlice";
import { selectUser } from "../../store/userSlice";

export default function ShoppingBag() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cartId = user?.user.cart_id;
  const cartProducts = useSelector(selectCartProducts);

  useEffect(() => {
    // console.log(user);
    if (user) dispatch(loadCartProducts(cartId));
  }, [dispatch, user, cartId]);

  useEffect(() => {
    console.log(cartProducts);
  }, [cartProducts]);

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
          {cartProducts.map((product) => {
            return <CartItem product={product} />;
          })}
        </Box>

        <OrderSummary />
      </Box>
    </Container>
  );
}
