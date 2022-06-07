import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useApiCall } from "../../../infrastructure/hooks/useApiCall";
import {Endpoints} from "../../../config/Consts";

export const CategoriesDataGrid = (props) => {
  const [rowCountState, setRowCountState] = useState(0);
  const [page, setPage] = useState(0);
  const {loading, data, error, fetch} = useApiCall("drugbank/category/query", 'GET', null, false);

  const executeSearch = () => {
    const url = `${Endpoints.drugbank.categories}/${props.query}?page=${page}`;
    fetch(url, 'GET');
  }

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      data && data.count ? data.count : prevRowCountState,
    );
  }, [data, setRowCountState]);

  useEffect(() => {
    if (props.query) executeSearch();
  }, [page, props.query])

  const columns = [
    {
      field: 'drugbank_id',
      headerName: 'Drugbank ID',
      flex: 0.5,
    },
    {
      field: 'name',
      headerName: 'Category',
      flex: 1,
    },
    {
      field: 'term_names',
      headerName: 'Term names',
      flex: 1,
      valueFormatter: (params) => params.value ? params.value.join(", ") : '-',
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

CategoriesDataGrid.propTypes = {
  query: PropTypes.string.isRequired,
  onRowClick: PropTypes.func.isRequired,
}
