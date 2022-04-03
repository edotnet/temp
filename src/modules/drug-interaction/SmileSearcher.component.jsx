import { FindBy } from "./FindBy.component";
import { DrugAutocomplete } from "./DrugAutocomplete";
import { useState } from "react";
import { NaturalProductAutocomplete } from "./NaturalProductAutpocomplete.component";
import { Box } from "@mui/material";

export const SmileSearcher = ({label, onChange}) => {
  const [findBySmile, setFindBySmile] = useState('drug')
  return (
    <>
      <Box pb={2}>
        <FindBy value={findBySmile} onChange={setFindBySmile} />
      </Box>
      {findBySmile === 'drug' ?
        <DrugAutocomplete label="Drug" onChange={onChange}/> :
        <NaturalProductAutocomplete label="Product" onChange={onChange} />
      }
    </>
  )
}
