import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import * as PropTypes from 'prop-types';

export function FindBy(props) {
  return (
    <FormControl component="fieldset" sx={{mt: 2}}>
      <FormLabel component="legend">Find by</FormLabel>
      <RadioGroup row onChange={(e,v) => props.onChange(v)} value={props.value}>
        <FormControlLabel value="drug" control={<Radio/>} label="Drug"/>
        <FormControlLabel value="natural_product" control={<Radio/>} label="Natural product"/>
      </RadioGroup>
    </FormControl>
  );
}

FindBy.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};
