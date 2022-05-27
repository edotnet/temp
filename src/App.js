import { Router } from "./Router";
import { CssBaseline } from "@mui/material";
import { EventEmitter } from "./infrastructure/event-system/EventEmitter";
import './App.scss';

function App() {
  return (
    <>
      <EventEmitter>
        <CssBaseline />
        <Router/>
      </EventEmitter>
    </>
  );
}

export default App;
