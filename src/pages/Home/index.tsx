/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import {Box, Card, CardActionArea, CardContent, CircularProgress, Grid, Rating, Typography } from "@mui/material"
import SideDrawer from "../../components/Drawer/Drawer"
import { Navigate, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { CatergoriesProducts, fetchAllProducts } from "../../Redux/product/productsReducer"
import Cart from "../Cart/Cart"
import { AppDispatch } from "../../Redux/Store"

const Home = () => {

  const navigation = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const {products, isLoading, error} = useSelector((state:any) => state.product)

   const [open, setOpen] = useState(false);
   const [user, setUser] = useState(() => localStorage.getItem("userData"))
  
    const toggleDrawer = useCallback((newOpen: boolean) => {
      setOpen(newOpen);
    },[]);

  const handleNavigate = (id:any) => {
    navigation(`/Details/${id}`)
  }


  useEffect(() =>{
    const selectedCategory = localStorage.getItem("selectedCategory")
     if(selectedCategory && selectedCategory.trim()!==''){
      dispatch(CatergoriesProducts(selectedCategory))
      localStorage.removeItem("selectedCategory")
     }
     else{
       dispatch(fetchAllProducts())
     }
  }, [dispatch])

  if(!user){
    return (
      <Navigate to="/auth" replace />
    )
  }

  if(isLoading){
    return (
    <div style={{display:'flex',flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
      <CircularProgress disableShrink  />
    </div>
    )
  }



  return (
    <div style={{ width: '100%', height: '100vh'}}>
    <SideDrawer open={open} toggleDrawer={toggleDrawer} setUser={setUser} />
    <Header toggleDrawer={toggleDrawer} />
    <Cart />
    <div style={{ height: 'auto', overflow: 'auto', margin: 12, padding: 10 }}>
      {error ? (
        <div style={{ textAlign: 'center', padding: '50px 0', fontSize: '20px' }}>
          <p>{error}</p>
        </div>
      ) : products?.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 0', fontSize: '20px' }}>
          <p>No products found</p>
        </div>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {products?.map((x: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={x.id}>
              <Card
                onClick={() => handleNavigate(x.id)}
                sx={{ 
                  maxWidth: '100%',
                  width: '100%',
                  borderRadius: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 3,  // Add shadow for better visual separation
                }}
              >
                <CardActionArea>
                  <img
                    height={250}
                    width="100%" // Make the image responsive
                    style={{ objectFit: 'contain' }}
                    src={x.thumbnail}
                    alt={x.name}
                  />
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: 'auto',  // Adjust to content
                    }}
                  >
                    {/* Title */}
                    <Typography gutterBottom variant="h6" component="div">
                      {x.category}
                    </Typography>
                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        height: '40px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        color: 'text.secondary',
                      }}
                    >
                      {x.description}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 20,
                      }}
                    >
                      <Rating
                        name={`rating-${x.id}`}
                        value={x.rating}
                        precision={0.1}
                        readOnly
                        sx={{ marginTop: 1 }}
                      />
                      {/* Price */}
                      <Typography variant="h6" sx={{ marginTop: 'auto' }}>
                        ${x.price}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  </div>  
  
  )
}

export default Home