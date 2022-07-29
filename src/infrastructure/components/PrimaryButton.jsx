import {Button} from "@mui/material";

export const PrimaryButton = ({disabled, onClick, title, variant, sx, ...rest}) => (
  <Button
    sx={{borderRadius: 20, ...sx}}
    color="info"
    variant={variant ?? 'contained'}
    disabled={disabled}
    onClick={onClick}
    {...rest}
  >{title}</Button>
)