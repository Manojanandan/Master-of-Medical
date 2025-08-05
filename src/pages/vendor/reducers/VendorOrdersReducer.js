import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllOrders, getOrderById, updateVendorOrder } from "../../../utils/Service";
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

// Async thunk for getting order by ID
export const fetchOrderById = createAsyncThunk(
  "vendorOrders/fetchOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      console.log('Fetching order with ID:', orderId);
      const response = await getOrderById(orderId);
      console.log('Order detail API response:', response);
      console.log('Order detail data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching order details:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to fetch order details';
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Async thunk for updating vendor order
export const updateVendorOrderStatus = createAsyncThunk(
  "vendorOrders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      console.log('Updating order status:', { id, status });
      const response = await updateVendorOrder({ id, status });
      console.log('Update order API response:', response);
      console.log('Update order data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to update order status';
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const vendorOrdersSlice = createSlice({
  name: "vendorOrders",
  initialState: {
    orders: [],
    currentOrder: null,
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
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
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
      })
      // Fetch order by ID cases
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = '';
        state.currentOrder = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        
        if (action.payload.success) {
          console.log('Processing order detail payload:', action.payload);
          state.currentOrder = action.payload.data || null;
        } else {
          state.error = action.payload.message || 'Failed to fetch order details';
          state.currentOrder = null;
        }
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch order details';
        state.currentOrder = null;
      })
      // Update order status cases
      .addCase(updateVendorOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = '';
      })
      .addCase(updateVendorOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        
        if (action.payload.success) {
          console.log('Processing update order payload:', action.payload);
          console.log('Current order before update:', state.currentOrder);
          
          // Update the current order if it exists
          if (state.currentOrder && state.currentOrder.id === action.payload.data?.id) {
            const updatedOrder = { ...state.currentOrder, ...action.payload.data };
            state.currentOrder = updatedOrder;
            console.log('Current order after update:', state.currentOrder);
          } else if (state.currentOrder && action.payload.data) {
            // If the response doesn't have an id but we have currentOrder, update with the response data
            const updatedOrder = { ...state.currentOrder, ...action.payload.data };
            state.currentOrder = updatedOrder;
            console.log('Current order updated with response data:', state.currentOrder);
          }
          
          // Update the order in the orders list if it exists
          const orderIndex = state.orders.findIndex(order => order.id === action.payload.data?.id);
          if (orderIndex !== -1) {
            state.orders[orderIndex] = { ...state.orders[orderIndex], ...action.payload.data };
            console.log('Order updated in orders list at index:', orderIndex);
          }
          
          state.message = action.payload.message || 'Order status updated successfully';
        } else {
          state.error = action.payload.message || 'Failed to update order status';
        }
      })
      .addCase(updateVendorOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update order status';
      });
  },
});

export const { clearError, clearSuccess, clearOrders, clearCurrentOrder } = vendorOrdersSlice.actions;
export default vendorOrdersSlice.reducer; 