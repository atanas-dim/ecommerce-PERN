import React, { useEffect } from "react";
import Header from "../features/Header/Header";
import ScrollToTop from "../utils/ScrollToTop/ScrollToTop";
import ProductsPage from "../features/ProductsPage/ProductsPage";
import ProductItemPage from "../features/ProductItemPage/ProductItemPage";
import Login from "../features/Login/Login";
import Register from "../features/Register/Register";
import Cart from "../features/Cart/Cart";
import Footer from "../features/Footer/Footer";
import Account from "../features/Account/Account";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { logoutUser, selectIsLoggedIn } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axiosAPI from "../api/axiosConfig";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  loadCartProducts,
  selectCartId,
  selectCartProducts,
} from "../store/cartSlice";

export default function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const cartProducts = useSelector(selectCartProducts);
  const cartId = useSelector(selectCartId);

  const setupInterceptor = (history) => {
    console.log("setting up interceptor");
    axiosAPI.interceptors.response.use(
      function (response) {
        console.log("inside return response");
        console.log(response);
        return response;
      },
      function (error) {
        console.log("inside error");
        console.log(error.response);
        if (error.response.status === 401) {
          console.log("inside redirect");

          toast.info(
            "Logged out - your token has expired. Log in to continue.",
            {
              position: toast.POSITION.BOTTOM_RIGHT,
            }
          );
          <Redirect to="/login" />;
          dispatch(logoutUser());
        }
        return Promise.reject(error);
      }
    );
  };

  useEffect(() => {
    setupInterceptor(history);
  }, [history]);

  useEffect(() => {
    if (isLoggedIn && cartId) {
      console.log(isLoggedIn, cartId);
      dispatch(loadCartProducts(cartId));
    }
  }, [dispatch, isLoggedIn, cartId]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Header />
      <ScrollToTop />
      <Switch>
        <Route path="/" exact>
          <ProductsPage title="Our Best Sellers" category="best-sellers" />
        </Route>

        <Route path="/swimwear">
          <ProductsPage title="Swimwear" category="swimwear" />
        </Route>

        <Route path="/accessories">
          <ProductsPage title="Accessories" category="accessories" />
        </Route>

        <Route path="/products/:id">
          <ProductItemPage />
        </Route>

        <Route path="/cart">
          {/* use isLoggedIn here to render Public or Private cart */}
          <Cart />
        </Route>

        <Route path="/login/">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <PrivateRoute restricted={true} component={Account} path="/account" />
      </Switch>
      <Footer />
      <ToastContainer />
    </ThemeProvider>
  );
}
