import { DashboardLayout } from "../infrastructure/layouts/Dashboard.layout";
//import { useWindowSize } from "../infrastructure/hooks/useWindowSize";
import { useState } from "react";
//import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
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
  const [text, setText] = useState('');

  const navigate = useNavigate();
  let hideSpinner = () => {
      setLoading(false);
  };

  const linkToroute = (parameter) => (event) => {
    event.preventDefault();
    if(parameter === 'search') {
      if(text.length !== 0) {
        navigate(parameter, true);
        // navigate(0);
      }
    } else {
      setActive(parameter);
      navigate(parameter, true);
    }
  }

  const location = useLocation()
  const handleChange = (event, newValue) => {
    console.log(newValue);
    //navigate(newValue, true);
  };

  return (
    <DashboardLayout style={{height: '100%'}}>
      <Container maxWidth="xl">
        {/* <Typography variant="h5" className="title searchEngine-heading" color="secondary">Search Engine</Typography> */}
        <h1 className="searchEngine-heading">Search Engine</h1>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Input
              fullWidth
              className="searchEngine-input"
              placeholder="Search for..."
              inputProps='description'
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </Grid>
          <Grid item style={{paddingLeft: '0px'}}>
            <Button className='searchEngin-headerbtn btn-white' variant="outlined" onClick={linkToroute('search')}>Search</Button>
          </Grid>
          <Grid item>
            <Button className={`searchEngin-headerbtn ${active === "text2xdl" && 'active'}`} variant="outlined" onClick={linkToroute('text2xdl')}>Upload Text2XDL</Button>
          </Grid>
          <Grid item>
            <Button className={`searchEngin-headerbtn ${active === "drug-synthesis" && 'active'}`} variant="outlined" onClick={linkToroute('drug-synthesis')}>Upload Drug Synthesis</Button>
          </Grid>
        </Grid>

        <Routes>
          <Route path="search" element={<SearchFeature name={text}/>}></Route>
          <Route path="text2xdl" element={<Text2xdlFeature/>}></Route>
          <Route path="drug-synthesis" element={<DrugSynthesisFeature />}/>
        </Routes>
        </Container>
      {/* {
        loading ?
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
          <Box> <CircularProgress /> 
            <h4>Loading...</h4>
          </Box>
        </div> 
        : null
      } */}
      {/* <iframe class="engine" title="search" style={{maxWidth: '100%'}} src="https://c45c-5-228-163-101.eu.ngrok.io/?mode=Search+Engine" width={width} height={height} onLoad={hideSpinner} frameBorder="0" marginHeight="0" marginWidth="0"/> */}
    </DashboardLayout>
  );
}
