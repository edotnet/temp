import { Box, Grid } from "@mui/material";
// import moleculeimg from "../../assets/img/group-11.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from '../../assets/svg/logo.svg';
import './NavBar.scss'

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation()

  const handleChange = (event, newValue) => {
    navigate(newValue, true);
  };
  return <Box>
    {/* <Box component="div" className="dashboardcircle">
      <Box component="img" alt="image" className="moleculeimg" src={moleculeimg}/>
    </Box> */}
    <Box className="dashboardheader">
      <Grid container>
        <Grid item xs={2} className='logoWrapper'>
          <Box component="img" alt="logo" className="logoresponsive"
               src={Logo}/>
        </Grid>
        <Grid item xs={10}>
          <Tabs value={location.pathname} onChange={handleChange}
                TabIndicatorProps={{sx: {backgroundColor: "#979797", height: 2},}} className="nav-TabList">
            <Tab value="/drugbank" label="DRUGBANK" />
            <Tab value="/categories" label="CATEGORIES"/>
            <Tab value="/dashboard" label="DRUG INTERACTION" />
            <Tab value="/dti" label="DTI" />
            <Tab value="/engine" label="Search engine" />
            <Tab value="/surface" label="Surface" />
          </Tabs>
        </Grid>
      </Grid>
    </Box>
  </Box>;
}
