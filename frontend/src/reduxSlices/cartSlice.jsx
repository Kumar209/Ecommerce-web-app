import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backend_Url } from "../server";

export const addItemsToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id, newQty }, { rejectWithValue }) => {
    try {
      // const quantity = newQty;

      const { data } = await axios.get(`${backend_Url}/product/${id}`, {
        withCredentials: true,
      });

      console.log(newQty);

      return {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity: newQty,
      };

      // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    } catch (error) {
      // Handle the error or return a rejected promise with error value
      return rejectWithValue(
        error.response.data.message || "Failed to add item to cart."
      );
    }
  }
);

export const removeItemsFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue }) => {
    try {
      return id;
    } catch (error) {
      // Handle the error or return a rejected promise with error value
      return rejectWithValue(
        error.response.data.message || "Failed to remove item from cart."
      );
    }
  }
);

export const saveShippingInfo = createAsyncThunk(
  "cart/saveShippingInfo",
  async (data, { rejectWithValue }) => {
    try {
      return data;
    } catch (error) {
      // Handle the error or return a rejected promise with error value
      return rejectWithValue(
        error.response.data.message || "Failed to save shipping info."
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [], shippingInfo: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItemsToCart.fulfilled, (state, action) => {
        const item = action.payload;

        const isItemExist = state.cartItems.find(
          (i) => i.product === item.product
        );

        if (isItemExist) {
          state.cartItems = state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          );
        } 
        else {
          state.cartItems.push(item);
        }

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })

      .addCase(removeItemsFromCart.fulfilled, (state, action) => {
        const id = action.payload;
        state.cartItems = state.cartItems.filter((i) => i.product !== id);

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })

      .addCase(saveShippingInfo.fulfilled, (state, action) => {
        state.shippingInfo = action.payload;

        localStorage.setItem(
          "shippingInfo",
          JSON.stringify(state.shippingInfo)
        );
      });
  },
});

export default cartSlice.reducer;
