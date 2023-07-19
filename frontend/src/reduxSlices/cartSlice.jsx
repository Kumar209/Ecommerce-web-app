import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addItemsToCart = createAsyncThunk(
  "cart/addToCart",
  async (id, quantity, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v2/product/${id}`);

      return {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      };
    } catch (error) {
      // Handle the error or return a rejected promise with error value
      return rejectWithValue(error.response.data.message || "Failed to add item to cart.");
    }
  }
);

export const removeItemsFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { getState, rejectWithValue }) => {
    try {
      return id;
    } catch (error) {
      // Handle the error or return a rejected promise with error value
      return rejectWithValue(error.response.data.message || "Failed to remove item from cart.");
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
      return rejectWithValue(error.response.data.message || "Failed to save shipping info.");
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
        } else {
          state.cartItems.push(item);
        }
      })
      .addCase(removeItemsFromCart.fulfilled, (state, action) => {
        const id = action.payload;
        state.cartItems = state.cartItems.filter((i) => i.product !== id);
      })
      .addCase(saveShippingInfo.fulfilled, (state, action) => {
        state.shippingInfo = action.payload;
      });
  },
});

export default cartSlice.reducer;
