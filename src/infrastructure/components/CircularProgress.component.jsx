import CircularProgress from '@mui/material/CircularProgress';
import {Box, Portal} from "@mui/material";

export const CircularProgressComponent = () => {
  return(
    <Portal><div style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
      <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <CircularProgress />
        <h4>Loading...</h4>
      </Box>
    </div></Portal>
  )
}
