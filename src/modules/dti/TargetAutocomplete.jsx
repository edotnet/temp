import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { Autocomplete } from "../../infrastructure/components/Autocomplete";
import { EventTypes } from "../../infrastructure/event-system/Event.types";
import { useEvent } from "../../infrastructure/event-system/hooks/useEvent";
import { useRef, useState } from "react";

export const TargetAutocomplete = ({label, onChange, onEmpty}) => {
  const url = `drugbank/target/query/`;
  const {loading, data, error, fetch, reset} = useApiCall(url, null, null, false);
  const [key, setKey] = useState(Math.random());

  useEvent(EventTypes.DASHBOARD.RESET, () => {
    reset()
    setKey(Math.random())
  })
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
      key={key}
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
