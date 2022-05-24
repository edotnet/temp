import { createTheme } from '@mui/material/styles';

// A custom theme for this app
export const lightTheme = {
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
    fontFamily: 'Work Sans',
    h1: {
      fontWeight: 700,
      fontSize: 43,
      lineHeight: '56px'
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
};
