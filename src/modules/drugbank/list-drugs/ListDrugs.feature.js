import { useApiCall } from "../../../infrastructure/hooks/useApiCall";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from '@mui/x-data-grid';
import ReactJson from "react-json-view";
import { FindBy } from "./FindBy.component";
import { DrugsDataGrid } from "./DrugsDataGrid.component";

export const ListDrugsFeature = () => {
  const [search, setSearch] = useState('');
  const [findBy, setFindBy] = useState('query');
  const [detail, setDetail] = useState(false);
  const [url, setUrl] = useState("");
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
      url: `/query/${encodeURIComponent(search)}`,
      placeholder: 'Find by clinical description, target, name, etc...'
    }
  }

  const executeSearch = () => {
    setUrl(options[findBy].url);
  }

  return (
    <Container>
      <Box mt={2}>
        <Box sx={{display: 'flex', mb: 2, justifyContent: 'space-between'}}>
          {/*
        <Box>
          <FindBy onChange={e => setFindBy(e.target.value)} value={findBy}/>
        </Box>
        */}
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
                if (e.key === 'Enter') {
                  executeSearch()
                }
              }}
            />
          </Box>
        </Box>
        <div style={{display: 'flex', height: '100%'}}>
          <div style={{flexGrow: 1, height: 800}}>
            <DrugsDataGrid onRowClick={params => setDetail(params.row)} url={url}/>
            {detail ?
              <Box p={2}>
                <ReactJson src={detail} name={null} collapsed={false}/>
              </Box> : null
            }
          </div>
        </div>
      </Box>
    </Container>
  );
}
