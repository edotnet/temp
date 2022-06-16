import { DashboardLayout } from "../infrastructure/layouts/Dashboard.layout";
import { useState } from "react";
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useLocation, useNavigate,  Route, Routes,} from "react-router-dom";
import './Engine.scss';
import {Text2xdlFeature} from "../modules/text2xdl/Text2xdl";
import {SearchFeature} from "../modules/search/search";
import { DrugSynthesisFeature } from "../modules/drug-synthesis/drug-synthesis-feature";


export const Engine = () => {
  let [loading, setLoading] = useState(true);
  let [defaultView, setdefaultView] = useState(null);
  let [active, setActive] = useState('');


  const navigate = useNavigate();

  const linkToroute = (parameter) => (event) => {
    event.preventDefault();
    setActive(parameter);
    navigate(parameter, true);
  }

  return (
    <DashboardLayout style={{height: '100%'}}>
      <Container maxWidth="xl">
        {/* <Typography variant="h5" className="title searchEngine-heading" color="secondary">Search Engine</Typography> */}
        <h1 className="searchEngine-heading">Search Engine</h1>
        <Grid container spacing={2}>
          <Grid item>
            <Button className={`searchEngin-headerbtn ${active === "search" && 'active'}`} variant="outlined" onClick={linkToroute('search')}>Search Page</Button>
          </Grid>
          <Grid item>
            <Button className={`searchEngin-headerbtn ${active === "text2xdl" && 'active'}`} variant="outlined" onClick={linkToroute('text2xdl')}>Upload Text2XDL</Button>
          </Grid>
          <Grid item>
            <Button className={`searchEngin-headerbtn ${active === "drug-synthesis" && 'active'}`} variant="outlined" onClick={linkToroute('drug-synthesis')}>Upload Drug Synthesis</Button>
          </Grid>
        </Grid>

        <Routes>
          <Route path="search" element={<SearchFeature/>}></Route>
          <Route path="text2xdl" element={<Text2xdlFeature/>}></Route>
          <Route path="drug-synthesis" element={<DrugSynthesisFeature />}/>
        </Routes>
        </Container>
    </DashboardLayout>
  );
}
