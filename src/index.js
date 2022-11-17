import {SnackbarProvider} from 'notistack';
import {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from "./infrastructure/config/theme";
import {HashRouter} from "react-router-dom";
import "@fontsource/work-sans";
import {ThemeProvider} from '@mui/material/styles';


/*const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
 */
ReactDOM.render(<StrictMode>
  <ThemeProvider theme={theme}>
    <SnackbarProvider>
    <HashRouter>
      <App/>
    </HashRouter>
    </SnackbarProvider>
  </ThemeProvider>
</StrictMode>, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
