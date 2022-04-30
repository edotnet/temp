import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { Autocomplete } from "../../infrastructure/components/Autocomplete";
import { useState } from "react";

export const CategoryAutocomplete = ({onChange, onEmpty}) => {
  const url = `drugbank/category/query/`;
  const {loading, data, fetch} = useApiCall(url, null, null, false);
  const [label, setLabel] = useState("Without filter");
  const executeSearch = (search) => {
    if (search.length) {
      setLabel('');
    }else {
      setLabel('Without filter')
    }
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
      label={label}
      onChange={newValue => onChange(newValue.id)}
      onInputChange={newValue => executeSearch(newValue)}
      onEmpty={onEmpty}
      options={options}
      loading={loading}
      variant="standard"
    />
  );
}
