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
  const [showOrientationWarning, setShowOrientationWarning] = useState(false) //aviso celular horizontal

  const containerRef = useRef<HTMLDivElement>(null)
  const activePointerId = useRef<number | null>(null)

  const [stops, setStops] = useState<StopData[]>([
    { id: 1, y: 400, name: 'Parada 1', completed: false, active: true },
    { id: 2, y: 250, name: 'Parada 2', completed: false, active: false },
    { id: 3, y: 100, name: 'Parada 3', completed: false, active: false }
  ])

  const [destination] = useState({ y: 20 })

  const COLLISION_TOLERANCE = 30
  const PLANE_HEIGHT = 60

  const allStopsCompleted = useMemo(
    () => stops.every(s => s.completed),
    [stops]
  )

  const activeStop = useMemo(
    () => stops.find(s => s.active && !s.completed),
    [stops]
  )

  const checkCollision = useCallback(
    (y1: number, y2: number) => Math.abs(y1 - y2) < COLLISION_TOLERANCE,
    []
  )

  // bloqueia scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [])

  // encerra drag quando o modal abre (conserta bug do mouse)
  useEffect(() => {
    if (!showModal) return

    setIsDragging(false)

    if (containerRef.current && activePointerId.current !== null) {
      try {
        containerRef.current.releasePointerCapture(activePointerId.current)
      } catch {}
      activePointerId.current = null
    }
  }, [showModal])

  // colisão com parada
  useEffect(() => {
    if (!activeStop || showModal) return

    const planeCenterY = planeY + PLANE_HEIGHT / 2

    if (checkCollision(planeCenterY, activeStop.y)) {
      setCurrentStop(activeStop.id)
      setShowModal(true)
    }
  }, [planeY, activeStop, checkCollision, showModal])

  // destino final
  useEffect(() => {
    const planeCenterY = planeY + PLANE_HEIGHT / 2

    if (allStopsCompleted && checkCollision(planeCenterY, destination.y)) {
      navigate('/senha')
    }
  }, [planeY, allStopsCompleted, destination.y, navigate, checkCollision])

  const handlePointerDown = (e: React.PointerEvent) => {
    if (showModal) return

    activePointerId.current = e.pointerId
    setIsDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current || showModal) return

    const rect = containerRef.current.getBoundingClientRect()
    const newY = e.clientY - rect.top - PLANE_HEIGHT / 2

    if (newY >= 0 && newY <= rect.height - PLANE_HEIGHT) {
      setPlaneY(newY)
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false)

    if (activePointerId.current !== null) {
      try {
        e.currentTarget.releasePointerCapture(activePointerId.current)
      } catch {}
      activePointerId.current = null
    }
  }

  const handleContinue = useCallback(() => {
    if (currentStop === null) return

    setStops(prev => {
      const currentIndex = prev.findIndex(s => s.id === currentStop)

      return prev.map((stop, index) => {
        if (index === currentIndex) {
          return { ...stop, completed: true, active: false }
        }

        if (index === currentIndex + 1) {
          return { ...stop, active: true }
        }

        return stop
      })
    })

    setShowModal(false)
    setCurrentStop(null)
  }, [currentStop])

  //Avisar quando o celular estiver na horizontal
  useEffect(() => {
  const checkOrientation = () => {
    const isLandscape = window.matchMedia('(orientation: landscape)').matches
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches

    setShowOrientationWarning(isTouchDevice && isLandscape)
  }

  checkOrientation()

  window.addEventListener('resize', checkOrientation)
  window.addEventListener('orientationchange', checkOrientation)

  return () => {
    window.removeEventListener('resize', checkOrientation)
    window.removeEventListener('orientationchange', checkOrientation)
  }
}, [])

  return (
  <div
    ref={containerRef}
    className="relative h-screen w-full bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 overflow-hidden"
    onPointerDown={handlePointerDown}
    onPointerMove={handlePointerMove}
    onPointerUp={handlePointerUp}
    onPointerCancel={handlePointerUp}
    style={{ touchAction: 'none', userSelect: 'none' }}
  >
    {/* Layout */}
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

    <div className="absolute bottom-[calc(env(safe-area-inset-bottom)+16px)] left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full text-sm">
      Arraste o avião para cima ☝️
    </div>

    {showModal && currentStop !== null && (
      <StopModal
        stopName={stops.find(s => s.id === currentStop)?.name || ''}
        stopNumber={currentStop}
        onContinue={handleContinue}
      />
    )}

    {/* Aviso para celular na horizontal */}
    {showOrientationWarning && (
      <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center">
        <div className="text-center text-white px-6">
          <div className="text-5xl mb-4">📱</div>
          <p className="text-lg font-bold mb-2">
            Para uma melhor experiência
          </p>
          <p className="text-sm opacity-90">
            use o jogo na posição vertical
          </p>
        </div>
      </div>
    )}
  </div>
)}