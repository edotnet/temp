import './App.css';
import { Router } from "./Router";
import { CssBaseline } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material";
import { EventEmitter } from "./infrastructure/event-system/EventEmitter";
import { lightTheme } from "./infrastructure/config/theme";

const PrepaireTheme = createTheme(lightTheme)

function App() {
  return (
    <>
      <ThemeProvider theme={PrepaireTheme}>
        <EventEmitter>
          <CssBaseline />
          <Router />
        </EventEmitter>
      </ThemeProvider>
    </>
  );
}

export default App;
