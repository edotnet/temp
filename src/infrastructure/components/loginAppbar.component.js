import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../../assets/svg/logo.svg';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#46aaff',
      contrastText: '#fff',
    },
  },
});


export const LoginAppBarComponent = () => {

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'transparent',
    boxShadow: 'none'
  }));

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{backgroundColor: 'transparent', boxShadow: 'none', padding:'20px 0px 20px 0px'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
              <Grid container spacing={3}>
                  <Grid item xs={2}>
                      <Box component="img" sx={{maxWidth: '100%', maxHeight: 50}} src={Logo}/>
                  </Grid>
                  <Grid item xs={10}>
                      <Stack direction="row" spacing={12} justifyContent="flex-end">
                          <Item>
                              <Button sx={{color: '#222a47'}} variant="text">Home</Button>
                          </Item>
                          <Item>
                              <Button sx={{color: '#222a47'}} variant="text">About</Button>
                          </Item>
                          <Item>
                              <Button sx={{color: '#222a47'}} variant="text">Product</Button>
                          </Item>
                          <Item>
                              <Button sx={{width: '200px', borderRadius: '40px' }}  color="neutral" variant="contained">Get Started</Button>
                          </Item>
                      </Stack>
                  </Grid>
              </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
