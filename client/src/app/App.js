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
import { logoutUser, selectIsLoggedIn, persistLogin } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axiosAPI from "../api/axiosConfig";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadCartProducts, selectCartId, clearCart } from "../store/cartSlice";
import jwt from "jsonwebtoken";

export default function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const cartId = useSelector(selectCartId);

  const setupInterceptor = (history) => {
    axiosAPI.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response.status === 401) {
          dispatch(logoutUser());
          dispatch(clearCart());
          toast.error("Request failed. Not authorized. Log in to continue", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          history.push("/login");
        }
        return Promise.reject(error);
      }
    );
  };

  // Keeping the user logged in on refresh
  // Reading the JWT user data and expiry set in localStorage when first logged in
  // There may be better solution, maybe rework this inside axios interceptor in App.js
  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token, { complete: true });
  const dateNow = new Date();
  const isValid = decodedToken?.payload.exp * 1000 > dateNow.getTime();

  if (token && isValid) {
    dispatch(
      persistLogin({ user: decodedToken.payload.user, isLoggedIn: true })
    );
  } else if (token && !isValid) {
    dispatch(logoutUser());
    dispatch(clearCart());
  }

  useEffect(() => {
    setupInterceptor(history);
  }, [history]);

  useEffect(() => {
    if (isLoggedIn && cartId) {
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
          {isLoggedIn ? <Redirect to="/user/cart" /> : <Cart />}
        </Route>

        <PrivateRoute restricted={true} component={Cart} path="/user/cart" />

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
