import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, getAllProducts, getProductById, updateProduct } from "../../../utils/Service";
import { getVendorIdFromToken } from "../../../utils/jwtUtils";

// Async thunk for creating product
export const createProductData = createAsyncThunk(
  "product/createProduct",
  async (productData, { rejectWithValue }) => {
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

      // Create FormData object
      const formData = new FormData();
      
      // Basic product information
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('category', productData.category);
      formData.append('subCategoryId', productData.subcategory);
      formData.append('postedBy', vendorId);
      formData.append('price', productData.price);
      formData.append('priceLable', productData.priceLabel);
      formData.append('gst', productData.gst);
      formData.append('hsnCode', productData.hsnCode);
      formData.append('brandName', productData.brandName);
      formData.append('benefits', productData.benefits);
      formData.append('expiresOn', productData.expiresOn);
      formData.append('status', 'active');
      
      // Additional information as JSON
      const additionalInfo = {
        shelfLife: productData.shelfLife,
        country: productData.country,
        howToUse: productData.howToUse,
        sideEffects: productData.sideEffects,
        manufacturer: productData.manufacturer,
        mediguardEssentials: productData.mediguardEssentials,
        mrpPrice: productData.mrpPrice,
        bulkDiscount: productData.bulkDiscount
      };
      formData.append('additionalInformation', JSON.stringify(additionalInfo));

      // Handle files
      if (productData.thumbnail) {
        formData.append('thumbnailImage', productData.thumbnail);
      }
      
      if (productData.files && productData.files.length > 0) {
        // All files as gallery
        for (let i = 0; i < productData.files.length; i++) {
          formData.append('galleryImage', productData.files[i]);
        }
      }

      const response = await createProduct(formData);
      // The API returns { success: true, data: { ...productData } }
      return response.data.data;
    } catch (error) {
      console.error('Error creating product:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to create product';
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Async thunk for getting all products
export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (_, { rejectWithValue }) => {
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

      const response = await getAllProducts(vendorId);
      // The API returns { success: true, data: { data: [...products], pagination: {...} } }
      return response.data.data;
    } catch (error) {
      console.error('Error fetching all products:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to fetch products';
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Async thunk for getting product by ID
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await getProductById(productId);
      // The API returns { success: true, data: { ...productData } }
      return response.data.data;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to fetch product';
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Async thunk for updating product
export const updateProductData = createAsyncThunk(
  "product/updateProduct",
  async (productData, { rejectWithValue }) => {
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

      // Create FormData object
      const formData = new FormData();
      
      // Basic product information
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('category', productData.category);
      formData.append('subCategoryId', productData.subcategory);
      formData.append('postedBy', vendorId);
      formData.append('price', productData.price);
      formData.append('priceLable', productData.priceLabel);
      formData.append('brandName', productData.brandName);
      formData.append('benefits', productData.benefits);
      formData.append('expiresOn', productData.expiresOn);
      formData.append('status', 'pending');
      
      // Additional information as JSON
      const additionalInfo = {
        shelfLife: productData.shelfLife,
        country: productData.country,
        howToUse: productData.howToUse,
        sideEffects: productData.sideEffects,
        manufacturer: productData.manufacturer
      };
      formData.append('additionalInformation', JSON.stringify(additionalInfo));

      // Handle files
      if (productData.thumbnail) {
        formData.append('thumbnailImage', productData.thumbnail);
      }
      
      if (productData.files && productData.files.length > 0) {
        // All files as gallery
        for (let i = 0; i < productData.files.length; i++) {
          formData.append('galleryImage', productData.files[i]);
        }
      }

      const response = await updateProduct(productData.id, formData);
      // The API returns { success: true, data: { ...productData } }
      return response.data.data;
    } catch (error) {
      console.error('Error updating product:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to update product';
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    currentProduct: null,
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
  },
  extraReducers: (builder) => {
    builder
      // Create product cases
      .addCase(createProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.success = true;
        state.message = "Product created successfully!";
        state.error = null;
      })
      .addCase(createProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.message = action.payload?.message || "Failed to create product";
      })
      // Fetch all products cases
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch product by ID cases
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update product cases
      .addCase(updateProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProductData.fulfilled, (state, action) => {
        state.loading = false;
        // Update the current product with the updated data
        state.currentProduct = action.payload;
        // Also update the product in the products array if it exists
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.success = true;
        state.message = "Product updated successfully!";
        state.error = null;
      })
      .addCase(updateProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.message = action.payload?.message || "Failed to update product";
      });
  },
});

export const { clearError, clearSuccess, clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer; 