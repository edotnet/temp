import { Grid, Slider, Typography } from "@mui/material";

export const LabeledSlider = ({label, scaledValue, value, min, max, step, onChange}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Typography align="right">{label}</Typography>
      </Grid>
      <Grid item xs={8}>
        <Slider value={value} min={min || 0} max={max || 100} step={step || 1} onChange={onChange}/>
      </Grid>
      <Grid item xs={2}>
        <Typography>{parseFloat(value).toFixed(2)}</Typography>
      </Grid>
    </Grid>
  );
}
