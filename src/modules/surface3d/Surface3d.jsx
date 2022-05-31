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
const initialValues = [[8, 8, 8, 8, 8, 4, 3, 3, 3],
  [8, 8, 8, 8, 8, 4, 3, 3, 3],
  [7.5, 7.5, 7.5, 7.5, 7.5, 4, 3, 3, 3],
  [7, 7, 7, 7, 7, 4, 3, 3, 3],
  [6, 6, 6, 6, 6, 4, 3, 3, 3],
  [5, 5, 5, 5, 5, 4, 3, 3, 3],
  [4.5, 4.5, 4.5, 4.5, 4.5, 4, 3, 3, 3],
  [3, 3, 3, 3, 3, 4, 3, 3, 3]]
export const Surface3d = memo(() => {
  const [data, setData] = useState([{
    z: initialValues,
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
  const onChange = prop => (ev, v) => {
    let z_data = [...data[0].z];
    if (prop === 'E1') {
      z_data = z_data.map((val, i) => {
        const newVal = [...val];
        newVal[9] = initialValues[i][9] * v;
        return newVal;
      });
      z_data = z_data.map((val, i) => {
        const newVal = [...val];
        newVal[8] = initialValues[i][8] * (v/2);
        return newVal;
      });
    }
    if (prop === 'E2') {
      z_data = z_data.map((val, i) => {
        const newVal = [...val];
        newVal[7] = initialValues[i][7] * v;
        return newVal;
      });
      z_data = z_data.map((val, i) => {
        const newVal = [...val];
        newVal[6] = initialValues[i][6] * (v/2);
        return newVal;
      });
    }
    if (prop === 'C1') {
      z_data = z_data.map((val, i) => {
        const newVal = [...val];
        newVal[5] = initialValues[i][5] * v;
        return newVal;
      });
      z_data = z_data.map((val, i) => {
        const newVal = [...val];
        newVal[4] = initialValues[i][4] * (v/2);
        return newVal;
      });
    }
    if (prop === 'C2') {
      z_data = z_data.map((val, i) => {
        const newVal = [...val];
        newVal[3] = initialValues[i][3] * v;
        return newVal;
      });
      z_data = z_data.map((val, i) => {
        const newVal = [...val];
        newVal[2] = initialValues[i][2] * (v/2);
        return newVal;
      });
    }
    if (prop === 'h1') {
      z_data = z_data.map((val, i) => {
        let newVal = [...val];
        if (i===4) {
          newVal = newVal.map((nv, col) => {
            return initialValues[i][col] * v
          })
        }
        return newVal;
      });
      z_data = z_data.map((val, i) => {
        let newVal = [...val];
        if (i===5) {
          newVal = newVal.map((nv, col) => {
            return initialValues[i][col] * v/2
          })
        }
        return newVal;
      });
    }
    if (prop === 'h2') {
      z_data = z_data.map((val, i) => {
        let newVal = [...val];
        if (i===6) {
          newVal = newVal.map((nv, col) => {
            return initialValues[i][col] * v
          })
        }
        return newVal;
      });
      z_data = z_data.map((val, i) => {
        let newVal = [...val];
        if (i===7) {
          newVal = newVal.map((nv, col) => {
            return initialValues[i][col] * v/2
          })
        }
        return newVal;
      });
    }
    setData([{
      z: z_data,
      type: 'surface',
    }]);
    setState(prev => ({...prev, [prop]: v}));
  }

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
                         onChange={onChange('E1')}/>
          <LabeledSlider label="log(C1)" value={state.C1} min={-2} max={2} step={0.2}
                         onChange={onChange('C1')}/>
          <LabeledSlider label="log(h1)" value={state.h1} min={-1} max={1} step={0.2}
                         onChange={onChange('h1')} />
        </Grid>
        <Grid item xs={6}>
          <LabeledSlider label="E2" value={state.E2} min={0} max={1} step={0.05}
                         onChange={onChange('E2')} />
          <LabeledSlider label="log(C2)" value={state.C2} min={-2} max={2} step={0.2}
                         onChange={onChange('C2')}/>
          <LabeledSlider label="log(h2)" value={state.h2} min={-1} max={1} step={0.2}
                         onChange={onChange('h2')}/>
        </Grid>
      </Grid>

      {/*
      <Typography gutterBottom>Synergy parameters</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LabeledSlider label="beta" value={state.beta} min={-3} max={3} step={0.2}
                         onChange={onChange('beta')}/>
          <LabeledSlider label="log(alp21)" value={state.alpha21} min={-3} max={3} step={0.2}
                         onChange={onChange('alpha21')}/>
          <LabeledSlider label="log(gam21)" value={state.gamma21} min={-1.4} max={1.6} step={0.2}
                         onChange={onChange('gamma21')}/>
        </Grid>
        <Grid item xs={6}>
          <Box p={2}></Box>
          <LabeledSlider label="log(alp12)" value={state.alpha12} min={-3} max={3} step={0.2}
                         onChange={onChange('alpha12')}/>
          <LabeledSlider label="log(gam12)" value={state.gamma12} min={-1.4} max={1.6} step={0.2}
                         onChange={onChange('gamma12')}/>
        </Grid>
      </Grid>
      */}
    </Container>
  )
})
