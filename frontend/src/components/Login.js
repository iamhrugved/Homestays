import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import loginBackgroundImage from '../images/loginBackground.jpg';
import axios from 'axios';
import { Radio, RadioGroup } from '@mui/material';
import { FormControl } from '@mui/material';
import { FormLabel } from '@mui/material';
import { serverURL } from "../utils/config";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
    let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('loginAs'));
    const customerLoginPath = '/customer/loginCustomer';
    const customerHomePath = '/customer/home';
    const employeeLoginPath = '/employee/loginEmployee';
    const employeeHomePath = '/admin';

    let loginPath = '', homeNavigationPath = '';
    if(data.get('loginAs') === 'customer') {
        loginPath = customerLoginPath;
        homeNavigationPath = customerHomePath;
    }
    else if(data.get('loginAs') === 'employee') {
        loginPath = employeeLoginPath;
        homeNavigationPath = employeeHomePath;
    }
    console.log(`login as ${data.get('loginAs')}`);
    axios.post(`${serverURL}${loginPath}`, {
        'email': data.get('email'),
        'password': data.get('password')
    })
        .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response);
                    localStorage.setItem("email", data.get('email'));
                    localStorage.setItem("name", response.data.name);
                    localStorage.setItem("type", data.get('loginAs'));
                    navigate(`${homeNavigationPath}`);
                }
            })
        .catch(error => {
            console.log("In error");
            console.log(error);
            alert("User credentials not valid. Please try again!");
        })
    }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${loginBackgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
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
                <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Login As</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="loginAs"
                        >
                            <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                            <FormControlLabel value="employee" control={<Radio />} label="Host" />
                        </RadioGroup>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </Button>
                <Grid container>
                    <Grid item xs>
                    <Link href="/customer/signup" variant="body2">
                        {"Sign up as a customer"}
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link href="/employee/signup" variant="body2">
                        {"Sign up as a host"}
                    </Link>
                    </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}