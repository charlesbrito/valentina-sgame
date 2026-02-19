import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CORRECT_PASSWORD = 'nossaviagem'

export default function PasswordScreen() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === CORRECT_PASSWORD) {
      navigate('/carta')
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-6">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🔐</div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Destino Alcançado!
          </h1>
          
          <p className="text-white/90 text-lg">
            Para acessar a carta, digite a senha de segurança:
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha"
              className={`w-full px-6 py-4 rounded-xl text-center text-xl font-bold tracking-widest bg-white/20 backdrop-blur border-2 ${
                error ? 'border-red-500 animate-shake' : 'border-white/30'
              } text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 transition-all`}
              autoFocus
            />
            
            {error && (
              <p className="text-red-300 text-sm font-bold">
                ❌ Senha incorreta! Tente novamente.
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Confirmar 📨
            </button>
          </form>

          <p className="text-white/60 text-xs mt-4">
            Dica: A senha é nossaviagem
          </p>
        </div>
      </div>
    </div>
  )
}
