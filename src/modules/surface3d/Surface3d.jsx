import Plot from "react-plotly.js";
import { memo, useEffect, useState } from "react";
import { Box, Container, Grid, Slider, Typography } from "@mui/material";
import { Utils } from "./utils";

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
  const [data, setData] = useState([{
    z: [],
    type: 'surface',
  }])
  const [state, setState] = useState({
    E0: 1,
    E1: 0.4,
    E2: 0.5,
    E3: 0.4,
    h1: 2,
    h2: 0.5,
    C1: 1,
    C2: 1,
    beta: 0,
    alpha21: 0,
    alpha12: 0,
    gamma21: 0,
    gamma12: 0,
  });
  const {E0, E1, E2, E3, h1, h2, C1, C2, alpha12, alpha21, gamma12, gamma21, d1, d2} = Utils.get_parameters(state);
  const E = Utils._MuSyC_E(d1, d2, E0, E1, E2, E3, h1, h2, C1, C2, alpha12, alpha21, gamma12, gamma21)
  console.log("E", E)
  const load = async () => {
    fetch('https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv')
      .then(res => res.text())
      .then(res => {
        const temp = res.split("\n").map(el => el.split(","));
        let z_data = []
        for (let i = 0; i < 24; i++) {
          z_data.push(unpack(temp, i));
        }

        setData([{
          z: [[8, 8, 8, 8, 8, 4, 3, 3, 3],
            [8, 8, 8, 8, 8, 4, 3, 3, 3],
            [7.5, 7.5, 7.5, 7.5, 7.5, 4, 3, 3, 3],
            [7, 7, 7, 7, 7, 4, 3, 3, 3],
            [6, 6, 6, 6, 6, 4, 3, 3, 3],
            [5, 5, 5, 5, 5, 4, 3, 3, 3],
            [4.5, 4.5, 4.5, 4.5, 4.5, 4, 3, 3, 3],
            [3, 3, 3, 3, 3, 4, 3, 3, 3]],
          type: 'surface'
        }])
      });
  }

  const unpack = (rows, key) => rows.map((row) => row[key]);

  useEffect(() => {
    load()
  }, [])

  return (
    <Container>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Plot
          data={data}
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
          <LabeledSlider label="E1" value={state.E1} min={0} max={1} step={0.05}
                         onChange={(e, v) => setState(prev => ({...prev, E1: v}))}/>
          <LabeledSlider label="log(C1)" value={state.C1} min={-2} max={2} step={0.2}
                         onChange={(e, v) => setState(prev => ({...prev, C1: v}))}/>
          <LabeledSlider label="log(h1)" value={state.h1} min={-1} max={1} step={0.2}
                         onChange={(e, v) => setState(prev => ({...prev, h1: v}))}/>
        </Grid>
        <Grid item xs={6}>
          <LabeledSlider label="E2" value={state.E2} min={0} max={1} step={0.05}
                         onChange={(e, v) => setState(prev => ({...prev, E2: v}))}/>
          <LabeledSlider label="log(C2)" value={state.C2} min={-2} max={2} step={0.2}
                         onChange={(e, v) => setState(prev => ({...prev, C2: v}))}/>
          <LabeledSlider label="log(h2)" value={state.h2} min={-1} max={1} step={0.2}
                         onChange={(e, v) => setState(prev => ({...prev, h2: v}))}/>
        </Grid>
      </Grid>


      <Typography gutterBottom>Synergy parameters</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LabeledSlider label="beta" value={state.beta} min={-3} max={3} step={0.2}
                         onChange={(e, v) => setState(prev => ({...prev, beta: v}))}/>
          <LabeledSlider label="log(alp21)" value={state.alpha21} min={-3} max={3} step={0.2}
                         onChange={(e, v) => setState(prev => ({...prev, alpha21: v}))}/>
          <LabeledSlider label="log(gam21)" value={state.gamma21} min={-1.4} max={1.6} step={0.2}
                         onChange={(e, v) => setState(prev => ({...prev, gamma21: v}))}/>
        </Grid>
        <Grid item xs={6}>
          <Box p={2}></Box>
          <LabeledSlider label="log(alp12)" value={state.alpha12} min={-3} max={3} step={0.2}
                         onChange={(e, v) => setState(prev => ({...prev, alpha12: v}))}/>
          <LabeledSlider label="log(gam12)" value={state.gamma12} min={-1.4} max={1.6} step={0.2}
                         onChange={(e, v) => setState(prev => ({...prev, gamma12: v}))}/>
        </Grid>
      </Grid>
    </Container>
  )
})
