import { useFrame, useThree } from "@react-three/fiber";
import { memo, useEffect, useRef } from "react";
import './shaders/simulationMaterial';

export const Molecule = memo(({ speed }) => {
  const set = useThree(state => state.set);
  const renderRef = useRef()

  var newOptions = {
    perlin: {
      //speed: 0.01,
      speed: speed ?? 0.1,
      size: 1.5,
      perlins: 1.0,
      decay: 1.20,
      displace: 1.00,
      complex: 0.50,
      waves: 3.7,
      eqcolor: 10.0,
      rcolor: 1.5,
      gcolor: 1.5,
      bcolor: 1.5,
      fragment: true,
      points: false,
      redhell: true,
    },
  };
  useEffect(() => {
    set(state => ({
      uniforms: {
        ...state.uniforms,
        ...newOptions
      }
    }))
  }, [set])
  var start = Date.now();

  useFrame((state) => {
    //console.log(renderRef.current.uniforms)
    renderRef.current.uniforms["time"].value =
      (newOptions.perlin.speed / 1000) * (Date.now() - start);

    renderRef.current.uniforms["pointscale"].value = newOptions.perlin.perlins;
    renderRef.current.uniforms["decay"].value = newOptions.perlin.decay;
    renderRef.current.uniforms["size"].value = newOptions.perlin.size;
    renderRef.current.uniforms["displace"].value = newOptions.perlin.displace;
    renderRef.current.uniforms["complex"].value = newOptions.perlin.complex;
    renderRef.current.uniforms["waves"].value = newOptions.perlin.waves;
    renderRef.current.uniforms["fragment"].value = newOptions.perlin.fragment;

    renderRef.current.uniforms["redhell"].value = newOptions.perlin.redhell;
    renderRef.current.uniforms["eqcolor"].value = newOptions.perlin.eqcolor;
    renderRef.current.uniforms["rcolor"].value = newOptions.perlin.rcolor;
    renderRef.current.uniforms["gcolor"].value = newOptions.perlin.gcolor;
    renderRef.current.uniforms["bcolor"].value = newOptions.perlin.bcolor;
  })
  return (
    <group>
      <mesh>
        <simulationMaterial ref={renderRef} />
          <icosahedronBufferGeometry args={[2,6]} />
          <icosahedronBufferGeometry args={[2.3, 2]} />
      </mesh>
    </group>
  )
})
