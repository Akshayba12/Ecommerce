import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../services/axiosinstance"

export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async(_, {rejectWithValue }) => {
    try{
        const response = await axiosInstance.get('api/products')
        console.log("response",response)
           return response?.data?.products[0].data
    } catch(error){
        return rejectWithValue(error.message || "An error occured")
    }
})

export const CatergoriesProducts = createAsyncThunk(`/products/Categories`, async(prodcutcategory, {rejectWithValue}) =>{
    try {
        localStorage.setItem("selectedCategory", prodcutcategory)
        const response = await axiosInstance.get(`/api/products/categories/${prodcutcategory}`)
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message || 'An error occured')
    }
})


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
        .addCase(fetchAllProducts.rejected, (state, action) =>{
            state.isLoading = false;
            state.error = action.payload
        })
        .addCase(CatergoriesProducts.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(CatergoriesProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
            state.error = null;
          })
          .addCase(CatergoriesProducts.rejected, (state, action) => {
            state.isLoading = false;    
            state.error = action.payload;
          })
    },
})
export const { setProducts, setProduct, setLoading, setError} = productSlice.actions



export default productSlice.reducer;