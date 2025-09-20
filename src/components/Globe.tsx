import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface GlobeProps {
  selectedMetric: string
}

interface EarthProps {
  selectedMetric: string
  isAutoRotating: boolean
}

// Sample climate data points for visualization
const CLIMATE_DATA_POINTS = [
  // Temperature hotspots
  { lat: 40.7128, lon: -74.0060, name: 'New York', type: 'temperature', value: 15.2 },
  { lat: 35.6762, lon: 139.6503, name: 'Tokyo', type: 'temperature', value: 16.3 },
  { lat: 51.5074, lon: -0.1278, name: 'London', type: 'temperature', value: 11.8 },
  { lat: -33.8688, lon: 151.2093, name: 'Sydney', type: 'temperature', value: 18.4 },
  
  // CO2 emission centers
  { lat: 39.9042, lon: 116.4074, name: 'Beijing', type: 'co2', value: 420.3 },
  { lat: 31.2304, lon: 121.4737, name: 'Shanghai', type: 'co2', value: 415.8 },
  { lat: 19.0760, lon: 72.8777, name: 'Mumbai', type: 'co2', value: 410.2 },
  
  // Pollution centers
  { lat: 28.6139, lon: 77.2090, name: 'Delhi', type: 'pollution', value: 85.6 },
  { lat: 25.0330, lon: 121.5654, name: 'Taipei', type: 'pollution', value: 72.3 },
  { lat: 37.5665, lon: 126.9780, name: 'Seoul', type: 'pollution', value: 68.9 },
]

function Earth({ selectedMetric, isAutoRotating }: EarthProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load('/global-datacenter-visualization/src/00_earthmap1k.jpg', 
      (loadedTexture) => {
        setTexture(loadedTexture)
      },
      undefined,
      (error) => {
        console.warn('Could not load earth texture:', error)
        // Create a simple colored sphere if texture fails
        const canvas = document.createElement('canvas')
        canvas.width = 256
        canvas.height = 256
        const ctx = canvas.getContext('2d')!
        const gradient = ctx.createLinearGradient(0, 0, 0, 256)
        gradient.addColorStop(0, '#1e40af') // Blue
        gradient.addColorStop(0.3, '#16a34a') // Green
        gradient.addColorStop(0.7, '#ca8a04') // Yellow
        gradient.addColorStop(1, '#dc2626') // Red
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 256, 256)
        
        const fallbackTexture = new THREE.CanvasTexture(canvas)
        setTexture(fallbackTexture)
      }
    )
  }, [])

  useFrame((state, delta) => {
    if (meshRef.current && isAutoRotating) {
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  // Convert lat/lon to sphere coordinates
  const latLonToVector3 = (lat: number, lon: number, radius: number = 1.02) => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    )
  }

  const getMetricColor = (point: any) => {
    switch (selectedMetric) {
      case 'temperature':
        return point.type === 'temperature' ? '#ff4444' : '#444444'
      case 'co2':
        return point.type === 'co2' ? '#ffaa00' : '#444444'
      case 'pollution':
        return point.type === 'pollution' ? '#aa0044' : '#444444'
      default:
        return '#00aaff'
    }
  }

  const getMetricIntensity = (point: any) => {
    if (point.type !== selectedMetric) return 0.2
    
    switch (selectedMetric) {
      case 'temperature':
        return Math.min(point.value / 25, 1)
      case 'co2':
        return Math.min(point.value / 500, 1)
      case 'pollution':
        return Math.min(point.value / 100, 1)
      default:
        return 0.5
    }
  }

  if (!texture) {
    return (
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
    )
  }

  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Climate data points */}
      {CLIMATE_DATA_POINTS.map((point, index) => {
        const position = latLonToVector3(point.lat, point.lon)
        const color = getMetricColor(point)
        const intensity = getMetricIntensity(point)
        
        return (
          <group key={index}>
            {/* Data point */}
            <mesh position={[position.x, position.y, position.z]}>
              <sphereGeometry args={[0.02 * (1 + intensity), 8, 8]} />
              <meshBasicMaterial 
                color={color} 
                transparent 
                opacity={0.8}
              />
            </mesh>
            
            {/* Glow effect for active metrics */}
            {point.type === selectedMetric && (
              <mesh position={[position.x, position.y, position.z]}>
                <sphereGeometry args={[0.04 * (1 + intensity), 8, 8]} />
                <meshBasicMaterial 
                  color={color} 
                  transparent 
                  opacity={0.3}
                />
              </mesh>
            )}
          </group>
        )
      })}

      {/* Atmosphere */}
      <mesh>
        <sphereGeometry args={[1.05, 64, 64]} />
        <meshBasicMaterial 
          color="#87CEEB" 
          transparent 
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

export function Globe({ selectedMetric }: GlobeProps) {
  const [isAutoRotating, setIsAutoRotating] = useState(true)

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 75 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0a0a0a', 1)
        }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Earth selectedMetric={selectedMetric} isAutoRotating={isAutoRotating} />
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={1.8}
          maxDistance={4}
          autoRotate={false}
          onStart={() => setIsAutoRotating(false)}
          onEnd={() => setIsAutoRotating(true)}
        />
      </Canvas>
      
      {/* Metric indicator */}
      <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-2">
        <p className="text-white text-xs font-medium capitalize">
          Viewing: {selectedMetric} data
        </p>
      </div>
    </div>
  )
}