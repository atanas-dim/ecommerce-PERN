import React from "react";
import { Route, Redirect } from "react-router-dom";
import { selectIsLoggedIn } from "../../store/userSlice";
import { useSelector } from "react-redux";

export default function PrivateRoute({ component: Component, ...rest }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
