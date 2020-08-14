import React from 'react';
import { extend, useThree } from 'react-three-fiber';
import { CameraControls } from 'three/examples/jsm/controls/experimental/CameraControls.js';

/*
    Esto es igual que el OrbitControls pero las flechas del teclado se mueven por
    los ejes x,z en vez de los ejes x,y
*/
extend({CameraControls});
const CameraControlsCustom = () =>{
    const { camera, gl } = useThree();
    return <cameraControls args={[camera,gl.domElement]} />;
};

export default CameraControlsCustom;