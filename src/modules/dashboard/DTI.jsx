import { Paper, Typography } from "@mui/material";
import { TargetAutocomplete } from "../dti/TargetAutocomplete";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { useEffect, useState } from "react";
import { MoleculeCard } from "./MoleculeCard";
import { CustomChip } from "../../infrastructure/components/CustomChip";

export const DTI = ({drugs}) => {
  const url = '/dti'
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const [target, setTarget] = useState('');
  useEffect(() => {
    drugs = drugs.map(molecule => ({
      id: molecule.calculated_properties.SMILES,
      label: molecule.name,
    }));
    fetch(url, 'POST', {target, drugs});
  }, [target])
  return (
    <>
      <Typography variant="h5">Target Interaction</Typography>
      <TargetAutocomplete onChange={setTarget} label="Add target"/>
      {data && data.map(el => (
        <Paper elevation={15} sx={{borderRadius: 10, m: 2}}>
          <CustomChip
            size="medium"
            label={`${el.label}: ${el.value}`} />
        </Paper>
      ))}
    </>
  )
}
