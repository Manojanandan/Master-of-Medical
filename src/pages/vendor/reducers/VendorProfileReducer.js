import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVendorProfile, updateVendorProfile } from "../../../utils/Service";
import { getVendorIdFromToken } from "../../../utils/jwtUtils";

// Async thunk for getting vendor profile
export const fetchVendorProfile = createAsyncThunk(
  "vendorProfile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const vendorId = getVendorIdFromToken();
      if (!vendorId) {
        throw new Error("Vendor ID not found in token");
      }
      const response = await getVendorProfile(vendorId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for updating vendor profile
export const updateVendorProfileData = createAsyncThunk(
  "vendorProfile/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const vendorId = getVendorIdFromToken();
      if (!vendorId) {
        throw new Error("Vendor ID not found in token");
      }
      
      const updateData = {
        id: vendorId,
        ...profileData
      };
      
      const response = await updateVendorProfile(updateData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const vendorProfileSlice = createSlice({
  name: "vendorProfile",
  initialState: {
    profile: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    },
    loading: false,
    error: null,
    success: false,
    message: '',
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.message = '';
    },
    clearSuccess: (state) => {
      state.success = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile cases
      .addCase(fetchVendorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchVendorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update profile cases
      .addCase(updateVendorProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateVendorProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = true;
        state.message = "Profile updated successfully!";
        state.error = null;
      })
      .addCase(updateVendorProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.message = action.payload?.message || "Failed to update profile";
      });
  },
});

export const { clearError, clearSuccess } = vendorProfileSlice.actions;
export default vendorProfileSlice.reducer; 