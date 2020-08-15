import * as THREE from 'three';

export function CubeShaderParams(analyser, fftSize) {
    return {
        vertexShader: `
            varying vec2 vUv;
            uniform sampler2D tAudioData;
            void main() {
                vUv = uv;

                float f = texture2D( tAudioData, vec2( uv.x, 0 ) ).r;

                vec3 newposition = vec3(position);
                newposition.z += f * 0.5 + 0.5;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( newposition, 1.0 );
            }
        `,
        fragmentShader: `
            uniform sampler2D tAudioData;
            varying vec2 vUv;

            void main() {
                float f = texture2D( tAudioData, vec2( vUv.x, 0.0 ) ).r;
                gl_FragColor = vec4(f,0.0,0.0, 1.0);
            }
        `,
        uniforms: {
            tAudioData: { value: new THREE.DataTexture( analyser.data, fftSize / 2, 1, THREE.LuminanceFormat ) }
        }
    };
}

export function PlaneShaderParams(analyser, fftSize) {
    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            
            // gl_Position = vec4( position, 1.0 );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `;
    const fragmentShader = `
        uniform sampler2D tAudioData;
        varying vec2 vUv;

        void main() {

            vec3 backgroundColor = vec3( 0.125, 0.125, 0.125 );
            vec3 color = vec3( 1.0, 1.0, 0.0 );

            float f = texture2D( tAudioData, vec2( vUv.x, 0.0 ) ).r;

            float i = step( vUv.y, f ) * step( f - 0.0125, vUv.y );

            gl_FragColor = vec4( mix( backgroundColor, color, i ), 1.0 );

        }
    `;
    const uniforms = {
        tAudioData: { value: new THREE.DataTexture( analyser.data, fftSize / 2, 1, THREE.LuminanceFormat ) }
    };
    return {
        vertexShader,
        fragmentShader,
        uniforms
    };
}