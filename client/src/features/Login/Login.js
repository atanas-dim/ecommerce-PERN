import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { useStyles } from "./Login.styles";
import {
  Link as RouterLink,
  Redirect,
  useLocation,
  useHistory,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoading,
  selectIsLoggedIn,
  selectUser,
  selectError,
  loginUser,
} from "../../store/userSlice";
import { fetchProductsCategory } from "../../api/api";

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const error = useSelector(selectError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // const fetchTest = async () => {
  //   console.log(user);
  //   const orders = await fetch(
  //     `https://pernstore.herokuapp.com/api/orders/user/${user.user.id}`,
  //     {
  //       method: "get",
  //       headers: {
  //         Authorization: "Beared " + user.token,
  //       },
  //     }
  //   );

  //   console.log(await orders.json());
  // };

  useEffect(() => {
    if (isLoggedIn) {
      // fetchTest();
      history.goBack();
    }
  }, [isLoggedIn]);

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
