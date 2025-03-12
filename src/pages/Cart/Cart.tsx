/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Card, Drawer, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { addQuantity, removeItemFromCart, removeQuantity, setOpen } from "../../Redux/cart/cartReducer"
import { ShoppingCart } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

const Cart = () => {

  const {cart, isOpen} =  useSelector((state: any) => state.cart)

  const dispatch = useDispatch()
  const navigation = useNavigate()

  const handleRemoveItem = (productId: any) =>{
    dispatch(removeItemFromCart(productId))

  }

  const handleAddQuantity = (id: any) =>{
    dispatch(addQuantity(id))
  }

  const handleRemoveQuantityItem = (id: any) =>{
    dispatch(removeQuantity(id))
  }

  const handleNavigatetoDetails = (id: any) => {
    navigation(`/Details/${id}`)  
  }

  const CartItems = (
    <Box sx={{
      width: 600,
      flex: 1,
      background: 'linear-gradient(rgba(61, 112, 81, 0.63) 0px 8px 10px -5px, rgba(149, 103, 103, 0.14) 0px 16px 24px 2px, rgba(101, 32, 32, 0.12) 0px 6px 30px 5px)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }} role="presentation">
      
      <Typography variant="h4" color="#336323" sx={{ margin: 2, paddingBottom: 2 }}>
        Your Cart
      </Typography>
      
      <Box sx={{
        flex: 1,
        overflowY: cart.length > 0 ? 'auto' : 'initial',
        paddingBottom: 16,
        '&::-webkit-scrollbar': {
        display: 'none',
    },
      }}>
        {cart.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <ShoppingCart role="button" sx={{ color:"#00000", fontSize: 160, alignSelf: 'center', paddingRight: 2 }} />
            <p>Your have no items in your Shopping cart.</p>
          </div>
        ) : (
          cart.map((x: { id: Key | null | undefined; thumbnail: string | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; quantity: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined }, index: number) => (
            <div key={x.id} style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: 5,
              marginRight: 5,
              justifyContent: 'space-around',
              alignItems: 'center',
              borderTop:  '0.5px solid black',
              borderBottom: index === cart.length -1 ? '0.5px solid black' : '',
              padding: '10px',
              cursor: 'pointer',
            }} 
            role="button"
            onClick={() => handleNavigatetoDetails(x.id)}>
              <img src={x.thumbnail} style={{ height: 100, width: 100, backgroundColor: 'transparent' }} />
              <Typography variant="body2" color="#336323" width={200} textAlign="center">
                {x.title}
              </Typography>
              <div style={{ display: "flex", alignItems: 'center' }}>
                <button disabled={x?.quantity === 1} onClick={() => handleRemoveQuantityItem(x.id)} style={{ backgroundColor: 'orange' }}>-</button>
                <p style={{ padding: 2 }}>{x?.quantity}</p>
                <button onClick={() => handleAddQuantity(x.id)} style={{ backgroundColor: 'orange' }}>+</button>
              </div>
              <div>
                <p style={{ color: 'black', textAlign: 'center', }}>${x.price}</p>
                <button style={{ backgroundColor:'transparent', color:'green', textDecoration:'underline', border:'none', cursor:'pointer', padding:0, marginTop:0 }} onClick={() => handleRemoveItem(x.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </Box>
        {cart.length > 0 && (
        <Card sx={{
          flex: 1,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          padding: 2,
          boxShadow: 2,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1">Subtotal</Typography>
            <Typography variant="body1">${cart.reduce((total: number, item: { price: number; quantity: number }) => total + item.price * item.quantity, 0).toFixed(2)}</Typography>
          </div>
          <button style={{ width: '100%', background: 'linear-gradient(0deg, #004152, #004152)'
                 , color: 'white', padding: '10px', marginTop: '10px' }}>
            Checkout
          </button>
        </Card>
      )}
    </Box>
  )

  return (
    <div>
         <Drawer anchor={"right"} open={isOpen} onClose={() => dispatch(setOpen(false))}>
           {CartItems}
         </Drawer>
       </div>
  )
} 

export default Cart