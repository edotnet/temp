import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {styled} from '@mui/material/styles';
import {LoginAppBarComponent} from '../../infrastructure/components/loginAppbar.component';
import './login.scss'
import {useAuth} from "../../infrastructure/authentication/useAuth";
import {PrimaryButton} from "../../infrastructure/components/PrimaryButton";
import {Link, useNavigate} from "react-router-dom";

const SignupTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 50,
    paddingLeft: 20,
    marginTop: 0,
    marginBottom: 16,
    paddingRight: 20,
  },
})
export const Signup = () => {

  const [message, setMessage] = useState('Please enter your details');
  const loginRef = useRef();
  const successRef = useRef();
  const {signup, error, loading} = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('password') !== data.get('confirm-password')) {
      setMessage('Passwords do not match, please try again.');
      return;
    }
    signup(data.get('name'), data.get('email'), data.get('password')).then(() => {
      loginRef.current.classList.toggle('hidden');
      successRef.current.classList.toggle('open')
      setTimeout(() => {
        navigate('/engine/search', true);
      }, 500);
    }).catch(err => {
      setMessage('Something went, please try again.');
    });
  };

  const styles = {
    paperContainer: {
      backgroundImage: `url('https://res.cloudinary.com/djpepozcx/image/upload/v1650613711/background1_pbr16m.jpg`,
      backgroundSize: 'cover',
      height: '100vh',
    }
  };

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
            SIGNUP
          </Typography>
          <div className="login-box" ref={loginRef}>
            <Typography color={error ? 'error' : 'primary'}
                        sx={{marginTop: '20px', textAlign: 'center'}}> {message} </Typography>
            <Box component="form" className="loginform" onSubmit={handleSubmit} noValidate>
              <label className='loginlabel'>Email</label>
              <SignupTextField error={!!error} fullWidth margin="normal" id="email" name="email" autoComplete="email"
                               autoFocus placeholder='admin@prepaire.com'/>

              <label className="loginlabel">Password</label>
              <SignupTextField error={!!error} margin="normal" required fullWidth name="password" type="password"
                               id="password" autoComplete="current-password" placeholder='****'/>

              <label className="loginlabel">Confirm password</label>
              <SignupTextField error={!!error} margin="normal" required fullWidth name="confirm-password" type="password"
                               id="confirm-password" autoComplete="current-password" placeholder='****'/>


              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <PrimaryButton type="submit" sx={{mt: 3, mb: 2, px: 5}} title={loading ? 'Signup...' : 'Signup'}
                               disabled={loading}/>
              </Box>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Link to="/login" className='loginforgetpass' variant="body2">
                  Already have an account? Login
                </Link>
              </Box>
            </Box>
          </div>
          <div className='login-success-content' ref={successRef}>
            <Box component="img" sx={{maxWidth: '80px'}}
                 src="https://res.cloudinary.com/djpepozcx/image/upload/v1651232576/success_oicvxo.png"/>
            <p>Signup Successful</p>
          </div>
        </Box>
        <Typography sx={{margin: '40px 0px 40px 0px'}} align="center">REIMAGINING DRUG DISCOVERY &
          DEVELOPMENT</Typography>
      </Container>
    </div>
  )
}
