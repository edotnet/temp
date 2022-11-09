import {memo} from 'react';
import {Endpoints} from '../../config/Consts';
import {Autocomplete} from '../../infrastructure/components/Autocomplete';
import {encodeQuery, useApiCall} from '../../infrastructure/hooks/useApiCall';
import {useDashboardContext} from '../dashboard/context/useDashboarContext';

const TargetAutocompleteComponent = ({label, onChange, onEmpty}) => {
  const {state} = useDashboardContext();
  const url = Endpoints.proteins.name;
  const {loading, data, fetch} = useApiCall(url, null, null, false);

  const executeSearch = (search) => {
    fetch(`${url}?criteria=${encodeQuery(search)}`, 'GET');
  };

  const _onChange = (newValue) => {
    if (!data || typeof newValue === 'string') {
      return;
    }
    const target = data.items.find(item => item.id === newValue.id);
    onChange(target);
  };

  const options = data ? data.items
    .map(item => ({
      id: item.id,
      label: item.name,
    })) : [];

  return (
    <Autocomplete
      key={'target-autocomplete'}
      onChange={_onChange}
      onInputChange={newValue => executeSearch(newValue)}
      onEmpty={onEmpty}
      options={options}
      loading={loading}
      label={label}
      value={state.protein?.name || null}
      variant="standard"
    />
  );
};
export const TargetAutocomplete = memo(TargetAutocompleteComponent);
