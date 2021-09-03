import React from "react";
import { Container, Typography, Card, Box, Button } from "@material-ui/core";
import { logoutUser, selectUser } from "../../store/userSlice";
import { clearCart } from "../../store/cartSlice";
import { useStyles } from "./Account.styles";
import { useDispatch, useSelector } from "react-redux";

export default function Account() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
  };

  const formatPostgresDate = (postgresDate) => {
    const dateArray = postgresDate.split("-");
    const year = dateArray[0];
    const month = dateArray[1];
    return `${month}/${year}`;
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h5" component="h2">
        Your account
      </Typography>
      <Card className={classes.card}>
        <Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            className={classes.userDetails}
          >
            <Typography component="h3" variant="body1">
              Account ID: {user.id}
            </Typography>
            <Typography component="h3" variant="body1">
              Cart ID: {user.cart_id}
            </Typography>
            <Typography component="h3" variant="body1">
              First name: {user.first_name}
            </Typography>
            <Typography component="h3" variant="body1">
              Last name: {user.last_name}
            </Typography>
            <Typography component="h3" variant="body1">
              Email: {user.email}
            </Typography>
            <Typography component="h3" variant="body1">
              Joined: {formatPostgresDate(user.created)}
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="outlined"
            disableElevation
            color="secondary"
            size="large"
            onClick={() => handleLogout()}
            className={classes.logoutButton}
          >
            Log out
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
