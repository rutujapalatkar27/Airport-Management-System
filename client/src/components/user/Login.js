import React, {useContext} from 'react';
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
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { redirect, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import Radio from '@mui/material/Radio';
import { signIn } from '../../services/userService';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Login = () => {
    const authContext = useContext(AuthContext);
    const {setAuthState, setUserDetailsLocally, userDetails} = authContext;
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const response = await signIn({
          email: data.get('email'),
          password: data.get('password'),
        })
        if(response.status === 200){
            setAuthState(true);
            setUserDetailsLocally({...userDetails, ...response.data.payload});
            setTimeout(()=>{
                navigate('/dashboard');
            }, 500);
        }
        else{
            setAuthState(false);
            console.log('Error', response);
        }
    };

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
                backgroundImage: 'url(https://www.frost.com/wp-content/uploads/2021/06/Total-Airport-Maintenance-Copy-1080x675.jpg)',
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
                <Avatar src="/broken-image.jpg" />
                <h1 />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign in
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                <br></br>
                <Grid item xs={12}>
                    {/* <div class="form-check form-check-inline">
                        <input onChange={handlPersona} value="customer" class="form-check-input" type="radio" name="customer" id="customer"/>
                        <label class="form-check-label" for="customer">
                        Customer
                        </label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input onChange={handlPersona} value="customer" class="form-check-input" type="radio" name="carOwner" id="carOwner"/>
                        <label class="form-check-label" for="carOwner">
                        Car Owner
                        </label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input onChange={handlPersona} value="customer" class="form-check-input" type="radio" name="admin" id="admin"/>
                        <label class="form-check-label" for="admin">
                        Admin
                        </label>
                    </div> */}
                    {/* <Radio value={'customer'} checked={row.carId === props.ride.carId} onChange={selectCar}>Customer</Radio>
                    <Radio value={JSON.stringify(row)} checked={row.carId === props.ride.carId} onChange={selectCar}>Owner</Radio>
                    <Radio value={JSON.stringify(row)} checked={row.carId === props.ride.carId} onChange={selectCar}>Admin</Radio> */}
                    
                </Grid>
                <br>
                
                </br>

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
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
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
                    <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
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

export default Login;