import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { setUser, setIsLoggedIn } from "./store/userSlice";
import jwt from "jsonwebtoken";

// Keeping the user logged in on refresh
// Reading the JWT user data and expiry set in localStorage when first logged in
// There may be better solution
const token = localStorage.getItem("token");
const decodedToken = jwt.decode(token, { complete: true });
const dateNow = new Date();

if (decodedToken?.payload.exp * 1000 > dateNow.getTime()) {
  store.dispatch(setUser(decodedToken.payload));
  store.dispatch(setIsLoggedIn(true));
} else {
  store.dispatch(setIsLoggedIn(false));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
