import { useApiCall } from "../../../infrastructure/hooks/useApiCall";
import { useEffect, useState } from "react";
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
  const [page, setPage] = useState(0);
  const [findBy, setFindBy] = useState('query');
  const [detail, setDetail] = useState(false);
  const {loading, data, error, fetch} = useApiCall("drugbank/query", 'GET', null, false);
  const [rowCountState, setRowCountState] = useState(0);
  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      data && data.count !== undefined ? data.count : prevRowCountState,
    );
  }, [data, setRowCountState]);
  useEffect(() => {
    executeSearch();
  }, [page])
  const options = {
    id: {
      url: `?id=${search}`,
      placeholder: 'Drugbank ID'
    },
    name: {
      url: `?name=${search}`,
      placeholder: 'Drug exact name'
    },
    query: {
      url: `/query/${encodeURIComponent(search)}?page=${page}`,
      placeholder: 'Find by clinical description, target, name, etc...'
    }
  }
  const executeSearch = () => {
    const url = `drugbank${options[findBy].url}`;
    fetch(url, 'GET');
  }
  const columns = [
    {
      field: 'drugbank_id',
      headerName: 'Drugbank ID',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Drug',
      flex: 1,
    },
    {
      field: 'calculated_properties',
      headerName: 'Smiles',
      flex: 1,
      valueFormatter: (params) => params.value ? params.value.SMILES : '-',
    },
    /*{
      field: 'chemical_properties',
      headerName: 'Chemical Properties',
      width: 200
    },
    {
      field: 'calculated_properties',
      headerName: 'Calculated Properties',
      width: 200,
    },*/
  ];

  const renderContent = () => {
    if (loading && findBy !== 'query') {
      return <div>Loading</div>;
    }
    if (error) {
      return <div>Not found</div>;
    }
    if (!loading && findBy === 'query' && data) {
      return (
        <div style={{display: 'flex', height: '100%'}}>
          <div style={{flexGrow: 1, height: 800}}>
            <DataGrid
              paginationMode="server"
              loading={loading}
              page={page}
              autoPageSize
              autoHeight
              rows={data.items || []}
              columns={columns}
              disableSelectionClick
              getRowId={row => row.drugbank_id}
              onRowClick={params => {
                setDetail(params.row)
              }}
              onPageChange={(page) => setPage(page)}
              rowCount={rowCountState}
            />
            {detail ?
              <Box p={2}>
                <ReactJson src={detail} name={null} collapsed={false}/>
              </Box> : null
            }
          </div>
        </div>
      );
    }
    if (!loading && findBy !== 'query' && data) {
      return (
        <Box>
          <ReactJson src={data} name={null} collapsed={true}/>
        </Box>
      );
    }
  }

return (
  <Container>
    <Box mt={2}>
      <Box sx={{display: 'flex', mb: 2, justifyContent: 'space-between'}}>
        <Box>
          <FormControl component="fieldset" sx={{mt: 2}}>
            <FormLabel component="legend">Find by</FormLabel>
            <RadioGroup row onChange={e => setFindBy(e.target.value)} value={findBy}>
              <FormControlLabel value="id" control={<Radio/>} label="Drugbank ID"/>
              <FormControlLabel value="name" control={<Radio/>} label="Drugname"/>
              <FormControlLabel value="query" control={<Radio/>} label="Anything"/>
            </RadioGroup>
          </FormControl>
        </Box>
        <Box sx={{alignSelf: 'flex-end', display: 'flex', flexGrow: 1}}>
          <TextField
            fullWidth
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={options[findBy].placeholder}
            InputProps={{
              endAdornment: <Button variant="contained" onClick={() => executeSearch()}>Search</Button>,
              type: 'search'
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter'){
                executeSearch()
              }
            }}
          />
        </Box>
      </Box>
      {renderContent()}
    </Box>
  </Container>
);
}
