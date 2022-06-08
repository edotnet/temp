import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import copy from 'copy-to-clipboard';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import beautify from "xml-beautifier";
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import ContentCopy from '@mui/icons-material/ContentCopy';

export const Text2xdlFeature = () => {
  // const [newlineText, setNewlineText] = useState('');
  // const [xdlText, setXdlText] = useState('');
  const [text, setText] = useState('');
  const [Loadingresult, setLoadingresult] = useState(false);
  const url = `https://api.prepaire.com/text-to-xdl`;
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const onRun = () => {
    fetch(url, 'POST', {input: text});
    setLoadingresult(true);
  }
  function NewlineText(value , ind) {
    const text = value;
    const newText = text.split('\n').map(str => <p key={ind}>{str}</p>);
    return newText;
  }

  function prettyformat(value) {
    const xml = beautify(value);
    return xml;
  }

  const copy2Xdl = () => {
    copy(text);
  }
  
  return (
    // <Box>
    //   <TextField
    //     id="outlined-multiline-static"
    //     label="Multiline"
    //     fullWidth
    //     multiline
    //     rows={10}
    //     value={text}
    //     onChange={e => setText(e.target.value)}
    //   />
    //   <Button color="primary" onClick={onRun} variant="contained" disabled={!text.length} sx={{my:2}}>Get XDL</Button>
    //   {data && data.xml}
    // </Box>
    <div className="searchEngine-xdl">
      <h2>Upload Text2XDL</h2>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className="text">
            <div className="translate-block">
              <h4>2XDL text</h4>
              <Box sx={{position: 'absolute', right: 40, top: 13}}>
                <IconButton onClick={copy2Xdl} color="primary" aria-label="copy to clipboard" component="span">
                  <ContentCopy />
                </IconButton>
              </Box>
              <TextField id="style-2" variant="standard" InputProps={{ disableUnderline: true}} className="area" fullWidth multiline rows={15} value={text} onChange={e => setText(e.target.value)} />
              <Button onClick={onRun} disabled={!text.length} sx={{my:2}} variant="outlined">Translate To Synthesis XDL Code</Button>
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
                    <Box sx={{ position: 'absolute', right: 10, top: 30}}>
                      <IconButton color="primary" aria-label="copy to clipboard" component="span">
                        <ContentCopy />
                      </IconButton>
                    </Box>
                    <div className="process" id="style-2" >
                        {data && data.result ? NewlineText(data.result.text) : ''}
                    </div>
                  </Grid>
                  <Grid item xs={6} sx={{position: 'relative'}} >
                    <h4>Synthesis XDL</h4>
                    <Box sx={{position: 'absolute', right: 10, top: 30}}>
                      <IconButton color="primary" aria-label="copy to clipboard" component="span">
                        <ContentCopy />
                      </IconButton>
                    </Box>
                    <div className="synthesis" id="style-2">
                      <pre>
                        {data && data.result ? prettyformat(data.result.xml)  : ''}
                      </pre>
                    </div>
                  </Grid>
                </Grid>
              </div> : Loadingresult === true ? <div className="result"><div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}><Box> <CircularProgress /><h4>Loading...</h4></Box></div></div>: ''
          }
        </Grid>
      </Grid>
    </div>
  )
}
