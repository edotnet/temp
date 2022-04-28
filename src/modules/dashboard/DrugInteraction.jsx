import { alpha, Box, Paper, useTheme } from "@mui/material";
import { useDrop } from "react-dnd";
import { useEffect, useState } from "react";
import { useApiCall } from "../../infrastructure/hooks/useApiCall";
import { CircularProgress } from "./CircularProgress";
import { EventTypes } from "../../infrastructure/event-system/Event.types";
import { useEvent } from "../../infrastructure/event-system/hooks/useEvent";
import { Blob } from "./blob/Blob";
import { Canvas, events } from "@react-three/fiber";
import { CameraShake, OrbitControls, OrthographicCamera } from "@react-three/drei";

const url = `drug-interaction`;
export const DrugInteraction = ({onNewItems}) => {
  const {loading, data, error, fetch} = useApiCall(url, 'POST', null, false);
  const [items, setItems] = useState([])
  const [progress, setProgress] = useState(0);
  const theme = useTheme();

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

  function getMaxValue() {
    return Math.max.apply(Math, data.map(el => el.value));
  }

  useEffect(() => {
    if (loading) {
      setTimeout(() => setProgress(Math.random() * 100), 500)
    }

    if (!loading && data) {
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
      <Box sx={{p: 4, textAlign: 'center'}}>
        <CircularProgress value={progress}/>
        {/*<Typography>{data.find(el => el.value === getMaxValue()).label
          .replace('#Drug1', items[0].name)
          .replace('#Drug2', items[1].name)}</Typography>*/}
      </Box>
    )
  }

  const configuration = {
    focus: 5,
    speed: 50,
    aperture: 1.8,
    fov: 60,
    curl: 0.25
  }
//
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
        backgroundColor: '#252525'
      }}>
        {/*camera={{ fov: 25, position: [0, 0, 6] }} orthographic linear events={events} gl={{antialias: true, alpha: true}}*/}
        <Canvas>
          <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} zoomSpeed={0.1} />
          <CameraShake yawFrequency={1} maxYaw={0.05} pitchFrequency={1} maxPitch={0.05} rollFrequency={0.5} maxRoll={0.5} intensity={0.2} />
          <Blob {...configuration}/>
        </Canvas>
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

      </Paper>
    </Box>
  );
}
