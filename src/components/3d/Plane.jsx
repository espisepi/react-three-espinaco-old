import React, { useRef } from "react";

const Plane = ({position, rotation}) => {
  position = position || [0, -1, 0];
  rotation = rotation || [Math.PI / 2, 0, 0];
  const plane = useRef();
  return (
    <mesh ref={plane} rotation={rotation} position={position}>
      <planeBufferGeometry attach="geometry" args={[20,20, 20, 20]} />
      <meshStandardMaterial attach="material" color='#ff0000' wireframe={true} />
    </mesh>
  );
};

export default Plane;