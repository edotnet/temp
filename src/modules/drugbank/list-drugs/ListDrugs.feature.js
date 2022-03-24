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

export const ListDrugsFeature = () => {
  const [url, setUrl] = useState('drugbank');
  const [search, setSearch] = useState('');
  const [findBy, setFindBy] = useState('id');
  const {loading, data, error, fetch} = useApiCall(url, 'GET', null, false);
  const executeSearch = () => {
    fetch(url, 'GET');
  }
  const columns = [
    {
      field: 'name',
      headerName: 'Drug',
    },
    {
      field: 'smiles',
      headerName: 'Smiles',
    },
    {
      field: 'chemical_properties',
      headerName: 'Chemical Properties',
    },
    {
      field: 'calculated_properties',
      headerName: 'Calculated Properties',
    },
  ];

  return (
    <Container>
      <Box mt={2}>
        <TextField
          fullWidth
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Find by clinical description, target or whatever"
        />
        <Box sx={{display: 'flex',  justifyContent: 'space-between'}}>
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
          <Box sx={{alignSelf: 'flex-end'}}>
            <Button variant="contained" onClick={() => executeSearch()}>Search</Button>
          </Box>
        </Box>

        {loading ? <div>Loading</div> : null}
        {!loading && findBy === 'clinical_description' && data ? <Box>
            <DataGrid
              rows={data || []}
              columns={columns}
              pageSize={10}
              disableSelectionClick
            />
          </Box> : null
        }

      </Box>
    </Container>
  )
}
