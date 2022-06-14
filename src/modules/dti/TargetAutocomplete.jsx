import {useApiCall} from "../../infrastructure/hooks/useApiCall";
import {Autocomplete} from "../../infrastructure/components/Autocomplete";
import {Endpoints} from "../../config/Consts";
import {useDashboardContext} from "../dashboard/context/useDashboarContext";

export const TargetAutocomplete = ({label, onChange, onEmpty}) => {
    const {state, dispatch} = useDashboardContext();
    const url = Endpoints.drugbank.targets;
    let selectedProtein = null;

    const {loading, data, error, fetch, reset} = useApiCall(url, null, null, false);
    if(state.protein) {
        selectedProtein = state.protein.name;
    }
    const executeSearch = (search) => {
        fetch(`${url}${search}`, 'GET')
    }


    const _onChange = (newValue) => {
        if (!data || typeof newValue === 'string') {
            return;
        }
        const target = data.find(item => item.amino_acid_sequence === newValue.id);
        onChange(target);
    }

    const options = data ? data
        .map(item => ({
            id: item.amino_acid_sequence,
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
