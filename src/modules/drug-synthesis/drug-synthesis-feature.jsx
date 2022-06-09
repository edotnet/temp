import { useState, useEffect, useRef } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SynthesisDropzoneArea } from "../../infrastructure/components/SynthesisDropzoneArea";
import { Typography } from "@mui/material";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { fileToBase64, NewlineText, prettyformat } from "../../infrastructure/utils";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ContentCopy from '@mui/icons-material/ContentCopy';

import "./DrugSynthesis.css";

export const DrugSynthesisFeature = () => {
  const url = `/xdl/upload`;
  const { loading, data, error, fetch } = useApiCall(url, 'POST', null, false);
  //   let [loading, setLoading] = useState(true);
  const [file, setFile] = useState([]);
  const [fileName, setFileName] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [xdlData, setXdlData] = useState(null);
  const isFirstRender = useRef(true);
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false // toggle flag after first render/mounting
      return;
    }
    fetch(`${url}`, 'POST', file);
  }, [file]);

  const uploadFile = (files) => {
    setFileName(files[0].name);
    fileToBase64(files[0], (err, result) => {
      if (result) {
        const binaryData = result.split(",")[1];
        setFile(binaryData);
      }
    });
  }

  if (data) {
    setFileUploaded(true);
    const fetchURL = "/pdf-xdl";
    const fileInfo = {
      "file_name": data.file_path,
    }
    fetch(`${fetchURL}`, 'POST', fileInfo);
  }

  if (data && fileUploaded) {
    console.log(data);
    setXdlData(data);
  }

  return (
    <div className="fileupload-block">
      {(file.length === 0) ?
        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
          <Typography variant="h6" textAlign="center" color="primary" gutterBottom>
            Upload Drug Synthesis
          </Typography>
          <SynthesisDropzoneArea handleChange={uploadFile} />
        </div> :
        (loading) ?
          <div className="result"><div style={{ position: 'absolute', left: '50%', top: '50%' }}>
            <Box> <CircularProgress /><h4>Loading...</h4>
            </Box></div>
          </div> :
          <div style={{ paddingTop: '10px'}}>
            <Typography variant="h6" textAlign="left" color="primary" gutterBottom>
              Uploaded File - <Typography variant="span" className="fileName">{fileName}</Typography>
            </Typography>
            <div className="searchEngine-xdl">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {
                    xdlData && xdlData.text ?
                      <div className="result" id="style-2">
                        <h4 className="heading">Drug Synthesis</h4>
                        <Grid container spacing={2}>
                          <Grid item xs={8} sx={{ position: 'relative' }}>
                            <h4>Synthesis Process</h4>
                            <Box sx={{ position: 'absolute', right: 10, top: 30 }}>
                              <IconButton color="primary" aria-label="copy to clipboard" component="span">
                                <ContentCopy />
                              </IconButton>
                            </Box>
                            <div className="process" id="style-2">
                              {xdlData ? NewlineText(xdlData.text) : ''}
                            </div>
                          </Grid>
                          <Grid item xs={4} sx={{ position: 'relative' }}>
                            <div className="synthesis" id="style-2">
                              <h4>Synthesis XDL</h4>
                              <Box sx={{ position: 'absolute', right: 10, top: 30 }}>
                                <IconButton color="primary" aria-label="copy to clipboard" component="span">
                                  <ContentCopy />
                                </IconButton>
                              </Box>
                              <pre>
                                {xdlData ? prettyformat(xdlData.xml) : ''}
                              </pre>
                            </div>
                          </Grid>
                        </Grid>
                      </div> : loading === true ? <div className="result"><div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}><Box> <CircularProgress /><h4>Loading...</h4></Box></div></div> : ''
                  }
                </Grid>
              </Grid>
            </div>
          </div>}
    </div>
  );
}