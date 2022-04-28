import { Autocomplete as MAutocomplete, CircularProgress, TextField } from "@mui/material";

export const Autocomplete = ({onChange, onEmpty, onInputChange, label, options, loading, ...rest}) => {

  const _onChange = (event, newValue) => {
    if (!newValue) {
      if (onEmpty) onEmpty()
      return;
    }
    onChange(newValue)
  }

  let timeout = null;
  const _onInputChange = (event, newValue) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      onInputChange(newValue)
    }, 700)
  }

  return (
    <MAutocomplete
      {...rest}
      freeSolo
      disablePortal
      id={label}
      options={options}
      fullWidth
      onChange={_onChange}
      onInputChange={_onInputChange}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          variant={rest.variant ?? "outlined"}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  )
}
