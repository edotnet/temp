import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { Autocomplete } from "../../infrastructure/components/Autocomplete";

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
      onChange={newValue => onChange(newValue.id)}
      onInputChange={newValue => executeSearch(newValue)}
      options={options}
      loading={loading}
      label={label}
      variant="standard"
    />
  );
}
