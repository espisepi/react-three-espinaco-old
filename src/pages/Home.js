import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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

const ArWing = () => {
    const group = useRef();
    const { nodes } = useLoader(GLTFLoader, "assets/arwing.glb");
    useFrame(() => {
        group.current.rotation.y += 0.004;
      });
    return (
    <group ref={group}>
        <mesh visible geometry={nodes.Default.geometry}>
        <meshStandardMaterial
            attach="material"
            color="white"
            roughness={0.3}
            metalness={0.3}
        />
        </mesh>
    </group>
    );
};

const Home = () => {
    return(
        <Canvas style={{width:"100%", height:"100vh"}}>
            <directionalLight intensity={0.5} />
            <Suspense fallback={<Loading />}>
                <ArWing />
            </Suspense>
         </Canvas>
    );
}

export default Home;