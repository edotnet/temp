import Plot from "react-plotly.js";
import { memo, useRef, useState } from "react";
import { Box, Container, Grid, Slider, Typography } from "@mui/material";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { Endpoints } from "../../config/Consts";
import { initializedState } from "react-slick/lib/utils/innerSliderUtils";
import { useDebounce } from "../../infrastructure/hooks/useDebounce";

function LabeledSlider({label, scaledValue, value, min, max, step, onChange}) {
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

export const Surface3d = memo(() => {
  const initialState = {
    E0: 1,
    E1_slider_value: 0.4,
    E2_slider_value: 0.5,
    E3_slider_value: 0.4,
    h1_slider_value: 1,
    h2_slider_value: 0.5,
    C1_slider_value: 0,
    C2_slider_value: 0,
    beta_slider_value: 0,
    alpha21_slider_value: 0,
    alpha12_slider_value: 0,
    gamma21_slider_value: 0,
    gamma12_slider_value: 0,
  }
  const [state, setState] = useState(initialState);
  const debouncedState = useDebounce(state);
  const encodedObject = new URLSearchParams(debouncedState);
  const {data, loading} = useApiCall(`${Endpoints.musyc.query}?${encodedObject}`, 'GET')
  const lastData = useRef([]);
  if (data){
    lastData.current = data.z.E
  }
  const onChange = prop => (ev, v) => {
    setState(prev => ({...prev, [prop]: v}));
  }

  return (
    <Container>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Plot
            data={[{
              z: lastData.current,
              type: 'surface',
            }]}
            layout={{
              width: 500,
              height: 500,
              paper_bgcolor: 'transparent',
              legend: {title: {text: 'tee'}},
              yaxis: {title: 'Drug2'}
            }}

          />
      </Box>
      <Typography gutterBottom>Single drug parameters</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LabeledSlider label="E1" value={state.E1_slider_value} min={0} max={1} step={0.05}
                         onChange={onChange('E1_slider_value')}/>
          <LabeledSlider label="log(C1)" value={state.C1_slider_value} min={-2} max={2} step={0.2}
                         onChange={onChange('C1_slider_value')}/>
          <LabeledSlider label="log(h1)" value={state.h1_slider_value} min={-1} max={1} step={0.2}
                         onChange={onChange('h1_slider_value')}/>
        </Grid>
        <Grid item xs={6}>
          <LabeledSlider label="E2" value={state.E2_slider_value} min={0} max={1} step={0.05}
                         onChange={onChange('E2_slider_value')}/>
          <LabeledSlider label="log(C2)" value={state.C2_slider_value} min={-2} max={2} step={0.2}
                         onChange={onChange('C2_slider_value')}/>
          <LabeledSlider label="log(h2)" value={state.h2_slider_value} min={-1} max={1} step={0.2}
                         onChange={onChange('h2_slider_value')}/>
        </Grid>
      </Grid>


      <Typography gutterBottom>Synergy parameters</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LabeledSlider label="beta" value={state.beta_slider_value} min={-3} max={3} step={0.2}
                         onChange={onChange('beta_slider_value')}/>
          <LabeledSlider label="log(alp21)" value={state.alpha21_slider_value} min={-3} max={3} step={0.2}
                         onChange={onChange('alpha21_slider_value')}/>
          <LabeledSlider label="log(gam21)" value={state.gamma21_slider_value} min={-1.4} max={1.6} step={0.2}
                         onChange={onChange('gamma21_slider_value')}/>
        </Grid>
        <Grid item xs={6}>
          <Box p={2}></Box>
          <LabeledSlider label="log(alp12)" value={state.alpha12_slider_value} min={-3} max={3} step={0.2}
                         onChange={onChange('alpha12_slider_value')}/>
          <LabeledSlider label="log(gam12)" value={state.gamma12_slider_value} min={-1.4} max={1.6} step={0.2}
                         onChange={onChange('gamma12_slider_value')}/>
        </Grid>
      </Grid>

    </Container>
  )
})
