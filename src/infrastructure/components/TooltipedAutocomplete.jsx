import { Tooltip, Typography } from "@mui/material";
import { Autocomplete } from "./Autocomplete";

export const TooltipedAutocomplete = ({tooltipField, ...rest}) => {
  return (
    <Autocomplete
      {...rest}
      renderOption={(props, option) => (
          <Tooltip title={option.tooltip}>
            <li {...props}>
              <Typography noWrap>{option.label}</Typography>
            </li>
          </Tooltip>
        )
      }
    />
  )
}
