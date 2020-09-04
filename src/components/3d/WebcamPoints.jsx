
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
        if(video && !particles){
            console.log('yaaa')
            console.log(video)
            particles = createParticles(video);
            particles.scale.set(0.05,0.05,0.05)
            scene.add(particles);
        }
        if(particles && analyser){
            const data = analyser.getFrequencyData();
            const bass = getFrequencyRangeValue(data, frequencyRange.bass);
            const mid = getFrequencyRangeValue(data, frequencyRange.mid);
            const treble = getFrequencyRangeValue(data, frequencyRange.treble);
            const r = bass;
            const g = mid;
            const b = treble;
            console.log(bass)

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

