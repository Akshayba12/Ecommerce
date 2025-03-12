/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Box, Button, CircularProgress, Container, Divider, FormControl, FormLabel, Paper, Snackbar, TextField, Typography } from "@mui/material"
import { Formik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { FacebookIcon, GoogleIcon } from "../../components/CustomIcons/CustomIcons"
import axiosInstance from "../../services/axiosinstance"
import { useState } from "react"
interface FormErrors {
  name?: string;
  email?: string;
  Password?: string;
}

const Register = () => {

  const navigate = useNavigate()
   const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false)
    const [open, setOpen] = useState(false)

    const handleClose = () => {
      setOpen(false);
    };

  return (
    <>
    <Snackbar
     anchorOrigin={{horizontal : "center", vertical: "top" }}
     autoHideDuration={5000}
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
      <Paper elevation={4} sx={{padding:2}}>
      <Typography
            component="h1"
            variant="h4"
            textAlign="center"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign Up
          </Typography>
        <Formik
         initialValues={{name: '',email : '',Password: ''}}
         validate={(values) => {
          const errors: FormErrors = {}
          if(!values.name){
            errors.name = "Required"
           }
           if(!values.email){
            errors.email = "Required"
           }
           else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
            errors.email = "Inavlid email address"
           }
           if(!values.Password){
            errors.Password = "Required"
           }
           return errors;
         }}
         onSubmit={(values, { setSubmitting, resetForm }) => {
          axiosInstance.get('/getAllUser').then((val) =>{
            const userExists = val.data.some((user: any) => user.email === values.email)
            if(userExists){
              setErrorMessage("email already exists")
              setIsError(true)
              setOpen(true)
            }
          })
          console.log("Form values on submit: ", values);
          setSubmitting(false);
          axiosInstance.post("/signup", {
            name: values.name,
            email: values.email,
            password: values.Password
          }).then(() =>{
              setTimeout(() => {
                navigate('/auth')
                 resetForm()
              }, 2000)
              setOpen(true)
              setErrorMessage("user added successfully")

            }).catch((error) => {
              console.log(error)
            })
          // Store form values in local storage on submit
      }}>{
          ({isSubmitting, handleChange, values, touched, errors, handleBlur, handleSubmit}) =>{
            return(
              <><Box
                component="form"
                 onSubmit={handleSubmit}
                >
                <FormControl sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start' }}>
                  <FormLabel htmlFor="name">Full Name</FormLabel>
                  <TextField
                   error={touched.name && Boolean(errors.name)}
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    type="name"
                    name="name"
                    placeholder="Name"
                     helperText={touched.name && errors.name}
                    variant="outlined" />
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
                   error={touched.Password && Boolean(errors.Password)}
                  value={values.Password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                    fullWidth
                    type="Password"
                    name="Password"
                    placeholder="Password"
                    autoComplete="Password"
                     helperText={touched.Password && errors.Password}
                    variant="outlined" />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{marginTop:1}}
                >{isSubmitting ? <CircularProgress size={24} /> : 'Sign Up'}</Button>
              </Box><Divider>or</Divider>
              <Box>
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
                    startIcon={<FacebookIcon />}>
                    Sign in with Facebook
                  </Button>
                </Box>
                  <Typography sx={{ textAlign: 'center', marginTop:1 }}>
                    Already, have an account?{' '}
                    <Link
                      to="/auth"
                      type="button"
                    >
                      Sign In
                    </Link>
                  </Typography>
                </>
            )
          } 
        }
      
       </Formik>
      </Paper>
    </Container>
  </>
  )
}

export default Register