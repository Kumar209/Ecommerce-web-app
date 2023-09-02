import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backend_Url } from "../server";

// Async Thunks

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (data, { rejectWithValue }) => {
    try {
      const currentPage = data.currentPage;
      const keyword = data.keyword || "";
      const category = data.category;

      const link = category
        ? `${backend_Url}/products?keyword=${keyword}&page=${currentPage}&category=${category}`
        : `${backend_Url}/products?keyword=${keyword}&page=${currentPage}`;

      const response = await axios.get(link, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async (_, { rejectWithValue }) => {
    try {
      const link = `${backend_Url}/products`;
      const response = await axios.get(link, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backend_Url}/product/${id}`, {
        withCredentials: true,
      });
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

export const newReview = createAsyncThunk(
  "product/newReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backend_Url}/product/review`,
        reviewData,
        { withCredentials: true }
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
      const response = await axios.post(
        `${backend_Url}/product/new`,
        productData,
        { withCredentials: true }
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
      const response = await axios.get(`${backend_Url}/admin/products`, {
        withCredentials: true,
      });
      console.log(response.data);
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
      const response = await axios.delete(`${backend_Url}/product/${id}`, {
        withCredentials: true,
      });
      return response.data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({id, myForm}, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${backend_Url}/product/${id}`,
        myForm,
        { withCredentials: true }
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
      const response = await axios.get(`${backend_Url}/reviews?id=${id}`, {
        withCredentials: true,
      });
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
        `${backend_Url}/reviews?id=${reviewId}&productId=${productId}`,
        { withCredentials: true }
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
    NEW_REVIEW_RESET: (state) => {
      state.success = false;
    },
    NEW_PRODUCT_RESET: (state) => {
      state.success = false;
    },
    DELETE_PRODUCT_RESET: (state) => {
      state.isDeleted = false;
    },
    UPDATE_PRODUCT_RESET: (state) => {
      state.isUpdated = false;
    },
    DELETE_REVIEW_RESET: (state) => {
      state.isDeleted = false;
    }
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

    //Get all products
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
        state.products = [];
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductsCount = action.payload.filteredProductsCount;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
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

export const {
  clearErrors,
  NEW_REVIEW_RESET,
  NEW_PRODUCT_RESET,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_RESET,
  DELETE_REVIEW_RESET
} = productSlice.actions;
export default productSlice.reducer;
