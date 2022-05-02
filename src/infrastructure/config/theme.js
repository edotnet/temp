import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#222A47'
    },
    info: {
      main: '#8676ff',
    },
    error: {
      main: '#ff708a'
    }
  },
  typography: {
    fontFamily: 'Helvetica Neue',
    h1: {
      fontFamily: 'Open Sans',
      fontWeight: 700,
      fontSize: 43,
      lineHeight: '56px'
    },
    h6: {
      fontFamily: 'Archivo',
      fontWeight: 400,
    },    
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "white"
        },
      }
    }
  }
});

export default theme;
