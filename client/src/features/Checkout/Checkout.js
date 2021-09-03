import React, { useEffect } from "react";
import { Container, Typography, Card, Box, Button } from "@material-ui/core";
import { useStyles } from "./Checkout.styles";
import {
  selectCartProducts,
  checkoutCart,
  selectIsLoading,
  clearNewOrderInfo,
  selectNewOrderInfo,
} from "../../store/cartSlice";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTotal } from "../../utils/getTotal";

export default function Checkout() {
  const classes = useStyles();
  const cartProducts = useSelector(selectCartProducts);
  const isLoading = useSelector(selectIsLoading);
  const newOrderInfo = useSelector(selectNewOrderInfo);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => dispatch(clearNewOrderInfo());
  }, [dispatch]);

  const placeOrder = () => {
    dispatch(checkoutCart());
  };

  const createOrderItems = (products) => {
    return products.map((product) => {
      return (
        <Box
          display="flex"
          justifyContent="space-between"
          className={classes.orderItem}
        >
          <Typography variant="body1" component="span">
            {product.quantity} x {product.product_name}, {product.size}
          </Typography>
          <Typography variant="body1" component="span">
            £ {product.quantity * product.price}
          </Typography>
        </Box>
      );
    });
  };

  const createOrderDetails = () => {
    return (
      <Box className={classes.orderDetailsContainer}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          className={classes.orderDetails}
        >
          <Typography variant="h5" component="h3">
            Your order:
          </Typography>
          <Box className={classes.orderItemsContainer}>
            {createOrderItems(cartProducts)}
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            className={classes.orderItem}
          >
            <Typography variant="h6" component="span">
              Estimated shipping:
            </Typography>
            <Typography variant="h6" component="span">
              Free
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            className={classes.orderItem}
          >
            <Typography variant="h6" component="span">
              Total:
            </Typography>
            <Typography variant="h6" component="span">
              £ {getTotal(cartProducts)}
            </Typography>
          </Box>
        </Box>
        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={isLoading || !cartProducts.length}
          color="secondary"
          size="large"
          onClick={() => placeOrder()}
          className={classes.mainActionButton}
        >
          {isLoading ? "Placing your order..." : "Place order"}
        </Button>
      </Box>
    );
  };

  const renderNewOrderInfo = (info) => {
    return (
      <>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          className={classes.orderDetails}
        >
          <Typography variant="h6" component="span">
            Successfully placed your order!
          </Typography>
          <Typography variant="body1" component="span">
            {info.status}
          </Typography>
          <Typography variant="body1" component="span">
            Order ID: {info.order_id}
          </Typography>
          <Typography variant="body1" component="span">
            Total: £ {info.total}
          </Typography>
        </Box>
        <Box>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            disabled={isLoading}
            color="secondary"
            size="large"
            onClick={() => history.push("/")}
            className={classes.mainActionButton}
          >
            Continue shopping
          </Button>
        </Box>
      </>
    );
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h5" component="h2">
        Checkout
      </Typography>
      <Card className={classes.card}>
        {newOrderInfo ? renderNewOrderInfo(newOrderInfo) : createOrderDetails()}
      </Card>
    </Container>
  );
}
