import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";

import { useApiCall } from "../../infrastructure/hooks/useApiCall";

export const Text2xdlFeature = () => {
  const [text, setText] = useState('');
  const url = `https://api.prepaire.com/text-to-xdl`;
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const onRun = () => {
    fetch(url, 'POST', {input: text});
  }
  return (
    <Box>
      <TextField
        id="outlined-multiline-static"
        label="Multiline"
        fullWidth
        multiline
        rows={10}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <Button color="primary" onClick={onRun} variant="contained" disabled={!text.length} sx={{my:2}}>Get XDL</Button>
      {data && data.xml}
    </Box>
  )
}
