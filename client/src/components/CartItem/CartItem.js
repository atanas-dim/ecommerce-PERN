import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Box,
  ButtonBase,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@material-ui/core";
import { useStyles } from "./CartItem.styles";
import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";
import { capitalise } from "../../utils/capitaliseFirstLetter";
import { updateCartProduct, deleteCartProduct } from "../../store/cartSlice";
import { useDispatch } from "react-redux";

export default function CartItem({ product }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const imageBaseUrl =
    "https://res.cloudinary.com/atanasdim/image/upload/c_thumb,w_300,g_face/v1628768881/beachshop/";

  useEffect(() => {
    if (quantity !== product.quantity) {
      dispatch(
        updateCartProduct({
          ...product,
          id: product.product_id,
          size: product.size,
          quantity: quantity,
        })
      );
    }
  }, [dispatch, product, quantity]);

  const handleRemove = () => {
    dispatch(deleteCartProduct(product));
  };

  const generateMaxQuantity = () => {
    if (quantity <= 10) {
      return 10;
    } else {
      return quantity;
    }
  };

  return (
    <Card className={clsx(classes.root)}>
      <ButtonBase
        className={classes.imageLink}
        component={RouterLink}
        to={`/products/${product.product_id}`}
      >
        <img
          className={classes.image}
          src={`${imageBaseUrl + product.images[0]}`}
          alt={product.product_name}
        ></img>
      </ButtonBase>
      <Box className={classes.productDetails}>
        <Box
          display="flex"
          flexDirection="column"
          className={classes.headingsContainer}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            className={classes.headingsMain}
          >
            <Typography component="h3" variant="body1">
              {product.product_name}, {product.size}
            </Typography>

            <Typography component="span" variant="h6" className={classes.price}>
              £ {product.price}
            </Typography>
          </Box>
          <Typography
            component="span"
            variant="body2"
            className={classes.categories}
          >
            {product.categories &&
              product.categories
                .map((category) => capitalise(category))
                .join(", ")}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          className={classes.actionsContainer}
        >
          <Box className={classes.selectionsContainer}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                id={`product-${product.product_id}-size-${product.size}-quantity-label`}
                shrink
                color="secondary"
              >
                Quantity
              </InputLabel>
              <Select
                input={
                  <OutlinedInput notched label="Quantity" color="secondary" />
                }
                labelId={`product-${product.product_id}-size-${product.size}-quantity-label`}
                id={`product-${product.product_id}-size-${product.size}-quantity-select`}
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                className={classes.select}
              >
                {Array.from(
                  { length: generateMaxQuantity() },
                  (_, i) => i + 1
                ).map((number) => {
                  return (
                    <MenuItem value={number} key={`quantity-${number}`}>
                      {number}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <ButtonBase
            className={classes.removeButton}
            disableRipple
            onClick={() => handleRemove()}
          >
            Remove
          </ButtonBase>
        </Box>
      </Box>
    </Card>
  );
}
