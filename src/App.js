import './App.css';
import { AppBarComponent } from "./infrastructure/components/Appbar.component";
import { Router } from "./Router";

function App() {
  return (
    <>
      <AppBarComponent/>
      <Router/>
    </>
  );
}

export default App;
