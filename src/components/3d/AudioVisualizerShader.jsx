import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from 'react-three-fiber';
import { PlaneShaderParams, CubeShaderParams } from './shaders/AudioShaders';

const AudioVisualizerShader = ({audioSrc, img}) => {
    audioSrc = audioSrc || 'assets/masna.mp3';
    img = img || 'assets/highkili.png';  

    const audioBuffer = useLoader(THREE.AudioLoader, audioSrc);
    const audioListener = useMemo(() => new THREE.AudioListener(),[]);
    const audio = useMemo(() => new THREE.Audio(audioListener),[]);
    useMemo(()=>{
        audio.setBuffer(audioBuffer);
        audio.setLoop(true);
        audio.setVolume(0.5);
        audio.play();
    },[]);
    
    const fftSize = 2048;
    const analyser = useMemo(() => new THREE.AudioAnalyser(audio, fftSize),[]);

    const {vertexShader,fragmentShader,uniforms} = useMemo(()=> CubeShaderParams(analyser, fftSize),[]);

    useFrame(()=>{
        analyser.getFrequencyData();
        
        uniforms.tAudioData.value.needsUpdate = true;
    });

    const mesh = useMemo(()=> new THREE.Mesh(
        new THREE.PlaneBufferGeometry(2,2,10,10),
        new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })
    ), []);

    return (
        <primitive object={mesh} position={[0,0,0]} />
    );
};

export default AudioVisualizerShader;

