import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { Autocomplete, TextField } from "@mui/material";

export const TargetAutocomplete = ({label, onChange}) => {
  const url = `drugbank/target/query/`;
  const {loading, data, error, fetch} = useApiCall(url, null, null, false);
  const executeSearch = (search) => {
    fetch(`${url}${search}`, 'GET')
  }
  let timeout = null;

  const options = data ? data
    .map(item => ({
      id: item.amino_acid_sequence,
      label: item.name
    })) : [];

  return (
    <Autocomplete
      disablePortal
      id={label}
      options={options}
      fullWidth
      renderInput={(params) => <TextField {...params} label={label} fullWidth variant="standard"/>}
      onChange={(event, newValue) => {
        onChange(newValue)
      }}
      onInputChange={(event, newValue) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          executeSearch(newValue)
        }, 700)
      }}
      clearOnBlur={false}
      loading={loading}
    />
  );
}
