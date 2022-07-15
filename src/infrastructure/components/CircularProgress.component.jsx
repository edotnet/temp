import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";

export const CircularProgressComponent = () => {
  return(
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
      <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <CircularProgress />
        <h4>Loading...</h4>
      </Box>
    </div>
  )
}
