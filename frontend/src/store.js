import { configureStore } from "@reduxjs/toolkit";

import productSlice from "./reduxSlices/productSlice";
import userSlice from "./reduxSlices/userSlice";
import orderSlice from "./reduxSlices/orderSlice";
import favouriteSlice from "./reduxSlices/favouriteSlice";
import cartSlice from "./reduxSlices/cartSlice";

const reducer = {
    products : productSlice,
    user: userSlice,
    order: orderSlice,
    favourite: favouriteSlice,
    cart : cartSlice
}

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  favourite: {
    favouriteItems: localStorage.getItem("favouriteItems")
      ? JSON.parse(localStorage.getItem("favouriteItems"))
      : [],
  },
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
});

export default store;
