import { DashboardLayout } from "../infrastructure/layouts/Dashboard.layout";
import { useWindowSize } from "../infrastructure/hooks/useWindowSize";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export const Engine = () => {
  const {width, height} = useWindowSize();
  let [loading, setLoading] = useState(true);

  let hideSpinner = () => {
      setLoading(false);
  };

  return (
    <DashboardLayout style={{height: '100%'}}>
      {
        loading ?
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
          <Box> <CircularProgress /> 
            <h4>Loading...</h4>
          </Box>
        </div> 
        : null
      }
      <iframe class="engine" title="search" style={{maxWidth: '100%'}} src="https://c45c-5-228-163-101.eu.ngrok.io/?mode=Search+Engine" width={width} height={height} onLoad={hideSpinner} frameBorder="0" marginHeight="0" marginWidth="0"/>
    </DashboardLayout>
  );
}
