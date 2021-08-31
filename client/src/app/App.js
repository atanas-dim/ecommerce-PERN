import React from "react";
import Header from "../features/Header/Header";
import ScrollToTop from "../utils/ScrollToTop/ScrollToTop";
import ProductsPage from "../features/ProductsPage/ProductsPage";
import ProductItemPage from "../features/ProductItemPage/ProductItemPage";
import Login from "../features/Login/Login";
import Register from "../features/Register/Register";
import Cart from "../features/Cart/Cart";
import Footer from "../features/Footer/Footer";
import { Switch, Route, useHistory } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { clearUser, setIsLoggedIn } from "../store/userSlice";
import { useDispatch } from "react-redux";
import axiosAPI from "../api/axiosConfig";

export default function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  const setupInterceptor = (history) => {
    console.log("setting up interceptor");
    axiosAPI.interceptors.response.use(
      function (response) {
        console.log("inside return response");

        return response;
      },
      function (error) {
        console.log("inside error");
        console.log(error.response.status);
        if (error.response.status === 401) {
          console.log("inside redirect");
          //this should be logout user
          localStorage.setItem("token", undefined);

          handleLogout();
        }
        return Promise.reject(error);
      }
    );
  };

  setupInterceptor(history);

  // temporary for dev only
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    dispatch(setIsLoggedIn(false));
    history.push("/login");
  };

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
          <Cart />
        </Route>

        <Route path="/login/">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/account">
          <h2>
            <br />
            <br />
            <button onClick={() => handleLogout()}>log out</button>
          </h2>
        </Route>
      </Switch>
      <Footer />
    </ThemeProvider>
  );
}
