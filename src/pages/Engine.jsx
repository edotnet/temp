import {DashboardLayout} from "../infrastructure/layouts/Dashboard.layout";
import {Container} from '@mui/material';
import Grid from '@mui/material/Grid';
import {NavLink, Outlet } from "react-router-dom";
import './Engine.scss';
import { useDashboardContext } from "../modules/dashboard/context/useDashboarContext";

export const Engine = () => {
  const {state} = useDashboardContext();
  return (
    <DashboardLayout style={{height: '100%'}}>
      <Container maxWidth="xl">
        <h1 className="searchEngine-heading">Search Engine</h1>
        <Grid container spacing={2}>
          <Grid item>
            <nav className="searchnavlink">
              <NavLink to="/engine/search">Search Page</NavLink>
              <NavLink to="/engine/text2xdl">Upload Text2XDL</NavLink>
              <NavLink to="/engine/drugsynthesis">Upload Drug Synthesis</NavLink>
            </nav>
          </Grid>
        </Grid>
        <Outlet/>
      </Container>
    </DashboardLayout>
  );
}
