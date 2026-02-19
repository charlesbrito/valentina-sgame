import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Plane from './Plane'
import Stop from './Stop'
import StopModal from './StopModal'

interface StopData {
  id: number
  y: number
  name: string
  completed: boolean
  active: boolean
}

export default function GameScreen() {
  const navigate = useNavigate()
  const [planeY, setPlaneY] = useState(500)
  const [isDragging, setIsDragging] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentStop, setCurrentStop] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [stops, setStops] = useState<StopData[]>([
    { id: 1, y: 400, name: 'Parada 1', completed: false, active: true },
    { id: 2, y: 250, name: 'Parada 2', completed: false, active: false },
    { id: 3, y: 100, name: 'Parada 3', completed: false, active: false }
  ])

  const [destination] = useState({ y: 20 })
  const COLLISION_TOLERANCE = 30
  const PLANE_HEIGHT = 60 // altura real do avião (Não funcionou bem)

  const allStopsCompleted = useMemo(() => stops.every(s => s.completed), [stops])
  const activeStop = useMemo(() => stops.find(s => s.active && !s.completed), [stops])
  const checkCollision = useCallback(
    (y1: number, y2: number) => Math.abs(y1 - y2) < COLLISION_TOLERANCE,
    []
  )

  // Bloqueia scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [])

  // Checagem de colisão e abertura do modal
  useEffect(() => {
    if (!activeStop || showModal) return

    const planeCenterY = planeY + PLANE_HEIGHT / 2
    if (checkCollision(planeCenterY, activeStop.y)) {
      setCurrentStop(activeStop.id)
      setShowModal(true)
    }
  }, [planeY, activeStop, checkCollision, showModal])

  // Checagem de destino final
  useEffect(() => {
    const planeCenterY = planeY + PLANE_HEIGHT / 2
    if (allStopsCompleted && checkCollision(planeCenterY, destination.y)) {
      navigate('/senha')
    }
  }, [planeY, allStopsCompleted, destination.y, navigate, checkCollision])

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      // ajusta para o centro do avião (dificil par caramba, deu certo não)
      const newY = e.clientY - rect.top - PLANE_HEIGHT / 2
      if (newY >= 0 && newY <= rect.height - PLANE_HEIGHT) setPlaneY(newY)
    }
  }

  const handlePointerUp = () => setIsDragging(false)

  const handleContinue = useCallback(() => {
    if (currentStop === null) return

    setStops(prev =>
      prev.map((stop, index) => {
        if (stop.id === currentStop) {
          const nextStop = prev[index + 1]
          if (nextStop) prev[index + 1].active = true
          return { ...stop, completed: true, active: false }
        }
        return stop
      })
    )

    setShowModal(false)
    setCurrentStop(null)
  }, [currentStop])

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 overflow-hidden"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ touchAction: 'none' }}
    >
      {/* Layout intacto */}
      <div className="absolute top-10 left-10 text-6xl opacity-70">☁️</div>
      <div className="absolute top-40 right-20 text-5xl opacity-60">☁️</div>
      <div className="absolute top-72 left-1/4 text-7xl opacity-50">☁️</div>
      <div className="absolute bottom-32 right-10 text-6xl opacity-60">☁️</div>

      {stops.map(stop => (
        <Stop
          key={stop.id}
          y={stop.y}
          name={stop.name}
          completed={stop.completed}
          active={stop.active}
        />
      ))}

      <div
        className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
          allStopsCompleted ? 'opacity-100 scale-100' : 'opacity-30 scale-75'
        }`}
        style={{ top: `${destination.y}px` }}
      >
        <div className="flex flex-col items-center">
          <div className="text-6xl animate-bounce">🏙️</div>
          <div className="mt-2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
            Destino Final
          </div>
        </div>
      </div>

      <Plane y={planeY} />

      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-xl p-3 shadow-lg">
        <div className="text-xs font-bold text-gray-700 mb-2">Progresso</div>
        <div className="flex gap-2">
          {stops.map(stop => (
            <div
              key={stop.id}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                stop.completed
                  ? 'bg-green-500 text-white'
                  : stop.active
                  ? 'bg-yellow-400 text-gray-800'
                  : 'bg-gray-300 text-gray-500'
              }`}
            >
              {stop.id}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full text-sm">
        Arraste o avião para cima ☝️
      </div>

      {showModal && currentStop !== null && (
        <StopModal
          stopName={stops.find(s => s.id === currentStop)?.name || ''}
          stopNumber={currentStop}
          onContinue={handleContinue}
        />
      )}
    </div>
  )
}