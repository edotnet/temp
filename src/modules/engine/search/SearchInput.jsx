import { Button, Grid, TextField } from "@mui/material";
import * as PropTypes from "prop-types";

export function SearchInput(props) {
  return  <Grid container sx={{mt: 4, mb: 4}}>
    <Grid item xs={4}>
      <TextField
        fullWidth
        id="standard-basic"
        value={props.value}
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
        variant="standard"
        placeholder="Search for..."
        className="searchEngine-input"
        inputProps={{
          style: {
            height: "41px",
            paddingLeft: "10px"
          },
        }}
      />
    </Grid>
    <Grid item>
      <Button className="searchEngin-headerbtn btn-white" variant="outlined" onClick={() => props.onClick()}>Search</Button>
    </Grid>
  </Grid>;
}

SearchInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onClick: PropTypes.func
};
