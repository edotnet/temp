import * as React from 'react';
import { useRef, useState } from 'react';
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
import { LoginAppBarComponent } from '../../infrastructure/components/loginAppbar.component';
import { useNavigate } from "react-router-dom";
import './login.scss'

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

  let [message, setMessage] = useState('Please enter your details');
  let [error, setError] = useState(false);
  const navigate = useNavigate();
  const loginRef = useRef();
  const successRef = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('email') === 'admin@prepaire.com' && data.get('password') === 'admin') {
      loginRef.current.classList.toggle('hidden');
      successRef.current.classList.toggle('open')
      setTimeout(() => {
        navigate('/dashboard', true);
      }, 1000);
    } else {
      setMessage('Wrong email or password, please try again.');
      setError(true);
    }
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
        <CssBaseline/>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: '20px 40px 20px 40px',
          borderRadius: '40px',
          height: '615px',
          position: 'relative'
        }}>
          <Typography component="h1" variant="h3">
            LOG IN
          </Typography>
          <div className="login-box" ref={loginRef}>
            <Typography color={error ? 'error' : 'primary'}
                        sx={{marginTop: '20px', textAlign: 'center'}}> {message} </Typography>
            <Box component="form" className="loginform" onSubmit={handleSubmit} noValidate>
              <label className='loginlabel'>Email</label>
              <LoginTextField error={error} fullWidth margin="normal" id="email" name="email" autoComplete="email"
                              autoFocus placeholder='admin@prepaire.com'/>
              <label className="loginlabel">Password</label>
              <LoginTextField error={error} margin="normal" required fullWidth name="password" type="password"
                              id="password" autoComplete="current-password" placeholder='****'/>
              <Grid container>
                <Grid item xs>
                  <FormControlLabel className='logincheckbox' control={<Checkbox value="remember" color="primary"/>}
                                    label="Remember me"/>
                </Grid>
                <Grid item>
                  <Link href="#" className='loginforgetpass' variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Button className="submitbtn" type="submit" variant="contained" sx={{mt: 3, mb: 2}}> LOG IN </Button>
            </Box>
            <Typography sx={{color: '#767373', marginTop: '20px', marginBottom: '20px', textAlign: 'center'}}>Log in
              with</Typography>
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
