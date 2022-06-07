import { DashboardLayout } from "../infrastructure/layouts/Dashboard.layout";
//import { useWindowSize } from "../infrastructure/hooks/useWindowSize";
import { useState } from "react";
//import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {useLocation, useNavigate,  Route, Routes,} from "react-router-dom";
import './Engine.scss';
import {Text2xdlFeature} from "../modules/text2xdl/Text2xdl";
import {SearchFeature} from "../modules/search/search";

export const Engine = () => {
  let [loading, setLoading] = useState(true);
  let [defaultView, setdefaultView] = useState(null)
  const [text, setText] = useState('');

  const navigate = useNavigate();
  let hideSpinner = () => {
      setLoading(false);
  };

  const linkToroute = (parameter) => (event) => {
    event.preventDefault();
    navigate(parameter, true);
    if(parameter === 'search') {
      console.log('text', text);
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
          <Grid item>
            <Button className='searchEngin-headerbtn' variant="outlined" onClick={linkToroute('search')}>Search</Button>
          </Grid>
          <Grid item>
            <Button className='searchEngin-headerbtn' variant="outlined" onClick={linkToroute('text2xdl')}>Upload Text2XDL</Button>
          </Grid>
          <Grid item>
            <Button className='searchEngin-headerbtn' variant="outlined" onClick={linkToroute('drug')}>Upload Drug Synthesis</Button>
          </Grid>
        </Grid>

        <Routes>
          <Route path="search" element={<SearchFeature name={text}/>}></Route>
          <Route path="text2xdl" element={<Text2xdlFeature/>}></Route>
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
