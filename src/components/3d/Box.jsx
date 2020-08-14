import React, {useState} from 'react';
import { Canvas } from 'react-three-fiber'
// this example is using react-spring@9
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'

const Box = (props) => {
  const [active, setActive] = useState(0)

  // create a common spring that will be used later to interpolate other values
  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
  })

  // interpolate values from commong spring
  const scale = spring.to([0, 1], [1, 5])
  const rotation = spring.to([0, 1], [0, Math.PI])
  const color = spring.to([0, 1], ['#6246ea', '#e45858'])

  return (
    // using a from react-spring will animate our component
    <a.mesh rotation-y={rotation} scale-x={scale} scale-z={scale} onClick={() => setActive(Number(!active))}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshStandardMaterial roughness={0.5} attach="material" color={color} />
    </a.mesh>
  )
}

export default Box;