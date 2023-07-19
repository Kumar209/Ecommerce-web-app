import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id) => {
    try {
      const response = await axios.get(`/api/v2/product/${id}`);
      return response.data.product;
    } catch (error) {
      return error.response.message;
    }
  }
);

// export const getProduct = createAsyncThunk('product/getProduct', async ({ keyword, currentPage, category }) => {
export const getProduct = createAsyncThunk("product/getProduct", async () => {
  try {
    // const link = category
    //   ? `/api/v2/products?keyword=${keyword}&page=${currentPage}&category=${category}`
    //   : `/api/v2/products?keyword=${keyword}&page=${currentPage}`;

    const link = `/api/v2/products`;
    console.log("r");

    const response = await axios.get(link);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const newReview = createAsyncThunk(
  "product/newReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const response = await axios.post(
        `/api/v2/product/review`,
        reviewData,
        config
      );
      return response.data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const response = await axios.post(
        `/api/v2/product/new`,
        productData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAdminProduct = createAsyncThunk(
  "product/getAdminProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v2/admin/products");
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/v2/product/${id}`);
      return response.data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const response = await axios.put(
        `/api/v2/product/${id}`,
        productData,
        config
      );
      return response.data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllReviews = createAsyncThunk(
  "product/getAllReviews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v2/reviews?id=${id}`);
      return response.data.reviews;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteReviews = createAsyncThunk(
  "product/deleteReviews",
  async ({ reviewId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/v2/reviews?id=${reviewId}&productId=${productId}`
      );
      return response.data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: {},
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
    // Get Product
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.products = [];
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductsCount = action.payload.filteredProductsCount;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Product Details
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.product = {};
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // New Review
    builder
      .addCase(newReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(newReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(newReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // .addCase(newReview.reset, (state)=>{
    //   state.success = false;
    // });

    // Create Product
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.product = action.payload.product;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Admin Product
    builder
      .addCase(getAdminProduct.pending, (state) => {
        state.loading = true;
        state.products = [];
      })
      .addCase(getAdminProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAdminProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get All Reviews
    builder
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Reviews
    builder
      .addCase(deleteReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
      })
      .addCase(deleteReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Clear Errors
    builder.addCase(clearErrors, (state) => {
      state.error = null;
    });
  },
});

export const { clearErrors } = productSlice.actions;
export default productSlice.reducer;
