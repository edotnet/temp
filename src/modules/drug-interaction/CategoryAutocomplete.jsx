import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { Autocomplete } from "../../infrastructure/components/Autocomplete";

export const CategoryAutocomplete = ({label, onChange}) => {
  const url = `drugbank/category/query/`;
  const {loading, data, error, fetch} = useApiCall(url, null, null, false);
  const executeSearch = (search) => {
    fetch(`${url}${search}?page=0`, 'GET')
  }

  const options = data ? data.items.map(item => ({
      id: item.drugbank_id,
      label: item.name
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
