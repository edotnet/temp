import { Canvas } from "@react-three/fiber";
import { Molecule } from "./Molecule";
import { Box } from "@mui/material";
import { useWindowSize } from "../../../infrastructure/hooks/useWindowSize";
import { memo } from "react";

export const MoleculeCanvas = memo((props) => {
  const {width, height} = useWindowSize();
  /*
  <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} zoomSpeed={0.1} />
        <CameraShake yawFrequency={1} maxYaw={0.05} pitchFrequency={1} maxPitch={0.05} rollFrequency={0.5} maxRoll={0.5} intensity={0.2} />
   */
  return (
    <Box sx={{position: 'absolute', width: 500, height: 500}}>
      <Canvas gl={{antialias: true, alpha: true}}
              shadows={true}
              camera={{fov: 35, near: 1, far: 1000, position: [0, 0, 10]}}

      >
        <Molecule {...props} />
      </Canvas>
    </Box>
  );
})
