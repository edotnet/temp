import {ArrowRight, Science} from '@mui/icons-material';
import {Avatar, Box, CircularProgress, Paper, Stack, Typography} from '@mui/material';
import * as PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import {CustomChip} from '../../../infrastructure/components/CustomChip';
import {CustomWidthTooltip} from '../../../infrastructure/components/CustomWidthTooltip';
import {PrimaryButton} from '../../../infrastructure/components/PrimaryButton';
import {useDashboardContext} from '../context/useDashboarContext';

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
    if (state.interactingMolecules.length !== 2) {
        return null;
    }
    const [drug1, drug2] = state.interactingMolecules;

    const getStyles = (color) => {
        const {hue, saturation, luminosity} = color;
        const moleculeColor = `hsla(${hue},${saturation}%, ${luminosity}%, 0.4)`;
        return {
            //boxShadow: `0 4px 13px 0 ${moleculeColor}`,
            border: `solid 1px ${moleculeColor}`,
            //borderBottomWidth: `1.5px`,
        };
    };

    if (!state.interactingMoleculesResult) {
        return (<>
                <Typography variant="subtitle1" gutterBottom>Drug Interaction molecules</Typography>
                <Box sx={{display: 'flex'}}>
                    <CircularProgress style={{width: 100, height: 100}} color="primary"/>
                    {renderPills()}
                </Box>
            </>);
    }

    const _onDrugToXDL = () => {
        navigate('/engine/drug2xdl');
    };

    function renderPills() {
        return <Box sx={{px: 2, pt: 1, flexGrow: 1}}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Box sx={{pb: 1, display: 'flex', justifyContent: 'space-between', flexGrow: 1}}>
                    <CustomWidthTooltip title={drug1.name}>
                        <CustomChip label={drug1.name} style={getStyles(drug1.color)}/>
                    </CustomWidthTooltip>
                    {!!state.demographicsResult && <Stack direction="row" alignItems="center">
                        <Science color="info"/>
                        <Typography>{parseFloat(getMaintenanceDosage(state.demographicsResult, state.selectedDemographics.id, drug1.name)).toFixed(3)} ml/hr</Typography>
                    </Stack>}
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <CustomWidthTooltip title={drug2.name}>
                        <CustomChip label={drug2.name} style={getStyles(drug2.color)}/>
                    </CustomWidthTooltip>
                    {!!state.demographicsResult && <Stack direction="row" alignItems="center">
                        <Science color="info"/>
                        <Typography>{parseFloat(getMaintenanceDosage(state.demographicsResult, state.selectedDemographics.id, drug2.name)).toFixed(3)} ml/hr</Typography>
                    </Stack>}
                </Box>
            </Box>
        </Box>;
    }

    function renderPercentage() {
        return <Paper className="btn" elevation={4} sx={{borderRadius: 50}}><Avatar
            sx={{bgcolor: '#5498ef', width: 100, height: 100}}>
            <Typography sx={{
                fontSize: 30, color: 'white', fontWeight: 500,
            }}>{state.interactingMoleculesResult.value}%</Typography>
        </Avatar></Paper>;
    }

    return (<>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="subtitle1" gutterBottom>Molecule Synergy probability</Typography>
                <PrimaryButton onClick={_onDrugToXDL} title="to XDL" endIcon={<ArrowRight/>}/>
            </Box>
            <Box sx={{display: 'flex'}}>
                {renderPercentage()}
                {renderPills()}
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
    maxValue: PropTypes.func, items: PropTypes.arrayOf(PropTypes.any), data: PropTypes.any, prop3: PropTypes.func,
};
