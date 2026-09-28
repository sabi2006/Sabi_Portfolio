import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/*
 * Hero backdrop: a field of construction blocks (one InstancedMesh, one draw call).
 * Blocks breathe with a slow wave; the ones under the cursor rise and heat up to the accent colour.
 * When the cursor is idle, a "site crane" point wanders the field on its own.
 */

const SPACING = 1
const BLOCK = 0.84
const BASE = new THREE.Color('#1f1e1b')
const MARK = new THREE.Color('#3a3833')
const HOT = new THREE.Color('#ff5b24')
const damp = THREE.MathUtils.damp

// Pointer in normalised device coords, written by a DOM listener (no R3F event system needed).
const pointer = { x: 0, y: 0, moved: -Infinity }

function Field({ cols, rows, offsetX, motion }) {
  const mesh = useRef()
  const count = cols * rows

  const data = useMemo(() => {
    const pos = new Float32Array(count * 2)
    const marked = new Uint8Array(count)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c
        pos[i * 2] = (c - (cols - 1) / 2) * SPACING
        pos[i * 2 + 1] = (r - (rows - 1) / 2) * SPACING
        // Deterministic "survey marks": a sparse pattern of slightly taller, lighter blocks.
        marked[i] = (c * 7 + r * 13) % 23 === 0 ? 1 : 0
      }
    }
    return { pos, marked, height: new Float32Array(count).fill(0.3), heat: new Float32Array(count) }
  }, [cols, rows, count])

  const tmp = useMemo(() => new THREE.Object3D(), [])
  const color = useMemo(() => new THREE.Color(), [])
  const ray = useMemo(() => new THREE.Raycaster(), [])
  const ndc = useMemo(() => new THREE.Vector2(), [])
  const ground = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), [])
  const hit = useMemo(() => new THREE.Vector3(), [])
  const focus = useRef(new THREE.Vector2(0, 0))

  // Colours must exist before the first render so the shader compiles with instance colours.
  useLayoutEffect(() => {
    for (let i = 0; i < count; i++) {
      tmp.position.set(data.pos[i * 2], 0.15, data.pos[i * 2 + 1])
      tmp.scale.set(1, 0.3, 1)
      tmp.updateMatrix()
      mesh.current.setMatrixAt(i, tmp.matrix)
      mesh.current.setColorAt(i, data.marked[i] ? MARK : BASE)
    }
    mesh.current.instanceMatrix.needsUpdate = true
    mesh.current.instanceColor.needsUpdate = true
  }, [count, data, tmp])

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05)
    const t = state.clock.elapsedTime * motion
    const idle = performance.now() - pointer.moved > 2500

    // Where is the "hot spot"? Under the cursor, or wandering when idle.
    let fx, fz
    if (idle || !motion) {
      fx = Math.sin(t * 0.23) * cols * 0.28
      fz = Math.cos(t * 0.17) * rows * 0.25
    } else {
      ndc.set(pointer.x, pointer.y)
      ray.setFromCamera(ndc, state.camera)
      if (ray.ray.intersectPlane(ground, hit)) {
        fx = hit.x - offsetX
        fz = hit.z
      }
    }
    if (fx !== undefined) {
      focus.current.x = damp(focus.current.x, fx, idle ? 1.2 : 6, delta)
      focus.current.y = damp(focus.current.y, fz, idle ? 1.2 : 6, delta)
    }

    const { pos, marked, height, heat } = data
    const m = mesh.current
    for (let i = 0; i < count; i++) {
      const x = pos[i * 2]
      const z = pos[i * 2 + 1]
      const wave = (Math.sin(x * 0.42 + t * 0.7) + Math.cos(z * 0.55 + t * 0.5)) * 0.14
      const dx = x - focus.current.x
      const dz = z - focus.current.y
      const bump = Math.exp(-(dx * dx + dz * dz) / 4.5)
      const target = Math.max(0.08, 0.34 + wave + bump * 2.1 + marked[i] * 0.25)

      height[i] = damp(height[i], target, 5, delta)
      heat[i] = damp(heat[i], bump, 4, delta)

      tmp.position.set(x, height[i] / 2, z)
      tmp.scale.set(1, height[i], 1)
      tmp.updateMatrix()
      m.setMatrixAt(i, tmp.matrix)

      color.copy(marked[i] ? MARK : BASE).lerp(HOT, Math.min(1, heat[i] * 1.15))
      m.setColorAt(i, color)
    }
    m.instanceMatrix.needsUpdate = true
    m.instanceColor.needsUpdate = true
  })

  return (
    <group position={[offsetX, 0, 0]}>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <boxGeometry args={[BLOCK, 1, BLOCK]} />
        <meshStandardMaterial roughness={0.62} metalness={0.08} />
      </instancedMesh>
    </group>
  )
}

function CameraRig({ motion }) {
  useFrame((state, delta) => {
    const cam = state.camera
    cam.position.x = damp(cam.position.x, pointer.x * 0.6 * motion, 1.5, delta)
    cam.position.y = damp(cam.position.y, 10.5 + pointer.y * 0.4 * motion, 1.5, delta)
    cam.lookAt(0, 0, 1)
  })
  return null
}

export default function HeroScene({ active, track }) {
  const { motion, mobile } = useMemo(
    () => ({
      motion: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1,
      mobile: window.innerWidth < 900,
    }),
    [],
  )

  // Pointer tracking relative to the hero section.
  useEffect(() => {
    const el = track.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1
      pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1
      pointer.moved = performance.now()
    }
    el.addEventListener('pointermove', onMove, { passive: true })
    return () => el.removeEventListener('pointermove', onMove)
  }, [track])

  const cols = mobile ? 16 : 30
  const rows = mobile ? 16 : 18

  return (
    <Canvas
      frameloop={motion ? (active ? 'always' : 'never') : 'demand'}
      dpr={[1, mobile ? 1.25 : 1.5]}
      camera={{ position: [0, 10.5, 15], fov: mobile ? 42 : 32 }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
    >
      <fog attach="fog" args={['#0c0c0b', 13, 30]} />
      <hemisphereLight args={['#f4efe6', '#0c0c0b', 0.55]} />
      <directionalLight position={[-6, 14, 6]} intensity={2.2} color="#fff4e8" />
      <directionalLight position={[8, 4, -6]} intensity={0.5} color="#ff8a5c" />
      <Field cols={cols} rows={rows} offsetX={mobile ? 0 : 4.5} motion={motion} />
      <CameraRig motion={motion} />
    </Canvas>
  )
}
