import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backend_Url } from "../server";

// Async Thunks
export const login = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    try {
      const Data = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const response = await axios.post(`${backend_Url}/login`, Data, {
        withCredentials: true,
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const Data = {
        name: userData.get("name"),
        email: userData.get("email"),
        password: userData.get("password"),
        avatar: userData.get("avatar"),
      };

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const response = await axios.post(
        `${backend_Url}/registration`,
        Data,
        config,
        {
          withCredentials: true,
        }
      );
      return response.data.user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backend_Url}/me`, {
        withCredentials: true,
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get(`${backend_Url}/logout`, { withCredentials: true });
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    const data = {
      name: userData.get("name"),
      email: userData.get("email"),
      avatar: userData.get("avatar")
    };

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const response = await axios.put(
        `${backend_Url}/me/update/info`,
        data,
        { withCredentials: true },
        config
      );
      return response.data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (password, { rejectWithValue }) => {
    try {
      const data = {
        oldPassword: password.get("oldPassword"),
        newPassword: password.get("newPassword"),
        confirmPassword: password.get("confirmPassword"),
      };

      const response = await axios.put(`${backend_Url}/me/update`, data, {
        withCredentials: true,
      });
      return response.data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backend_Url}/admin/users`, {withCredentials: true});
      return response.data.users;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (myForm, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backend_Url}/password/forgot`, myForm ,{withCredentials: true});
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, myForm }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${backend_Url}/password/reset/${token}`,
        myForm,
        {withCredentials: true}
      );
      return response.data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${backend_Url}/admin/user/${id}` , {withCredentials: true});
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backend_Url}/admin/user/${id}`, {withCredentials:true});
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, myForm }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${backend_Url}/admin/user/${userId}`, myForm, {withCredentials: true});
      return response.data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
    isAuthenticated: false,
    isUpdated: false,
    isDeleted: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },

    UPDATE_PASSWORD_RESET: (state) => {
      state.isUpdated = false;
    },
    UPDATE_PROFILE_RESET: (state) => {
      state.isUpdated = false;
    },
    DELETE_USER_RESET: (state) => {
      state.isDeleted = false;
    },
    UPDATE_USER_RESET: (state) => {
      state.isUpdated = false;
    }
  },
  extraReducers: (builder) => {
    // Login, Register, Load User
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Profile, Update User, Update Password, Delete User
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload.success;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get All Users
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // User Details
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Forgot Password, Reset Password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Clear Errors
    builder.addCase(clearErrors, (state) => {
      state.error = null;
    });
  },
});

export const { clearErrors, UPDATE_PASSWORD_RESET, UPDATE_PROFILE_RESET , DELETE_USER_RESET, UPDATE_USER_RESET} = userSlice.actions;
export default userSlice.reducer;
