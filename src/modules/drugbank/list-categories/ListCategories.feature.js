import { useState } from "react";
import { Container, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { DrugsDataGrid } from "./DrugsDataGrid.component";
import { Card } from "../../../infrastructure/components/Card";
import { CategoriesDataGrid } from "./CategoriesDataGrid.component";

export const ListCategoriesFeature = () => {
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState(false);

  return (
    <Container>
      <Box mt={2}>
        <Box sx={{display: 'flex', mb: 2, justifyContent: 'space-between'}}>
          <Box sx={{alignSelf: 'flex-end', display: 'flex', flexGrow: 1}}>
            <TextField
              fullWidth
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Find categories"
            />
          </Box>
        </Box>
        <div style={{display: 'flex', height: '100%'}}>
          <div style={{flexGrow: 1, height: 800}}>
            <Card>
              <CategoriesDataGrid onRowClick={params => setCategoryId(params.row.drugbank_id)} query={search}/>
            </Card>
            {categoryId && <Card><DrugsDataGrid categoryId={categoryId}/></Card>}
          </div>
        </div>
      </Box>
    </Container>
  );
}
