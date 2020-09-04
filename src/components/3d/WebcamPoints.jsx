
import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from 'react-three-fiber';



const WebcamPoints = ({audio, mesh, img}) => {
    img = img || 'assets/highkili.png';

    // const video = getVideo();
    const getVideo = async () =>{
        const video = await initVideo();
        const image = getImageData(video);
        console.log(image);
        
        return null;

    };
    const video = getVideo();
    


    const texture = new THREE.TextureLoader().load(img);
    mesh = mesh || new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 3, 3, 100, 100 ),
        new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: texture })
    );
    mesh.position.set(7, 1.5, -7);
    mesh.rotation.y += -1.0;

    const fftSize = 2048;
    const frequencyRange = {
        bass: [20, 140],
        lowMid: [140, 400],
        mid: [400, 2600],
        highMid: [2600, 5200],
        treble: [5200, 14000],
    };
    const analyser = new THREE.AudioAnalyser(audio, fftSize);

    useFrame(({clock})=>{
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

        mesh.rotation.y = Math.sin(clock.elapsedTime/5) - 0.5 ;
        
    });

    return (
        <primitive object={mesh} />
    );
};

// function getImageData(image) {
//     if(image){
//         const canvas = document.createElement("CANVAS");
//         canvas.width = image.width;
//         canvas.height = image.height;
//         const ctx = canvas.getContext("2d");
//         ctx.translate(canvas.width, 0);
//         ctx.scale(-1, 1);

//         ctx.drawImage(image, 0, 0);
//         return ctx.getImageData(0, 0, canvas.width, canvas.height);
//         return null;
//     }else{
//         return null;
//     }
// }

function initVideo() {
    return new Promise(resolve => {
        const video = document.createElement("video");
        video.autoplay = true;

        const option = {
            video: true,
            audio: false
        };
        navigator.mediaDevices.getUserMedia(option)
            .then((stream) => {
                video.srcObject = stream;
                video.addEventListener("loadeddata", () => {
                    // videoWidth = video.videoWidth;
                    // videoHeight = video.videoHeight;
                    resolve(video);
                    // createParticles();
                });
            })
            .catch((error) => {
                console.log(error);
            });
        });
  }

function getImageData(video) {
    const canvas = document.createElement('CANVAS');
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    ctx.drawImage(video, 0, 0);
    const imageCache = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return imageCache;
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

export default WebcamPoints;

