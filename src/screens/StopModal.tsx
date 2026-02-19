
interface StopModalProps {
  stopName: string
  stopNumber: number
  onContinue: () => void
}

const STOP_CONTENT = {
  1: {
    icon: '⛽❤️',
    title: 'Ilha do Amor',
    message: 'Você pousou na Ilha do amor para reabastecer. A brisa do mar e o sol brilhante renovam suas energias para continuar a jornada. Assim como nossas lembranças, que me mantêm perto de você mesmo estando longe'
  },
  2: {
    icon: '🌍💌',
    title: 'distância e carinho',
    message: 'Parada rápida! Cada quilômetro percorrido me lembra que a distância é só um detalhe quando penso em você.'
  },
  3: {
    icon: '🌙💌✈️',
    title: 'Pousando na calmaria',
    message: 'O avião já se aproxima de Tarija… e dá pra sentir a calmaria no ar. É hora de pousar e entregar a última carta, feita com tudo o que sinto por você.'
  }
}

export default function StopModal({ stopName, stopNumber, onContinue }: StopModalProps) {
  const content = STOP_CONTENT[stopNumber as keyof typeof STOP_CONTENT]

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform ">
        <div className="text-center space-y-4">
          <div className="text-7xl animate-pulse">{content.icon}</div>
          <h2 className="text-2xl font-bold text-gray-800">{content.title}</h2>
          <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
            <p className="text-gray-700 leading-relaxed">{content.message}</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span className="font-bold">Parada {stopNumber}/3</span>
            <span>✅</span>
          </div>
          <button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all"
          >
            Continuar Voo ✈️
          </button>
        </div>
      </div>
    </div>
  )
}
