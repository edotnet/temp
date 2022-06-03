import { Card } from "../../infrastructure/components/Card";
import Box from "@mui/material/Box";
import { Chip, Grid, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import {useMemo, useState} from "react";
import { TargetAutocomplete } from "./TargetAutocomplete";
import { DrugAutocomplete } from "../drug-interaction/DrugAutocomplete";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { darken, lighten } from "@mui/material/styles";
import Button from "@mui/material/Button";

const getBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

export const DTI = () => {
  const url = `https://api.prepaire.com/drug-protein`;
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const [errorMessage, setErrorMessage] = useState("")
  const [target, setTarget] = useState(null);
  const [drugs, setDrugs] = useState([]);

  const result = useMemo(() => {
    if (!data || data.code !== 200)
      return null;
    return drugs.map((drug, i) => ({label: drug.name, value: data.result[i]}))
  }, [data, drugs])

  const onRun = () => {
    const request = {
      protein: target.amino_acid_sequence,
      smiles: drugs.map(drug => drug.calculated_properties.SMILES),
    };
    fetch(url, 'POST', request);
  }
  const onChangeDrug = (drug) => {
    setDrugs(prevDrugs => [...prevDrugs, drug]);
  }
  const handleDeleteDrug = (drugId) => () => {
    setDrugs(prevDrugs => prevDrugs.filter(drug => drug.drugbank_id !== drugId));
  }
  const customClasses = {
    '& .probability--Positive': {
      bgcolor: (theme) =>
        getBackgroundColor(theme.palette.success.light, theme.palette.mode),
      '&:hover': {
        bgcolor: (theme) =>
          getHoverBackgroundColor(theme.palette.success.light, theme.palette.mode),
      },
    },
    '& .row .MuiDataGrid-cellContent': {
      whiteSpace: "normal",
      wordWrap: "break-word",
    }
  }
  const columns = [
    {
      field: 'label',
      headerName: 'Drug',
      flex: 1
    },
    {
      field: 'value',
      headerName: 'Binding Score',
      flex: 1
    },
  ]
  return (
    <Container>
      <Card>
        <Box p={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TargetAutocomplete onChange={setTarget} label="Target"/>
              <Box pt={2}>
                <Button color="primary" onClick={onRun} variant="contained" disabled={!target || !drugs.length}>Run
                  DTI</Button>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <DrugAutocomplete onChange={onChangeDrug} label="Drugs"/>
              <Stack direction="row" spacing={1} pt={2}>
                {drugs.map(drug => <Chip label={drug.name} variant="outlined"
                                         onDelete={handleDeleteDrug(drug.drugbank_id)}/>)}
              </Stack>
            </Grid>
          </Grid>
          {errorMessage.length > 0 && <div>{errorMessage}</div>}
          {result && <Box pt={2} sx={customClasses}>
            <DataGrid
              autoHeight
              rows={[...result.sort((a, b) => b.value - a.value)]}
              columns={columns}
              disableSelectionClick
              getRowId={row => row.label}
              getRowClassName={(params) => {
                return `row ${params.row.value > 50 ? 'probability--Positive' : ''}`;
              }}
            />
          </Box>}
        </Box>
      </Card>
    </Container>
  )
}
