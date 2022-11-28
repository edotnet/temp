import { Button, Grid, TextField } from "@mui/material";
import * as PropTypes from "prop-types";
import GlobalResponse from '../../../assets/img/graid.png';
export function SearchInput(props) {
  return  <Grid container sx={{mt: 4, mb: 4}}>
    <Grid item xs={4}>
      <TextField
        fullWidth
        id="standard-basic"
        value={props.value}
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
        variant="outlined"
        placeholder={props.placeholder || "Search for..."}
        className="searchEngine-input"
        inputProps={{
          style: {
            height: "17px",
            paddingLeft: "10px",
          },
        }}
      />
    </Grid>
    <Grid item>
      <Button className="searchEngin-headerbtn btn-white" variant="outlined" onClick={() => props.onClick()}>Search</Button>
    </Grid>
    <Grid item>
      <img src={GlobalResponse} width={200} style={{cursor: 'pointer', marginTop: '-25px'}} onClick={() => props.onClickGraid()}/>
    </Grid>
  </Grid>;
}

SearchInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onClick: PropTypes.func,
  onClickGraid: PropTypes.func,
  placeholder: PropTypes.string
};
