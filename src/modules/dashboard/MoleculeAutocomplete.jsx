import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { Autocomplete } from "../../infrastructure/components/Autocomplete";
import { useEffect, useState } from "react";
import { Paper, TextField, styled } from "@mui/material";
import {Endpoints} from "../../config/Consts";

const PillAutocomplete = styled(Autocomplete)({
  '&.MuiAutocomplete-root': {
    borderRadius: 50,
    width: '70%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    'fieldset': {
      border: '1px dashed #ccc',
    },
  },
  '.MuiOutlinedInput-root': {
    borderRadius: 50,
  },
})


export const MoleculeAutocomplete = ({label, onChange, category}) => {
  //const url = Endpoints.drugbank.drugs;
  const url = Endpoints.drugbank.drugsquery;
  const {loading, data, error, fetch} = useApiCall(url, null, null, false);
  const executeSearch = (search) => {
    if (search.length > 3) {
      fetch(`${url}${search}?page=0${category ? `&category=${category}`: ''}`, 'GET')
    }
  }

  const _onChange = (newValue) => {
    if (!data || typeof newValue === 'string') {
      return;
    }
    const molecule = data.items.find(item => item.drugbank_id === newValue.id);
    onChange(molecule);
  }


  const validItems = item => item.calculated_properties && item.calculated_properties.SMILES;
  const options = data && 'items' in data ? data.items.filter(validItems)
    .map(item => ({
      id: item.drugbank_id,
      label: item.name
    })) : [];


  return (
    <PillAutocomplete
      onChange={_onChange}
      onInputChange={executeSearch}
      options={options}
      loading={loading}
      label={label}
      variant="outlined"
      value=""
      clearOnBlur
      blurOnSelect
    />
  );
}
