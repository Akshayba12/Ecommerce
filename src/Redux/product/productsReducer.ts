/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../services/axiosinstance"

interface ProductResponse {
    data: any;
  }

export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async(_, {rejectWithValue }) => {
    try{
        const response = await axiosInstance.get('/.netlify/functions/server/products')
        console.log("response",response)
           return response?.data?.products[0].data
    } catch(error: any){
        return rejectWithValue(error?.message || "An error occured")
    }
})

export const CatergoriesProducts = createAsyncThunk<
  ProductResponse,
  string,      
  { rejectValue: string }
>(
  '/products/Categories',
  async (prodcutcategory, { rejectWithValue }) => {
     localStorage.setItem("selectedCategory", prodcutcategory)
    try {
      const response = await axiosInstance.get(`/api/products/categories/${prodcutcategory}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.message || 'An error occurred');
    }
  }
);


const initialState = {
    products: [],
    product: [],
    isLoading : false,
    error: null
}

const productSlice = createSlice({
    name: 'products',
    initialState, 
    reducers : {
        setLoading : (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
          state.error = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setProduct: (state, action) => {
          state.product = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
            state.error = null
        })
        .addCase(fetchAllProducts.rejected, (state: any, action) =>{
            state.isLoading = false;
            state.error = action.payload
        })
        .addCase(CatergoriesProducts.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(CatergoriesProducts.fulfilled, (state:any, action) => {
            state.isLoading = false;
            state.products = action.payload;
            state.error = null;
          })
          .addCase(CatergoriesProducts.rejected, (state:any, action) => {
            state.isLoading = false;    
            state.error = action.payload;
          })
    },
})
export const { setProducts, setProduct, setLoading, setError} = productSlice.actions



export default productSlice.reducer;