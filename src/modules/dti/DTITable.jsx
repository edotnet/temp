import {useDashboardContext} from "../dashboard/context/useDashboarContext";
import {Grid, Typography} from "@mui/material";
import theme from "../../infrastructure/config/theme";

export const DTITable = () => {
  const {state, dispatch} = useDashboardContext();
  if (!state.interactingMoleculesResult) {
    return;
  }
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
  return (<div style={{height: 400, width: 500}}>
    <Grid container spacing={2}>
      {columns.map((column) => (
        <Grid item xs={4} sx={{outline: '1px solid black', backgroundColor: theme.palette.primary.main, p: 1}}>
          <Typography fontWeight="bold" textAlign="center" color="white">{column.headerName}</Typography>
        </Grid>
      ))}

      {result.map((item, index) => {
        return (
          <>
            {columns.map((column, index) => {
              return (
                <Grid item xs={4} sx={{outline: '1px solid gray', p:1}}>
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
