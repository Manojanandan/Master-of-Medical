import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVendorProfile, updateVendorProfile } from "../../../utils/Service";
import { getVendorIdFromToken } from "../../../utils/jwtUtils";

// Async thunk for getting vendor profile
export const fetchVendorProfile = createAsyncThunk(
  "vendorProfile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      let vendorId = getVendorIdFromToken();
      
      // If vendor ID is not in JWT, try to get it from sessionStorage or other sources
      if (!vendorId) {
        console.warn('Vendor ID not found in JWT token, checking alternative sources...');
        // You might want to store vendor ID separately in sessionStorage during login
        vendorId = sessionStorage.getItem('vendorId');
      }
      
      if (!vendorId) {
        throw new Error("Vendor ID not found. Please login again.");
      }
      
      const response = await getVendorProfile(vendorId);
      // The API returns { success: true, data: { ...profileData } }
      return response.data.data;
    } catch (error) {
      console.error('Error fetching vendor profile:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to fetch profile';
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Async thunk for updating vendor profile
export const updateVendorProfileData = createAsyncThunk(
  "vendorProfile/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      let vendorId = getVendorIdFromToken();
      
      // If vendor ID is not in JWT, try to get it from sessionStorage or other sources
      if (!vendorId) {
        console.warn('Vendor ID not found in JWT token, checking alternative sources...');
        vendorId = sessionStorage.getItem('vendorId');
      }
      
      if (!vendorId) {
        throw new Error("Vendor ID not found. Please login again.");
      }
      
      const updateData = {
        id: vendorId,
        ...profileData
      };
      
      const response = await updateVendorProfile(updateData);
      // The API returns { success: true, data: { ...updatedProfileData } }
      return response.data.data;
    } catch (error) {
      console.error('Error updating vendor profile:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to update profile';
      return rejectWithValue({ message: errorMessage });
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