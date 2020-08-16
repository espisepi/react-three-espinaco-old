import React from 'react';
import * as THREE from 'three';
import {useThree, useFrame} from 'react-three-fiber';

const PlaneTexture = () => {
    const {clock} = useThree();
    const {vertexShader,fragmentShader,uniforms} = getParamsShader();
    const mesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(2,2,10,10),
        new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms
        })
    );
    useFrame(({clock})=>{
        mesh.material.uniforms.time.value = clock.elapsedTime;
    });
    /* Permitimos que el valor alpha (transparencia) en el fragment shader se tenga en cuenta al renderizar */
    mesh.material.transparent = true;
    return <primitive object={mesh} position={[-3,2,0]} />;
}

function getParamsShader(){
    const texture = new THREE.TextureLoader().load('assets/highkili.png');
    
    return {
        vertexShader: `
        varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }
        `,
        fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D texture0;
        uniform float time;
        void main() {
            vec4 background = texture2D( texture0, vec2( vUv.x, vUv.y ) );
            if(background.r > 0.8 && background.g > 0.8 ){
                gl_FragColor = vec4(1.0,sin(time),cos(time),sin(time));
            }else{
                gl_FragColor = background;
            }
            
        }
        `,
        uniforms: {
            texture0: {value:texture},
            time: {value:0.0},
        }
    };
}

export default PlaneTexture;