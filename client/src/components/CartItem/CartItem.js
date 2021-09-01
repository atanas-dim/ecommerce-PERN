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
import {
  updateTempCartProduct,
  deleteTempCartProduct,
  deleteCartProduct,
  updateCartProduct,
  loadCartProducts,
} from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../store/userSlice";

export default function CartItem({ product, tempCartProductIndex }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [quantity, setQuantity] = useState(product.quantity);

  // useEffect(() => {
  //   console.log(product);
  // }, [product]);

  useEffect(() => {
    console.log(quantity);
    if (quantity !== product.quantity) {
      if (isLoggedIn) {
        dispatch(
          updateCartProduct({
            cart_id: product.cart_id,
            product_id: product.product_id,
            size: product.size,
            quantity: quantity,
          })
        );
      } else if (tempCartProductIndex >= 0) {
        dispatch(
          updateTempCartProduct({
            tempCartProductIndex,
            quantity: quantity,
          })
        );
      }
    }
  }, [quantity]);

  const handleRemove = () => {
    console.log("handle remove");

    if (isLoggedIn) {
      dispatch(
        deleteCartProduct({
          cart_id: product.cart_id,
          product_id: product.product_id,
          size: product.size,
        })
      );
    } else {
      dispatch(deleteTempCartProduct({ tempCartProductIndex }));
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
          src={`${product.images[0]}`}
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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
                  return <MenuItem value={number}>{number}</MenuItem>;
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
