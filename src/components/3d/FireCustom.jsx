import React, { useRef, useEffect } from 'react';
import { extend, useThree, useFrame } from 'react-three-fiber';
import { Fire } from 'three/examples/jsm/objects/Fire';
import * as THREE from 'three';

extend({Fire});
const FireCustom = () => {
    const fire = useRef();
    
    useEffect(()=>{
        // fire.current.clearSources();
		// fire.current.addSource( 0.5, 0.1, 0.1, 1.0, 0.0, 1.0 );
        // console.log(fire.current);
        fire.current.position.y = 3;
        fire.current.rotation.x += -0.75;
        var text = "joseangel";
        var size = 180;
        var color = "#FF0040";
        var canvas = document.createElement( "canvas" );
        canvas.width = 1024;
        canvas.height = 1024;
        var context = canvas.getContext( "2d" );
        context.font = size + "pt Arial";

        context.strokeStyle = "black";
        context.strokeRect( 0, 0, canvas.width, canvas.height );
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.lineWidth = 5;
        context.strokeStyle = color;
        context.fillStyle = "black";

        context.strokeText( text, canvas.width / 2, canvas.height * 0.75 );
        var texture = new THREE.Texture( canvas );
        texture.needsUpdate = true;

        fire.current.setSourceMap( texture );
        fire.current.massConservation = false;
    });
    return (
        <fire ref={fire} args={[
            new THREE.PlaneBufferGeometry( 5, 5 ),
            {
                textureWidth: 512,
				textureHeight: 512,
				debug: false
            }
        ]} />
    );
};

export default FireCustom;