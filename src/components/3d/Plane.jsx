import React, { useRef } from "react";

const Plane = () => {
  const plane = useRef();
  return (
    <mesh ref={plane} rotation={[Math.PI / 2, 0, 0]} position={[0,-1,0]}>
      <planeBufferGeometry attach="geometry" args={[20,20, 20, 20]} />
      <meshStandardMaterial attach="material" color='#ff0000' wireframe={true} />
    </mesh>
  );
};

export default Plane;