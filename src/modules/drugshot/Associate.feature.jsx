import { Box, Chip, Container, Grid, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { Card } from "../../infrastructure/components/Card";
import Button from "@mui/material/Button";
import { useState } from "react";
import ReactJson from "react-json-view";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { Hr } from "../../infrastructure/components/Hr.component";
import { DrugAutocomplete } from "../drug-interaction/DrugAutocomplete";

export const AssociateFeature = () => {
  const url = `/drugshot/api/associate`;
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const [state, setState] = useState({
    similarity: 'drugrif_cooccur',
    term: '',
  });
  const [drugs, setDrugs] = useState([]);
  const handleChange = (e) => {
    setState(prev => ({...prev, [e.target.name]: e.target.value}));
  }
  const onRun = () => {
    fetch(url, 'POST', state)
  }

  const onChangeDrug = () => {

  }

  const onDeleteDrug = (id) => () => {

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
                id="similarity"
                name="similarity"
                label="Drug-drug similarity matrix"
                variant="standard"
                fullWidth
                onChange={handleChange}
              >
                <MenuItem value="drugrif_cooccur">drugrif_cooccur</MenuItem>
                <MenuItem value="L1000_coexpression">L1000_coexpression</MenuItem>
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
                Drug list
              </InputLabel>
              <DrugAutocomplete onChange={onChangeDrug} label=""/>
              <Stack direction="row" spacing={1} pt={2}>
                {drugs.map(drug => <Chip label={drug.name} variant="outlined"
                                         onDelete={onDeleteDrug(drug.drugbank_id)}/>)}
              </Stack>
            </Grid>
          </Grid>
          <Hr />
          {loading && <div>Loading</div>}
          {data && <Box pt={2}>
            <ReactJson src={data} name={null} collapsed={false}/>
          </Box>}
        </Box>
      </Card>
    </Container>
  );
}
