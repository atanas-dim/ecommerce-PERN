import React from "react";
import Header from "../features/Header/Header";
import Home from "../features/Home/Home";
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

        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/swimwear">
            <Swimwear />
          </Route>
          <Route path="/accessories">
            <Accessories />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

function Swimwear() {
  return <h2>Swimwear</h2>;
}

function Accessories() {
  return <h2>Accessories</h2>;
}

function Cart() {
  return <h2>Shopping bag</h2>;
}

function Login() {
  return <h2>Login</h2>;
}

function Register() {
  return <h2>Register</h2>;
}
