import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    cart: persistedCartReducer,
  },
});
