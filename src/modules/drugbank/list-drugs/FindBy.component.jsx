import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import * as PropTypes from 'prop-types';

export function FindBy(props) {
  return (
    <FormControl component="fieldset" sx={{mt: 2}}>
      <FormLabel component="legend">Find by</FormLabel>
      <RadioGroup row onChange={(e,v) => props.onChange(v)} value={props.value}>
        <FormControlLabel value="id" control={<Radio/>} label="Drugbank ID"/>
        <FormControlLabel value="name" control={<Radio/>} label="Drugname"/>
        <FormControlLabel value="query" control={<Radio/>} label="Anything"/>
      </RadioGroup>
    </FormControl>
  );
}

FindBy.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};
