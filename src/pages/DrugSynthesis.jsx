import { DashboardLayout } from "../infrastructure/layouts/Dashboard.layout";
import { useWindowSize } from "../infrastructure/hooks/useWindowSize";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SynthesisDropzoneArea } from "../infrastructure/components/SynthesisDropzoneArea";
import { Typography } from "@mui/material";

import "./DrugSynthesis.css";



export const DrugSynthesis = () => {
  const {width, height} = useWindowSize();
  let [loading, setLoading] = useState(true);
  const [file, setFile] = useState([]);

  const handleChange = (file) => {
         console.log(file);
        setFile(file);
  }

  const uploadFile = (files) => {
    setFile(files);
    const formData = new FormData(); 
    // files.map((file, index) => {
    //   formData.append(`file${index}`, file);
    // });
    formData.append(`synthesisFile`, files[0]);
    fetch('https://path/to/api', {
      // content-type header should not be specified!
      method: 'POST',
      body: formData,
    }).then(response => response.json())
      .then(success => {
        // Do something with the successful response
      })
      .catch(error => console.log(error)
    );
  }

  let hideSpinner = () => {
      setLoading(false);
  };

  return (
    <DashboardLayout style={{height: '100%', display: 'flex', justifyContent: 'center'}}>
        <div style={{height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
            {file.length === 0 ?  <><Typography variant="h5" textAlign="center" color="primary" gutterBottom>
                Upload Drug Synthesis
                </Typography>
            <SynthesisDropzoneArea handleChange={uploadFile} />
            </> : <Box>
                <Typography variant="h5" textAlign="center" color="primary" gutterBottom>
                    Uploaded File -<Typography variant="span" className="fileName">{file[0].name}</Typography> 
                </Typography>
            </Box>}
        </div>
    </DashboardLayout>
  );
}
