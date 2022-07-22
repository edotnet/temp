import {Box, IconButton, Typography} from "@mui/material";
import {Person, PersonOutlined} from "@mui/icons-material";
import * as PropTypes from "prop-types";
import {useDashboardContext} from "./context/useDashboarContext";
import {useDrag} from "react-dnd";
import {memo} from "react";

const DemographicItemComponent = ({demographic, onClick}) => {
  const {state} = useDashboardContext();
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

  return (
    <div ref={drag} style={{opacity: isDragging ? '0' : '1'}}>
      <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
        <IconButton onClick={onClick}>
          {state.selectedDemographics && state.selectedDemographics.id === demographic.id ? <Person style={{fontSize: 40}}/> :
            <PersonOutlined style={{fontSize: 40}}/>}
        </IconButton>
        <Typography>{Object.values(demographic).join(" - ")}</Typography>
      </Box>
    </div>
  );
};

DemographicItemComponent.propTypes = {
  onClick: PropTypes.func,
  demographics: PropTypes.any,
};

export const DemographicItem = memo(DemographicItemComponent);
