import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

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
ReactDOM.render( <StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
</StrictMode>, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
