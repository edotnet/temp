import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { Autocomplete } from "../../infrastructure/components/Autocomplete";

export const DrugAutocomplete = ({label, onChange, category}) => {
  const url = `drugbank/query/`;
  const {loading, data, error, fetch} = useApiCall(url, null, null, false);
  const executeSearch = (search) => {
    fetch(`${url}${search}?page=0${category ? `&category=${category}`: ''}`, 'GET')
  }
  const validItems = item => item.calculated_properties && item.calculated_properties.SMILES;
  const options = data ? data.items.filter(validItems)
    .map(item => ({
      id: item.drugbank_id,
      label: item.name
    })) : [];

  return (
    <Autocomplete
      onChange={newValue => onChange(data.items.find(item => item.drugbank_id === newValue.id))}
      onInputChange={newValue => executeSearch(newValue)}
      options={options}
      loading={loading}
      label={label}
      variant="standard"
    />
  );
}
