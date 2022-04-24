import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useDrop } from "react-dnd";
import { useEffect, useState } from "react";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { CircularProgress } from "./CirculerProgress";

const url = `drug-interaction`;
export const DrugInteraction = () => {
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const [items, setItems] = useState([])
  const [progress, setProgress] = useState(0);
  const theme = useTheme();
  const dragHandler = (item) => {
    if (items.includes(item)){
      return;
    }
    if (items.length >= 2 ){
      setItems([item]);
      return;
    }
    setItems(prev => [...prev, item])
  }
  const [{isOver}, drop] = useDrop({
    accept: 'MoleculeCard',
    drop: (item, monitor) => dragHandler(item),
    collect: monitor => ({
      isOver: !!monitor.isOver()
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

  useEffect(() => {
    if (loading) {
      setTimeout(() => setProgress(Math.random() * 100), 500)
    }

    if (!loading && data) {
      setProgress()
    }
  }, [loading])

  const renderResult = () => {
    if (items.length !== 2 || !data || !data.length) {
      return null;
    }
    return (
      <Box sx={{p: 4, textAlign: 'center'}}>
        <CircularProgress value={progress}/>
        <Typography>{data.find(el => el.value === Math.max.apply(Math, data.map(el => el.value))).label}</Typography>
      </Box>
    )
  }

  return (
    <Box pt={3} ref={drop}>
      <Paper sx={{
        border: `${isOver ? '5px solid' : '3px dotted'} ${theme.palette.primary.main}`,
        width: 500,
        height: 500,
        flexGrow: 1,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <Typography variant="h4" align="center" gutterBottom>Drug Interaction</Typography>
        {items.length < 2 && <Typography align="center">Drop {2 - items.length} molecules</Typography>}
        {items.length > 0 && (
          <Box pb={2}>
            <Typography>Molecules added:</Typography>
            {items.map(item => <Typography>{item.name}</Typography>)}
          </Box>
        )}
        {renderResult()}
      </Paper>
    </Box>
  );
}
