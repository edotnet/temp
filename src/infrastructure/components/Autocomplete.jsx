import { CircularProgress, TextField } from "@mui/material";
import { Autocomplete as MAutocomplete } from '@mui/material';
export const Autocomplete = ({ onChange, onInputChange, label, options, loading, variant}) => {
  let timeout = null;

  return (
    <MAutocomplete
      disablePortal
      id={label}
      options={options}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          variant={variant ?? "outlined"}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
      onChange={(event, newValue) => {
        if (!newValue) {
          return;
        }
        onChange(newValue)
      }}
      onInputChange={(event, newValue) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          onInputChange(newValue)
        }, 700)
      }}
      clearOnBlur
      loading={loading}
    />
  )
}
