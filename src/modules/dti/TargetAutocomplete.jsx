import {encodeQuery, useApiCall} from '../../infrastructure/hooks/useApiCall';
import {Autocomplete} from "../../infrastructure/components/Autocomplete";
import {Endpoints} from "../../config/Consts";
import {useDashboardContext} from "../dashboard/context/useDashboarContext";

export const TargetAutocomplete = ({label, onChange, onEmpty}) => {
    const {state, dispatch} = useDashboardContext();
    const url = Endpoints.proteins.name;
    let selectedProtein = null;

    const {loading, data, error, fetch, reset} = useApiCall(url, null, null, false);
    if(state.protein) {
        selectedProtein = state.protein.name;
    }
    const executeSearch = (search) => {
        fetch(`${url}?criteria=${encodeQuery(search)}`, 'GET')
    }


    const _onChange = (newValue) => {
        if (!data || typeof newValue === 'string') {
            return;
        }
        const target = data.items.find(item => item.id === newValue.id);
        onChange(target);
    }

    const options = data ? data.items
        .map(item => ({
            id: item.id,
            label: item.name
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
            value={selectedProtein}
            variant="standard"
        />
    );
}
