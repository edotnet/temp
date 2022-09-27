import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { LoginAppBarComponent } from '../../infrastructure/components/loginAppbar.component';
import './login.scss'
import { useAuth } from "../../infrastructure/authentication/useAuth";
import { PrimaryButton } from "../../infrastructure/components/PrimaryButton";
import {Link, useNavigate} from "react-router-dom";
import {Grid} from "@mui/material";

const LoginTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 50,
    paddingLeft: 20,
    marginTop: 0,
    marginBottom: 16,
    paddingRight: 20,
  },
})
export const Login = () => {

  const [message, setMessage] = useState('Please enter your details');
  const loginRef = useRef();
  const successRef = useRef();
  const {login, error, loading} = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(data.get('email'), data.get('password')).then(() => {
      loginRef.current.classList.toggle('hidden');
      successRef.current.classList.toggle('open')
      setTimeout(() => {
        navigate('/engine/search', true);
      }, 500);
    }).catch(err => {
      setMessage('Wrong email or password, please try again.');
    });
  };

  const styles = {
    paperContainer: {
      backgroundImage: `url('https://res.cloudinary.com/djpepozcx/image/upload/v1650613711/background1_pbr16m.jpg`,
      backgroundSize: 'cover',
      height: '100vh',
    }
  };

  const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'transparent',
    boxShadow: 'none'
  }));


  return (
    <div style={styles.paperContainer}>
      <LoginAppBarComponent/>
      <Container component="main" maxWidth="sm">
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: '20px 40px 20px 40px',
          borderRadius: '40px',
          position: 'relative'
        }}>
          <Typography component="h1" variant="h4">
            LOG IN
          </Typography>
          <div className="login-box" ref={loginRef}>
            <Typography color={error ? 'error' : 'primary'}
                        sx={{marginTop: '20px', textAlign: 'center'}}> {message} </Typography>
            <Box component="form" className="loginform" onSubmit={handleSubmit} noValidate>
              <label className='loginlabel'>Email</label>
              <LoginTextField error={!!error} fullWidth margin="normal" id="email" name="email" autoComplete="email"
                              autoFocus placeholder='admin@prepaire.com'/>
              <label className="loginlabel">Password</label>
              <LoginTextField error={!!error} margin="normal" required fullWidth name="password" type="password"
                              id="password" autoComplete="current-password" placeholder='****'/>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <PrimaryButton type="submit" sx={{mt: 3, mb: 2, px: 5}} title={loading ? 'Login...' : 'Login'} disabled={loading}/>
              </Box>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Link to="/signup" className='loginforgetpass' variant="body2">
                  Don't have account yet? Sign Up
                </Link>
              </Box>
            </Box>
            {/*
            <Typography sx={{color: '#767373', marginTop: '20px', marginBottom: '20px', textAlign: 'center'}}>Log in with</Typography>
            <Stack spacing={6} direction="row" justifyContent="center">
              <Item>
                <a href='..#' className='social-content'>
                  <Box component="img" alt="Google"
                       src="https://res.cloudinary.com/djpepozcx/image/upload/v1650618040/Icon_awesome-google_i7c664.svg"/>
                  <Typography sx={{color: '#000'}}>Google</Typography>
                </a>
              </Item>
              <Item>
                <a href='..#' className='social-content'>
                  <Box component="img" alt="LinkedIn"
                       src="https://res.cloudinary.com/djpepozcx/image/upload/v1650618040/Icon_awesome-linkedin-in_jvqs9k.svg"/>
                  <Typography sx={{color: '#000'}}>Linked In</Typography>
                </a>
              </Item>
              <Item>
                <a href='..#' className='social-content'>
                  <Box component="img" alt="Apple"
                       src="https://res.cloudinary.com/djpepozcx/image/upload/v1650618040/Icon_awesome-apple_kcp13i.svg"/>
                  <Typography sx={{color: '#000'}}>Apple</Typography>
                </a>
              </Item>
            </Stack>
            */}
          </div>
          <div className='login-success-content' ref={successRef}>
            <Box component="img" sx={{maxWidth: '80px'}}
                 src="https://res.cloudinary.com/djpepozcx/image/upload/v1651232576/success_oicvxo.png"/>
            <p>Login Successful</p>
          </div>
        </Box>
        <Typography sx={{margin: '40px 0px 40px 0px'}} align="center">REIMAGINING DRUG DISCOVERY &
          DEVELOPMENT</Typography>
      </Container>
    </div>
  )
}
