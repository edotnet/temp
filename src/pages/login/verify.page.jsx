import * as React from 'react';
import {useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {styled} from '@mui/material/styles';
import {LoginAppBarComponent} from '../../infrastructure/components/loginAppbar.component';
import './login.scss'
import {useAuth} from "../../infrastructure/authentication/useAuth";
import {PrimaryButton} from "../../infrastructure/components/PrimaryButton";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

const VerifyTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 50,
    paddingLeft: 20,
    marginTop: 0,
    marginBottom: 16,
    paddingRight: 20,
  },
})
export const Verify = () => {

  const [message, setMessage] = useState('Please enter your code');
  const loginRef = useRef();
  const successRef = useRef();
  const {verify, resendVerify, login, error, loading} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get('code')) {
      setMessage('Please enter your code');
      return;
    }
    verify(location.state.email, data.get('code')).then(() => {
      loginRef.current.classList.toggle('hidden');
      successRef.current.classList.toggle('open')
      login(location.state.email, location.state.password).then(() => {
        navigate('/engine');
      });
    }).catch(err => {
      setMessage(err.message ?? 'Something went, please try again.');
    });
  };

  const resend = () => {
    resendVerify(location.state.email).then(() => {
      setMessage('Verification code sent, please check your email.');
    });
  }

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
            VERIFY ACCOUNT
          </Typography>
          <div className="login-box" ref={loginRef}>
            <Typography color={error ? 'error' : 'primary'}
                        sx={{marginTop: '20px', textAlign: 'center'}}> {message} </Typography>
            <Box component="form" className="loginform" onSubmit={handleSubmit} noValidate>
              <label className='loginlabel'>Code</label>
              <VerifyTextField error={!!error} fullWidth margin="normal" id="code" name="code" autoFocus
                               placeholder='Your code'/>

              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <PrimaryButton type="submit" sx={{mt: 3, mb: 2, px: 5}} title={loading ? 'Verifying...' : 'Verify'}
                               disabled={loading}/>
              </Box>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Button onClick={resend} className='loginforgetpass' variant="body2">
                  Resend code
                </Button>
              </Box>
            </Box>
          </div>
          <div className='login-success-content' ref={successRef}>
            <Box component="img" sx={{maxWidth: '80px'}}
                 src="https://res.cloudinary.com/djpepozcx/image/upload/v1651232576/success_oicvxo.png"/>
            <p>Verify Successful</p>
          </div>
        </Box>
        <Typography sx={{margin: '40px 0px 40px 0px'}} align="center">REIMAGINING DRUG DISCOVERY &
          DEVELOPMENT</Typography>
      </Container>
    </div>
  )
}
