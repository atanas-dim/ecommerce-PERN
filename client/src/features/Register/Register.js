import React from "react";
import {
  Container,
  Card,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { useStyles } from "./Register.styles";

export default function Register() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Card className={classes.card}>
        <Typography component="h2" variant="h5" className={classes.heading}>
          Register
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
          <TextField
            required
            label="First name"
            variant="outlined"
            type="text"
            fullWidth
            color="secondary"
            className={classes.input}
          />
          <TextField
            required
            label="Last name"
            variant="outlined"
            type="text"
            fullWidth
            color="secondary"
            className={classes.input}
          />
          <Button
            variant="contained"
            disableElevation
            color="secondary"
            size="large"
            type="submit"
            onClick={() => {}}
          >
            Create account
          </Button>
        </form>
      </Card>
    </Container>
  );
}
