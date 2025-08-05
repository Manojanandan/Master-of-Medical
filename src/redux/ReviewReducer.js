import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createReview, getAllReviews } from "../utils/Service";

// Async thunk for creating a review
export const createProductReview = createAsyncThunk(
  "review/createReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      console.log('Creating review with data:', reviewData);
      const response = await createReview(reviewData);
      console.log('Create review API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating review:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to create review';
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Async thunk for getting all reviews
export const fetchProductReviews = createAsyncThunk(
  "review/fetchReviews",
  async (params = {}, { rejectWithValue }) => {
    try {
      console.log('Fetching reviews with params:', params);
      const response = await getAllReviews(params);
      console.log('Get reviews API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to fetch reviews';
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  createReviewLoading: false,
  createReviewError: null,
  createReviewSuccess: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviewError: (state) => {
      state.error = null;
      state.createReviewError = null;
    },
    clearCreateReviewSuccess: (state) => {
      state.createReviewSuccess = false;
    },
    clearReviews: (state) => {
      state.reviews = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create review
    builder
      .addCase(createProductReview.pending, (state) => {
        state.createReviewLoading = true;
        state.createReviewError = null;
        state.createReviewSuccess = false;
      })
      .addCase(createProductReview.fulfilled, (state, action) => {
        state.createReviewLoading = false;
        state.createReviewSuccess = true;
        // Add the new review to the reviews array if it exists in the response
        if (action.payload && action.payload.review) {
          state.reviews.unshift(action.payload.review);
        } else if (action.payload && action.payload.data) {
          // If the response has a data field, it might contain the created review
          state.reviews.unshift(action.payload.data);
        }
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.createReviewLoading = false;
        state.createReviewError = action.payload?.message || 'Failed to create review';
      });

    // Fetch reviews
    builder
      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the correct API response structure
        if (action.payload && action.payload.success) {
          state.reviews = action.payload.data || [];
        } else if (Array.isArray(action.payload)) {
          state.reviews = action.payload;
        } else {
          state.reviews = [];
        }
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch reviews';
      });
  },
});

export const { clearReviewError, clearCreateReviewSuccess, clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer; 