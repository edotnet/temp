import {Box, Button, Stack, Typography} from "@mui/material";
import {DemographicItem} from "./DemographicItem";
import {useState} from "react";
import {useDashboardContext} from "./context/useDashboarContext";
import {styled} from "@mui/material/styles";
import {DemographicModal} from "./demographics/DemographicModal";


const PillButton = styled(Button)({
  '&.MuiButton-root': {
    borderRadius: 50,
    width: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    border: '1px dashed #ccc',
    paddingTop: 10,
    paddingBottom: 10,
    float: 'left',
    fontSize: 12,
  },
  '&.MuiLabel': {
    textAlign: 'left',
  }
});

export const DemographicFeature = () => {
  const {state} = useDashboardContext();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const openModal = () => {
    setOpen(true);
    setId(null);
  }

  const closeModal = () => {
    setOpen(false);
    setId(null);
  }

  const editDemographics = (id) => () => {
    setId(id);
    setOpen(true);
  }


  return (
    <>
      <Stack>
        <Box sx={{pt: 3, pl: 1}}>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography style={{fontSize: 16, fontWeight: 300}}>DEMOGRAPHY</Typography>
            <PillButton onClick={openModal}>+ Add profile</PillButton>
          </Box>
          <hr/>
        </Box>
        <Box sx={{minHeight: 150}}>
          {state.demographics.map(demographic =>
            <DemographicItem
              key={demographic.id}
              demographic={demographic}
              onClick={editDemographics(demographic.id)}
            />
          )}
        </Box>
      </Stack>
      <DemographicModal open={open} onClose={closeModal} id={id}/>
    </>
  )
}
