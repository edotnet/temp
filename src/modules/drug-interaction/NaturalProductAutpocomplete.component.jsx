import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { Autocomplete, TextField } from "@mui/material";

export const NaturalProductAutocomplete = ({label, onChange}) => {
  const url = `natural_products/query/`;
  const {loading, data, error, fetch} = useApiCall(url, null, null, false);
  const executeSearch = (search) => {
    fetch(`${url}${search}?page=0`, 'GET')
  }
  let timeout = null;
  const validItems = item => item.SMILES;
  const options = data ? data.items.filter(validItems)
    .map(item => ({
      id: item.SMILES,
      label: item.cn
    })) : [];

  return (
    <Autocomplete
      disablePortal
      id={label}
      options={options}
      fullWidth
      renderInput={(params) => <TextField {...params} label={label} fullWidth/>}
      onChange={(event, newValue) => {
        onChange(newValue.id)
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
