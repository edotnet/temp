import { Avatar, Box, Chip, Typography } from "@mui/material";
import { useDrop } from "react-dnd";
import { memo, useCallback, useEffect, useState } from "react";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { EventTypes } from "../../infrastructure/event-system/Event.types";
import { useEvent } from "../../infrastructure/event-system/hooks/useEvent";
import { MoleculeCanvas } from "./molecule/Canvas";
import BlobCircle from "../../assets/svg/blob-circle.svg";
import { ModalPaper } from "../../infrastructure/components/ModalPaper";
import { Hr } from "../../infrastructure/components/Hr.component";
import { CustomChip } from "../../infrastructure/components/CustomChip";

const url = `drug-interaction`;
export const DrugInteraction = memo(({onNewItems}) => {
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const [items, setItems] = useState([])

  useEvent(EventTypes.DASHBOARD.RESET, () => {
    setItems([]);
  })
  const dragHandler = (item) => {
    if (items.includes(item)) {
      return;
    }
    if (items.length >= 2) {
      onNewItems([item])
      setItems([item]);
      return;
    }
    setItems(prev => {
      const newItems = [...prev, item]
      onNewItems(newItems)
      return newItems;
    })
  }
  const [{isOver}, drop] = useDrop({
    accept: 'MoleculeCard',
    drop: (item, monitor) => dragHandler(item),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    })
  })

  useEffect(() => {
    if (items.length === 2) {
      try {
        const smile1 = items[0].calculated_properties.SMILES;
        const smile2 = items[1].calculated_properties.SMILES;
        fetch(url, 'POST', {smile1, smile2})
      } catch (e) {
        console.log('Wrong smiles')
      }
    }
  }, [items])

  const getMaxValue = useCallback(() => {
    if (!data) {
      return 0;
    }
    return Math.max.apply(Math, data.map(el => el.value));
  }, [data]);
  let timeout = null;

  const renderTextResult = () => {
    if (!items.length) {
      return null;
    }

    return (
      <ModalPaper sx={{px: 8, py: 5, mt: 3, position: 'absolute', maxWidth: 550}} elevation={8}>
        <Typography sx={{fontSize: 40, fontWeight: 100}}>Drug interactions</Typography>
        <Box sx={{display: 'flex'}}>
          <Avatar sx={{bgcolor: '#d0eed2', width: 100, height: 100}}>
            <Typography sx={{fontSize: 40, fontWeight: 300, color: '#1d1d1d'}}>{getMaxValue().toFixed(0)}%</Typography>
          </Avatar>
          <Box sx={{pl: 2, pt: 1}}>
            <Typography sx={{fontSize: 18, fontWeight: 500}} gutterBottom>Drug Interaction molecules</Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
              <CustomChip label={items[0].name}/>
              {items.length === 2 && <CustomChip label={items[1].name} sx={{marginLeft: 1}}/>}
            </Box>
          </Box>
        </Box>
        <Hr/>
        <Typography sx={{fontSize: 18, fontWeight: 500, color: '#1d1d1d'}}>RESULT DESCRIPTION</Typography>
        {items.length === 2 && data && data.length > 0 &&
        <Typography sx={{fontSize: 24, fontWeight: 300}}>
          {data.find(el => el.value === getMaxValue()).label
            .replace('#Drug1', items[0].name)
            .replace('#Drug2', items[1].name)}
        </Typography>}
      </ModalPaper>
    )
  }

  return (
    <Box pt={3} ref={drop} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Box sx={{
        //border: `${isOver ? '5px solid' : '3px dotted'} ${theme.palette.primary.main}`,
        width: 500,
        height: 500,
        flexGrow: 1,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        background: `url(${BlobCircle})`,
        backgroundSize: 'cover'
      }} id="blob-circle">
        <MoleculeCanvas />
      </Box>
      {renderTextResult()}
    </Box>
  );
})
