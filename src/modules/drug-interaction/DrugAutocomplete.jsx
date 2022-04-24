import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { Autocomplete, TextField } from "@mui/material";

export const DrugAutocomplete = ({label, onChange, variant}) => {
  const url = `drugbank/query/`;
  const {loading, data, error, fetch} = useApiCall(url, null, null, false);
  const executeSearch = (search) => {
    fetch(`${url}${search}?page=0`, 'GET')
  }
  let timeout = null;
  const validItems = item => item.calculated_properties && item.calculated_properties.SMILES;
  const options = data ? data.items.filter(validItems)
    .map(item => ({
      id: item.drugbank_id,
      label: item.name
    })) : [];

  return (
    <Autocomplete
      disablePortal
      id={label}
      options={options}
      fullWidth
      renderInput={(params) => <TextField {...params} label={label} fullWidth variant={variant ?? "outlined"}/>}
      onChange={(event, newValue) => {
        if (!newValue) {
          return;
        }
        onChange(data.items.find(item => item.drugbank_id === newValue.id))
      }}
      onInputChange={(event, newValue) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          executeSearch(newValue)
        }, 700)
      }}
      clearOnBlur
      loading={loading}
    />
  );
}
