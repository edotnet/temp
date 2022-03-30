import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useApiCall } from "../../../infrastructure/hooks/useApiCall";

export const ProductsDataGrid = (props) => {
  const [rowCountState, setRowCountState] = useState(0);
  const [page, setPage] = useState(0);
  const {loading, data, error, fetch} = useApiCall("natural_products/query", 'GET', null, false);

  const executeSearch = () => {
    const url = `natural_products${props.url}?page=${page}`;
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
      field: 'UNPD_ID',
      headerName: 'UNPD_ID',
      flex: 0.5,
    },
    {
      field: 'cn',
      headerName: 'Product',
      flex: 1,
    },
    {
      field: 'SMILES',
      headerName: 'Smiles',
      flex: 1,
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
      getRowId={row => row.UNPD_ID}
      onRowClick={props.onRowClick}
      onPageChange={setPage}
      rowCount={rowCountState}

    />
  );
}

ProductsDataGrid.propTypes = {
  url: PropTypes.string.isRequired,
  onRowClick: PropTypes.func.isRequired,
}
