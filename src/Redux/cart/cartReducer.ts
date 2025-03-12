import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: [],
    isOpen: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart : (state, action) =>{
         const newItem = action.payload
          newItem.forEach(item => {
            const index = state.cart.findIndex(cartItem => cartItem.id === item.id)
            if(index > 0){
                state.cart[index].quantity += 1; 
            }
            else{
                state.cart.push({...item, quantity : 1})
            }
          })
        },
        addQuantity: (state, action) => {
            const itemId = action.payload
            const index = state.cart.findIndex((item) => item.id === itemId)
            if(index >= 0){
                state.cart[index].quantity += 1;
            }
        },
        removeQuantity: (state, action) => {
            const itemId = action.payload;
            const index = state.cart.findIndex(item => item.id === itemId);
      
            if (index >= 0 && state.cart[index].quantity > 1) {
              state.cart[index].quantity -= 1;
            }
          },
        setOpen: (state, action) => {
         state.isOpen = action.payload
        },
        removeItemFromCart: (state, action) => {
           state.cart = state.cart.filter(item => item.id!==action.payload)
        }
    }
})

export const { setCart, removeItemFromCart, setOpen, removeQuantity, addQuantity} = cartSlice.actions

export default cartSlice.reducer