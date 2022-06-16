import { Box, Container, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Card } from "../../infrastructure/components/Card";
import Button from "@mui/material/Button";
import { useState } from "react";
import ReactJson from "react-json-view";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { Hr } from "../../infrastructure/components/Hr.component";
import { DrugsDataGrid } from "./DrugshotDataGrid.component";

export const DrugshotFeature = () => {
  const url = `/drugshot/api/search`;
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const [state, setState] = useState({
    rif: 'drugrif',
    term: '',
  });
  const handleChange = (e) => {
    setState(prev => ({...prev, [e.target.name]: e.target.value}));
  }
  const onRun = () => {
    fetch(url, 'POST', state)
  }
  return (
    <Container>
      <Card>
        <Box p={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputLabel variant="standard" htmlFor="rif">
                Rif
              </InputLabel>
              <Select
                value={state.rif}
                id="rif"
                name="rif"
                label="Rif"
                variant="standard"
                fullWidth
                onChange={handleChange}
              >
                <MenuItem value="drugrif">drugrif</MenuItem>
                <MenuItem value="autorif">autorif</MenuItem>
              </Select>
              <Box pt={2}>
                <Button color="primary"
                        onClick={onRun}
                        variant="contained"
                        disabled={!state.term.length}>
                  Run
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <InputLabel variant="standard" htmlFor="rif">
                Search term
              </InputLabel>
              <TextField
                name="term"
                variant="standard"
                fullWidth
                value={state.term}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Hr />
          {loading && <div>Loading</div>}
          {data &&
           <Box pt={2}>
            <DrugsDataGrid 
              data={data.drug_count} 
              loading={loading} 
            />
          </Box>
          }
        </Box>
      </Card>
    </Container>
  );
}
