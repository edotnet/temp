import { Paper } from "@mui/material";
import ReactJson from "react-json-view";
import Box from "@mui/material/Box";
import { useApiCall } from "../../../infrastructure/hooks/useApiCall";
import { useEffect } from "react";

export const Detail = (props) => {

  const {loading, data, error, fetch} = useApiCall(`eval?smiles=null`, 'GET', null, false);

  useEffect(() => {
    console.log(props.detail)
    const smiles = "calculated_properties" in props.detail && "SMILES" in props.detail.calculated_properties ?
      props.detail.calculated_properties.SMILES :
      props.detail.SMILES;
      fetch(`eval?smiles=${smiles}`, 'GET');
  }, [props.detail]);

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error checking smiles</div>
  }
  return (
    <Box pt={4}>
      <Paper elevation={8}>
        <ReactJson src={{...props.detail, data}} name={null} collapsed={false}/>
      </Paper>
    </Box>
  );
}
