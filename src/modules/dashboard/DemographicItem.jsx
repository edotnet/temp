import {Box, capitalize, Grid, IconButton, Stack, Typography, useTheme} from "@mui/material";
import * as PropTypes from "prop-types";
import {useDashboardContext} from "./context/useDashboarContext";
import {useDrag} from "react-dnd";
import {memo, useMemo} from "react";
import Person from '../../assets/svg/Person.svg';
import PersonOutlined from '../../assets/svg/PersonOutlined.svg';
import {hexToRgba} from "../../infrastructure/utils";

const DemographicItemComponent = ({demographic, onClick}) => {
  const {state} = useDashboardContext();
  const theme = useTheme();
  const [{isDragging, didDrop}, drag] = useDrag({
    type: 'DemographicItem',
    item: {
      type: 'DemographicItem',
      value: demographic,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      didDrop: !!monitor.didDrop(),
    })
  })
  const selected = useMemo(() => {
    return state.selectedDemographics && state.selectedDemographics.id === demographic.id
  }, [state.selectedDemographics, demographic.id]);

  return (
    <div ref={drag}
         style={{
           opacity: isDragging ? '0' : '1',
           flexGrow: 1,
           display: 'flex',
           borderRadius: 25,
           marginTop: 10,
           paddingBottom: 10,
           border: `1px solid ${hexToRgba(theme.palette.info.light, 0.2)}`,
           backgroundColor: selected ? hexToRgba(theme.palette.info.light, 0.2) : 'transparent',
           cursor: 'pointer',
         }} onClick={onClick}>
      <Stack direction="row" spacing={2} pt={2}>
        <Box sx={{display: 'flex', alignContent: 'center', pl: 3}}>
          {selected ? <img src={Person} style={{width: 30}} alt="person"/> : <img alt="person" src={PersonOutlined} style={{width: 30}}/>}
        </Box>
        <div style={{height: 100, width: 3, backgroundColor: theme.palette.info.main, opacity: 0.5}}/>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Stack>
                <Typography>Age</Typography>
                <Typography>Weight</Typography>
                <Typography>Geo</Typography>
                <Typography>Gender</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack>
                <Typography>{demographic.age}</Typography>
                <Typography>{demographic.weight}</Typography>
                <Typography>{capitalize(demographic.geo)}</Typography>
                <Typography>{capitalize(demographic.gender)}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </div>
  );
};

DemographicItemComponent.propTypes = {
  onClick: PropTypes.func,
  demographics: PropTypes.any,
};

export const DemographicItem = memo(DemographicItemComponent);
