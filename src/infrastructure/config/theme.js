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
      fontSize: '2.5rem',
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
            backgroundColor: "#e3e2ff",
          },
          '& .MuiCheckbox-root svg':{
            backgroundColor: 'transparent',
            borderRadius: 2,
          },
          '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
            backgroundColor: 'rgba(93, 103, 187, .6)',
            fontSize: '1.4rem',
          },
          '& .MuiCheckbox-root svg path': {
            color: 'white',
          },
        }
      }
    }
  }
});

const theme = responsiveFontSizes(prepaireTheme)

export default theme;
