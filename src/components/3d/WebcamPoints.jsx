
import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame, useThree } from 'react-three-fiber';



const WebcamPoints = ({audio, mesh, img}) => {
    img = img || 'assets/highkili.png';
    const {scene} = useThree();

    let particles;
    let video;
    const getVideo = async () =>{
        video = await initVideo();
        // const image = getImageData(video);
        // console.log(image);
    };
    getVideo();

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
        if(video && video.readyState === 4 && !particles){
            console.log('yaaa')
            console.log(video)
            particles = createParticles(video);
            particles.scale.set(0.05,0.05,0.05)
            scene.add(particles);
        }
        let bass;
        if(particles && analyser){
            const data = analyser.getFrequencyData();
            bass = getFrequencyRangeValue(frequencyRange.bass, data);
            const mid = getFrequencyRangeValue(data, frequencyRange.mid);
            const treble = getFrequencyRangeValue(data, frequencyRange.treble);
            const r = bass - 0.3;
            const g = mid;
            const b = treble;
            console.log(treble)

            particles.material.color.r = 1 - r;
            particles.material.color.g = 1 - g;
            particles.material.color.b = 1 - b;

            const density = 2;
            // const useCache = parseInt(t) % 2 === 0;  // To reduce CPU usage.
            const imageData = getImageData(video);
            for (let i = 0, length = particles.geometry.vertices.length; i < length; i++) {
                const particle = particles.geometry.vertices[i];
                if (i % density !== 0) {
                    particle.z = 10000;
                    continue;
                }
                let index = i * 4;
                let gray = (imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;
                let threshold = 300;
                if (gray < threshold) {
                    if (gray < threshold / 3) {
                        particle.z = gray * r * 5;
                        //particle.z = 0;

                    } else if (gray < threshold / 2) {
                        particle.z = gray * g * 5;
                        //particle.z = 0;

                    } else {
                        particle.z = gray * b * 5;
                        //particle.z = 0;
                    }
                } else {
                    particle.z = 10000;
                }
            }
            particles.geometry.verticesNeedUpdate = true;

        }
        
    });

    return (
        null
    );
};

function createParticles(video){
    const imageData = getImageData(video);
    const geometry = new THREE.Geometry();
    geometry.morphAttributes = {};  // This is necessary to avoid error.
    const material = new THREE.PointsMaterial({
        size: 1,
        color: 0xff3b6c,
        sizeAttenuation: false
    });

    for (let y = 0, height = imageData.height; y < height; y += 1) {
        for (let x = 0, width = imageData.width; x < width; x += 1) {
            const vertex = new THREE.Vector3(
                x - imageData.width / 2,
                -y + imageData.height / 2,
                0
            );
            geometry.vertices.push(vertex);
        }
    }

    const particles = new THREE.Points(geometry, material);
    return particles;
}

function initVideo() {
    return new Promise(resolve => {
        const video = document.createElement("video");
        video.autoplay = true;
        video.muted = true;

        const option = {
            video: true,
            audio: false
        };
        if(true){
            // const src = 'assets/musica/070shake.mp4';
            const src = 'http://164.90.215.243:5000/download?URL=https://www.youtube.com/watch?v=fYwRsJAPfec&ab_channel=COLORS';
            // fetch('http://localhost:5000/download').then((response)=>{
            //     // console.log(response)
            //     response.json().then((json)=>{
            //         console.log('hola' + json);
            //     })
            //     video.src = src;
            //     video.load();
            //     video.play();
            //     resolve(video);
            //     // return response.json()
            // });

            video.src = src;
            console.log(video)
            video.crossOrigin = 'Anonymous';
            video.load();
            video.play();
            resolve(video);
            
        }else{
            

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
            }
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

