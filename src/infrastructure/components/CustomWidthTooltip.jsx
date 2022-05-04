import { styled } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }}>{props.children}</Tooltip>
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 300,
    Width: 400,
    fontSize: '16px'
  },
});
