import React, { Suspense, useRef, useEffect, useMemo, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { RecoilRoot } from 'recoil';
import Camera01 from '../components/cameras/Camera01';
import OrbitControlsCustom from '../components/controls/OrbitControlsCustom';
import Ocean from '../components/3d/Ocean';
import FireCustom from '../components/3d/FireCustom';
import Stars from '../components/3d/Stars';
import Sprite from '../components/3d/Sprite';
import Plane from '../components/3d/Plane';
import AudioVisualizer from '../components/3d/AudioVisualizer';
import DragControls from '../components/controls/DragControls';
import CameraControlsCustom from '../components/controls/CameraControlsCustom';
import AudioVisualizerShader from '../components/3d/AudioVisualizerShader';
import PlaneTexture from '../components/3d/PlaneTexture';
import CubePanoramic from '../components/3d/CubePanoramic';
import MathsDraw from '../components/3d/MathsDraw'

const Loading = () => {
    return (
        <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <sphereGeometry attach="geometry" args={[1, 16, 16]} />
          <meshStandardMaterial
            attach="material"
            color="white"
            transparent
            opacity={0.6}
            roughness={1}
            metalness={0}
          />
        </mesh>
      );
}

const Clip1 = () => {
  return(
    <Canvas style={{width:"100%", height:"100vh"}}>
      <RecoilRoot>
          <directionalLight intensity={0.5} />
          <ambientLight />
          <Camera01 position={[0, 1.5, 8]} />
          <Suspense fallback={<Loading />}>
              <Stars />
              <MathsDraw />
              <CubePanoramic />
          </Suspense>
          <CameraControlsCustom />
          {/* <DragControls dragY={false}/> */}
      </RecoilRoot>
    </Canvas>
  );
};

const Octavian = () => {
  const [state, setState] = useState({
    showComponent: false,
  }); 
  function loadClip(){
    setState({
      showComponent: true,
    });
    boton.current.style.display = 'none';
    // boton.current.style.visibility = 'hidden';
  }
  const boton = useRef();
  return (
    <div style={{margin:'0px',padding:'0px'}}>
      <Clip1 />
    </div>
  );
}

export default Octavian;