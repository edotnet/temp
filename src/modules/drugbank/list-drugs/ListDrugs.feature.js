import { useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { DrugsDataGrid } from "./DrugsDataGrid.component";
import { ProductsDataGrid } from "./ProductsDataGrid.component";
import { Detail } from "./Detail.component";
import { Card } from "../../../infrastructure/components/Card";
import {Endpoints} from "../../../config/Consts";

export const ListDrugsFeature = () => {
  const [search, setSearch] = useState('');
  const [findBy, setFindBy] = useState('query');
  const [detail, setDetail] = useState(false);
  const [url, setUrl] = useState("");
  const options = {
    id: {
      url: `${Endpoints.drugbank.drugbank}?id=${search}`,
      placeholder: 'Drugbank ID'
    },
    name: {
      url: `${Endpoints.drugbank.drugbank}?name=${search}`,
      placeholder: 'Drug exact name'
    },
    query: {
      url: `${Endpoints.drugbank.drugs}/${encodeURIComponent(search)}`,
      placeholder: 'Find by clinical description, target, name, etc...'
    }
  }

  const executeSearch = () => {
    setDetail(false);
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
            <Card>
              <DrugsDataGrid onRowClick={params => setDetail(params.row)} url={url}/>
            </Card>
            <Card>
              <ProductsDataGrid onRowClick={params => setDetail(params.row)} url={url}/>
            </Card>
            {detail && <Detail detail={detail}/>}
          </div>
        </div>
      </Box>
    </Container>
  );
}
