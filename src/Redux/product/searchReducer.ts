import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosinstance";

export const searchProducts = createAsyncThunk(
    'products/searchProducts',
    async (searchTerm, { rejectWithValue }) => {
      try {
        const response = await axiosInstance(`/api/products/search?name=${searchTerm}`);  // Search products
        return response.data.flat();  // Return search results
      } catch (error) {
        return rejectWithValue(error.message || 'An error occurred while searching for products');
      }
    }
  );

  const initialState = {
    products: [],
    isLoading : false,
    error: null
}

const searchProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers : {},
    extraReducers(builder) {
        builder
          .addCase(searchProducts.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(searchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
            state.error = null;
          })
          .addCase(searchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
          });
    },
})

export default searchProductSlice.reducer