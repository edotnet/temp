import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import './shaders/simulationMaterial';

export const Molecule = () => {
  const set = useThree(state => state.set);
  const renderRef = useRef()
  var options = {
    perlin: {
      //speed: 0.01,
      speed: 0.3,
      size: 2,
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
      redhell: true
    },
  };
  useEffect(() => {
    set(state => ({
      uniforms: {
        ...state.uniforms,
        ...options
      }
    }))
  }, [set])
  var start = Date.now();

  useFrame((state) => {
    //console.log(renderRef.current.uniforms)
    renderRef.current.uniforms["time"].value =
      (options.perlin.speed / 1000) * (Date.now() - start);

    renderRef.current.uniforms["pointscale"].value = options.perlin.perlins;
    renderRef.current.uniforms["decay"].value = options.perlin.decay;
    renderRef.current.uniforms["size"].value = options.perlin.size;
    renderRef.current.uniforms["displace"].value = options.perlin.displace;
    renderRef.current.uniforms["complex"].value = options.perlin.complex;
    renderRef.current.uniforms["waves"].value = options.perlin.waves;
    renderRef.current.uniforms["fragment"].value = options.perlin.fragment;

    renderRef.current.uniforms["redhell"].value = options.perlin.redhell;
    renderRef.current.uniforms["eqcolor"].value = options.perlin.eqcolor;
    renderRef.current.uniforms["rcolor"].value = options.perlin.rcolor;
    renderRef.current.uniforms["gcolor"].value = options.perlin.gcolor;
    renderRef.current.uniforms["bcolor"].value = options.perlin.bcolor;
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
}
