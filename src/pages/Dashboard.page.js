import { UnderConstruction } from "../infrastructure/components/UnderConstruction";
import { Autocomplete, Box, Container, Grid, TextField, Typography, Card } from "@mui/material";

function MoleculeCard({ text }) {
  return <Box sx={{borderRadius: 10, pl: 2, pr: 3, pt: 2, pb: 2, m: 2, ml: 0, backgroundColor: "white"}}>
    <Typography>{text}</Typography>
  </Box>;
}

export const Dashboard = () => {
  return (
    <Container>
      <Box mt={2}>
        <Typography variant="h1" textAlign="center" color="primary">Drug Combinations</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Typography>Target Disease</Typography>
              <Typography>COVID-19</Typography>
            </Grid>
            <Grid item>
              <Typography>Drugs</Typography>
              <Typography>Favipiravir</Typography>
            </Grid>
          </Grid>

          <Box>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[]}
              sx={{width: 300}}
              renderInput={(params) => <TextField {...params} label="Add a molecule" variant="standard"/>}
            />
            <Grid container spacing={2}>
              <Grid item>
                <MoleculeCard text="Cetuximab" />
                <MoleculeCard text="Leuprolide"/>
                <MoleculeCard text="Etanercept" />
              </Grid>
              <Grid item>
                <MoleculeCard text="Ritonavir" />
                <MoleculeCard text="Tamoxifen" />
                <MoleculeCard text="Ropinirole" />
              </Grid>
            </Grid>
          </Box>
        </Grid>

      </Grid>
    </Container>
  )
}
