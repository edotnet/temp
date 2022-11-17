import {encodeQuery, useApiCall} from '../../infrastructure/hooks/useApiCall';
import { TooltipedAutocomplete } from "../../infrastructure/components/TooltipedAutocomplete";
import { useEffect, useState } from "react";
import { Paper, TextField, styled } from "@mui/material";
import {Endpoints} from "../../config/Consts";

const PillAutocomplete = styled(TooltipedAutocomplete)({
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
  const naturalProductsUrl = Endpoints.naturalProducts.query;
  const {loading: naturalProductsLoading, data: naturalProductsData, error: naturalProductsError, fetch: naturalProductsFetch} = useApiCall(naturalProductsUrl, null, null, false);

  const executeSearch = (search) => {
    if (search.length > 3) {
      fetch(`${url}${encodeQuery(search)}?page=0${category ? `&category=${category}`: ''}`, 'GET');
      naturalProductsFetch(`${naturalProductsUrl}${encodeQuery(search)}?page=0`, 'GET')
    }
  }

  const _onChange = (newValue) => {
    if (!data || typeof newValue === 'string') {
      return;
    }
    let molecule = data.items.find(item => item.drugbank_id === newValue.id);
    if (molecule) {
      onChange(molecule);
      return;
    }
    molecule = naturalProductsData.items.find(item => item.UNPD_ID === newValue.id);
    if (molecule) {
      molecule = {
        name: molecule.cn,
        drugbank_id: molecule.UNPD_ID,
        calculated_properties: {
          SMILES: molecule.SMILES,
          ...molecule,
          'Moleculer Formula': molecule.mf,
        },
        toxicity: molecule.toxicity,
      }
      onChange(molecule);
    }
  }


  const validItems = item => item.calculated_properties && item.calculated_properties.SMILES;
  const options = data && 'items' in data ? data.items.filter(validItems)
    .map(item => ({
      id: item.drugbank_id,
      label: item.name,
      type: 'Drugs',
      tooltip: item.clinical_description
    })) : [];
  const naturalProductOptions = naturalProductsData && 'items' in naturalProductsData ? naturalProductsData.items.map(item => ({
    id: item.UNPD_ID,
    label: item.cn,
    type: 'Natural Products',
    tooltip: item.cn
  })) : [];

  return (
    <PillAutocomplete
      onChange={_onChange}
      onInputChange={executeSearch}
      options={[...options, ...naturalProductOptions]}
      loading={loading || naturalProductsLoading}
      label={label}
      variant="outlined"
      value=""
      clearOnBlur
      blurOnSelect
      groupBy={(option) => option.type}
    />
  );
}
