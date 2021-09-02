import React, { useEffect, useState } from "react";
import { Typography, Card, Box, Button } from "@material-ui/core";
import { useStyles } from "./OrderSummary.styles";
import clsx from "clsx";
import { selectCartProducts } from "../../store/cartSlice";
import { useSelector } from "react-redux";

export default function OrderSummary() {
  const classes = useStyles();
  const cartProducts = useSelector(selectCartProducts);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = getTotal();
    setTotal(newTotal);
  }, [cartProducts]);

  const getTotal = () => {
    let sum = 0;
    cartProducts.forEach((product) => {
      sum += product.price * product.quantity;
    });
    return sum;
  };

  return (
    <Card className={clsx(classes.root)}>
      <Typography component="h2" variant="h5" className={classes.heading}>
        Order summary
      </Typography>
      <Box className={classes.subtotalContainer}>
        <Box
          display="flex"
          justifyContent="space-between"
          className={classes.subtotalEntry}
        >
          <Typography component="span" variant="body1">
            Subtotal:
          </Typography>
          <Typography component="span" variant="body1">
            £ {total}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          className={classes.subtotalEntry}
        >
          <Typography component="span" variant="body1">
            Estimated Shipping:
          </Typography>
          <Typography component="span" variant="body1">
            Free
          </Typography>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.totalContainer}
      >
        <Typography component="span" variant="h6">
          Total:
        </Typography>
        <Typography
          component="span"
          variant="h6"
          className={classes.totalValue}
        >
          £ {total}
        </Typography>
      </Box>
      <Button
        className={classes.checkoutButton}
        variant="contained"
        disableElevation
        color="secondary"
        size="large"
        onClick={() => {}}
      >
        Checkout
      </Button>
    </Card>
  );
}
