import { useApiCall } from "../../../infrastructure/hooks/useApiCall";
import { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from '@mui/x-data-grid';
import ReactJson from "react-json-view";

export const ListDrugsFeature = () => {
  const [search, setSearch] = useState('');
  const [findBy, setFindBy] = useState('id');
  const {loading, data, error, fetch} = useApiCall("drugbank/query", 'GET', null, false);
  const executeSearch = () => {
    let url = "drugbank";
    switch (findBy){
      case 'id':
        url += `?id=${search}`;
        break;
      case 'name':
        url += `?name=${search}`;
        break;
      case 'clinical_description':
        url += `/query/${encodeURIComponent(search)}`;
        break;
    }
    fetch(url, 'GET');
  }
  const columns = [
    {
      field: 'drugbank_id',
      headerName: 'Drugbank ID',
      width: 100
    },
    {
      field: 'name',
      headerName: 'Drug',
      width: 100
    },
    {
      field: 'smiles',
      headerName: 'Smiles',
      width: 200
    },
    {
      field: 'chemical_properties',
      headerName: 'Chemical Properties',
      width: 200
    },
    {
      field: 'calculated_properties',
      headerName: 'Calculated Properties',
      width: 200
    },
  ];
console.log(data)
  return (
    <Container>
      <Box mt={2}>
        <Box sx={{display: 'flex',  justifyContent: 'space-between', mb: 2}}>
          <Box>
            <FormControl component="fieldset" sx={{mt:2}}>
              <FormLabel component="legend">Find by</FormLabel>
              <RadioGroup row onChange={e => setFindBy(e.target.value)} value={findBy} >
                <FormControlLabel value="id" control={<Radio />} label="Drugbank ID" />
                <FormControlLabel value="name" control={<Radio />} label="Drugname" />
                <FormControlLabel value="clinical_description" control={<Radio />} label="Clinical description" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box sx={{alignSelf: 'flex-end', display: 'flex'}}>
            <TextField
              fullWidth
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Find by clinical description, target or whatever"
              InputProps={{
                endAdornment: <Button variant="contained" onClick={() => executeSearch()}>Search</Button>
              }}
            />
          </Box>
        </Box>

        {loading ? <div>Loading</div> : null}
        {!loading && findBy === 'clinical_description' && data && <Box sx={{height: 200}}>
            <DataGrid
              rows={data || []}
              columns={columns}
              pageSize={10}
              disableSelectionClick
              getRowId={row => row.drugbank_id}
            />
          </Box>
        }
        {!loading && findBy !== 'clinical_description' && data && <Box>
          <ReactJson src={data} name={null} collapsed={true}/>
        </Box>}

      </Box>
    </Container>
  )
}
