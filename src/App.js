import './App.css';
import { AppBarComponent } from "./infrastructure/components/Appbar.component";
import { Router } from "./Router";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <AppBarComponent/>
      <Router/>
    </>
  );
}

export default App;
