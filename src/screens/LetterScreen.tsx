import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LetterScreen() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 flex items-center justify-center p-6">
      <div className={`bg-white rounded-2xl shadow-2xl p-10 max-w-2xl w-full border-4 border-amber-200 transform transition-all duration-1000 ${isOpen ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 rotate-12'}`}>
        <div className="space-y-6">
          {/* Cabeçalho */}
          <div className="text-center border-b-2 border-amber-300 pb-6">
            <div className="text-7xl mb-4 animate-bounce">📮</div>
            <h1 className="text-4xl font-bold text-amber-900 mb-2">
              A Carta Especial
            </h1>
            <p className="text-amber-700 italic">Missão cumprida com sucesso!</p>
            <div className="mt-4 flex justify-center gap-2">
              <span className="text-2xl">❤️</span>
              <span className="text-2xl">🌍</span>
              <span className="text-2xl">💌✈️</span>
              <span className="text-2xl">✅</span>
            </div>
          </div>

          {/* Conteúdo da Carta */}
          <div className="space-y-4 text-gray-800 leading-relaxed">
            <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-400">
              <p className="text-lg font-bold text-amber-900">Querida Valentina,</p>
            </div>
            
            <p>
              Eu nunca imaginei que uma conversa pela tela pudesse durar tanto… 
              e muito menos que chegaria a <strong>um ano inteiro falando com você</strong> ❤️, 
              Nesse tempo, a distância deixou de ser só um número no mapa
              Virou aprendizado, paciência e, principalmente, vontade de continuar.
            </p>

            <p>
              Nem sempre é fácil.
              Às vezes o fuso horário, a rotina e o silêncio pesam
              Mas, mesmo assim, eu fico porque você vale a tentativa.
            </p>

            <p>
              Essa viagem de avião no jogo é só um símbolo…
              na vida real, o que eu mais quero é que a gente consiga vencer essa distância de verdade
            </p>

            <p>
              Espero, de coração, que tudo dê certo pra nós.
              E que um dia isso deixe de ser só mensagem, chamada e tela…
              e vire presença.
            </p>

            <p>
              Não sei exatamente como vai ser.
              Mas eu sei o que eu quero: 
              <strong> tentar ter algo com você fora daqui.</strong>
            </p>

            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
              <p className="text-sm italic text-blue-900">
                "Cada parada dessa viagem existe por um motivo: lembrar que, mesmo longe,
                a gente continuou aqui. Um ano depois, ainda conversando, ainda tentando — 
                e ainda acreditando que isso pode sair da tela e virar real."
              </p>
            </div>

            <p>
              Esta carta não foi feita para cumprir uma missão. 
              Ela existe para expressar o que eu sinto por você.
              É uma forma simples e sincera de dizer que,
              mesmo depois de tanto tempo conversando,
              o meu carinho por você só cresceu.
              E que isso é real pra mim.
            </p>

            <p className="font-semibold text-amber-900 text-lg">
              Obrigado por fazer parte dessa viagem comigo.
              Esse jogo existe só para te lembrar
              do quanto você é especial pra mim.
            </p>

            <div className="pt-4 text-right italic text-amber-700">
              <p>Com admiração e muito amor,</p>
              <p className="font-bold text-xl">Charles Magno</p>
              <p className="text-sm">❤️</p>
            </div>
          </div>

          {/* Botão para recomeçar */}
          <div className="pt-6 border-t-2 border-amber-300">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🔄 Fazer Novo Voo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
