import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader, TextGeometry, FontLoader, Vector3, Euler } from 'three';
import { useRecoilValue, RecoilRoot } from 'recoil';
import { fetchProducts } from '../stores';


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
    const products = useRecoilValue(fetchProducts);
    console.log(products);
    const texture = new TextureLoader().load('https://i.picsum.photos/id/881/200/300.jpg?hmac=OaIsS2cuxcnUpCVdxcFoc8JwfJgzWEv2Z9F_qEN9tHU');
    const font = useLoader(FontLoader, 'assets/helvetiker_bold.typeface.json');
    return (
    <>
    <group ref={group}>
        <mesh visible geometry={nodes.Default.geometry}>
        <meshStandardMaterial
            attach="material"
            color="white"
            roughness={0.3}
            metalness={0.3}
            map={texture}
        />
        </mesh>
    </group>
    <mesh
            position={new Vector3(-85,10,-50)}
            rotation={new Euler(0, 0 , 0)}
            geometry={new TextGeometry( products[0].content.rendered, {
                font: font,
                size: 5,
                height: 1,
                curveSegments: 12,
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
            })}
        >
        <meshStandardMaterial
            attach="material"
            roughness={0.3}
            metalness={0.3}
            map={texture}
        />
        </mesh>
    </>
    );
};

const Home = () => {
    return(
        <Canvas style={{width:"100%", height:"100vh"}}>
            <RecoilRoot>
                <directionalLight intensity={0.5} />
                <Suspense fallback={<Loading />}>
                    <ArWing />
                </Suspense>
            </RecoilRoot>
         </Canvas>
    );
}

export default Home;