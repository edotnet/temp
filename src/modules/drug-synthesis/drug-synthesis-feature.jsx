import { useState, useEffect, useRef } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SynthesisDropzoneArea } from "../../infrastructure/components/SynthesisDropzoneArea";
import { Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { fileToBase64, NewlineText, prettyformat } from "../../infrastructure/utils";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ContentCopy from '@mui/icons-material/ContentCopy';
import {Endpoints} from "../../config/Consts";

import "./DrugSynthesis.css";

export const DrugSynthesisFeature = () => {
  const url = Endpoints.pdf.upload;
  const { loading, data, error, fetch } = useApiCall(url, 'POST', null, false);
  //   let [loading, setLoading] = useState(true);
  const [file, setFile] = useState([]);
  const [fileName, setFileName] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [xdlData, setXdlData] = useState(null);
  const [drugXdlData, setDrugXdlData] = useState(null);
  const [drugs, setDrugs] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);
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
    const fetchURL = Endpoints.pdf.xdl;
    const fileInfo = {
      "file_name": data.file_path,
    }
    fetch(`${fetchURL}`, 'POST', fileInfo);
  }

  const parseData = (data) => {
    const allowedKeys = ["drug", "text", "xml"];
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
         ([key, val])=>allowedKeys.includes(key)
      )
   );
      Object.keys(filteredData).forEach((key) => {
      filteredData[key] = filteredData[key].split("@#@")});
      return filteredData;
  }

  if (data && fileUploaded) {
    const parsedData = parseData(data);
    const modifiedData = {};
    parsedData.drug.forEach((drug, index) => {
      modifiedData[drug] = {
        "text": parsedData.text[index],
        "xml": parsedData.xml[index]
      }
    });

    console.log(modifiedData);
    setDrugXdlData(modifiedData);
    setDrugs(Object.keys(modifiedData));
  }

  const handleDrugChange = (e) => {
    const drug = e.target.value;
    setSelectedDrug(drug);
    setXdlData(drugXdlData[drug]);
  }

  const DrugSelector = () => (<FormControl style={{width: '30%', marginBottom: '10px'}} variant="standard">
      <InputLabel id="pdb-label">Select a Drug</InputLabel>
      <Select
        labelId="pdb-labelId"
        value={selectedDrug}
        onChange={handleDrugChange}
      >
        <MenuItem value={""}>
          <em>Select a Drug</em>
        </MenuItem>
        {drugs.map(drug => <MenuItem key={drug} value={drug}>{drug}</MenuItem>)}
      </Select>
    </FormControl>);

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
            <DrugSelector />
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