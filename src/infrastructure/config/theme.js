import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// A custom theme for this app
const prepaireTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#222A47'
    },
    secondary: {
      main: '#1d1d1d',
    },
    info: {
      main: '#8676ff',
    },
    error: {
      main: '#ff708a'
    }
  },
  typography: {
    // htmlFontSize: 16,
    fontFamily: 'Work Sans',
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h4: {
      fontSize: '2rem',
    },
    h5: {
      fontSize: 42,
    },
    h6: {
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: 500,
      color: '#1d1d1d',
    },
    body1: {
      fontSize: 18,
      fontWeight: 300,
      color: '#1d1d1d',
    }
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

const theme = responsiveFontSizes(prepaireTheme)

export default theme;
