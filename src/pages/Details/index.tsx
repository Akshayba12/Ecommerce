import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosinstance";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../Redux/product/productsReducer";
import './style.css'
import { Avatar, Box, Card, CardContent, CircularProgress, Rating, Typography } from "@mui/material";
import Cart from "../Cart/Cart";
import { setCart, setOpen } from "../../Redux/cart/cartReducer";

const Details = () => {
    const {id} = useParams();
    const dispatch = useDispatch()
    const {product, isLoading} = useSelector(state =>  state.product)
    const {cart} =  useSelector(state => state.cart)

    const GetProductById = async() => {
        try {
         const res = await axiosInstance.get(`api/products/getProductById/${id}`)
         dispatch(setProduct(res?.data))
        } catch (error) {
         console.log("error", error)   
        }
    }

    useEffect(() => {
        GetProductById()
    },[])

    const handleNavigateToCart = (data) => {
      dispatch(setOpen(true))
      dispatch(setCart([data]))
    }

     if(isLoading){
        return (
        <div style={{display:'flex',flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <CircularProgress disableShrink  />
        </div>
        )
      }
    

    return (
        <div>
         <Cart />
        {product.map((x) => {
          return (
            <>
            <div key={x.id} className="product-container">
              {/* Product Image */}
              <div className="image-container">
                <img
                  src={x.thumbnail}
                  alt={x.title}
                  className="product-image"
                />
              </div>
  
              {/* Product Details */}
              <div className="details-container">
                <h2 className="title">{x.title}</h2>
                <p className="price">${x.price}</p>
                <p className="subtitle">Brand: {x.brand}</p>
                <p className="subtitle">Category: {x.category}</p>
                <p className="subtitle">Availability: {x.availabilityStatus}</p>
                <p className="description">{x.description}</p>
  
                <div className="additional-info">
                  <p>Stock: {x.stock}</p>
                  <p>Discount: {x.discountPercentage}%</p>
                  <p>Shipping Info: {x.shippingInformation}</p>
                  <p>Warranty: {x.warrantyInformation}</p>
                  <Box display="flex" alignItems="center">
                        <Rating
                          name="read-only" 
                          value={x.rating} 
                          readOnly 
                          sx={{ marginRight: 2 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {x.rating} / 5
                        </Typography>
                      </Box>
                </div>
                {cart.some(product => product.id === x.id) ? (
                   <button className="button" onClick={() => dispatch(setOpen(true))}>View Cart</button>
                ) : (<button className="button" onClick={() => handleNavigateToCart(x)}>Add to Cart</button>)}
                </div>
            </div>
  
              {/* Reviews Section - Material UI Card */}
              <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
              {x.reviews && x.reviews.length > 0 && (
                <div className="reviews-section">
                  <h3 style={{margin:5}}>Reviews</h3>
                  {x.reviews.map((review) => (
                    <Card key={review._id} sx={{ marginBottom: 2, backgroundColor:'Menu' }}>
                    <CardContent>
                      {/* Reviewer Profile Thumbnail */}
                      <Box display="flex" alignItems="center" mb={2}>
                        <Avatar 
                          alt={review.reviewerName}
                          src={review.reviewerProfilePic || "/default-profile.jpg"} // Placeholder profile picture
                          sx={{ width: 40, height: 40, marginRight: 2 }}
                        />
                        <Typography variant="h6" component="div">
                          {review.reviewerName}
                        </Typography>
                      </Box>

                      {/* Rating Display */}
                      <Box display="flex" alignItems="center">
                        <Rating
                          name="read-only" 
                          value={review.rating} 
                          readOnly 
                          sx={{ marginRight: 2 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {review.rating} / 5
                        </Typography>
                      </Box>

                      {/* Review Comment */}
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        {review.comment}
                      </Typography>

                      {/* Review Date */}
                      <Typography variant="caption" color="text.secondary">
                        Reviewed on: {new Date(review.date).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                  ))}
                </div>
              )}
              </div>
            </>
          );
        })}
      </div>
      );
}

export default Details
