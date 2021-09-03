import React from "react";
import { Container, Typography, Card, Box, Button } from "@material-ui/core";
import { useStyles } from "./Checkout.styles";
import { selectCartProducts } from "../../store/cartSlice";
import { useSelector } from "react-redux";
import { getTotal } from "../../utils/getTotal";

export default function Checkout() {
  const classes = useStyles();
  const cartProducts = useSelector(selectCartProducts);

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

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h5" component="h2">
        Checkout
      </Typography>
      <Card className={classes.card}>
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
            color="secondary"
            size="large"
            onClick={() => {}}
            className={classes.placeOrderButton}
          >
            Place order
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
