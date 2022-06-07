import { Card } from "../../infrastructure/components/Card";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { darken, lighten } from '@mui/material/styles';
import { SmileSearcher } from "./SmileSearcher.component";
import {Endpoints} from "../../config/Consts";

const getBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

export const DrugInteraction = () => {
  const [smile1, setSmile1] = useState(null)
  const [smile2, setSmile2] = useState(null)

  const [errorMessage, setErrorMessage] = useState("")
  const url = Endpoints.ml.drugInteraction;
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
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
      headerName: 'Interaction',
      flex: 1
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 100
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
              <SmileSearcher onChange={setSmile1}/>
            </Grid>
            <Grid item xs={6}>
              <SmileSearcher onChange={setSmile2}/>
            </Grid>
          </Grid>
          {errorMessage.length > 0 && <div>{errorMessage}</div>}
          {data && <Box pt={2} sx={customClasses}>
            <DataGrid
              autoHeight
              rows={[...data.sort((a, b) => b.value - a.value)]}
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
  );
}
