import { Paper, Typography } from "@mui/material";
import { TargetAutocomplete } from "../dti/TargetAutocomplete";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { useEffect, useState } from "react";
import { CustomChip } from "../../infrastructure/components/CustomChip";
import { EventTypes } from "../../infrastructure/event-system/Event.types";
import { useEvent } from "../../infrastructure/event-system/hooks/useEvent";

export const DTI = ({molecules, setTarget, target}) => {
  const url = '/dti'
  const {loading, data, error, fetch, reset} = useApiCall(url, 'POST', null, false);

  useEvent(EventTypes.DASHBOARD.RESET, () => {
    reset();
  })

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
