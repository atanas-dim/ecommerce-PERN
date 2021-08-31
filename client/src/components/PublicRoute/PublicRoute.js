import React from "react";
import { Route, Redirect } from "react-router-dom";
import { selectIsLoggedIn } from "../../store/userSlice";
import { useSelector } from "react-redux";

export default function PublicRoute({
  component: Component,
  restricted,
  ...rest
}) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn && restricted ? (
          <Redirect to="/account" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
