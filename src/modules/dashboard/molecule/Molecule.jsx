import { useFrame, useThree } from "@react-three/fiber";
import { memo, useEffect, useRef } from "react";
import './shaders/simulationMaterial';
import { Points } from "@react-three/drei";

export const Molecule = memo((props) => {
  const set = useThree(state => state.set);
  const renderRef = useRef()

  const newOptions = {
    speed: 0.04,
    size: 1.4,
    perlins: 1.0,
    decay: 1.20,
    displace: 1.00,
    complex: 0.50,
    waves: 10,
    eqcolor: 10.0,
    rcolor: 1.5,
    gcolor: 1.5,
    bcolor: 1.5,
    fragment: true,
    points: false,
    redhell: true,
  }

  useEffect(() => {
    set(state => ({
      uniforms: {
        ...state.uniforms,
        ...newOptions,
      },
    }))
  }, [])
  var start = Date.now();

  useFrame((state) => {
    //console.log(renderRef.current.uniforms)
    renderRef.current.uniforms["time"].value = (props.speed / 1000) * (Date.now() - start);
    renderRef.current.uniforms["pointscale"].value = newOptions.perlins;
    renderRef.current.uniforms["decay"].value = newOptions.decay;
    renderRef.current.uniforms["size"].value = newOptions.size;
    renderRef.current.uniforms["displace"].value = newOptions.displace;
    renderRef.current.uniforms["complex"].value = newOptions.complex;
    renderRef.current.uniforms["waves"].value = newOptions.waves;
    renderRef.current.uniforms["fragment"].value = newOptions.fragment;

    renderRef.current.uniforms["redhell"].value = newOptions.redhell;
    renderRef.current.uniforms["eqcolor"].value = newOptions.eqcolor;
    renderRef.current.uniforms["rcolor"].value = newOptions.rcolor;
    renderRef.current.uniforms["gcolor"].value = newOptions.gcolor;
    renderRef.current.uniforms["bcolor"].value = newOptions.bcolor;
  })
  return (
    <group>
      <mesh>
        <simulationMaterial ref={renderRef}/>
        <icosahedronBufferGeometry args={[2, 15]} />
        <Points>
          <icosahedronBufferGeometry args={[2.3, 2]} />
        </Points>
      </mesh>
    </group>
  )
})
