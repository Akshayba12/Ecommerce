/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit"

const loadCartFromLocalStorage = () =>{
 const savedCart = localStorage.getItem('cart')
 return savedCart ? JSON.parse(savedCart) : []
}

const initialState = {
    cart: loadCartFromLocalStorage(),
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
          localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        addQuantity: (state:any, action) => {
            const itemId = action.payload
            const index = state.cart.findIndex((item: any) => item.id === itemId)
            if(index >= 0){
                state.cart[index].quantity += 1;
                localStorage.setItem('cart', JSON.stringify(state.cart))
            }
        },
        removeQuantity: (state: any, action) => {
            const itemId = action.payload;
            const index = state.cart.findIndex((item: any) => item.id === itemId);
      
            if (index >= 0 && state.cart[index].quantity > 1) {
              state.cart[index].quantity -= 1;
              localStorage.setItem('cart', JSON.stringify(state.cart))
            }
          },
        setOpen: (state, action) => {
         state.isOpen = action.payload
        },
        removeItemFromCart: (state: any, action) => {
           state.cart = state.cart.filter((item: any) => item.id!==action.payload)
           localStorage.setItem('cart', JSON.stringify(state.cart))
        }
    }
})

export const { setCart, removeItemFromCart, setOpen, removeQuantity, addQuantity} = cartSlice.actions

export default cartSlice.reducer