import { Tooltip, Typography } from "@mui/material";
import { Autocomplete } from "./Autocomplete";
import {StyledTooltip} from './StyledTooltip';

export const TooltipedAutocomplete = ({tooltipField, ...rest}) => {
  function renderOption(props, option) {
    if (!option.tooltip) {
      return <li {...props}><Typography noWrap>{option.label}</Typography></li>
    }
    return <StyledTooltip title={option.tooltip} placement="right" arrow>
      <li {...props}>
        <Typography noWrap>{option.label}</Typography>
      </li>
    </StyledTooltip>;
  }

  return (
    <Autocomplete
      {...rest}
      renderOption={renderOption}
    />
  )
}
