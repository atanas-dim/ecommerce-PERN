import React from "react";
import {
  Card,
  CardActions,
  Typography,
  Button,
  ButtonBase,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useStyles } from "./ProductCard.styles";
import clsx from "clsx";

export default function ProductCard({ id, name, price, images }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <ButtonBase
        className={classes.image}
        component={RouterLink}
        to={`/products/${id}`}
      >
        <span
          className={classes.imageSrc}
          style={{
            backgroundImage: `url(${images[0]})`,
          }}
        ></span>
      </ButtonBase>
      <ButtonBase
        className={clsx(classes.buttonBase, classes.text)}
        component={RouterLink}
        to={`/products/${id}`}
      >
        <Typography
          variant="body2"
          component="span"
          style={{ fontWeight: 500 }}
        >
          {name}
        </Typography>
        <Typography
          variant="body1"
          component="span"
          style={{ fontWeight: 900 }}
        >
          £ {price}
        </Typography>
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
