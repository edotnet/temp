import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { Autocomplete } from "../../infrastructure/components/Autocomplete";

export const TargetAutocomplete = ({label, onChange, onEmpty}) => {
  const url = `drugbank/target/query/`;
  const {loading, data, error, fetch} = useApiCall(url, null, null, false);
  const executeSearch = (search) => {
    fetch(`${url}${search}`, 'GET')
  }



  const options = data ? data
    .map(item => ({
      id: item.amino_acid_sequence,
      label: item.name
    })) : [];

  return (
    <Autocomplete
      onChange={newValue => onChange(newValue.id)}
      onInputChange={newValue => executeSearch(newValue)}
      onEmpty={onEmpty}
      options={options}
      loading={loading}
      label={label}
      variant="standard"
    />
  );
}
