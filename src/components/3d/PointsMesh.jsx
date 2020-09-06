import React from 'react';
import * as THREE from 'three';
import {useThree, useFrame, useLoader} from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const PointsMesh = ({mesh}) => {
    mesh = mesh || new THREE.Mesh(
        new THREE.PlaneBufferGeometry(5,5, 20, 20),
        new THREE.MeshBasicMaterial({})
    );
    
    const gltf = useLoader(GLTFLoader, 'assets/LeePerrySmith/LeePerrySmith.glb');
    gltf.scene.traverse((child) => {
        if(child.isMesh){
            mesh = child;
        }
    });

    const geometry = new THREE.Geometry();
    geometry.morphAttributes = {};  // This is necessary to avoid error.
    const material = new THREE.PointsMaterial({
        size: 2,
        color: 0xff0000,
        sizeAttenuation: false
    });

    const meshArray = mesh.geometry.attributes.position.array;
    for(let i = 0; i < meshArray.length; i += 3){
        const vertex = new THREE.Vector3(meshArray[i], meshArray[i+1], meshArray[i+2]);
        geometry.vertices.push(vertex);
    }

    const particles = new THREE.Points(geometry, material);
    const {scene} = useThree();
    scene.add(particles);

    return null;
}

export default PointsMesh;