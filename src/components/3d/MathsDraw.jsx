import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from 'react-three-fiber';
import { PlaneShaderParams, CubeShaderParams } from './shaders/AudioShaders';

const MathsDraw = () => {

    const figure = [];

    const z = 0 // profundidad
    let y = [0,1]
    for(let x = 0; x < 10; x+=0.1){
        figure.push(new THREE.Vector3(x,y[0],z))
        figure.push(new THREE.Vector3(x,y[1],z))
    }

    // const cubeMesh = new THREE.BoxBufferGeometry(5,5,5);
    // const cubeMeshArray = cubeMesh.attributes.position.array;
    // for(let i = 0; i <= cubeMeshArray - 1; i += 3){
    //     figure.push(new THREE.Vector3( cubeMeshArray[i], cubeMeshArray[i+1], cubeMeshArray[i+2] ))
    // }

    const points = figure.slice(0,1);

    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    const mesh = new THREE.Line( geometry, material );
    let contador = 0;
    useFrame(()=>{
        if(contador >= figure.length - 1){
            contador = 0;
        }
        let points = figure.slice(0,contador)
        geometry.setFromPoints(points);
        contador+= 1;
    });

    return (
        <primitive object={mesh} position={[0,0,0]} />
    );
};

export default MathsDraw;

