import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  Box,
  Button,
  Grid,
} from "@material-ui/core";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useStyles } from "./ProductItemPage.styles";
import clsx from "clsx";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductItem,
  loadProductById,
  selectIsLoading,
  clearProductItem,
} from "../ProductsPage/productsSlice";
import { Add as AddIcon } from "@material-ui/icons/";

export default function ProductItemPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const productItem = useSelector(selectProductItem);
  const isLoading = useSelector(selectIsLoading);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    dispatch(loadProductById(id));
    return () => dispatch(clearProductItem());
  }, [dispatch, id]);

  // useEffect(() => {
  //   console.log(productItem);
  // }, [productItem]);

  const renderSizeButtons = () => {
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

    return sizes.map((size) => {
      return (
        <Grid item xs={4} sm={3} md={3} lg={2} key={`${size}-grid-item`}>
          <Button
            variant="outlined"
            size="small"
            className={clsx(
              classes.sizeButton,
              selectedSize === size ? classes.sizeButtonSelected : "",
              !productItem.sizes.includes(size) ? classes.sizeButtonSoldOut : ""
            )}
            title={
              !productItem.sizes.includes(size)
                ? size + " sold out"
                : "Size " + size
            }
            disabled={!productItem.sizes.includes(size)}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </Button>
        </Grid>
      );
    });
  };

  if (isLoading || !productItem) {
    return (
      <Container maxWidth="lg" className={classes.root}>
        <Typography component="p" variant="h5">
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Card className={classes.card}>
        <Carousel
          autoPlay={false}
          timeout={300}
          className={classes.carousel}
          indicatorContainerProps={{
            style: {
              position: "absolute",
              bottom: "-25px",
            },
          }}
        >
          {productItem.images.map((image, index) => (
            <Card
              className={classes.imageBase}
              elevation={0}
              key={`${productItem.name + index}`}
            >
              <CardMedia
                component="img"
                alt={`${productItem.name + index}`}
                image={`${image}`}
                title={`${productItem.name + index}`}
                className={classes.productImage}
              ></CardMedia>
            </Card>
          ))}
        </Carousel>

        <Box
          display="flex"
          flexDirection="column"
          className={classes.productInfo}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            className={classes.productTitleContainer}
          >
            <Typography variant="h5" component="h2">
              {productItem.name}
            </Typography>
            <Typography variant="h5" component="span" className={classes.price}>
              £ {productItem.price}
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            className={classes.sizesTitle}
          >
            <Typography variant="body1" component="span">
              Select size
            </Typography>

            <Typography
              component={RouterLink}
              variant="body2"
              to="#"
              className={classes.sizeGuideLink}
            >
              Size guide
            </Typography>
          </Box>

          <Grid container spacing={3} className={classes.sizeButtonsContainer}>
            {productItem.sizes && renderSizeButtons()}
          </Grid>

          <Box>
            <Button
              type="submit"
              className={classes.addButton}
              variant="contained"
              disableElevation
              color="secondary"
              size="large"
              onClick={() => console.log(selectedSize)}
            >
              <AddIcon /> Add to bag
            </Button>
          </Box>

          <Typography
            component="p"
            variant="body1"
            className={classes.description}
          >
            {productItem.description}
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}
