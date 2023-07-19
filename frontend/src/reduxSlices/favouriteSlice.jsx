import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addFavouriteItemsToCart = createAsyncThunk(
  "favourite/addToFavourite",
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
      // Handle the error or return error message from response
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to add item to favourites.");
      }
    }
  }
);

export const deleteFavouriteItemsToCart = createAsyncThunk(
  "favourite/removeFromFavourite",
  async (id, { getState, rejectWithValue }) => {
    try {
      return id;
    } catch (error) {
      // Handle the error or return error message from response
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to remove item from favourites.");
      }
    }
  }
);

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: { favouriteItems: [] },
  reducers: {
    addToFavourite: (state, action) => {
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
    },
    removeFromFavourite: (state, action) => {
      state.favouriteItems = state.favouriteItems.filter(
        (i) => i.product !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFavouriteItemsToCart.fulfilled, (state, action) => {
        state.favouriteItems.push(action.payload);
      })
      .addCase(deleteFavouriteItemsToCart.fulfilled, (state, action) => {
        state.favouriteItems = state.favouriteItems.filter(
          (i) => i.product !== action.payload
        );
      });
  },
});

export const {
  addToFavourite,
  removeFromFavourite,
} = favouriteSlice.actions;

export default favouriteSlice.reducer;
