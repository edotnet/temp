import {useApiCall} from "../../infrastructure/hooks/useApiCall";
import {Autocomplete} from "../../infrastructure/components/Autocomplete";
import {Endpoints} from "../../config/Consts";
import {useDashboardContext} from './context/useDashboarContext';

export const OrganismAutocomplete = ({label, onChange, onEmpty}) => {
  const {state, dispatch} = useDashboardContext();
  const proteinFilter = state.protein ? `?name=${state.protein.name}`: '';
  const url = `${Endpoints.proteins.organisms}${proteinFilter}`;
  let selectedOrganism = null;

  const {loading, data, error, fetch, reset} = useApiCall(url, 'GET');
  if(state.organism) {
    selectedOrganism = state.organism.organism.scientific;
  }
  const executeSearch = (search) => {
    fetch(`${url}&organismCriteria=${search}`, 'GET')
  }


  const _onChange = (newValue) => {
    if (!data || typeof newValue === 'string') {
      return;
    }
    const target = data.items.find(item => item.sequence === newValue.id);
    onChange(target);
  }

  const options = data ? data.items
    .map(item => ({
      id: item.sequence,
      label: item.organism.scientific
    })) : [];

  return (
    <Autocomplete
      key={'organism-autocomplete'}
      onChange={_onChange}
      onInputChange={newValue => executeSearch(newValue)}
      onEmpty={onEmpty}
      options={options}
      loading={loading}
      label={label}
      value={selectedOrganism}
      variant="standard"
    />
  );
}
