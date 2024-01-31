import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CycleRaycast, BakeShadows, useCursor, softShadows, OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'


const MenuP=['C/C++','Visual Basic 6.0 .NET','SQL', 'Pascal/Cobol','Javascript','React','VueJS','Phyton','PHP','NODE/GOLANG','Automat. UiPath', 'Xpath', 'Web Scraping', 'Automatizacion QA', 'Revit API/Dynamo' ,'C# Autocad' ]


export default function Gradas({hov, SetHov}) {

  const [hov1, SetHov1] = useState(hov);
  //alert(hov[0]);
  const [{ objects, cycle }, set] = useState({ objects: [], cycle: 0 })
  return (
    <>
      {/* CycleRaycast's status data can now be turned into informative HTML */}
      <div className="status"> 
        {objects.map((_, i) => (<div key={i} className="dot" style={{ background: i === cycle ? '#70ffd0' : '#ccc' }} />)) /* prettier-ignore */}
        {objects.length ? <div className="name" style={{ position:'absolute', top:'15px', left: cycle * 14+350, padding: 2, fontSize:'40px', color:'rgba(0, 127, 127, 0.73)', textShadow:'1px 1px 2px rgba(255, 255, 255, 0.93), 0 0 1em rgba(255, 255, 255, 0.73), 0 0 0.4em rgba(0, 147, 127, 0.3)' }} children={objects[cycle].object.name} /> : null} 
    </div>
      <Canvas shadows dpr={1.5} camera={{ position: [-10, 10, 5], fov: 50 }}>
        <Stage />
        {Array.from({ length: 16 }, (_, i) => (
          <Stair
            key={i}
            //name={(i + 1) + MenuP }
            name={MenuP[i]}
            rotation={[-Math.PI / 2, 0, i / Math.PI / 2]}
            position={[2 - Math.sin(i / 5) * 5, i * 0.5, 2 - Math.cos(i / 5) * 5]}
            hover1={hov1[i]}
          />
        ))}
        {/* This component cycles through the raycast intersections, combine it with event.stopPropagation! */}
        <CycleRaycast onChanged={(objects, cycle) => set({ objects, cycle })} />
      </Canvas>
    </>
  )
}

export function Stair(props) {
  const ref = useRef()
  const [hovered, setHovered] = useState(props.hover1)
  const [clicked, setClicked] = useState(false)
  useFrame((state) => ref.current.scale.setScalar(hovered ? 1 + Math.sin(state.clock.elapsedTime * 10) / 50 : 1))
  // Sets document.body.style.cursor: useCursor(flag, onPointerOver = 'pointer', onPointerOut = 'auto')
  useCursor(hovered)
  return (
    <mesh
      {...props}
      ref={ref}
      receiveShadow
      castShadow
      onClick={(e) => (e.stopPropagation(), setClicked(!clicked))}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => setHovered(false)}>
      <boxGeometry args={[2, 10, 0.075]} />
      <meshStandardMaterial roughness={1} transparent opacity={0.43} color={clicked ? 'rgb(0, 145, 127)' : hovered ? 'rgb(0, 87, 147)' : 'rgb(0, 127, 127)'} />
      {/* <Text font="/Inter-Bold.woff"  fontSize={0.5} letterSpacing={-0.00} {...props}>
      texto
      <meshBasicMaterial toneMapped={false}>
      <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial> 
    </Text> */}
      
    </mesh>
  )
}

function Stage() {
  return (
    <>
      {/* Fill */}
      <ambientLight intensity={0.5} />
      {/* Main */}
      <directionalLight
        position={[1, 10, -2]}
        intensity={1}
        shadow-camera-far={70}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-mapSize={[512, 512]}
        castShadow
      />
      {/* Strip */}
      <directionalLight position={[-10, -10, 2]} intensity={3} />
      {/* Ground */}
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[1, -0.75, 0]}>
        <planeGeometry args={[80, 80]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
      {/* This freezes the shadow map, which is fast, but the model has to be static  */}
      <BakeShadows />
      {/* <OrbitControls
      enableZoom={false}
      enablePan={false}
      maxAzimuthAngle={Math.PI / 2}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 2}
      minPolarAngle={0}
      /> */}
    </>
  )
}

// Percentage closer soft shadows, normally *very* expensive
softShadows()