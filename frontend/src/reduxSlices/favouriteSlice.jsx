import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backend_Url } from "../server";

export const addFavouriteItemsToCart = createAsyncThunk(
  "favourite/addToFavourite",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backend_Url}/product/${id}`, {withCredentials: true});

      return {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      };
    } catch (error) {
      // Handle the error or return error message from response
      return rejectWithValue(error);
    }
  }
);

export const deleteFavouriteItemsToCart = createAsyncThunk(
  "favourite/removeFromFavourite",
  async (id, { rejectWithValue }) => {
    try {
      return id;
    } catch (error) {
      // Handle the error or return error message from response
      return rejectWithValue(error);
    }
  }
);

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: { favouriteItems: [] },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addFavouriteItemsToCart.fulfilled, (state, action) => {
        const item = action.payload;
        const isItemExist = state.favouriteItems.find(
          (i) => i.product === item.product
        );

        if (isItemExist) {
          state.favouriteItems = state.favouriteItems.map((i) =>
            i.product === isItemExist.product ? item : i
          );
        } else {
          state.favouriteItems.push(item);
        }

        localStorage.setItem(
          "favouriteItems",
          JSON.stringify(state.favouriteItems)
        );
      })
      .addCase(deleteFavouriteItemsToCart.fulfilled, (state, action) => {
        state.favouriteItems = state.favouriteItems.filter(
          (i) => i.product !== action.payload
        );

        localStorage.setItem(
          "favouriteItems",
          JSON.stringify(state.favouriteItems)
        );
      });
  },
});

export const { addToFavourite, removeFromFavourite } = favouriteSlice.actions;

export default favouriteSlice.reducer;
