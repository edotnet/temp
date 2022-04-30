import { Box, Grid } from "@mui/material";
import moleculeimg from "../../assets/img/group-11.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import * as PropTypes from "prop-types";
import { useState } from "react";

export const Navbar = () => {
  const [value, setValue] = useState('druginteraction');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return <>
    <Box component="div" className="dashboardcircle">
      <Box component="img" alt="image" className="moleculeimg" src={moleculeimg}/>
    </Box>
    <Box className="dashboardheader">
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Box component="img" alt="logo" className="logoresponsive"
               src="https://res.cloudinary.com/djpepozcx/image/upload/v1650614723/logo_uxsjoc.png"/>
        </Grid>
        <Grid item xs={10}>
          <Tabs value={value} onChange={handleChange}
                TabIndicatorProps={{sx: {backgroundColor: "#979797", height: 2},}} >
            <Tab value="drugbank" label="DRUGBANK" sx={{color: "#000", fontWeight: "bold"}}/>
            <Tab value="categories" label="CATEGORIES" sx={{color: "#000", fontWeight: "bold"}}/>
            <Tab value="druginteraction" label="DRUG INTERACTION" sx={{color: "#000", fontWeight: "bold"}}/>
            <Tab value="dti" label="DTI" sx={{color: "#000", fontWeight: "bold"}}/>
          </Tabs>
        </Grid>
      </Grid>
    </Box>
  </>;
}
