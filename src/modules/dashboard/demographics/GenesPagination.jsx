import { Chip, TablePagination } from '@mui/material';
import React, { useMemo, useState } from 'react';

const GenesPagination = ({genes}) => {
  const [page, setPage] = useState(0);
  const [genesPerPage, setGenesPerPage] = useState(10)

  const sliceGenes = useMemo(() => 
    [page * genesPerPage, page * genesPerPage + genesPerPage], 
    [page, genesPerPage]
  )
  
  return (
    <>
      {genes.slice(...sliceGenes).map(gen => (
        <Chip key={gen} sx={{ m: 0.5 }} label={gen} variant="outlined" />
      ))}
      <TablePagination
        component="div"
        count={genes.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={genesPerPage}
        onRowsPerPageChange={e => setGenesPerPage(e.target.value)}
      />
    </>
  )
}

export default GenesPagination