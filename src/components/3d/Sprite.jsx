import React, { useRef, useEffect } from 'react';
import { useLoader } from 'react-three-fiber';
import { Fire } from 'three/examples/jsm/objects/Fire';
import * as THREE from 'three';

const Sprite = ({ url, ...props }) => {
    const texture = useLoader(THREE.TextureLoader, url)
    return (
        <sprite {...props}>
        <spriteMaterial attach="material" map={texture} />
        </sprite>
    );
};

export default Sprite;