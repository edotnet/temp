import { Router } from "./Router";
import { CssBaseline } from "@mui/material";
import { EventEmitter } from "./infrastructure/event-system/EventEmitter";
import './App.scss';
import { DashboardContextProvider } from "./modules/dashboard/context/DashboardContext";
import { EngineContextProvider } from "./modules/engine/EngineContext";

function App() {
  return (
    <>
      <EventEmitter>
        <CssBaseline />
        <DashboardContextProvider>
          <EngineContextProvider>
            <Router/>
          </EngineContextProvider>
        </DashboardContextProvider>
      </EventEmitter>
    </>
  );
}

export default App;
