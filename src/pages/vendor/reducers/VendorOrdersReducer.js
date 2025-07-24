import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllOrders } from "../../../utils/Service";
import { getVendorIdFromToken } from "../../../utils/jwtUtils";

// Async thunk for getting vendor orders
export const fetchVendorOrders = createAsyncThunk(
  "vendorOrders/fetchOrders",
  async (params = {}, { rejectWithValue }) => {
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
      
      // Add vendorId to params
      const orderParams = {
        ...params,
        vendorId: vendorId
      };
      
      const response = await getAllOrders(orderParams);
      console.log('Orders API response:', response);
      console.log('Orders data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching vendor orders:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to fetch orders';
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const vendorOrdersSlice = createSlice({
  name: "vendorOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
    success: false,
    message: '',
    totalOrders: 0,
    currentPage: 1,
    totalPages: 1,
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
    clearOrders: (state) => {
      state.orders = [];
      state.totalOrders = 0;
      state.currentPage = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch orders cases
      .addCase(fetchVendorOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = '';
      })
      .addCase(fetchVendorOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        
        if (action.payload.success) {
          // Handle the actual API response structure
          console.log('Processing orders payload:', action.payload);
          state.orders = action.payload.data || [];
          state.totalOrders = action.payload.pagination?.total || action.payload.data?.length || 0;
          state.currentPage = action.payload.pagination?.page || 1;
          state.totalPages = action.payload.pagination?.totalPages || 1;
          console.log('Processed orders state:', {
            ordersCount: state.orders.length,
            totalOrders: state.totalOrders,
            currentPage: state.currentPage,
            totalPages: state.totalPages
          });
        } else {
          state.error = action.payload.message || 'Failed to fetch orders';
          state.orders = [];
        }
      })
      .addCase(fetchVendorOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch orders';
        state.orders = [];
      });
  },
});

export const { clearError, clearSuccess, clearOrders } = vendorOrdersSlice.actions;
export default vendorOrdersSlice.reducer; 