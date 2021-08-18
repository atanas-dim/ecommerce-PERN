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

export default function BagItem({ product }) {
  const classes = useStyles();
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // useEffect(() => {
  //   console.log(product);
  // }, []);

  return (
    <Card className={clsx(classes.root)}>
      <ButtonBase
        className={classes.imageLink}
        component={RouterLink}
        to={`/products/${product.id}`}
      >
        <img className={classes.image} src={`${product.images[0]}`}></img>
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
              {product.name}
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
            {product.categories
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
            {/* <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                id={`product-${product.id}-size-${size}-label`}
                shrink
                color="secondary"
              >
                Size
              </InputLabel>
              <Select
                input={<OutlinedInput notched label="Size" color="secondary" />}
                labelId={`product-${product.id}-size-${size}-label`}
                id={`product-${product.id}-size-select`}
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className={classes.select}
              >
                {["XS", "S", "M", "L", "XL", "XXL"].map((sizeOption) => {
                  return (
                    <MenuItem
                      value={sizeOption}
                      disabled={!product.sizes.includes(sizeOption)}
                    >
                      {sizeOption}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl> */}

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                id={`product-${product.id}-size-${size}-quantity-label`}
                shrink
                color="secondary"
              >
                Quantity
              </InputLabel>
              <Select
                input={
                  <OutlinedInput notched label="Quantity" color="secondary" />
                }
                labelId={`product-${product.id}-size-${size}-quantity-label`}
                id={`product-${product.id}-size-${size}-quantity-select`}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={classes.select}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
                  return <MenuItem value={number}>{number}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
          <ButtonBase className={classes.removeButton} disableRipple>
            Remove
          </ButtonBase>
        </Box>
      </Box>
    </Card>
  );
}
