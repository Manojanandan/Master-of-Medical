import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPublicProducts, getPublicProductById } from "../utils/Service";

// Async thunk for getting all public products with filters
export const fetchPublicProducts = createAsyncThunk(
  "publicProduct/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      console.log('Fetching public products with params:', params);
      const response = await getPublicProducts(params);
      console.log('Public products API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching public products:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to fetch products';
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Async thunk for getting public product by ID
export const fetchPublicProductById = createAsyncThunk(
  "publicProduct/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      console.log('Fetching public product with ID:', productId);
      const response = await getPublicProductById(productId);
      console.log('Public product detail API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching public product by ID:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to fetch product';
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const publicProductSlice = createSlice({
  name: "publicProduct",
  initialState: {
    products: [],
    currentProduct: null,
    pagination: {
      page: 1,
      limit: 12,
      total: 0,
      totalPages: 0
    },
    filters: {
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      search: '',
      sort: 'newest'
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
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to first page when filters change
    },
    updatePagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        brand: '',
        minPrice: '',
        maxPrice: '',
        search: '',
        sort: 'newest'
      };
      state.pagination.page = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch public products cases
      .addCase(fetchPublicProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicProducts.fulfilled, (state, action) => {
        state.loading = false;
        // Handle both array and object responses
        if (Array.isArray(action.payload)) {
          state.products = action.payload;
          state.pagination = {
            page: 1,
            limit: 12,
            total: action.payload.length,
            totalPages: Math.ceil(action.payload.length / 12)
          };
        } else if (action.payload.data) {
          state.products = action.payload.data;
          state.pagination = {
            page: action.payload.pagination?.page || 1,
            limit: action.payload.pagination?.limit || 12,
            total: action.payload.pagination?.total || action.payload.data.length,
            totalPages: action.payload.pagination?.totalPages || Math.ceil((action.payload.pagination?.total || action.payload.data.length) / 12)
          };
        }
        state.error = null;
      })
      .addCase(fetchPublicProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch public product by ID cases
      .addCase(fetchPublicProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(fetchPublicProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  clearSuccess, 
  clearCurrentProduct, 
  updateFilters, 
  updatePagination, 
  clearFilters 
} = publicProductSlice.actions;

export default publicProductSlice.reducer; 