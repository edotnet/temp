import { useSumEffects } from "./useSumEffects";
import { Box, Grid, LinearProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { Hr } from "../../../infrastructure/components/Hr.component";

export const AdverseEffectsInfo = () => {
  const sumEffects = useSumEffects();
  if (!sumEffects.total) {
    return null;
  }
  return <Box>
    <Hr />
    <Typography sx={{fontSize: 17, fontWeight: "bold"}}>Adverse effects & contraindications</Typography>
    <Box sx={{display: "flex"}}>
      <Box>
        <Typography sx={{fontSize: 20, fontWeight: 500}}>{sumEffects.total}</Typography>
      </Box>
      <Grid container spacing={1} sx={{alignItems: "center", pl: 2}}>
        <Grid item xs={6}>
          <LinearProgress variant="determinate" value={sumEffects.adverseEffects} color="info"
                          sx={{height: 10, borderRadius: 10, backgroundColor: "rgba(219, 223, 241, 1)"}}/>
        </Grid>
        <Grid item xs={6}>
          <LinearProgress variant="determinate" value={sumEffects.contraindications} color="error"
                          sx={{height: 10, borderRadius: 10, backgroundColor: "rgba(219, 223, 241, 1)"}}/>
        </Grid>
      </Grid>
    </Box>
  </Box>;
}
