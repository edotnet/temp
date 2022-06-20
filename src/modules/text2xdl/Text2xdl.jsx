import { Box, TextField } from "@mui/material";
import { useState, useRef } from "react";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import beautify from "xml-beautifier";
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { DrugSelector } from '../drug-synthesis/drug-synthesis-feature';
import { useEffect } from "react";

export const Text2xdlFeature = () => {
  const xdlText = useRef(null);
  const [text, setText] = useState('');
  const [selectedDrug, setSelectedDrug] = useState("");
  const [drugs, setDrugs] = useState([]);
  const [Loadingresult, setLoadingresult] = useState(false);
  const url = `https://api.prepaire.com/text-to-xdl`;
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const onRun = () => {
    fetch(url, 'POST', {input: text});
    setLoadingresult(true);
  }

  useEffect(() => {
    const drugs = [
      {
        name: "2‑amino‑5‑chloropyrazine",
        text: "Method A. To a solution of 2-aminopyrazine (1.84 g, 19.4  mmol) in acetonitrile (15  mL) was added NCS (2.59 g, 19.4 mmol) in batches at room temperature. The reaction mixture was stirred for 5 h, and filtrated through diatomaceous earth (Celite®). The filter cake was washed with ethyl acetate (20 mL × 2). The combined filtrate was concentrated under vacuum, and then saturated aqueous extracted with ethyl acetate (100 mL). The organic layer was dried over anhydrous Na2SO4, decolorized with activated charcoal (0.5 g), and concentrated. The residue was purified by chromatography on silica gel eluting with petroleum ether (PE)-ethyl acetate (EA) (10:1–2:1) to give a light-yellow solid (1.38 g, yield 55%)."
      },
      {
        name: "empty_product_name",
        text: "Method B. To a suspension of 2-aminopyrazine (3 g, 31.6 mmol) in acetonitrile (50 mL) was added N-chloroN-methoxy-4-methylbenzenesulfonamide (TSA, 8.2 g, 34.7 mmol) in batches at room temperature. The reaction mixture was heated at 40 °C for 4 h. Subsequently, the solvent was evaporated in vacuum and the residue was partitioned between ethyl acetate (50 mL) and saturated aqueous Na2CO3 solution (20 mL). The organic layer was dried over anhydrous Na2SO4, decolorized with activated charcoal (0.8 g), and concentrated. The crude product containing ~ 5% dichlorinated impurity judged by TLC was purified by chromatography on silica gel eluting with PE/ EA (10:1–2:1) to give a light-yellow solid (3.3 g, yield 80%)."
      },
      {
        name: "2‑amino‑3‑bromo‑5‑chloropyrazine",
        text: "17 (1.1 g, 8.5 mmol) was dissolved in dichloromethane (25 mL) followed by the addition of NBS (1.52 g, 8.5 mmol) in batches over a period of 15 min at room temperature. When the reaction was completed, saturated aqueous Na2CO3 solution (10 mL) was added. After stirring for 10 min, the mixture was partitioned between dichloromethane (100 mL) and water (100 mL). The organic layer was dried over anhydrous Na2SO4, decolorized with activated charcoal (0.5 g), and concentrated to give a yellow solid (1.53 g, yield 87%)."
      },
      {
        name: "2‑amino‑3,5‑dibromopyrazine",
        text: "To a suspension of 2-aminopyrazine (4 g, 42.1 mmol) in dichloromethane (100 mL) was added NBS (18.7 g, 105 mmol) in batches over a period of 1 h at room temperature. The reaction mixture was stirred at room temperature for 5 h. When the reaction was completed, saturated aqueous Na2CO3 solution (40 mL) was added. After stirring for 15 min, the mixture was partitioned between dichloromethane (200 mL) and water (100 mL). The organic layer was then dried over anhydrous Na2SO4, decolorized with activated charcoal (1 g), and concentrated to give a yellow solid (8.0 g, yield 76%)." 
      },
      {
        name: "6‑chloro‑3‑aminopyrazine‑2-carbonitrile",
        text: "The suspension of 18a (3 g, 14.5 mmol), NaCN (0.85 g, 17.4 mmol), CuI (1.3 g, 7.3 mmol) and Pd(PPh3)4 (0.17 g, 10 h under nitrogen protection. After cooling to room temperature, 10% aqueous solution of Na2S2O3 (10 mL), water (60 mL) and ethyl acetate (200 mL) were added. The resulting mixture was stirred for 10 min, then filtered, and the filter cake was washed with ethyl acetate (150 mL). The organic layer was separated, washed with water (3 × 50 mL), dried over anhydrous Na2SO4 and concentrated. The residue was purified by chromatography on silica gel eluting with PE/EA (10:1–2:1) to give a light-yellow solid (1.9 g, yield 85%)."
      },
      {
        name: "6‑bromo‑3‑aminopyrazine‑2-carbonitrile",
        text: "The suspension of 18b (2.51 g, 10.0 mmol), NaCN (0.59 g, 12.0 mmol), CuI (0.95 g, 5.0 mmol) and Pd(PPh3)4 (0.14 g, 0.1 mmol) were stirred in DMF (20 mL) at 120 °C for 10 h under nitrogen protection. After cooling to room temperature, 10% aqueous solution of Na2S2O3 (10 mL) and water (50 mL) were added. The mixture was extracted with ethyl acetate (50 mL × 3), washed with water (3 × 50 mL), dried over anhydrous Na2SO4 and concentrated. The residue was purified by chromatography on silica gel eluting with PE/ EA (10:1–2:1) to give an off-white solid (1.1 g, yield 55%)."
      },
      {
        name: "3,6‑dichloropyrazine‑2‑carbonitrile",
        text: "To a solution of 19a (3 g, 20 mmol) in DCM (50 mL) at 0 °C was successively added TiCl4 (2.2 mL, 20 mmol) and tertbutyl nitrite (7.4 mL, 62 mmol). The reaction mixture was stirred at room temperature for 3 h. When the reaction was completed monitored by TLC, the solvent was evaporated and the residue was treated with water (50 mL) and then extracted with ethyl acetate (2 × 50 mL). The extract was dried over Na2SO4, and concentrated to give 8 as a white solid (2.8 g, yield 81%)."
      },
      {
        name: "3,6‑difluoropyrazine‑2‑carbonitrile",
        text: "A mixture of 8 (2.6 g, 15.0 mmol), KF (5.23 g, 90.0 mmol), tetrabutylammonium bromide (1.93 g, 6.0 mmol) was predried under vacuum over phosphorus pentoxide. The mixture was charged in a polytetrafluoroethylene bottle followed by the addition of dried DMSO (20 mL), and heated at 60 °C for 2.5–3 h. The reaction mixture was cooled to room temperature, treated with water (80 mL) and extracted with diethyl ether (100 mL). The organic layer was washed with water (3 × 25 mL), dried over Na2SO4, and purified by chromatography on silica gel with PE/EA (50:1–10:1) as eluent to give 9 as a white solid (1.27 g, yield 60%)."
      },
      {
        name: "3,6‑difluoropyrazine‑2‑carboxamide",
        text: "To a solution of 9 (1.4 g, 10 mmol) in THF (5 mL) was added concentrated hydrochloric acid (30 mL). The reaction mixture was heated at 60 °C for 1.5 h, then cooled to room temperature and evaporated under vacuum. The residue was purified by chromatography on silica gel with PE/EA as eluent to give 10 as a white solid (1.2 g, yield 75%)."
      },
      {
        name: "6‑fluoro‑3‑hydroxypyrazine‑2-carboxamide",
        text: "10 (1.2 g, 7.5 mmol), sodium bicarbonate (3.8 g, 45.2 mmol) were added into a mixture of 1,4-dioxane (10 mL) and water (20 mL). The reaction mixture was heated at 60 °C for 8 h. When the reaction was completed, hydrochloric acid (30 mL, 3 M) was added to adjust the pH to 3–4. The precipitate was collected, dried in vacuum to give a lightyellow solid (0.83 g). The filtrate was extracted with ethyl acetate (2 × 50 mL). The organic layer was washed with brine (2 × 10 mL), dried over Na2SO4, and evaporated to give another portion (0.14 g) of the product. The total yield was 82%."
      },
      {
        name: "3,5‑dibromo‑2‑hydroxylpyrazine",
        text: "18b (3.0 g, 12 mmol) was added into acetic acid (20 mL) and concentrated sulfuric acid (4 mL) under ice bath. To this mixture was added a pre-prepared solution of NaNO2 (1.65 g, 24 mmol) in water (10 mL). The reaction mixture was stirred at room temperature for 3 h, and then poured into ice water (100 g). The precipitate was collected by filtrated, washed with water and dried to give an off-white solid (1.8 g, yield 61%)."
      },
      {
        name: "3‑hydroxy‑6‑nitropyrazine‑2-carboxamide",
        text: "To a solution of 6 (4.0 g, 28.7 mmol) in concentrated sulfuric acid (20 mL) under ice-cooling was added potassium nitrate (5.8 g, 57.5 mmol) in three batches. After stirring at 40 °C for 4 h, the reaction mixture was poured into ice water (200 g). The resulting precipitate was collected by filtration. The solid was slurried in pure water (20 mL) and dried to give a light-yellow solid (1 g, yield 19%)."
      }
    ];
    setDrugs(drugs);
  }, []);

  function NewlineText(value , ind) {
    const text = value;
    const newText = text.split('\n').map(str => <p key={ind}>{str}</p>);
    return newText;
  }

  const handleDrugChange = (e) => {
    const selectedDrug = e.target.value;
    setSelectedDrug(selectedDrug);
    const selectedText = drugs.find(drug => drug.name === selectedDrug)["text"];
    setText(selectedText);
  }

  function prettyformat(value) {
    const xml = beautify(value);
    return xml;
  }

  return (
    // <Box>
    //   <TextField
    //     id="outlined-multiline-static"
    //     label="Multiline"
    //     fullWidth
    //     multiline
    //     rows={10}
    //     value={text}
    //     onChange={e => setText(e.target.value)}
    //   />
    //   <Button color="primary" onClick={onRun} variant="contained" disabled={!text.length} sx={{my:2}}>Get XDL</Button>
    //   {data && data.xml}
    // </Box>
    <div className="searchEngine-xdl">
      <h2>Upload Text2XDL</h2>
      {/* {copySuccess} */}
      <DrugSelector drugs={drugs.map(drug => drug.name)} handleDrugChange={handleDrugChange} selectedDrug={selectedDrug} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className="text">
            <div className="translate-block">
              <h4>2XDL text</h4>
              <Box sx={{position: 'absolute', right: 40, top: 13}}>
                <IconButton color="primary" aria-label="copy to clipboard" component="span">
                  <ContentCopy />
                </IconButton>
              </Box>
              <TextField id="style-2" ref={xdlText} 
                variant="standard" InputProps={{ disableUnderline: true}} className="area" fullWidth multiline 
                rows={15} value={text} onChange={e => setText(e.target.value)} 
              />
              <Button onClick={onRun} disabled={!text.length} sx={{my:2}} variant="outlined">Translate To Synthesis XDL Code</Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={8}>
          {
            data && data.result ?
              <div className="result" id="style-2">
                <h4 className="heading">Drug Synthesis Translated to XDL Code</h4>
                <Grid container spacing={2}>
                  <Grid item xs={6} sx={{position: 'relative'}}>
                    <h4>Synthesis Process</h4>
                    <Box sx={{ position: 'absolute', right: 10, top: 30}}>
                      <IconButton color="primary" aria-label="copy to clipboard" component="span">
                        <ContentCopy />
                      </IconButton>
                    </Box>
                    <div className="process" id="style-2">
                      {data && data.result ? NewlineText(data.result.text) : ''}
                    </div>
                  </Grid>
                  <Grid item xs={6} sx={{position: 'relative'}} >
                    <h4>Synthesis XDL</h4>
                    <Box sx={{position: 'absolute', right: 10, top: 30}}>
                      <IconButton color="primary" aria-label="copy to clipboard" component="span">
                        <ContentCopy />
                      </IconButton>
                    </Box>
                    <div className="synthesis" id="style-2">
                      <pre>
                        {data && data.result ? prettyformat(data.result.xml)  : ''}
                      </pre>
                    </div>
                  </Grid>
                </Grid>
              </div> : Loadingresult === true ? <div className="result"><div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}><Box> <CircularProgress /><h4>Loading...</h4></Box></div></div>: ''
          }
        </Grid>
      </Grid>
    </div>
  )
}
