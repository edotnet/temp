import {Container, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import {NavLink, Outlet} from "react-router-dom";
import {DashboardLayout} from "../../infrastructure/layouts/Dashboard.layout";
import './Tools.page.scss';

export const ToolsPage = () => {
  return (
    <DashboardLayout style={{height: '100%'}}>
      <Container maxWidth="xl" className="tools-page">
        <Typography variant="h4" mb={6} mt={4} sx={{textTransform: 'uppercase'}}>Tools</Typography>
        <Grid container spacing={2}>
          <Grid item>
            <nav className="searchnavlink">
              <NavLink to="/tools/text2xdl">Upload Text2XDL</NavLink>
              <NavLink to="/tools/drugsynthesis">Upload Drug Synthesis</NavLink>
              <NavLink to="/tools/drug2xdl">Drug to XDL</NavLink>
            </nav>
          </Grid>
        </Grid>
        <Outlet/>
      </Container>
    </DashboardLayout>
  );
}
