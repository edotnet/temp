import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { Autocomplete } from "../../infrastructure/components/Autocomplete";
import { useEffect, useState } from "react";

export const DrugAutocomplete = ({label, onChange, category}) => {
  const url = `drugbank/query/`;
  const {loading, data, error, fetch} = useApiCall(url, null, null, false);
  const executeSearch = (search) => {
    if (search.length > 3) {
      fetch(`${url}${search}?page=0${category ? `&category=${category}`: ''}`, 'GET')
    }
  }

  const _onChange = (newValue) => {
    onChange(data.items.find(item => item.drugbank_id === newValue.id));
  }


  const validItems = item => item.calculated_properties && item.calculated_properties.SMILES;
  const options = data ? data.items.filter(validItems)
    .map(item => ({
      id: item.drugbank_id,
      label: item.name
    })) : [];


  return (
    <Autocomplete
      onChange={_onChange}
      onInputChange={executeSearch}
      options={options}
      loading={loading}
      label={label}
      variant="standard"
      value=""
      clearOnBlur
      blurOnSelect
    />
  );
}
