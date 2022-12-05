import {Router} from "./Router";
import {CssBaseline} from "@mui/material";
import {EventEmitter} from "./infrastructure/event-system/EventEmitter";
import './App.scss';
import {DashboardContextProvider} from "./modules/dashboard/context/DashboardContext";
import {EngineContextProvider} from "./modules/engine/EngineContext";
import {AuthProvider} from "./infrastructure/authentication/AuthProvider";
import { Notifications } from './infrastructure/Notifications';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import {LocalizationProvider} from "@mui/x-date-pickers";
function App() {


  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <AuthProvider>
        <EventEmitter>
          <CssBaseline/>
          <DashboardContextProvider>
            <EngineContextProvider>
              <Notifications />
              <Router/>
            </EngineContextProvider>
          </DashboardContextProvider>
        </EventEmitter>
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default App;
