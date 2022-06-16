import { Box, Grid } from "@mui/material";
// import moleculeimg from "../../assets/img/group-11.png";
import { NavLink } from "react-router-dom";
import Logo from '../../assets/svg/logo.svg';
import './NavBar.scss'

export const Navbar = () => {

  return <Box>
    {/* <Box component="div" className="dashboardcircle">
      <Box component="img" alt="image" className="moleculeimg" src={moleculeimg}/>
    </Box> */}
    <Box className="dashboardheader">
      <Grid container spacing={2}>
        <Grid item xs={1} className='logoWrapper'>
          <Box component="img" alt="logo" className="logoresponsive"
               src={Logo}/>
        </Grid>
        <Grid item xs={10} style={{paddingTop: '25px'}}>
          <nav className="headernavlink">
            <NavLink to="/engine/search">SEARCH ENGINE</NavLink>
            <NavLink to="/dashboard">DRUG INTERACTION</NavLink>
            <NavLink to="/surface">SURFACE</NavLink>
          </nav>
        </Grid>
      </Grid>
    </Box>
  </Box>;
}
