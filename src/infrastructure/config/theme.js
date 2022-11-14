import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// A custom theme for this app
const prepaireTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5498ef'
    },
    secondary: {
      main: '#1d1d1d',
    },
    info: {
      dark: '#4366BB',
      main: '#5498ef',
      light: '#C1DEFB',
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
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 800,
    },
    h5: {
      fontSize: '2.5rem',
      fontFamily: 'Arial',
      fontWeight: 800,
    },
    h6: {
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: 800,
      //fontFamily: 'SF Pro Display',
      color: '#1d1d1d',
    },
    body1: {
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
    },
    MuiDataGrid: {
      styleOverrides: {
        row: {
          "&.Mui-selected": {
            backgroundColor: "#C1DEFB",
          },
          '& .MuiCheckbox-root svg':{
            backgroundColor: 'transparent',
            borderRadius: 2,
          },
          '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
            backgroundColor: '#4366BB',
            fontSize: '1.4rem',
          },
          '& .MuiCheckbox-root svg path': {
            color: 'white',
          },
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiButton-contained": {
            color: 'white'
          }
        }
      }
    }
  }
});

const theme = responsiveFontSizes(prepaireTheme)

export default theme;
