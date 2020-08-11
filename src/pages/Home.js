import React, { Suspense, useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { RecoilRoot } from 'recoil';
import OrbitControlsCustom from '../components/controls/OrbitControlsCustom';
import ArWing from '../components/3d/ArWing';
import Ocean from '../components/3d/Ocean';
import FireCustom from '../components/3d/FireCustom';
import Stars from '../components/3d/Stars';
import Sprite from '../components/3d/Sprite';
import Plane from '../components/3d/Plane';


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



const Home = () => {
    return(
        <Canvas style={{width:"100%", height:"100vh"}}>
            <RecoilRoot>
                <directionalLight intensity={0.5} />
                <ambientLight />
                <Suspense fallback={<Loading />}>
                    {/* <ArWing /> */}
                    <Ocean />
                    <FireCustom />
                    <Stars />
                    <Sprite url='assets/foto.png' position={[0,1.5,0]} scale={[5, 3, 1]} />
                    <Plane position={[0,-0.1,0]}/>
                </Suspense>
                <OrbitControlsCustom />
            </RecoilRoot>
         </Canvas>
    );
}

export default Home;