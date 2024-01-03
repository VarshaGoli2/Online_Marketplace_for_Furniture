import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import SlideshowGrid from '../components/SlideshowGrid';
import useAuth from '../components/custom-hooks/useAuth'

export default function SignInSide() {
  const navigate = useNavigate();
  const { isLoggedIn, loginCallback } = useAuth();

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const loginData = {
      username: data.get('username'),
      password: data.get('password')
    }

    try {
      const response = await axios.post("http://localhost:5001/users/signin", 
                        loginData);
      if (response.status === 200) {
        toast.success('User logged in.', { autoClose: 5 });
        loginCallback(loginData.username);
        setTimeout(() => {
          navigate('/home');
        }, 500);
      } else {
        // Signup failed
        toast.error('Login Failed.', { autoClose: 15 });
      }
    } catch (error) {
      console.log(error)
      toast.error(`${error.response.data.message}`, { autoClose: 15 });
    }
  };
  
  return (
    <Helmet title='Login'>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <SlideshowGrid />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'var(--primary-color)' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              className="login__btn"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , bgcolor: 'var(--primary-color)'}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>  
    </Helmet>
  );
}