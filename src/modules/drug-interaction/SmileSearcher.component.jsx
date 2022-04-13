import { FindBy } from "./FindBy.component";
import { DrugAutocomplete } from "./DrugAutocomplete";
import { useState } from "react";
import { NaturalProductAutocomplete } from "./NaturalProductAutpocomplete.component";
import { Box } from "@mui/material";

export const SmileSearcher = (props) => {
  const [findBySmile, setFindBySmile] = useState('drug')
  const onChange = (value) => {
    props.onChange(value.id)
  }
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
