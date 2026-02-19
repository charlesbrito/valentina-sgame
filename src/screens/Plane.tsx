

interface PlaneProps {
  y: number
}

export default function Plane({ y }: PlaneProps) {
  return (
    <div 
      className="absolute left-1/2 -translate-x-1/2 transition-transform duration-100"
      style={{ 
        top: `${y}px`,
        cursor: 'grab'
      }}
    >
      <div className="relative">
        <div className="text-6xl transform -rotate-12 drop-shadow-lg">
          ✈️
        </div>
        {/* Trail effect */}
        <div className="absolute top-1/2 -right-4 w-8 h-1 bg-white/50 rounded-full blur-sm"></div>
      </div>
    </div>
  )
}
