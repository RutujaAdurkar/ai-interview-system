import { Canvas } from "@react-three/fiber"

import {
  OrbitControls
} from "@react-three/drei"

export default function AIAvatar({
  isSpeaking
}){
  return (

    <div className="w-full h-[500px] rounded-3xl overflow-hidden">

      <Canvas>

        {/* LIGHTS */}
        <ambientLight intensity={2} />

        <directionalLight
          position={[2,2,5]}
        />

        {/* SIMPLE AI FACE */}
        <mesh
          scale={isSpeaking ? 1.1 : 1}
        >

          <sphereGeometry args={[1.5,32,32]} />

          <meshStandardMaterial
            color="#3B82F6"
          />

        </mesh>

        {/* CONTROLS */}
        <OrbitControls enableZoom={false} />

      </Canvas>

    </div>
  )
}