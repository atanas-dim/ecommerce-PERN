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
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("dispatch cart products");
      dispatch(loadCartProducts(cartId));
    } else {
      console.log("dispatch temp cart products");
      dispatch(loadTempCartProducts());
    }
  }, [dispatch, isLoggedIn, cartId]);

  useEffect(() => {
    isLoggedIn ? setProducts(cartProducts) : setProducts(tempCartProducts);
  }, [cartProducts, tempCartProducts]);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h5" component="h2">
        Shopping bag
      </Typography>
      <Box display="flex" className={classes.cardsContainer}>
        {products.length ? (
          <>
            <Box
              display="flex"
              flexDirection="column"
              className={classes.bagItemsContainer}
            >
              {products?.map((product, tempCartProductIndex) => {
                return (
                  <CartItem
                    product={product}
                    tempCartProductIndex={
                      !isLoggedIn ? tempCartProductIndex : undefined
                    }
                  />
                );
              })}
            </Box>
            <OrderSummary />
          </>
        ) : (
          <Card className={classes.emptyCart}>
            <Typography component="h3" variant="body1">
              No items added to this bag
            </Typography>
          </Card>
        )}
      </Box>
    </Container>
  );
}
