import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Lightformer, MeshDistortMaterial, PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'

/*
 * Full-page, fixed WebGL backdrop.
 * The scene reacts to page scroll (the core travels between sides, shifts colour,
 * and floating shapes drift past) and to the pointer (camera parallax).
 */

const damp = THREE.MathUtils.damp

// Scroll progress (0 → 1) kept outside React so the render loop never triggers re-renders.
const scroll = { progress: 0 }

function useScrollProgress() {
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scroll.progress = max > 0 ? THREE.MathUtils.clamp(window.scrollY / max, 0, 1) : 0
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
}

const CORE_COLORS = ['#6d28d9', '#0e7490', '#be185d', '#4338ca', '#6d28d9'].map((c) => new THREE.Color(c))

function Core({ motion }) {
  const group = useRef()
  const material = useRef()
  const shell = useRef()
  const ringA = useRef()
  const ringB = useRef()

  useFrame((state, delta) => {
    const p = scroll.progress
    const g = group.current
    const wide = state.viewport.aspect > 1.1

    // Hero: large, beside the intro. Past the hero it retreats to the right edge (headings are
    // left-aligned, so this keeps them readable) and sways gently while you scroll.
    const hero = THREE.MathUtils.clamp(1 - p / 0.08, 0, 1)
    const lerp = THREE.MathUtils.lerp
    let tx, ty, tz, ts
    if (wide) {
      const heroX = Math.min(2.5, state.viewport.width * 0.24)
      const edgeX = Math.min(3.6, state.viewport.width * 0.34)
      const sway = 0.82 + 0.18 * Math.cos(p * Math.PI * 4)
      tx = lerp(edgeX * sway, heroX, hero)
      // In the hero the orb sits behind the portrait's head and shoulders.
      ty = lerp(Math.sin(p * Math.PI * 3) * 0.6, 0.35, hero)
      tz = lerp(-1.4, 0, hero)
      ts = lerp(0.8, 1, hero)
    } else {
      tx = lerp(0.9, 0.35, hero)
      ty = lerp(0.9, 1.25, hero)
      tz = lerp(-3, 0, hero)
      ts = lerp(0.45, 0.55, hero)
    }

    g.position.x = damp(g.position.x, tx, 2.5, delta)
    g.position.y = damp(g.position.y, ty, 2.5, delta)
    g.position.z = damp(g.position.z, tz, 2.5, delta)
    g.scale.setScalar(damp(g.scale.x, ts, 2.5, delta))

    g.rotation.y += delta * 0.18 * motion
    g.rotation.x = damp(g.rotation.x, state.pointer.y * 0.35 + p * Math.PI, 2, delta)
    g.rotation.z = damp(g.rotation.z, -state.pointer.x * 0.25, 2, delta)

    shell.current.rotation.y -= delta * 0.25 * motion
    shell.current.rotation.x += delta * 0.1 * motion
    ringA.current.rotation.z += delta * 0.6 * motion
    ringB.current.rotation.z -= delta * 0.45 * motion

    // Colour and surface distortion evolve with scroll.
    const seg = p * (CORE_COLORS.length - 1)
    const i = Math.min(Math.floor(seg), CORE_COLORS.length - 2)
    material.current.color.lerpColors(CORE_COLORS[i], CORE_COLORS[i + 1], seg - i)
    material.current.distort = 0.32 + Math.sin(p * Math.PI) * 0.22
  })

  return (
    <group ref={group} position={[2.4, 0, 0]}>
      <Float speed={motion ? 1.5 : 0} rotationIntensity={0.35} floatIntensity={0.7}>
        <mesh>
          <sphereGeometry args={[1.25, 64, 64]} />
          <MeshDistortMaterial
            ref={material}
            color="#6d28d9"
            emissive="#12092e"
            roughness={0.1}
            metalness={0.85}
            envMapIntensity={1.6}
            distort={0.32}
            speed={motion ? 1.8 : 0}
          />
        </mesh>

        <mesh ref={shell} scale={1.6}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.18} />
        </mesh>

        <group rotation={[Math.PI / 2.4, 0, 0]}>
          <group ref={ringA}>
            <mesh>
              <torusGeometry args={[2.25, 0.008, 12, 220]} />
              <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} toneMapped={false} />
            </mesh>
            <mesh position={[2.25, 0, 0]}>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshBasicMaterial color="#67e8f9" toneMapped={false} />
            </mesh>
          </group>
        </group>

        <group rotation={[-Math.PI / 3, Math.PI / 5, 0]}>
          <group ref={ringB}>
            <mesh>
              <torusGeometry args={[2.65, 0.006, 12, 240]} />
              <meshBasicMaterial color="#f472b6" transparent opacity={0.55} toneMapped={false} />
            </mesh>
            <mesh position={[-2.65, 0, 0]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshBasicMaterial color="#f9a8d4" toneMapped={false} />
            </mesh>
          </group>
        </group>
      </Float>
    </group>
  )
}

const SHAPES = [
  { kind: 'octa', position: [-4.4, 2.2, -3], color: '#22d3ee', scale: 0.42 },
  { kind: 'torus', position: [4.8, -2.6, -4], color: '#f472b6', scale: 0.38 },
  { kind: 'box', position: [-3.8, -5.4, -2.5], color: '#8b5cf6', scale: 0.34 },
  { kind: 'knot', position: [4.1, -8.2, -3], color: '#22d3ee', scale: 0.3 },
  { kind: 'dodeca', position: [-4.6, -11, -3.5], color: '#f59e0b', scale: 0.4 },
  { kind: 'octa', position: [4.4, -14, -2.5], color: '#10b981', scale: 0.36 },
  { kind: 'torus', position: [-4, -17, -3], color: '#8b5cf6', scale: 0.4 },
  { kind: 'box', position: [3.6, -20, -3.5], color: '#f472b6', scale: 0.32 },
]

function ShapeGeometry({ kind }) {
  switch (kind) {
    case 'octa':
      return <octahedronGeometry args={[1, 0]} />
    case 'torus':
      return <torusGeometry args={[0.8, 0.28, 24, 64]} />
    case 'box':
      return <boxGeometry args={[1.2, 1.2, 1.2]} />
    case 'knot':
      return <torusKnotGeometry args={[0.8, 0.24, 128, 16]} />
    default:
      return <dodecahedronGeometry args={[1, 0]} />
  }
}

function FloatingShapes({ motion, spread }) {
  const group = useRef()
  useFrame((_, delta) => {
    // Shapes are laid out down the page and scroll upward past the camera.
    group.current.position.y = damp(group.current.position.y, scroll.progress * 22, 3, delta)
  })
  return (
    <group ref={group}>
      {SHAPES.map((s, i) => (
        <Float key={i} speed={motion ? 1 + (i % 3) * 0.4 : 0} rotationIntensity={1.4} floatIntensity={1.2}>
          <mesh
            position={[s.position[0] * spread, s.position[1], s.position[2]]}
            scale={s.scale}
            rotation={[i, i * 0.5, 0]}
          >
            <ShapeGeometry kind={s.kind} />
            <meshStandardMaterial color={s.color} metalness={0.9} roughness={0.2} envMapIntensity={1.2} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function Particles({ count, motion }) {
  const points = useRef()
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = ['#22d3ee', '#8b5cf6', '#f472b6', '#ffffff', '#ffffff'].map((c) => new THREE.Color(c))
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 16
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi) - 4
      const c = palette[i % palette.length]
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [count])

  useFrame((_, delta) => {
    points.current.rotation.y += delta * 0.015 * motion
    points.current.rotation.x = damp(points.current.rotation.x, scroll.progress * 0.8, 2, delta)
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function CameraRig() {
  useFrame((state, delta) => {
    const { camera, pointer } = state
    camera.position.x = damp(camera.position.x, pointer.x * 0.5, 2, delta)
    camera.position.y = damp(camera.position.y, pointer.y * 0.35, 2, delta)
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Studio() {
  // Local light-formers baked into an env map: glossy reflections with no HDR download.
  return (
    <Environment resolution={256}>
      <group rotation={[-Math.PI / 3, 0, 1]}>
        <Lightformer form="circle" intensity={4} color="#22d3ee" position={[0, 5, -9]} scale={2} />
        <Lightformer form="circle" intensity={2.5} color="#f472b6" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={2} />
        <Lightformer form="rect" intensity={2} color="#8b5cf6" position={[-5, -1, -1]} rotation-y={Math.PI / 2} scale={[20, 0.5, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#ffffff" position={[10, 1, 0]} rotation-y={-Math.PI / 2} scale={[20, 1, 1]} />
      </group>
    </Environment>
  )
}

export default function Scene() {
  useScrollProgress()
  const { motion, mobile } = useMemo(
    () => ({
      motion: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1,
      mobile: window.innerWidth < 768,
    }),
    [],
  )

  // Start at a modest resolution and drop further if the GPU can't keep up.
  const maxDpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5)
  const [dpr, setDpr] = useState(maxDpr)

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={dpr}
      gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
      eventSource={document.getElementById('root')}
      eventPrefix="client"
    >
      <PerformanceMonitor
        onDecline={() => setDpr((d) => Math.max(0.75, d - 0.25))}
        onIncline={() => setDpr((d) => Math.min(maxDpr, d + 0.25))}
        flipflops={3}
        onFallback={() => setDpr(0.75)}
      />
      <fog attach="fog" args={['#05060d', 9, 24]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#22d3ee" />
      <pointLight position={[4, 2, 2]} intensity={25} color="#f472b6" />

      <Core motion={motion} />
      <FloatingShapes motion={motion} spread={mobile ? 0.55 : 1} />
      <Particles count={mobile ? 600 : 1400} motion={motion} />
      <CameraRig />
      <Studio />
    </Canvas>
  )
}
