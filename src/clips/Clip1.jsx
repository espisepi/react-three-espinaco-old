import React, { Suspense, useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useLoader } from 'react-three-fiber';
import { RecoilRoot } from 'recoil';
import Camera01 from '../components/cameras/Camera01';
import Stars from '../components/3d/Stars';
import DragControls from '../components/controls/DragControls';
import CameraControlsCustom from '../components/controls/CameraControlsCustom';
import CubePanoramic from '../components/3d/CubePanoramic';
import MathsDraw from '../components/3d/MathsDraw';
import MeshDrawLine from '../components/3d/MeshDrawLine';
import WebcamPoints from '../components/3d/WebcamPoints';
import * as THREE from 'three';

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

const AudioComponents = () => {
  const audioSrc = 'assets/highkili-imtheman.mp3';
  const audioBuffer = useLoader(THREE.AudioLoader, audioSrc);
  const audioListener = useMemo(() => new THREE.AudioListener(),[]);
  const audio = useMemo(() => new THREE.Audio(audioListener),[]);
  useMemo(()=>{
      audio.setBuffer(audioBuffer);
      audio.setLoop(true);
      audio.setVolume(0.5);
      audio.play();
  },[]);
 return(
   <>
    <WebcamPoints audio={audio}/>
  </>
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
                {/* <MathsDraw /> */}
                <CubePanoramic />
                <MeshDrawLine url='assets/LeePerrySmith/LeePerrySmith.glb' velocity={10} />                
            </Suspense>
            <Suspense fallback={<Loading />}>
              <AudioComponents />
            </Suspense>
            <CameraControlsCustom />
            {/* <DragControls dragY={false}/> */}
        </RecoilRoot>
      </Canvas>
    );
  };

  export default Clip1;