interface StopProps {
  y: number
  name: string
  completed: boolean
  active: boolean
}

export default function Stop({ y, name, completed, active }: StopProps) {
  return (
    <div 
      className={`absolute right-8 transition-all duration-300 ${
        completed ? 'opacity-50' : active ? 'opacity-100' : 'opacity-30'
      }`}
      style={{ top: `${y}px` }}
    >
      <div className="flex items-center gap-3">
        <div className={`px-4 py-2 rounded-lg font-bold text-sm shadow-lg ${
          completed ? 'bg-green-500 text-white' :
          active ? 'bg-yellow-400 text-gray-800 animate-pulse' :
          'bg-gray-400 text-gray-600'
        }`}>
          {name}
        </div>
        <div className="text-5xl">
          {completed ? '✅' : active ? '📍' : '🔒'}
        </div>
      </div>
    </div>
  )
}
