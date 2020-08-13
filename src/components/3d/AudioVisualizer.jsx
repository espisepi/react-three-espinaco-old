import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from 'react-three-fiber';

const AudioVisualizer = ({audioSrc, mesh, img}) => {
    audioSrc = audioSrc || 'assets/highkili-imtheman.mp3';
    img = img || 'assets/highkili.png';

    const texture = new THREE.TextureLoader().load(img);
    mesh = mesh || new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 1, 1, 100, 100 ),
        new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: texture })
    );
    mesh.position.set(-2, 2, -0.5);

    

    const audioBuffer = useLoader(THREE.AudioLoader, audioSrc);
    const audioListener = new THREE.AudioListener();
    const audio = new THREE.Audio(audioListener);
    audio.setBuffer(audioBuffer);
    audio.setLoop(true);
    audio.setVolume(0.5);

    /* 
        Usamos el useMemo para que solo se ejecute el audio.play() una vez
        y no cada vez que se re-renderize el componente.
    */
    useMemo(()=>{
        audio.play();
    },[]);

    const fftSize = 2048;
    const frequencyRange = {
        bass: [20, 140],
        lowMid: [140, 400],
        mid: [400, 2600],
        highMid: [2600, 5200],
        treble: [5200, 14000],
    };
    const analyser = new THREE.AudioAnalyser(audio, fftSize);

    useFrame(()=>{
        const data = analyser.getFrequencyData();
        const bass = getFrequencyRangeValue(frequencyRange.bass, data);
        // const mid = getFrequencyRangeValue(frequencyRange.mid, data);
        // const treble = getFrequencyRangeValue(frequencyRange.treble, data);

        const arrayPosition = mesh.geometry.attributes.position.array;
        for(let i = 0; i < arrayPosition.length; i = i + 3 ){
            if( i % 2 ){
                arrayPosition[i + 2] = bass + 0.1;
            }else{
                // arrayPosition[i + 2] = mid * 1.5;
            }
        }

        /*
            Codigo necesario para poder mover los vertices del mesh
        */
        mesh.geometry.attributes.position.needsUpdate = true;
        mesh.geometry.computeVertexNormals();
        mesh.geometry.computeFaceNormals();
        
    });

    const group = useRef();
    useEffect(()=>{group.current.add(mesh)});
    return (
        <group ref={group}>
        </group>
    );
};

function getImageData(image) {
    if(image){
        const canvas = document.createElement("CANVAS");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);

        ctx.drawImage(image, 0, 0);
        return ctx.getImageData(0, 0, canvas.width, canvas.height);
        return null;
    }else{
        return null;
    }
}

function getFrequencyRangeValue (_frequencyRange, frequencyData) {
    const data = frequencyData;
    const nyquist = 48000 / 2;
    const lowIndex = Math.round(_frequencyRange[0] / nyquist * data.length);
    const highIndex = Math.round(_frequencyRange[1] / nyquist * data.length);
    let total = 0;
    let numFrequencies = 0;

    for (let i = lowIndex; i <= highIndex; i++) {
        total += data[i];
        numFrequencies += 1;
    }
    
    return total / numFrequencies / 255;
};

export default AudioVisualizer;

