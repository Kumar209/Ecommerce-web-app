import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backend_Url } from '../server';

// Async Thunks
export const createOrder = createAsyncThunk('order/createOrder', async (order, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${backend_Url}/order/new`, order , {withCredentials: true});
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const myOrders = createAsyncThunk('order/myOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${backend_Url}/orders/me` , {withCredentials: true});
    return response.data.orders;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const getOrderDetails = createAsyncThunk('order/getOrderDetails', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${backend_Url}/order/${id}` , {withCredentials: true});
    return response.data.order;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const getAllOrders = createAsyncThunk('order/getAllOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${backend_Url}/admin/orders` , {withCredentials: true});
    return response.data.orders;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const updateOrder = createAsyncThunk('order/updateOrder', async ({ id, order }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${backend_Url}/admin/order/${id}`, order, {withCredentials: true});
    return response.data.success;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const deleteOrder = createAsyncThunk('order/deleteOrder', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${backend_Url}/admin/order/${id}` , {withCredentials: true});
    return response.data.success;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Slice
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: {},
    orders: [],
    loading: false,
    isDeleted: false,
    isUpdated: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Order
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // My Orders
    builder
      .addCase(myOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(myOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(myOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Order Details
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.order = {};
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // All Orders
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.orders = [];
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Order
    builder
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Order
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Clear Errors
    builder.addCase(clearErrors, (state) => {
      state.error = null;
    });
  },
});

export const { clearErrors } = orderSlice.actions;
export default orderSlice.reducer;
