import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from 'react-three-fiber';
import { PlaneShaderParams, CubeShaderParams } from './shaders/AudioShaders';

const AudioVisualizerShader = ({audioSrc, mesh, img}) => {
    audioSrc = audioSrc || 'assets/masna.mp3';
    img = img || 'assets/highkili.png';  

    const audioBuffer = useLoader(THREE.AudioLoader, audioSrc);
    const audioListener = new THREE.AudioListener();
    const audio = new THREE.Audio(audioListener);
    audio.setBuffer(audioBuffer);
    audio.setLoop(true);
    audio.setVolume(0.5);
    useMemo(()=>{
        audio.play();
    },[]);
    
    const fftSize = 2048;
    const analyser = new THREE.AudioAnalyser(audio, fftSize);

    const {vertexShader,fragmentShader,uniforms} = CubeShaderParams(analyser, fftSize);

    useFrame(()=>{
        analyser.getFrequencyData();
        uniforms.tAudioData.value.needsUpdate = true;
    });

    return (
        <mesh position={[-3,0,0]} rotation={[-Math.PI / 2, 0 ,0]}>
            <planeBufferGeometry attach="geometry" args={[2, 2, 10, 10]} />
            <shaderMaterial 
                attach="material"
                uniforms={uniforms}
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                 
            />
        </mesh>
    );
};

export default AudioVisualizerShader;

