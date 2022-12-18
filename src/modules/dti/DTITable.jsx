import {useDashboardContext} from "../dashboard/context/useDashboarContext";
import {Grid, LinearProgress, Typography} from "@mui/material";
import theme from "../../infrastructure/config/theme";
import {useMemo} from "react";

export const DTITable = () => {
  const {state, dispatch} = useDashboardContext();

  const {result} = state.interactingMoleculesResult;
  const columns = [{
    field: 'name1', headerName: 'Drug1', align: 'center'
  }, {
    field: 'name2', headerName: 'Drug2', align: 'center'
  }, {
    field: 'synergy', headerName: 'Synergy (%)', align: 'center', valueFormatter: (value) => {
      return parseFloat(value).toFixed(1);
    }
  }]

  if (!state.interactingMoleculesResult) {
    return;
  }

  return (<div style={{height: 400, width: 500}}>
    <Grid container spacing={2} ml={0} width={500}>
      {columns.map((column) => (
        <Grid key={column.field+"-header"}item xs={4} sx={{outline: '1px solid black', backgroundColor: theme.palette.primary.main, padding: '5px !important', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <Typography fontWeight="bold" textAlign="center" color="white">{column.headerName}</Typography>
        </Grid>
      ))}
      {state.interactingMoleculesLoading && <LinearProgress sx={{width: 500}} color="primary"/>}
      {result.map((item, index) => {
        return (
          <>
            {columns.map((column, index) => {
              return (
                <Grid item xs={4} sx={{outline: '1px solid gray', p:1}} key={column.field}>
                  <Typography
                    textAlign={column.align}>{column.valueFormatter ? column.valueFormatter(item[column.field]) : item[column.field]}</Typography>
                </Grid>
              );
            })}
          </>)
      })}
    </Grid>

  </div>);
}
