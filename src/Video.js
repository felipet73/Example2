import * as THREE from 'three'
import React, { Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Reflector, Text, useTexture, useGLTF } from '@react-three/drei'
import Overlay from './Overlay'
import { Geometry } from 'devextreme-react/bar-gauge'

function Carla(props) {
  const { scene } = useGLTF('/carla-draco.glb')
  return <primitive object={scene} {...props} />
}

function VideoText({ clicked, ...props }) {
  const [video, setVideo] = useState(() => Object.assign(document.createElement('video'), { src: '/drei.mp4', crossOrigin: 'Anonymous', loop: true }))
  useEffect(() => void (clicked && video.pause()), [props.nvideo])
  useEffect(() => void (clicked && setVideo(Object.assign(document.createElement('video'), { src: props.nvideo, crossOrigin: 'Anonymous', loop: true }))), [props.nvideo])
  useEffect(() => void (clicked && video.play()), [video, clicked])
  return (
    <>
    {props.opc===1 ?
    <Text font="/Inter-Bold.woff" fontSize={2.3} letterSpacing={-0.18} {...props}>
      {props.texto}
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial>
    </Text>
    :<>
    <mesh {...props}>
    {/* <planeGeometry args={[6.6, 2.9]}  /> */}
    <boxGeometry args={[6.3, 2.5, 0.85]} />
        <meshStandardMaterial emissive={"black"} side={THREE.DoubleSide}>
          <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding}/>
          <videoTexture attach="emissiveMap" args={[video]} />
    </meshStandardMaterial>
    </mesh>
    </>
    }
    </>
  )
}

function VideoText2({ clicked, ...props }) {
  const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/drei.mp4', crossOrigin: 'Anonymous', loop: true }))
  useEffect(() => void (clicked && video.play()), [video, clicked])
  return (
    <Text font="/Inter-Bold.woff" fontSize={3} letterSpacing={-0.14} {...props}>
      {props.texto}
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial>
    </Text>
  )
}

function VideoText1({ clicked, ...props }) {
  const [video, setVideo] = useState(() => Object.assign(document.createElement('video'), { src: '/drei.mp4', crossOrigin: 'Anonymous', loop: true }))
  useEffect(() => void (clicked && video.pause()), [props.nvideo])
  useEffect(() => void (clicked && setVideo(Object.assign(document.createElement('video'), { src: props.nvideo, crossOrigin: 'Anonymous', loop: true }))), [props.nvideo])
  useEffect(() => void (clicked && video.play()), [video, clicked])
  return (
    <mesh {...props}>
        <planeGeometry args={[6.6, 2.9]} />
        <meshStandardMaterial emissive={"white"} side={THREE.DoubleSide}>
          <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding}/>
          <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>
      {/* <boxGeometry args={[2, 10, 0.075]} transparent >
      <meshBasicMaterial toneMapped={false}>
      <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial>
      </boxGeometry> */}
    </mesh>
    //   <boxGeometry >
      
    //   <meshBasicMaterial toneMapped={false}>
        
    //   </meshBasicMaterial>
    // </boxGeometry>
  )
}



function Ground() {
  const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
  return (
    <Reflector blur={[400, 100]} resolution={512} args={[10, 10]} mirror={0.5} mixBlur={6} mixStrength={2.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
      {(Material, props) => <Material color="#rgba(0,127,127,0.8)" metalness={0.4} roughnessMap={floor} normalMap={normal} normalScale={[2, 2]} {...props} />}
    </Reflector>
  )
}

export default function Video({texto, nvideo, opc}) {
  const [clicked, setClicked] = useState(false)
  const [ready, setReady] = useState(true)
  const store = { clicked, setClicked, ready, setReady }
  return (
    <>
      <Canvas concurrent gl={{ alpha: false }} pixelRatio={[0.5, 3.5]} camera={{ position: [7, 3, 100], fov: 14 }}>
        <color attach="background" args={['black']} />
        <fog attach="fog" args={['rgba(0,127,127,0.2)', 18, 8]} />
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            {/* <Carla rotation={[0, Math.PI - 0.4, 0]} position={[-1.2, 0, 0.6]} scale={[0.26, 0.26, 0.26]} /> */}
            
              
              <VideoText {...store} position={[0, 1.3, -1.2]} texto={texto} nvideo={nvideo} opc={opc}/>
              
              
              {/* <VideoText1 {...store} position={[0, 1.3, -1.8]} texto={texto} nvideo={nvideo} opc={opc}/> */}
              
              
                         
            <Ground />
          </group>
          <ambientLight intensity={0.7} />
          <spotLight position={[10, -10, 10]} intensity={-0.7} />
          <directionalLight position={[-20, -40, -10]} intensity={1.7} />
          <Intro start={ready && clicked} set={setReady} setcl={setClicked}/>
        </Suspense>
      </Canvas>
      <Overlay {...store} />
    </>
  )
}

function Intro({ start, set, setcl }) {
  const [vec] = useState(() => new THREE.Vector3())
  useEffect(() => setTimeout(() => set(true), 500), [])  
  return useFrame((state) => {
    if (start) {
      state.camera.position.lerp(vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14), 0.05)
      state.camera.lookAt(0, 0, 0)
    }
  })
}
