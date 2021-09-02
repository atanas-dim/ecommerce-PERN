import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { selectIsLoggedIn } from "../../store/userSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function PrivateRoute({ component: Component, ...rest }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info("Logged out.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }, [isLoggedIn]);

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
