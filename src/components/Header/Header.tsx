import { MenuOpen, SearchOff, ShoppingCart } from '@mui/icons-material';
import { alpha, AppBar, Avatar, Box, Button, Container, Icon, IconButton, InputBase, Menu, MenuItem, styled, Toolbar, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import useDelay from '../../hooks/useDelay';
import { CatergoriesProducts, searchProducts, setError, setLoading, setProducts } from '../../Redux/product/productsReducer';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../services/axiosinstance';
import { setOpen } from '../../Redux/cart/cartReducer';

const pages = ['Products', 'Category', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const categories = ["All", "Groceries", "Beauty", "Fragrances", "Furniture", 'Mens clothing', 'jewelery', 'electronics', 'Womens clothing']


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const Header = ({toggleDrawer}: any) => {  
  
  const [anchorElCategory, setAnchorElCategory] = useState(null);
  const [query, setQuery] = useState('') 
  const [prodcutcategory] = useState({
    "All": "All",
    "Groceries": "groceries",
    "Beauty": "beauty",
    "Fragrances": "fragrances",
    "Furniture": "furniture",
    "Mens clothing": "men's clothing",
    "jewelery": "jewelery",
    "electronics": "electronics",
    "Womens clothing": "women's clothing"
  }
)
     const dispatch = useDispatch() 
     const {isOpen} = useSelector(state => state.cart)
  const delayedSearchTerm  = useDelay(query, 500)

  const handleOpenCategoryMenu = (event) => {
    setAnchorElCategory(event.currentTarget);
  };

  const handleCloseCategoryMenu = (category) => {
  setAnchorElCategory(null);

  if (category && category.trim() !== '') {
    dispatch(CatergoriesProducts(prodcutcategory[category]));
  } else {
    console.log("Invalid category selected");
  }
};

   console.log("query", query)
   console.log("delayedTerm", delayedSearchTerm)
   console.log("isOpen", isOpen)


  const handleChange = (e) => {
     e.preventDefault()
     setQuery(e.target.value)

  }

  const fetchProducts = async (searchTerm) =>{
    try{
      const response = await axiosInstance(`/api/products/search?name=${searchTerm}`)
      console.log("response" , response)
       if(response.status === 200){
         dispatch(setProducts(response.data.flat()))
         dispatch(setError(null))
       }
      } catch(err){
        dispatch(setError(err.response.data?.message))
      console.log("error" , err.response.data.message)
    }
  }

  const  handleDispatch = () =>{
    dispatch(setOpen(true))
  }

  useEffect(() => {
    if(delayedSearchTerm){
      fetchProducts(delayedSearchTerm)
    }
  }, [delayedSearchTerm])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='info'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MenuOpen onClick={() =>toggleDrawer(true)}  />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={page === "Category" ? handleOpenCategoryMenu : {}}
                sx={{ my: 2, color: 'white', display: 'block', border:'none' }}
              >
                {page}
              </Button>
            ))}
           <Box sx={{ flexGrow: 0 }}>
              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElCategory}
                open={Boolean(anchorElCategory)}
                onClose={handleCloseCategoryMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} onClick={() => handleCloseCategoryMenu(category)}>
                    <Typography sx={{ textAlign: 'center' }}>{category}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 0, display:'flex', gap:5 }}>
          <Search>
            <SearchIconWrapper>
              <SearchOff />
            </SearchIconWrapper>
            <StyledInputBase
              value={query}
              onChange={handleChange}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
            <ShoppingCart onClick={handleDispatch} role="button" color="white" fontSize='large' sx={{alignSelf:'center', paddingRight:2, cursor:'pointer'}} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </Box>

  )
}

export default Header