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
  selectError,
  loginUser,
} from "../../store/userSlice";
import { selectCartProducts, syncCart } from "../../store/cartSlice";
import { toast } from "react-toastify";

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const error = useSelector(selectError);
  const cartProducts = useSelector(selectCartProducts);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("Welcome", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(syncCart(cartProducts));
      history.goBack();
    }
  }, [dispatch, isLoggedIn, cartProducts, history]);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  };

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
