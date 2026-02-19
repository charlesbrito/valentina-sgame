
import { useNavigate } from 'react-router-dom'

export default function IntroGame() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-800 to-pink-600 flex items-center justify-center p-6">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">✈️</div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            Entregar a Carta
          </h1>
          
          <div className="text-white/90 text-lg space-y-3 leading-relaxed">
            <p>Você será a pilota do avião.</p>
            <p>Você foi contratada por Charles para uma viagem muito importante.</p>
            <p>Sua missão é ajudar a levar uma carta até Tarija, na Bolivia.</p>
            <p>Antes do pouso final, será necessário fazer <span className="font-bold text-yellow-300">três paradas</span>.</p>
          </div>

          <button
            onClick={() => navigate('/game')}
            className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Iniciar Voo ✈️
          </button>
        </div>
      </div>
    </div>
  )
}
