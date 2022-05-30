import Plot from "react-plotly.js";
import { memo, useEffect, useState } from "react";
import { Box, Container, Grid, Slider, Typography } from "@mui/material";

function LabeledSlider({label, scaledValue, value}) {
  return (
  <Grid container spacing={2}>
    <Grid item xs={2}>
      <Typography align="right">{label}</Typography>
    </Grid>
    <Grid item xs={8}>
      <Slider defaultValue={scaledValue}/>
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
          z: z_data,
          type: 'surface'
        }])
      })
  }

  const unpack = (rows, key) => {
    return rows.map(function (row) {
      return row[key];
    });
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <Container>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Plot
          data={data}
          layout={{width: 500, height: 500, paper_bgcolor: 'transparent', legend: {title: {text:'tee'}}, yaxis: {title: 'Drug2'}}}

        />
      </Box>
      <Typography gutterBottom>Single drug parameters</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LabeledSlider label="E1" value={0.40} scaledValue={40}/>
          <LabeledSlider label="log(C1)" value={0} scaledValue={50}/>
          <LabeledSlider label="log(h1)" value={0.30} scaledValue={70}/>
        </Grid>
        <Grid item xs={6}>
          <LabeledSlider label="E2" value={0.50} scaledValue={50}/>
          <LabeledSlider label="log(C2)" value={0} scaledValue={50}/>
          <LabeledSlider label="log(h2)" value={-0.30} scaledValue={30}/>
        </Grid>
      </Grid>


      <Typography gutterBottom>Synergy parameters</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LabeledSlider label="beta" value={0.0} scaledValue={50}/>
          <LabeledSlider label="log(alp21)" value={0} scaledValue={50}/>
          <LabeledSlider label="log(gam21)" value={0.00} scaledValue={50}/>
        </Grid>
        <Grid item xs={6}>
          <Box p={2}></Box>
          <LabeledSlider label="log(alp12)" value={0} scaledValue={50}/>
          <LabeledSlider label="log(gam12)" value={0} scaledValue={50}/>
        </Grid>
      </Grid>
    </Container>
  )
})
