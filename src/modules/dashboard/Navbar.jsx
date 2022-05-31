import { Box, Grid } from "@mui/material";
import moleculeimg from "../../assets/img/group-11.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from '../../assets/svg/logo.svg';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation()

  const handleChange = (event, newValue) => {
    navigate(newValue, true);
  };
  return <Box>
    <Box component="div" className="dashboardcircle">
      <Box component="img" alt="image" className="moleculeimg" src={moleculeimg}/>
    </Box>
    <Box className="dashboardheader">
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Box component="img" alt="logo" className="logoresponsive"
               src={Logo}/>
        </Grid>
        <Grid item xs={10}>
          <Tabs value={location.pathname} onChange={handleChange}
                TabIndicatorProps={{sx: {backgroundColor: "#979797", height: 2},}}>
            <Tab value="/drugbank" label="DRUGBANK" sx={{color: "#000", fontWeight: "bold"}}/>
            <Tab value="/categories" label="CATEGORIES" sx={{color: "#000", fontWeight: "bold"}}/>
            <Tab value="/dashboard" label="DRUG INTERACTION" sx={{color: "#000", fontWeight: "bold"}}/>
            <Tab value="/dti" label="DTI" sx={{color: "#000", fontWeight: "bold"}}/>
            <Tab value="/engine" label="Search engine" sx={{color: "#000", fontWeight: "bold"}}/>
          </Tabs>
        </Grid>
      </Grid>
    </Box>
  </Box>;
}
