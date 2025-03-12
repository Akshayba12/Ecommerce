import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import React from 'react'
import Details from './pages/Details'

const Home = React.lazy(() => import('./pages/Home/index'))
const Cart = React.lazy(() => import('./pages/Cart/Cart'))
const Auth = React.lazy(() => import('./pages/Auth/AuthLayout'))
const Login = React.lazy(() => import('./pages/Login/index'))
const Register = React.lazy(() => import('./pages/Register/index'))

function App() {

  return (
    <Router>
     <Routes>
      <Route path='/auth' Component={Auth} >
        <Route index Component={Login} />
        <Route  path='register' Component={Register} />
      </Route>
      <Route path='/' Component={Home} />
      <Route path='/Details/:id' Component={Details} />
      <Route path='/cart' Component={Cart} />
     </Routes>
    </Router>
  )
}

export default App
