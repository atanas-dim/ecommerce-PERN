import React from "react";
import { Card, Typography, ButtonBase } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useStyles } from "./ProductCard.styles";
import clsx from "clsx";

export default function ProductCard({ product }) {
  const classes = useStyles();
  const { id, name, price, images } = product;
  const imageBaseUrl =
    "https://res.cloudinary.com/atanasdim/image/upload/c_thumb,w_400,g_face/v1628768881/beachshop/";

  return (
    <Card className={classes.root}>
      <ButtonBase
        className={classes.image}
        component={RouterLink}
        to={`/products/${id}`}
        data-testid="image-link"
      >
        {images && (
          <span
            data-testid="product-image"
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${imageBaseUrl + images[0]})`,
            }}
          ></span>
        )}
      </ButtonBase>
      <ButtonBase
        className={clsx(classes.buttonBase, classes.text)}
        component={RouterLink}
        to={`/products/${id}`}
        data-testid="text-link"
      >
        <Typography
          variant="body2"
          component="span"
          style={{ fontWeight: 500 }}
          data-testid="product-name"
        >
          {name}
        </Typography>
        <Typography
          variant="body1"
          component="span"
          style={{ fontWeight: 900 }}
          data-testid="product-price"
        >
          £ {price}
        </Typography>
      </ButtonBase>
    </Card>
  );
}
