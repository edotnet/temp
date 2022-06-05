import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useApiCall } from "../../../infrastructure/hooks/useApiCall";

export const DrugsDataGrid = (props) => {
  const [rowCountState, setRowCountState] = useState(0);
  const [page, setPage] = useState(0);
  const {loading, data, error, fetch} = useApiCall("drugbank/query", 'GET', null, false);

  const executeSearch = () => {
    const url = `${props.url}?page=${page}`;
    fetch(url, 'GET');
  }

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      data && data.count ? data.count : prevRowCountState,
    );
  }, [data, setRowCountState]);

  useEffect(() => {
    if (props.url) executeSearch();
  }, [page, props.url])

  const columns = [
    {
      field: 'drugbank_id',
      headerName: 'Drugbank ID',
      flex: 0.5,
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
  ];

  if (error) {
    return <div>Not found</div>;
  }
  if (!data || !Array.isArray(data.items)) {
    return null;
  }

  return (
    <DataGrid
      paginationMode="server"
      loading={loading}
      page={page}
      autoPageSize
      autoHeight
      rows={data ? data.items : []}
      columns={columns}
      disableSelectionClick
      getRowId={row => row.drugbank_id}
      onRowClick={props.onRowClick}
      onPageChange={setPage}
      rowCount={rowCountState}
    />
  );
}

DrugsDataGrid.propTypes = {
  url: PropTypes.string.isRequired,
  onRowClick: PropTypes.func.isRequired,
}
