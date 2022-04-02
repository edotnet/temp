import { Card } from "../../infrastructure/components/Card";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import Container from "@mui/material/Container";
import { DrugAutocomplete } from "./DrugAutocomplete";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export const DrugInteraction = () => {
  const [smile1, setSmile1] = useState(null)
  const [smile2, setSmile2] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const url = `drug-interaction`;
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const columns = [
    {
      field: 'label',
      headerName: 'Interaction',
      flex: 1,
    },
    {
      field: 'value',
      headerName: 'Value',
      flex: 1,
    },
  ]
  useEffect(() => {
    if (smile1 && smile2) {
      fetch(url, 'POST', {smile1, smile2})
    }
  }, [smile1, smile2])
  return (
    <Container>
      <Card>
        <Box p={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DrugAutocomplete label="Drug 1" onChange={setSmile1}/>
            </Grid>
            <Grid item xs={6}>
              <DrugAutocomplete label="Drug 2" onChange={setSmile2}/>
            </Grid>
          </Grid>
          {errorMessage.length > 0 && <div>{errorMessage}</div>}
          {data && <DataGrid
            autoHeight
            rows={data ?? []}
            columns={columns}
            disableSelectionClick
            getRowId={row => row.label}
            pagination={false}
          />}
        </Box>
      </Card>
    </Container>
  );
}
