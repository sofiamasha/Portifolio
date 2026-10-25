import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

type SceneProps = { progress: React.MutableRefObject<number>; onReady: () => void }

function seededTextPoints() {
  if (typeof document === 'undefined') return [] as THREE.Vector2[]
  const canvas = document.createElement('canvas')
  canvas.width = 1000
  canvas.height = 280
  const context = canvas.getContext('2d')
  if (!context) return [] as THREE.Vector2[]
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.font = '600 86px Space Grotesk, Arial, sans-serif'
  context.fillStyle = '#fff'
  context.fillText('SOFIA DE ABREU', canvas.width / 2, canvas.height / 2)
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
  const points: THREE.Vector2[] = []
  for (let y = 30; y < canvas.height - 30; y += 5) {
    for (let x = 20; x < canvas.width - 20; x += 5) {
      if (pixels[(y * canvas.width + x) * 4 + 3] > 128) points.push(new THREE.Vector2(x / canvas.width, y / canvas.height))
    }
  }
  return points
}

function laptopPoints(count: number) {
  const edges: [number, number, number, number][] = [
    [-0.78, 0.48, 0.78, 0.48], [0.78, 0.48, 0.78, -0.42], [0.78, -0.42, -0.78, -0.42], [-0.78, -0.42, -0.78, 0.48],
    [-0.93, -0.52, 0.93, -0.52], [0.93, -0.52, 0.78, -0.66], [0.78, -0.66, -0.78, -0.66], [-0.78, -0.66, -0.93, -0.52],
    [-0.12, -0.59, 0.12, -0.59],
  ]
  const lengths = edges.map(([x1, y1, x2, y2]) => Math.hypot(x2 - x1, y2 - y1))
  const total = lengths.reduce((a, b) => a + b, 0)
  return Array.from({ length: count }, (_, i) => {
    let distance = (i / count) * total
    for (let edge = 0; edge < edges.length; edge++) {
      if (distance <= lengths[edge] || edge === edges.length - 1) {
        const [x1, y1, x2, y2] = edges[edge]
        const t = Math.min(distance / lengths[edge], 1)
        return new THREE.Vector2(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t)
      }
      distance -= lengths[edge]
    }
    return new THREE.Vector2()
  })
}

function MorphingPoints({ progress }: Pick<SceneProps, 'progress'>) {
  const pointsRef = useRef<THREE.Points>(null)
  const averageFrame = useRef(1 / 60)
  const { camera, size } = useThree()
  const { original, target, colors } = useMemo(() => {
    let text = seededTextPoints()
    if (size.width < 768) text = text.filter((_, index) => index % 5 < 2)
    let seed = 2463534242
    for (let index = text.length - 1; index > 0; index--) {
      seed = (seed * 1664525 + 1013904223) >>> 0
      const swap = seed % (index + 1)
      ;[text[index], text[swap]] = [text[swap], text[index]]
    }
    const positions = text.map(({ x, y }) => new THREE.Vector3(x, y, 0))
    const laptop = laptopPoints(text.length)
    const palette = [new THREE.Color('#FF3CAC'), new THREE.Color('#784BA0'), new THREE.Color('#2B86C5')]
    const col = new Float32Array(text.length * 3)
    text.forEach((point, i) => {
      const color = palette[Math.min(2, Math.floor(point.x * 3))].clone().lerp(palette[Math.min(2, Math.floor(point.x * 3) + 1)] || palette[2], point.x * 3 % 1)
      col.set([color.r, color.g, color.b], i * 3)
    })
    return { original: positions, target: laptop.map(({ x, y }) => new THREE.Vector3(x, y, 0)), colors: col }
  }, [size.width])
  const geometry = useMemo(() => {
    const result = new THREE.BufferGeometry()
    const initial = new Float32Array(original.length * 3)
    original.forEach((p, i) => initial.set([p.x, p.y, p.z], i * 3))
    result.setAttribute('position', new THREE.BufferAttribute(initial, 3))
    result.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return result
  }, [original, colors])

  useFrame((_, delta) => {
    const points = pointsRef.current
    if (!points) return
    averageFrame.current += (Math.min(delta, 0.1) - averageFrame.current) * 0.08
    const maximumCount = original.length
    if (averageFrame.current > 0.034) points.geometry.setDrawRange(0, Math.max(1, Math.floor(maximumCount * 0.45)))
    else if (averageFrame.current < 0.028) points.geometry.setDrawRange(0, maximumCount)
    const attribute = points.geometry.attributes.position as THREE.BufferAttribute
    const values = attribute.array as Float32Array
    const p = progress.current
    const morph = THREE.MathUtils.smoothstep(p, 0.18, 0.62)
    const worldWidth = Math.min(size.width / size.height * 7.8, 13.2) * 0.82
    const worldHeight = worldWidth * size.height / size.width
    const textScale = worldWidth * 0.68
    for (let i = 0; i < original.length; i++) {
      const a = original[i]
      const b = target[i]
      const x = (a.x - 0.5) * textScale * 1.75
      const y = (0.5 - a.y) * 5.4
      const tx = b.x * Math.min(2.05, worldWidth * 0.19)
      const ty = b.y * Math.min(1.65, worldHeight * 0.34)
      const drift = Math.sin(i * 31.7) * Math.sin(Math.PI * morph) * 0.55
      values[i * 3] = THREE.MathUtils.lerp(x, tx, morph) + drift * Math.cos(i)
      values[i * 3 + 1] = THREE.MathUtils.lerp(y, ty, morph) + drift * Math.sin(i)
      values[i * 3 + 2] = Math.sin(i * 14.13) * Math.sin(Math.PI * morph) * 0.38
    }
    attribute.needsUpdate = true
    const zoom = THREE.MathUtils.smoothstep(p, 0.67, 1)
    camera.position.z = THREE.MathUtils.lerp(12, 5.1, zoom)
    camera.updateProjectionMatrix()
  })

  return <points ref={pointsRef} geometry={geometry}>
    <pointsMaterial size={0.046} vertexColors transparent opacity={0.96} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
  </points>
}

export default function HeroScene({ progress, onReady }: SceneProps) {
  return <Canvas camera={{ position: [0, 0, 12], fov: 42 }} dpr={[1, 1.55]} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }} onCreated={() => onReady()}>
    <MorphingPoints progress={progress} />
  </Canvas>
}
