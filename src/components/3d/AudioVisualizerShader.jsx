import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from 'react-three-fiber';
import { PlaneShaderParams, CubeShaderParams } from './shaders/AudioShaders';

const AudioVisualizerShader = ({audioSrc, img}) => {
    audioSrc = audioSrc || 'assets/highkili-imtheman.mp3';
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

    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });

    const points = [];
    // points.push( new THREE.Vector3( - 5, 0, 0 ) );
    // points.push( new THREE.Vector3( 0, 5, 0 ) );
    // points.push( new THREE.Vector3( 5, 0, 0 ) );

    // const geometryForVertices = new THREE.BoxBufferGeometry(2,2,2);
    // const arrayPosition = geometryForVertices.attributes.position.array;
    // for(let i = 0; i < arrayPosition.length; i = i + 3 ){
    //     points.push(new THREE.Vector3(arrayPosition[i], arrayPosition[i+1], arrayPosition[i+2]));
    // }

    // for(let i = -100; i < 100; i += 0.1 ){
    //     const x = i;
    //     const y = Math.sin(i) * 10;
    //     const z = -30;

    //     points.push( new THREE.Vector3(x,y,z));
    // }

    const z = -10 // profundidad
    for(let y = 0; y < 10; y += 0.1){
        for(let x = 0; x <= 10; x += 0.1){
            // para mover la figura en la escena usamos la suma o la resta
            points.push( new THREE.Vector3(x-10,y-2,z));
        }
    }

    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const mesh = new THREE.Line( geometry, shaderMaterial);


    // for (let i = -100; i < 100; i++) {

    //     const x = i;
    //     const y = Math.sin(i) * 10;
    //     const z = -30;

    //     // const x = ((50 + Math.random() * 1000) * (Math.round(Math.random()) ? -1 : 1)) / 10
    //     // const y = ((50 + Math.random() * 1000) * (Math.round(Math.random()) ? -1 : 1)) / 10
    //     // const z = ((50 + Math.random() * 1000) * (Math.round(Math.random()) ? -1 : 1)) / 10

    //     points.push( new THREE.Vector3(x,y,z));
    // };


    // const mesh = useMemo(()=> new THREE.Mesh(
    //     new THREE.PlaneBufferGeometry(2,2,10,10),
    //     new THREE.ShaderMaterial({
    //         uniforms: uniforms,
    //         vertexShader: vertexShader,
    //         fragmentShader: fragmentShader
    //     })
    // ), []);

    return (
        <primitive object={mesh} position={[0,0,0]} />
    );
};

export default AudioVisualizerShader;

