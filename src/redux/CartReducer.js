import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCart, addCartItem, updateCartItem, deleteCartItem } from "../utils/Service";
import { getUserInfoFromToken, decodeJWT } from "../utils/jwtUtils";

// Temporary debug function to decode JWT
const debugJWT = () => {
  const token = sessionStorage.getItem('jwt');
  if (token) {
    console.log('=== JWT Debug Info ===');
    console.log('Token (first 50 chars):', token.substring(0, 50) + '...');
    const decoded = decodeJWT(token);
    console.log('Decoded JWT payload:', decoded);
    console.log('Available fields:', decoded ? Object.keys(decoded) : 'No payload');
    console.log('=== End JWT Debug ===');
  } else {
    console.log('No JWT token found in sessionStorage');
  }
};

// Get user ID from JWT token
const getUserId = () => {
  console.log('Getting user ID from JWT token...');
  
  // Debug JWT contents
  debugJWT();
  
  // Check if JWT token exists
  const token = sessionStorage.getItem('jwt');
  if (!token) {
    console.warn('No JWT token found in sessionStorage');
    return null;
  }
  
  console.log('JWT token found:', token.substring(0, 50) + '...');
  
  const userInfo = getUserInfoFromToken();
  console.log('User info extracted from JWT:', userInfo);
  
  if (userInfo && userInfo.id) {
    console.log('User ID extracted from JWT:', userInfo.id);
    return userInfo.id;
  }
  
  // Fallback: Check for userData in sessionStorage
  console.log('JWT extraction failed, checking sessionStorage for userData...');
  const userData = sessionStorage.getItem('userData');
  if (userData) {
    try {
      const parsed = JSON.parse(userData);
      const userId = parsed._id || parsed.id;
      if (userId) {
        console.log('User ID found in sessionStorage userData:', userId);
        return userId;
      }
    } catch (error) {
      console.error('Error parsing userData from sessionStorage:', error);
    }
  }
  
  console.warn('No user ID found in JWT token or sessionStorage');
  return null;
};

// Async thunk for getting cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error("User not authenticated");
      }
      
      const response = await getCart(userId);
      console.log('Cart API Response:', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for adding item to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue, dispatch }) => {
    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error("User not authenticated");
      }
      
      const cartData = {
        cartId: userId,
        productId,
        quantity
      };
      
      const response = await addCartItem(cartData);
      console.log('Add to cart API Response:', response);
      
      // After successfully adding to cart, fetch the updated cart
      if (response.data && response.data.success) {
        console.log('Add to cart successful, fetching updated cart...');
        const updatedCartResponse = await getCart(userId);
        console.log('Updated cart response:', updatedCartResponse);
        return updatedCartResponse.data;
      }
      
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for updating cart item quantity
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      console.log('Updating cart item quantity:', { cartItemId, quantity });
      const response = await updateCartItem(cartItemId, quantity);
      console.log('Update cart item API Response:', response);
      console.log('Update cart item API Response Data:', response.data);
      
      return { cartItemId, quantity, data: response.data };
    } catch (error) {
      console.error('Error updating cart item:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for deleting cart item
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (cartItemId, { rejectWithValue }) => {
    try {
      const response = await deleteCartItem(cartItemId);
      console.log('Delete cart item API Response:', response);
      return cartItemId;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItems: 0,
    totalAmount: 0,
    loading: false,
    error: null,
    lastUpdated: null
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Cart API Response in reducer:', action.payload);
        
        if (action.payload && action.payload.success) {
          // Handle the actual API response structure
          const cartItems = action.payload.data || [];
          console.log('Cart items from API:', cartItems);
          
          state.items = cartItems.map(item => ({
            _id: item.id, // Use the cart item ID
            cartId: item.cartId,
            productId: item.productId,
            quantity: item.quantity,
            price: parseFloat(item.Product?.price || 0),
            product: {
              id: item.Product?.id,
              name: item.Product?.name,
              description: item.Product?.description,
              thumbnailImage: item.Product?.thumbnailImage,
              galleryImage: item.Product?.galleryImage,
              price: item.Product?.price
            }
          }));
          
          console.log('Transformed cart items:', state.items);
          
          // Calculate totals
          state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
          state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
          
          console.log('Cart totals:', { totalItems: state.totalItems, totalAmount: state.totalAmount });
        }
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cart";
      })
      
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        console.log('=== addToCart.fulfilled ===');
        console.log('Action payload:', action.payload);
        console.log('Current state items before update:', state.items);
        
        if (action.payload && action.payload.success) {
          // Handle the cart data (either from addCartItem response or getCart response)
          const cartItems = action.payload.data || [];
          console.log('Cart items from API response:', cartItems);
          
          state.items = cartItems.map(item => ({
            _id: item.id, // Use the cart item ID
            cartId: item.cartId,
            productId: item.productId,
            quantity: item.quantity,
            price: parseFloat(item.Product?.price || 0),
            product: {
              id: item.Product?.id,
              name: item.Product?.name,
              description: item.Product?.description,
              thumbnailImage: item.Product?.thumbnailImage,
              galleryImage: item.Product?.galleryImage,
              price: item.Product?.price
            }
          }));
          
          console.log('Updated state items:', state.items);
          
          // Calculate totals
          state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
          state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
          
          console.log('Updated totals:', { totalItems: state.totalItems, totalAmount: state.totalAmount });
        } else {
          console.warn('addToCart response was not successful:', action.payload);
        }
        state.lastUpdated = new Date().toISOString();
        console.log('=== End addToCart.fulfilled ===');
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add item to cart";
      })
      
      // Update cart item quantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const { cartItemId, quantity, data } = action.payload;
        
        console.log('Update cart item response:', { cartItemId, quantity, data });
        
        // Only update the specific item quantity
        const itemIndex = state.items.findIndex(item => item._id === cartItemId);
        if (itemIndex !== -1) {
          console.log('Updating local cart item quantity');
          
          // Store the old quantity for total calculation
          const oldQuantity = state.items[itemIndex].quantity;
          
          // Update only the quantity
          state.items[itemIndex].quantity = quantity;
          
          // Update totals efficiently - only recalculate the difference
          const quantityDifference = quantity - oldQuantity;
          state.totalItems += quantityDifference;
          state.totalAmount += (state.items[itemIndex].price * quantityDifference);
          
          console.log('Updated local cart state:', { 
            itemId: cartItemId,
            oldQuantity,
            newQuantity: quantity,
            totalItems: state.totalItems, 
            totalAmount: state.totalAmount 
          });
        } else {
          console.warn('Cart item not found for local update:', cartItemId);
        }
        
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update cart item";
      })
      
      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        const cartItemId = action.payload;
        
        // Remove the item from the cart
        state.items = state.items.filter(item => item._id !== cartItemId);
        
        // Recalculate totals
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to remove item from cart";
      });
  }
});

export const { clearCart, clearError } = cartSlice.actions;
export default cartSlice.reducer; 