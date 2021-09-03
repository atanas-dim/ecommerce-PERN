import React, { useEffect, useState } from "react";
import { Container, Typography, Card, Box } from "@material-ui/core";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import CartItem from "../../components/CartItem/CartItem";
import { useStyles } from "./Cart.styles";
import { useSelector, useDispatch } from "react-redux";
import { loadCartProducts, selectCartProducts } from "../../store/cartSlice";
import { selectIsLoggedIn } from "../../store/userSlice";

export default function Cart() {
  const classes = useStyles();
  const cartProducts = useSelector(selectCartProducts);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) dispatch(loadCartProducts());
  }, [isLoggedIn, dispatch]);

  useEffect(() => {
    // Setting products with useState so that the cart rerenders on each delete/update of cart product
    setProducts(cartProducts);
  }, [cartProducts]);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h5" component="h2">
        Shopping bag
      </Typography>
      <Box display="flex" className={classes.cardsContainer}>
        {products?.length ? (
          <>
            <Box
              display="flex"
              flexDirection="column"
              className={classes.bagItemsContainer}
            >
              {products.map((product) => {
                return (
                  <CartItem
                    product={product}
                    key={`cart-item-${product.product_id}`}
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
