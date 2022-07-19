import { Box, IconButton, Typography } from "@mui/material";
import { Person, PersonOutlined } from "@mui/icons-material";
import * as PropTypes from "prop-types";

export function DemographicItem({title, value, onClick}) {
  return <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
    <IconButton onClick={onClick}>
      {!!value ?<Person style={{fontSize: 40}}/> :
        <PersonOutlined style={{fontSize: 40}}/>}
    </IconButton>
    <Typography>{title}</Typography>
  </Box>;
}

DemographicItem.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.any,
};
