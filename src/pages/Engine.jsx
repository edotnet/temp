import { DashboardLayout } from "../infrastructure/layouts/Dashboard.layout";
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Route, Routes, NavLink,} from "react-router-dom";
import {Text2xdlFeature} from "../modules/text2xdl/Text2xdl";
import {SearchFeature} from "../modules/search/search";
import { DrugSynthesisFeature } from "../modules/drug-synthesis/drug-synthesis-feature";
import './Engine.scss';

export const Engine = () => {
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

        <Routes>
          <Route path="search" element={<SearchFeature/>}></Route>
          <Route path="text2xdl" element={<Text2xdlFeature/>}></Route>
          <Route path="drugsynthesis" element={<DrugSynthesisFeature />}/>
        </Routes>
        </Container>
    </DashboardLayout>
  );
}
