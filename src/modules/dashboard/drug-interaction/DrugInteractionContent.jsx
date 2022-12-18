import {ArrowRight, Close, Science} from '@mui/icons-material';
import {
  Avatar,
  Box,
  CircularProgress,
  ClickAwayListener,
  IconButton,
  Paper,
  Portal,
  Stack,
  Typography,
} from '@mui/material';
import * as PropTypes from 'prop-types';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Endpoints} from '../../../config/Consts';
import {ModalPaper} from '../../../infrastructure/components/ModalPaper';
import {PrimaryButton} from '../../../infrastructure/components/PrimaryButton';
import {useApiCall} from '../../../infrastructure/hooks/useApiCall';
import {DrugInteractionFeature} from '../../drug-interaction/DrugInteraction.feature';
import {useDashboardContext} from '../context/useDashboarContext';
import {MoleculeCard} from '../MoleculeCard';

const getMaintenanceDosage = (demographicsResult, selectedDemographicsId, drugName) => {
  const demographics = demographicsResult[selectedDemographicsId];
  if (!demographics) {
    return 0;
  }
  const found = demographics.find(d => d.drug.toLowerCase() === drugName.toLowerCase());
  if (found) {
    return found.maintenanceDosage;
  }
  return 0;
};
export const DrugInteractionContent = () => {
  const {state, dispatch} = useDashboardContext();
  const navigate = useNavigate();
  const [drugInteractionsOpen, setDrugInteractionsOpen] = useState(false);

  if (state.interactingMolecules.length < 2) {
    return null;
  }

  if (state.interactingMolecules.length && !state.interactingMoleculesResult) {
    return (<>
      <Typography variant="subtitle1" gutterBottom>Drug Interaction molecules</Typography>
      <Box sx={{display: 'flex'}}>
        <CircularProgress style={{width: 100, height: 100}} color="primary" />
      </Box>
    </>);
  }

  const _onDrugToXDL = () => {
    navigate('/tools/drug2xdl');
  };

  function renderPills() {
    if (!state.interactingMoleculesResult?.bestResult){
      return null;
    }
    const {name1, name2} = state.interactingMoleculesResult?.bestResult;
    return <Box sx={{px: 2, pt: 1, flexGrow: 1}}>
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <Box sx={{pb: 1, display: 'flex', justifyContent: 'space-between', flexGrow: 1}}>
          <MoleculeCard
            molecule={{name: name1}}
            onClick={() => {
            }}
            onDelete={() => {
              dispatch({type: 'removeInteractingMolecule', payload: name1});
            }}
          />
          {!!state.demographicsResult && <Stack direction="row" alignItems="center">
            <Science color="info" />
            <Typography>{parseFloat(getMaintenanceDosage(state.demographicsResult, state.selectedDemographics.id, name1)).toFixed(3)} ml/hr</Typography>
          </Stack>}
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <MoleculeCard
            molecule={{name: name2}}
            onClick={() => {
            }}
            onDelete={() => {
              dispatch({type: 'removeInteractingMolecule', payload: name2});
            }}
          />
          {!!state.demographicsResult && <Stack direction="row" alignItems="center">
            <Science color="info" />
            <Typography>{parseFloat(getMaintenanceDosage(state.demographicsResult, state.selectedDemographics.id, name2)).toFixed(3)} ml/hr</Typography>
          </Stack>}
        </Box>
      </Box>
    </Box>;
  }

  function renderPercentage() {
    return <Paper className="btn" elevation={4} sx={{borderRadius: 50, cursor: 'pointer'}}><Avatar
      onClick={() => setDrugInteractionsOpen(true)}
      sx={{bgcolor: '#5498ef', width: 100, height: 100}}>
      <Typography sx={{
        fontSize: 30, color: 'white', fontWeight: 500,
      }}>{parseFloat(state.interactingMoleculesResult?.bestResult?.synergy).toFixed(1)}%</Typography>
    </Avatar></Paper>;
  }

  return (<>
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Typography variant="subtitle1" gutterBottom>Molecule Synergy probability</Typography>
      <PrimaryButton onClick={_onDrugToXDL} title="to XDL" endIcon={<ArrowRight />} />
    </Box>
    <Box sx={{display: 'flex'}}>
      {renderPercentage()}
      {renderPills()}
    </Box>
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '25%',
      transform: 'translate(-100%, -50%)',
      zIndex: 10,
    }}>
      <ModalPaper sx={{width: '50vw', overflow: 'scroll', display: drugInteractionsOpen ? 'block' : 'none'}}>
        <IconButton sx={{position: 'absolute', top: 0, right: 0}} size="large" onClick={() => setDrugInteractionsOpen(false)}>
          <Close />
        </IconButton>
        <DrugInteractionFeature />
      </ModalPaper>
    </Box>

    {/*
      <Hr/>
      <Typography variant="subtitle1" >Result Description</Typography>
      <Typography variant="body1" className='body1-lg-light'>
        {state.interactingMoleculesResult.label
          .replace("#Drug1", drug1.name)
          .replace("#Drug2", drug2.name)}
      </Typography>
        */}
  </>);
};

DrugInteractionContent.propTypes = {
  maxValue: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.any),
  data: PropTypes.any,
};
