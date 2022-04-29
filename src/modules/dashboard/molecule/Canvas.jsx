import { Canvas } from "@react-three/fiber";
import { CameraShake, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Molecule } from "./Molecule";
import { alpha, Box } from "@mui/material";
import { useWindowSize } from "../../../infrastructure/hooks/useWindowSize";

export const MoleculeCanvas = (props) => {
  const {width, height} = useWindowSize();
  /*
  <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} zoomSpeed={0.1} />
        <CameraShake yawFrequency={1} maxYaw={0.05} pitchFrequency={1} maxPitch={0.05} rollFrequency={0.5} maxRoll={0.5} intensity={0.2} />
   */
  return (
    <Box sx={{position: 'absolute', width: 500, height: 500}}>
      <Canvas gl={{antialias: false}}>
        <PerspectiveCamera args={[35, width/ height, 1, 1000]} /*position={[0, 0, 16]}*/>
          <Molecule {...props} />
        </PerspectiveCamera>
      </Canvas>
    </Box>
  );
}
