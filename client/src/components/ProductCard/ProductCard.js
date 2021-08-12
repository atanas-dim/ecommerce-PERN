import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  ButtonBase,
} from "@material-ui/core";
import { useStyles } from "./ProductCard.styles";
import clsx from "clsx";

export default function ProductCard({ id, name, price, images }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <ButtonBase
        component={CardMedia}
        className={clsx(classes.buttonBase, classes.productImg)}
        image={images[0]}
        title={name}
      ></ButtonBase>
      <ButtonBase className={classes.buttonBase}>
        <CardContent className={classes.content}>
          <Typography
            variant="body2"
            component="h2"
            style={{ fontWeight: 500 }}
          >
            #{id} {name}
          </Typography>
          <Typography
            variant="body1"
            component="h2"
            style={{ fontWeight: 900 }}
          >
            £ {price}
          </Typography>
        </CardContent>
      </ButtonBase>

      <CardActions className={classes.actions}>
        <Button
          variant="contained"
          disableElevation
          color="secondary"
          size="small"
          style={{ width: "100%" }}
        >
          Add to bag
        </Button>
      </CardActions>
    </Card>
  );
}
