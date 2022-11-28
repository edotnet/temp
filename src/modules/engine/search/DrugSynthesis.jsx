import { Grid, TextField } from "@mui/material";
import {encodeQuery} from '../../../infrastructure/hooks/useApiCall';
import { DrugSynthesisToXDL } from "./DrugSynthesisToXDL";
import * as PropTypes from "prop-types";
import { Endpoints } from "../../../config/Consts";
import axios from "axios";
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";

export function DrugSynthesis({searchText, filter}) {
  const [pdfList, setPdfList] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState('');
  const [selectedPdfObj, setSelectedPdfObj] = useState("");
  const getpdfs = (list) => {
    if (list !== undefined) {
      const url = Endpoints.search.pdf;
      // reset pdflists and selected pdf object on click drug name
      setPdfList([]);
      setSelectedPdfObj("");
      axios.get(`${url}?query=${encodeQuery(list.replaceAll(' ',''))}&page=0&pageSize=10`).then((resp) => {
        console.log('response')
        if (resp.data.items) {
          setPdfList(resp.data.items);
          if (resp.data.items.length > 0) {
            setSelectedPdf(resp.data.items[0].title);
            setSelectedPdfObj(resp.data.items[0]);
          }
        }
      });
    }
  }
  useEffect(() => {
    if (!!searchText) {
      getpdfs(searchText);
    }
  }, [searchText]);

  const handlePdfChange = (e) => {
    const selectedpdf = e.target.value;
    setSelectedPdf(selectedpdf);
    const selectedObj = pdfList.find(text => text.title === selectedpdf);
    setSelectedPdfObj(selectedObj);
  }
  return <>
    <section id="title-wrapper">
      <div className="title">Drug Synthesis</div>
      <div className="line"></div>
      {!!filter && filter}
      {/*<div className="title">
        <TextField sx={{"width": "200px", "background": "#fff", "maxWidth": "200px"}}
                   id="outlined-select-currency" select label="Select Pdf" value={selectedPdf}
                   onChange={handlePdfChange}>
          {
            pdfList.map(text => <MenuItem key={text.id} value={text.title}>{text.title}</MenuItem>)
          }
        </TextField>
      </div>*/}
    </section>

    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DrugSynthesisToXDL pdfObj={selectedPdfObj} />
      </Grid>
    </Grid>
  </>;
}

DrugSynthesis.propTypes = {
  searchText: PropTypes.string,
  filter: PropTypes.node,
};

DrugSynthesis.defaultProps = {
  searchText: "",
  filter: null,
}
