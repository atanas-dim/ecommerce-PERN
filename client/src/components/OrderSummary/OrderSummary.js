import React from "react";
import { Typography, Card, Box, Button } from "@material-ui/core";
import { useStyles } from "./OrderSummary.styles";
import clsx from "clsx";

export default function OrderSummary() {
  const classes = useStyles();

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
            £ 145
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
          £ 145
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
