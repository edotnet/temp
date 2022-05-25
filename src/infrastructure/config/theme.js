import { createTheme } from '@mui/material/styles';

// A custom theme for this app
export const prepaireTheme = createTheme({
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
    fontFamily: 'Work Sans',
    h1: {
      fontWeight: 700,
      fontSize: 43,
      lineHeight: '56px'
    },
    h4: {
      fontSize: 46,
    },
    h5: {
      fontSize: 40,
      fontWeight: 300,
    },
    h6: {
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
