import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {

  const user = localStorage.getItem("userData")
   if(user){
    return (
      <Navigate to="/" replace />
    )
   }

  return (
    <>
      <Outlet />
    </>
  )
}

export default AuthLayout