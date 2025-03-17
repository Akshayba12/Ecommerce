/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Box, Button, Checkbox, CircularProgress, Container, Divider, FormControl, FormControlLabel, FormLabel, Paper, Snackbar, TextField, Typography } from "@mui/material"
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { FacebookIcon, GoogleIcon } from "../../components/CustomIcons/CustomIcons";
import axiosInstance from "../../services/axiosinstance";
import { useState } from "react";

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}


const Login = () => {

  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false)
  const [open, setOpen] = useState(false)

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
        try {
          const res = await axiosInstance.post('/.netlify/functions/server/users/login', values)
          const users = res.data.email

          localStorage.setItem('userData', JSON.stringify(users))
          setErrorMessage("logged in successfully")
          setSubmitting(false)
          setIsError(false)
          setOpen(true)
          setTimeout(() => {
            resetForm();
            navigate('/', {replace: true});
          }, 2000);
        } catch (error: any) {
          setErrorMessage(error?.response?.data.message);
          setSubmitting(false);
          setIsError(true)
          setOpen(true)
        }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{horizontal : "center", vertical: "top" }}
        autoHideDuration={2000}
        open={open}
        onClose={handleClose}
        message={errorMessage}
      >
        <Alert
      onClose={handleClose}
      severity={isError ? "error" : "success"}
       variant="filled"
       sx={{ width: '100%' }}
  >
    {errorMessage}
  </Alert>
      </Snackbar>
    <Container sx={{
       display:'flex',
       alignItems:'center',
       justifyContent:'center',
       boxSizing: 'unset',
       width:'100vw',
       height:'100vh',
       backgroundColor: '#f8f8f8'
    }}>
      <Paper elevation={4} sx={{backgroundColor:'#f0f2f5',padding:2}}>
      <Typography
            component="h1"
            variant="h4"
            textAlign="center"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
        <Formik
         initialValues={{email : '',password: ''}}
         validate={(values: FormValues) => {
          const errors: FormErrors  = {}
           if(!values.email){
            errors.email = "Required"
           }
           else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
            errors.email = "Inavlid email address"
           }
           if(!values.password){
            errors.password = "Required"
           }
           return errors;
         }}
         onSubmit={(values, { setSubmitting, resetForm }) => handleSubmit(values, { setSubmitting, resetForm })}>{
          ({isSubmitting, handleChange, values, touched, errors, handleBlur, handleSubmit}) =>{
            return(
              <><Box
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: 2,
                }}
                 onSubmit={handleSubmit}
                >
                <FormControl sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start' }}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                   error={touched.email && Boolean(errors.email)}
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                     helperText={touched.email && errors.email}
                    variant="outlined" />
                  <FormLabel htmlFor="Password">Password</FormLabel>
                  <TextField
                   error={touched.password && Boolean(errors.password)}
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                    fullWidth
                    type="Password"
                    name="password"
                    placeholder="Password"
                    autoComplete="Password"
                     helperText={touched.password && errors.password}
                    variant="outlined" />
                </FormControl>
                <FormControlLabel control={<Checkbox value="remember" color="primary" />}
                  label="Remember me" />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >{isSubmitting ? <CircularProgress size={24} /> : 'Sign in'}</Button>
                <Link
                  to="/auth"
                  type="button"
                  >
                    <Typography textAlign="center">
                  Forgot your password?
                    </Typography>
                </Link>
              </Box><Divider>or</Divider><Box>
                  <Button
                    sx={{marginBottom:2}}
                    fullWidth
                    variant="outlined"
                     startIcon={<GoogleIcon />}
                    >
                    Sign in with Google
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                     startIcon={<FacebookIcon />}
                    >
                    Sign in with Facebook
                  </Button>
                  <Typography sx={{ textAlign: 'center', marginTop:1 }}>
                    Don&apos;t have an account?{' '}
                    <Link
                      to="register"
                      type="button"
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </Box></>
            )
          } 
        }
      
       </Formik>
      </Paper>
    </Container>
  </>
  )
}

export default Login