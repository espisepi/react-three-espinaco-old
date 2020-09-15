import React, { Suspense, useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber';
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
import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { Stats } from 'drei';

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

const GroupComponent = () => {
  const group = useRef();
  useFrame(()=>{
    if(!group.current.visible && audio.context.currentTime >= 39.0) group.current.visible = true;
  });

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
  <group ref={group} visible={false}>
    <FireCustom position={[0.2,0.8,-0.5]} rotation={[0.0,0.0,0.0]}/>
    <AudioVisualizerShader audio={audio} />
    <AudioVisualizer audio={audio} position={[7, 1.5, -7]}/>
    <PlaneTexture />
  </group>
  </>
  );
  
}

/* Para que la animacion funciona hay que comentar el componente DragControls */
const CameraAnimation = ()=> {
  const {camera} = useThree();
  const from = { y: camera.rotation.y };
  const to = { y: 2.0 };
  const to2 = { y: -1.0 };
  const to3 = { y: 0 };
  const update = () => {
    camera.rotation.set(0, from.y, 0);
  };
  const tween1 = new TWEEN.Tween(from)
      .to(to, 12000)
      .delay(11000)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(update)
      .onComplete(function () {}
  );
  const tween2 = new TWEEN.Tween(from)
    .to(to2, 10000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(update)
    .onComplete(function () {}
  );
  const tween3 = new TWEEN.Tween(from)
    .to(to3, 3000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(update)
    .onComplete(function () {}
  );

  tween1.chain(tween2);
  tween2.chain(tween3);
  tween1.start();
  useFrame(()=>{
    TWEEN.update();
  });
  return null;
}

const Clip0 = () => {
 
    return(
      <Canvas style={{width:"100%", height:"100vh"}}>
        <RecoilRoot>
            <directionalLight intensity={0.5} />
            <ambientLight />
            <Camera01 position={[0, 1.5, 8]} />
            <Suspense fallback={<Loading />}>
                <Ocean />
                <Stars />
                <Sprite url='assets/foto.png' position={[0,1.5,0]} scale={[5, 3, 1]} />
                <Plane position={[0,-0.1,0]}/>
                <GroupComponent />
                <CameraAnimation />
            </Suspense>
            
            {/* <CameraControlsCustom /> */}
            {/* <DragControls dragY={false}/> */}
            {/* <Stats /> */}
        </RecoilRoot>
      </Canvas>
    );
  };

  export default Clip0;