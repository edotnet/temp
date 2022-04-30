import { Paper, Typography } from "@mui/material";
import { TargetAutocomplete } from "../dti/TargetAutocomplete";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { useEffect } from "react";
import { CustomChip } from "../../infrastructure/components/CustomChip";

export const DTI = ({molecules, setTarget, target}) => {
  const url = '/dti'
  const {data, fetch} = useApiCall(url, 'POST', null, false);

  useEffect(() => {
    molecules = molecules.map(molecule => ({
      id: molecule.calculated_properties.SMILES,
      label: molecule.name,
    }));
    if (molecules.length){
      fetch(url, 'POST', {target, drugs: molecules});
    }
  }, [target, molecules])
  return (
    <>
      <Typography variant="h5">Target Interaction</Typography>
      <TargetAutocomplete onChange={setTarget} label="Add target"/>
      {data && data.map(el => (
        <Paper elevation={15} sx={{borderRadius: 10, m: 2}} key={el.label}>
          <CustomChip
            size="medium"
            label={`${el.label}: ${el.value}`} />
        </Paper>
      ))}
    </>
  )
}
