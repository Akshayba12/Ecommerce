import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userData: null,
    isAuthenticated: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.userData = action.payload
        },
        logOut : (state) => {
          state.userData = null;
          state.isAuthenticated = false
        }
    }
})

export const { setUser, logOut} = userSlice.actions;

export default userSlice.reducer;