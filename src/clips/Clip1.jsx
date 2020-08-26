import React, { Suspense, useRef, useEffect, useMemo, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { RecoilRoot } from 'recoil';
import Camera01 from '../components/cameras/Camera01';
import Stars from '../components/3d/Stars';
import DragControls from '../components/controls/DragControls';
import CameraControlsCustom from '../components/controls/CameraControlsCustom';
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

  export default Clip1;