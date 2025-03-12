/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: [],
    isOpen: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart : (state: any, action) =>{
         const newItem = action.payload
          newItem.forEach((item: any) => {
            const index = state.cart.findIndex((cartItem: any) => cartItem.id === item.id)
            if(index > 0){
                state.cart[index].quantity += 1; 
            }
            else{
                state.cart.push({...item, quantity : 1})
            }
          })
        },
        addQuantity: (state:any, action) => {
            const itemId = action.payload
            const index = state.cart.findIndex((item: any) => item.id === itemId)
            if(index >= 0){
                state.cart[index].quantity += 1;
            }
        },
        removeQuantity: (state: any, action) => {
            const itemId = action.payload;
            const index = state.cart.findIndex((item: any) => item.id === itemId);
      
            if (index >= 0 && state.cart[index].quantity > 1) {
              state.cart[index].quantity -= 1;
            }
          },
        setOpen: (state, action) => {
         state.isOpen = action.payload
        },
        removeItemFromCart: (state: any, action) => {
           state.cart = state.cart.filter((item: any) => item.id!==action.payload)
        }
    }
})

export const { setCart, removeItemFromCart, setOpen, removeQuantity, addQuantity} = cartSlice.actions

export default cartSlice.reducer