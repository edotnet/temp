import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function createData(data) {
    const rows = Object.entries(data).map((row, idx) => {
       return {
        id: idx,
        name: row[0],
        valueOne: row[1][0],
        valueTwo: row[1][1]
       }
    })
    return rows;
}

export const DrugsDataGrid = (props) => {
//   const [rowCountState, setRowCountState] = useState(0);
//   const [page, setPage] = useState(0);

  const rows = createData(props.data);

  const columns = [
    { 
        field: 'name', 
        headerName: 'Drug Name', 
        flex: 0.34
    },
    {
        field: 'valueOne',
        headerName: 'Value One',
        flex: 0.33
    },
    {
        field: 'valueTwo',
        headerName: 'Value Two',
        flex: 0.33
    }
  ];

  return (
    <DataGrid
    //   paginationMode="server"
      loading={props.loading}
    //   page={page}
      autoPageSize
      autoHeight
      rows={rows ? rows : []}
      columns={columns}
      disableSelectionClick
      getRowId={row => row.id}
    //   onPageChange={setPage}
    //   rowCount={rowCountState}
      pageSize={10}
      rowsPerPageOptions={[10]}
    />
  );
}

DrugsDataGrid.propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}
