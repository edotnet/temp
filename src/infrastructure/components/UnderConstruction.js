import { Box, Typography } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

export function UnderConstruction() {
  return <Box
    sx={{justifyContent: "center", alignItems: "center", display: "flex", height: 500, flexDirection: "column"}}>
    <Typography variant="h2" component="h1">Under construction...</Typography>
    <ConstructionIcon sx={{fontSize: 200}}/>
  </Box>;
}
