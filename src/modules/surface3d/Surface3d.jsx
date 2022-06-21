import Plot from "react-plotly.js";
import { memo, useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Container, Grid, LinearProgress, Slider, Typography } from "@mui/material";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { Endpoints } from "../../config/Consts";
import { useDebounce } from "../../infrastructure/hooks/useDebounce";
import { useDashboardContext } from "../dashboard/context/useDashboarContext";
import { LabeledSlider } from "../../infrastructure/components/LabeledSlider";

export const Surface3d = memo(() => {
  const {state} = useDashboardContext();

  const initialSliderValues = {
    E0: 1,
    E1_slider_value: 0.5,
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
  const [sliderValues, setSliderValues] = useState(initialSliderValues);
  const debouncedState = useDebounce(sliderValues);
  const {data, loading, fetch} = useApiCall(`${Endpoints.musyc.query}`, 'GET', null, false)
  const lastData = useRef({
    x: [],
    y: [],
    z: [],
  });
  if (data) {
    lastData.current = {
      x: data.x,
      y: data.y,
      z: data.z.E,
    }
  }
  const onChange = prop => (ev, v) => {
    setSliderValues(prev => ({...prev, [prop]: v}));
  }

  useEffect(() => {
    const encodedObject = new URLSearchParams(debouncedState);
    fetch(`${Endpoints.musyc.query}?${encodedObject}`, 'GET', null);
  }, [debouncedState])

  useEffect(() => {
    if (!state.interactingMoleculesResult) {
      return;
    }
    const logS1 = state.interactingMolecules[0].calculated_properties.ALOGPS.logS ?? 0;
    const logS2 = state.interactingMolecules[1].calculated_properties.ALOGPS.logS ?? 0;
    setSliderValues(prev => ({...prev,
      E1_slider_value: logS1,
      E2_slider_value: logS2,
    }));
  }, [state.interactingMoleculesResult])

  return (
    <Container>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Plot
          data={[{
            z: lastData.current.z,
            type: 'surface',
          }]}
          layout={{

            paper_bgcolor: 'transparent',
            legend: {title: {text: 'tee'}},
            yaxis: {title: 'Drug2'}
          }}

        />
      </Box>
      <Box sx={{height: 10}}>
        {loading && <LinearProgress />}
      </Box>
      <Typography gutterBottom>Single drug parameters</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LabeledSlider label="E1" value={sliderValues.E1_slider_value} min={-6} max={6} step={0.05}
                         onChange={onChange('E1_slider_value')}/>
          <LabeledSlider label="log(C1)" value={sliderValues.C1_slider_value} min={-2} max={2} step={0.2}
                         onChange={onChange('C1_slider_value')}/>
          <LabeledSlider label="log(h1)" value={sliderValues.h1_slider_value} min={-1} max={1} step={0.2}
                         onChange={onChange('h1_slider_value')}/>
        </Grid>
        <Grid item xs={6}>
          <LabeledSlider label="E2" value={sliderValues.E2_slider_value} min={-6} max={6} step={0.05}
                         onChange={onChange('E2_slider_value')}/>
          <LabeledSlider label="log(C2)" value={sliderValues.C2_slider_value} min={-2} max={2} step={0.2}
                         onChange={onChange('C2_slider_value')}/>
          <LabeledSlider label="log(h2)" value={sliderValues.h2_slider_value} min={-1} max={1} step={0.2}
                         onChange={onChange('h2_slider_value')}/>
        </Grid>
      </Grid>


      <Typography gutterBottom>Synergy parameters</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LabeledSlider label="beta" value={sliderValues.beta_slider_value} min={-1} max={1} step={0.2}
                         onChange={onChange('beta_slider_value')}/>
          <LabeledSlider label="log(alp21)" value={sliderValues.alpha21_slider_value} min={-3} max={3} step={0.2}
                         onChange={onChange('alpha21_slider_value')}/>
          <LabeledSlider label="log(gam21)" value={sliderValues.gamma21_slider_value} min={-1.4} max={1.6} step={0.2}
                         onChange={onChange('gamma21_slider_value')}/>
        </Grid>
        <Grid item xs={6}>
          <Box p={2}></Box>
          <LabeledSlider label="log(alp12)" value={sliderValues.alpha12_slider_value} min={-3} max={3} step={0.2}
                         onChange={onChange('alpha12_slider_value')}/>
          <LabeledSlider label="log(gam12)" value={sliderValues.gamma12_slider_value} min={-1.4} max={1.6} step={0.2}
                         onChange={onChange('gamma12_slider_value')}/>
        </Grid>
      </Grid>

    </Container>
  )
})
