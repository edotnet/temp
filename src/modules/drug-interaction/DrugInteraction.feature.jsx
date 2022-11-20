import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {darken, lighten} from '@mui/material/styles';
import {DataGrid} from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import {Endpoints} from '../../config/Consts';
import {Card} from '../../infrastructure/components/Card';
import {useApiCall} from '../../infrastructure/hooks/useApiCall';
import {useDashboardContext} from '../dashboard/context/useDashboarContext';

const getBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

export const DrugInteractionFeature = () => {
  const {state, dispatch} = useDashboardContext();
  const [errorMessage, setErrorMessage] = useState('');
  const url = Endpoints.ml.drugInteractionOld;
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const customClasses = {
    '& .probability--Positive': {
      bgcolor: (theme) =>
        getBackgroundColor(theme.palette.success.light, theme.palette.mode),
      '&:hover': {
        bgcolor: (theme) =>
          getHoverBackgroundColor(theme.palette.success.light, theme.palette.mode),
      },
    },
    '& .row .MuiDataGrid-cellContent': {
      whiteSpace: 'normal',
      wordWrap: 'break-word',
    },
  };
  const columns = [
    {
      field: 'label',
      headerName: 'Interaction',
      flex: 1,
      valueGetter: (params) => {
        const {row} = params;
        return row.label.replace('#Drug1', state.interactingMolecules[0].name).replace('#Drug2', state.interactingMolecules[1].name);
      }
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 100,
    },
  ];

  useEffect(() => {
    if (state.interactingMolecules.length !== 2) {
      return;
    }
    try {
      const smile1 = state.interactingMolecules[0].calculated_properties.SMILES;
      const smile2 = state.interactingMolecules[1].calculated_properties.SMILES;
      fetch(url, 'POST', {smile1, smile2});
    } catch (e) {
      console.log('[DRUG-INTERACTION] Wrong smiles');
    }
  }, [fetch, state.interactingMolecules]);

  return (
    <Container>
        <Box p={4}>
          {errorMessage.length > 0 && <div>{errorMessage}</div>}
          {data && <Box pt={2} sx={customClasses}>
            <DataGrid
              autoHeight
              pageSize={5}
              rows={[...data.result.filter(i => i.label !== 'None' && i.label !== 'The therapeutic efficacy of #Drug2 can be increased when used in combination with #Drug1.').sort((a, b) => b.value - a.value)]}
              pagination
              columns={columns}
              disableSelectionClick
              getRowId={row => row.label}
              getRowClassName={(params) => {
                return `row ${params.row.value > 50 ? 'probability--Positive' : ''}`;
              }}
            />
          </Box>}
        </Box>
    </Container>
  );
};
