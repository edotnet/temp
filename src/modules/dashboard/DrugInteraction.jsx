import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useDrop } from "react-dnd";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { CircularProgress } from "./CircularProgress";
import { EventTypes } from "../../infrastructure/event-system/Event.types";
import { useEvent } from "../../infrastructure/event-system/hooks/useEvent";
import { MoleculeCanvas } from "./molecule/Canvas";
import BlobCircle from "../../assets/svg/blob-circle.svg";
import { ModalPaper } from "../../infrastructure/components/ModalPaper";

const url = `drug-interaction`;
export const DrugInteraction = memo(({onNewItems}) => {
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const [items, setItems] = useState([])
  const [progress, setProgress] = useState(0);

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
    return Math.max.apply(Math, data.map(el => el.value));
  }, [data]);
  let timeout = null;
  useEffect(() => {
    if (loading) {
      timeout = setTimeout(() => setProgress(Math.random() * 100), 500)
    }

    if (!loading && data) {
      clearTimeout(timeout);
      setTimeout(() => setProgress(Math.random() * 100), 100)
      setTimeout(() => setProgress(Math.random() * 100), 2000)
      setTimeout(() => setProgress(getMaxValue()), 3000)
    }
  }, [loading])

  const renderResult = () => {
    if (items.length !== 2 || !data || !data.length) {
      return null;
    }
    return (
      <Box sx={{p: 4, textAlign: 'center', zIndex: 10}}>
        <CircularProgress value={progress}/>
      </Box>
    )
  }

  const renderTextResult = () => {
    if (!items.length) {
      return null;
    }
    return(
      <ModalPaper sx={{p: 8, bottom: 0, position: 'absolute', maxWidth: 402}} elevation={8}>
        {items.map(item => <Typography>Drug added: {item.name}</Typography>)}
        {data && data.length > 0 && items.length === 2 && getMaxValue() === progress &&
        <Typography>{data.find(el => el.value === getMaxValue()).label
          .replace('#Drug1', items[0].name)
          .replace('#Drug2', items[1].name)}</Typography> }
      </ModalPaper>
    )
  }
  const calculateSpeed = useCallback(() => {
    if (loading) {
      return 0.5;
    }
    if (data && progress !== getMaxValue()) {
      return 0.5
    }
    return 0.04;
  }, [loading, data, progress, isOver]);

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

        <MoleculeCanvas speed={calculateSpeed()}/>
        {/*
        <Typography variant="h4" align="center" gutterBottom>Drug Interaction</Typography>
        {items.length < 2 && <Typography align="center">Drop {2 - items.length} molecules</Typography>}
        {items.length > 0 && (
          <Box pb={2}>
            <Typography>Molecules added:</Typography>
            {items.map(item => <Typography key={item.name}>{item.name}</Typography>)}
          </Box>
        )}*/}
        {renderResult()}
      </Box>
      {renderTextResult()}
    </Box>
  );
})
