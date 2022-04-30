import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { LoginAppBarComponent } from '../infrastructure/components/loginAppbar.component';


export const Login = () => {
  
  let [error, setError] = useState('Please enter your details');
  let [color, setColor] = useState('#767373');
  let [border, setborder] = useState('defaultborder');
  let [logindefault, setLogindefault] = useState(null);



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get('email') === 'admin@prepaire.com' && data.get('password') === 'admin') {
      setError('Please enter your details');
      setColor('#767373')
      setborder('defaultborder');
      setLogindefault(true);
      setTimeout(()=> {
        window.location.href='/start';
      },500);
    } else {
      setError('Wrong email or password, please try again.');
      setColor('#eb1d25')
      setborder('alertborder');
    }
  };  

  const styles = {
    paperContainer: {
      backgroundImage: `url('https://res.cloudinary.com/djpepozcx/image/upload/v1650613711/background1_pbr16m.jpg`,
      backgroundSize: 'cover',
      height: '100vh',
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'transparent',
    boxShadow: 'none'
  }));
  
  
  return(
    <div style={styles.paperContainer}>
      <LoginAppBarComponent/>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff', padding: '20px 40px 20px 40px', borderRadius: '40px', height: '615px', position: 'relative'}}>
          <Typography component="h1" variant="h3">
            LOG IN
          </Typography>
          {
            logindefault === null ? 
              <div>
                <Typography sx={{ color: {color} ,marginTop: '20px', textAlign: 'center'}}> {error} </Typography>
                <Box component="form" className="loginform" onSubmit={handleSubmit} noValidate>
                  <label className='loginlabel'>Email</label>
                  <TextField className={border} fullWidth margin="normal" id="email" name="email" autoComplete="email" autoFocus placeholder='admin@prepaire.com'/>
                  <label className="loginlabel">Password</label>
                  <TextField className={border} margin="normal" required fullWidth name="password" type="password" id="password" autoComplete="current-password" placeholder='****'/>
                  <Grid container>
                    <Grid item xs>
                      <FormControlLabel className='logincheckbox' control={<Checkbox value="remember" color="primary" />} label="Remember me" />  
                    </Grid>
                    <Grid item>
                      <Link href="#" className='loginforgetpass' variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>            
                  <Button className="submitbtn" type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}> LOG IN </Button>
                </Box>
                <Typography sx={{color: '#767373', marginTop: '20px', marginBottom: '20px', textAlign: 'center'}}>Log in with</Typography>
                <Stack spacing={6} direction="row" justifyContent="center">
                  <Item>
                    <a href='./#' className='social-content'>
                      <Box component="img" alt="Google" src="https://res.cloudinary.com/djpepozcx/image/upload/v1650618040/Icon_awesome-google_i7c664.svg"/>
                      <Typography sx={{color: '#000'}}>Google</Typography>
                    </a>
                  </Item>
                  <Item>
                    <a href='./#' className='social-content'>
                      <Box component="img" alt="LinkedIn" src="https://res.cloudinary.com/djpepozcx/image/upload/v1650618040/Icon_awesome-linkedin-in_jvqs9k.svg"/>
                      <Typography sx={{color: '#000'}}>Linked In</Typography>
                    </a>
                  </Item>
                  <Item>
                    <a href='./#' className='social-content'>
                      <Box component="img" alt="Apple" src="https://res.cloudinary.com/djpepozcx/image/upload/v1650618040/Icon_awesome-apple_kcp13i.svg"/>
                      <Typography sx={{color: '#000'}}>Apple</Typography>
                    </a>
                  </Item>
                </Stack>
              </div>
            : <div className='login-success-content'>
                <Box component="img" sx={{maxWidth: '80px'}} src="https://res.cloudinary.com/djpepozcx/image/upload/v1651232576/success_oicvxo.png"></Box>
                <p>Login Successful</p>
            </div>
          }
        </Box>
        <Typography sx={{margin: '40px 0px 40px 0px'}} align="center">REIMAGINING DRUG DISCOVERY & DEVELOPMENT</Typography>
      </Container>
    </div>  
  )
}