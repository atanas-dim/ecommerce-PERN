import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { useStyles } from "./Login.styles";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUser,
  selectError,
  loginUser,
} from "../../store/userSlice";
import {
  addCartProduct,
  selectTempCartProducts,
  clearTempCartProducts,
} from "../../store/cartSlice";
import { toast } from "react-toastify";

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const error = useSelector(selectError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const tempCartProducts = useSelector(selectTempCartProducts);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     history.goBack();
  //   }
  // }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    toast.success("Welcome", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      tempCartProducts.forEach((product) => {
        const data = {
          cart_id: user.user.cart_id,
          product_id: product.product_id,
          quantity: product.quantity,
          size: product.size,
        };
        dispatch(addCartProduct(data));
      });

      dispatch(clearTempCartProducts());

      history.goBack();
    }
  }, [dispatch, isLoggedIn, user, history, tempCartProducts]);

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Card className={classes.card}>
        <Typography component="h2" variant="h5" className={classes.heading}>
          Login
        </Typography>
        <Typography component="p" variant="body2" className={classes.testUser}>
          Test - email: <b>john@email.com</b> password: <b>JohnsPassword</b>
        </Typography>
        {error && (
          <Typography component="p" variant="body2" className={classes.error}>
            {error}
          </Typography>
        )}
        <form className={classes.form} onSubmit={handleLogin}>
          <TextField
            required
            label="Email"
            placeholder="username@domain.com"
            variant="outlined"
            inputProps={{
              pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
            }}
            fullWidth
            color="secondary"
            className={classes.input}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            color="secondary"
            className={classes.input}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            disableElevation
            color="secondary"
            size="large"
            type="submit"
          >
            Log in
          </Button>
        </form>
        <Typography
          component="span"
          variant="body2"
          className={classes.newToShop}
        >
          New to BeachShop?
        </Typography>

        <Typography
          component={RouterLink}
          variant="body2"
          to="/register"
          className={classes.sizeGuideLink}
          style={{ fontWeight: 900 }}
        >
          Register
        </Typography>
      </Card>
    </Container>
  );
}
