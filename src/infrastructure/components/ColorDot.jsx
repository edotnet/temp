import { Box } from "@mui/material";
import * as PropTypes from "prop-types";

export function ColorDot(props) {
  return <Box component="div" sx={{
    height: 10,
    width: 10,
    borderRadius: "50%",
    backgroundColor: props.color,
    display: "inline-block"
  }}/>;
}

ColorDot.propTypes = {color: PropTypes.string};
