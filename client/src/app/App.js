import React from "react";
import Header from "../features/Header/Header";
import ScrollToTop from "../utils/ScrollToTop/ScrollToTop";
import ProductsPage from "../features/ProductsPage/ProductsPage";
import ProductItemPage from "../features/ProductItemPage/ProductItemPage";
import Login from "../features/Login/Login";
import Footer from "../features/Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
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
            <h2
              style={{
                paddingTop: theme.spacing(6),
                paddingBottom: theme.spacing(6),
              }}
            >
              Shopping bag
            </h2>
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <h2
              style={{
                paddingTop: theme.spacing(6),
                paddingBottom: theme.spacing(6),
              }}
            >
              Register
            </h2>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
