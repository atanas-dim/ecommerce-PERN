import React from "react";
import {
  Container,
  Card,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { useStyles } from "./Login.styles";
import { Link as RouterLink } from "react-router-dom";

export default function Login() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Card className={classes.card}>
        <Typography component="h2" variant="h5" className={classes.heading}>
          Login
        </Typography>
        <form className={classes.form}>
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
          />
          <TextField
            required
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            color="secondary"
            className={classes.input}
          />
          <Button
            variant="contained"
            disableElevation
            color="secondary"
            size="large"
            onClick={() => {}}
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
