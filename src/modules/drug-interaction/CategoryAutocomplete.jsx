import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { Autocomplete } from "../../infrastructure/components/Autocomplete";
import {Endpoints} from "../../config/Consts";

export const CategoryAutocomplete = ({onChange, onEmpty}) => {
  const url = Endpoints.drugbank.categories;
  const {loading, data, fetch} = useApiCall(url, null, null, false);
  const executeSearch = (search) => {
    if (search.length > 3) {
      fetch(`${url}${search}?page=0`, 'GET')
    }
  }

  const options = data ? data.items.map(item => ({
    id: item.drugbank_id,
    label: item.name
  })) : [];

  return (
    <Autocomplete
      label="SELECT DRUG FAMILY"
      onChange={newValue => onChange(newValue.id)}
      onInputChange={newValue => executeSearch(newValue)}
      onEmpty={onEmpty}
      options={options}
      loading={loading}
      variant="standard"
    />
  );
}
