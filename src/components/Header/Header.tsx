/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuOpen, SearchOff, ShoppingCart } from '@mui/icons-material';
import { alpha, AppBar, Box, Button, Container, InputBase, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material'
import {useEffect, useRef, useState } from 'react';
import useDelay from '../../hooks/useDelay';
import { CatergoriesProducts, setError, setProducts } from '../../Redux/product/productsReducer';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../services/axiosinstance';
import { setOpen } from '../../Redux/cart/cartReducer';
import { AppDispatch } from '../../Redux/Store';

const pages = ['Products', 'Category', 'Blog'];
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
  const [prodcutcategory] = useState<any>({
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
     const dispatch = useDispatch<AppDispatch>() 
    //  const {isOpen} = useSelector((state:any) => state.cart)
  const delayedSearchTerm  = useDelay(query, 200)
  const prevSearchTermRef = useRef<string>('');

  const handleOpenCategoryMenu = (event:any) => {
    setAnchorElCategory(event.currentTarget);
  };

  const handleCloseCategoryMenu = (category: string) => {
    setAnchorElCategory(null)
    if (category && category.trim() !== '') {
      dispatch(CatergoriesProducts(prodcutcategory[category]));
    } else {
      console.log('Invalid category selected');
    }
  };

  const handleChange = (e: any) => {
    setQuery(e.target.value);
  };

  // Fetch products based on search query
  
  const fetchProducts = async (searchTerm: string) => {
    try {
         const response = await axiosInstance.get(`/.netlify/functions/server/products/search?name=${searchTerm}`); 
         if (response.status === 200) {
           dispatch(setProducts(response.data.flat()));
           dispatch(setError(null));
         }
    } catch (err: any) {
      dispatch(setError(err.response.data?.message));
      console.log('error', err.response.data.message);
    }
  };
  useEffect(() => {
    if (delayedSearchTerm !== prevSearchTermRef.current) {
      prevSearchTermRef.current = delayedSearchTerm;
      fetchProducts(delayedSearchTerm);
    }
  }, [delayedSearchTerm, dispatch]);
 

  const  handleDispatch = () =>{
    dispatch(setOpen(true))
  }


  return (
    <Box>
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
                onClick={page === "Category" ? handleOpenCategoryMenu : () => {}}
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
                    <Typography sx={{ textAlign: 'center', textTransform: 'capitalize' }}>{category}</Typography>
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
            <ShoppingCart onClick={handleDispatch} role="button" fontSize='large' sx={{alignSelf:'center', paddingRight:2, cursor:'pointer', color:"white"}} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </Box>

  )
}

export default Header