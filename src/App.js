import { Router } from "./Router";
import { CssBaseline } from "@mui/material";
import { EventEmitter } from "./infrastructure/event-system/EventEmitter";
import './App.scss';
import { DashboardContext, DashboardContextProvider } from "./modules/dashboard/context/DashboardContext";

function App() {
  return (
    <>
      <EventEmitter>
        <CssBaseline />
        <DashboardContextProvider>
          <Router/>
        </DashboardContextProvider>
      </EventEmitter>
    </>
  );
}

export default App;
