import './App.css';
import { AppBarComponent } from "./infrastructure/components/Appbar.component";
import { Router } from "./Router";
import { CssBaseline } from "@mui/material";
import { EventEmitter } from "./infrastructure/event-system/EventEmitter";

function App() {
  return (
    <>
      <EventEmitter>
        <CssBaseline />
        <AppBarComponent/>
        <Router/>
      </EventEmitter>
    </>
  );
}

export default App;
