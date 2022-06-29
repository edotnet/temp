import {Box, Button, MenuItem, Select, TextField, Typography} from "@mui/material";
import {useRef, useState} from "react";
import {useApiCall} from "../../infrastructure/hooks/useApiCall";
import Grid from '@mui/material/Grid';
import beautify from "xml-beautifier";
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import ContentCopy from '@mui/icons-material/ContentCopy';
import {Endpoints} from "../../config/Consts";
import TextList from './TextList.json';


export const Text2xdlFeature = () => {
  const xdlText = useRef(null);
  const [text, setText] = useState('');
  const [selectedDrug, setSelectedDrug] = useState("");
  const [Loadingresult, setLoadingresult] = useState(false);
  const url = Endpoints.text2xdl.xdl;
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const onRun = () => {
    fetch(url, 'POST', {input: text});
    setLoadingresult(true);
  }

  function NewlineText(value, ind) {
    const text = value;
    const newText = text.split('\n').map(str => <p key={ind}>{str}</p>);
    return newText;
  }

  const handleDrugChange = (e) => {
    const selectedDrug = e.target.value;
    setSelectedDrug(selectedDrug);
    const selectedText = TextList.find(text => text.name === selectedDrug);
    setText(selectedText.text);
  }

  function prettyformat(value) {
    const xml = beautify(value);
    return xml;
  }

  return (
    <div className="searchEngine-xdl">
      <h2>Upload Text2XDL</h2>
      {/* {copySuccess} */}
      <TextField sx={{"width": "32.5%", "background": "#fff"}} id="outlined-select-currency" select
                 label="Select a Text" value={selectedDrug} onChange={handleDrugChange}>
        {
          TextList.map(text => <MenuItem key={text.name} value={text.name}>{text.name}</MenuItem>)
        }
      </TextField>

      <Grid style={{marginTop: "20px", marginBottom: "20px"}} container spacing={2}>
        <Grid item xs={4}>
          <div className="text">
            <div className="translate-block">
              <h4>2XDL text</h4>
              <Box sx={{position: 'absolute', right: 40, top: 13}}>
                <IconButton color="primary" aria-label="copy to clipboard" component="span">
                  <ContentCopy/>
                </IconButton>
              </Box>
              <TextField id="style-2" ref={xdlText}
                         variant="standard" InputProps={{disableUnderline: true}} className="area" fullWidth multiline
                         rows={15} value={text} onChange={e => setText(e.target.value)}
              />
              <Button onClick={onRun} disabled={!text.length} sx={{my: 2}} variant="outlined">Translate To Synthesis XDL
                Code</Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={8}>
          {
            data && data.result ?
              <div className="result" id="style-2">
                <h4 className="heading">Drug Synthesis Translated to XDL Code</h4>
                <Grid container spacing={2}>
                  <Grid item xs={6} sx={{position: 'relative'}}>
                    <h4>Synthesis Process</h4>
                    <Box sx={{position: 'absolute', right: 10, top: 30}}>
                      <IconButton color="primary" aria-label="copy to clipboard" component="span">
                        <ContentCopy/>
                      </IconButton>
                    </Box>
                    <div className="process" id="style-2">
                      {data && data.result ? NewlineText(data.result.text) : ''}
                    </div>
                  </Grid>
                  <Grid item xs={6} sx={{position: 'relative'}}>
                    <h4>Synthesis XDL</h4>
                    <Box sx={{position: 'absolute', right: 10, top: 30}}>
                      <IconButton color="primary" aria-label="copy to clipboard" component="span">
                        <ContentCopy/>
                      </IconButton>
                    </Box>
                    <div className="synthesis" id="style-2">
                      <pre>
                        {data && data.result ? prettyformat(data.result.xml) : ''}
                      </pre>
                    </div>
                  </Grid>
                </Grid>
              </div> : Loadingresult === true ? <div className="result">
                <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}><Box>
                  <CircularProgress/><h4>Loading...</h4></Box></div>
              </div> : ''
          }
        </Grid>
      </Grid>
    </div>
  )
}
