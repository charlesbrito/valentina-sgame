import { Routes, Route } from 'react-router-dom'
import IntroGame from './screens/IntroGame'
import GameScreen from './screens/GameScreen'
import PasswordScreen from './screens/PasswordScreen'
import LetterScreen from './screens/LetterScreen'

function App() {
  return (
      <Routes>
        <Route path="/" element={<IntroGame />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/senha" element={<PasswordScreen />} />
        <Route path="/carta" element={<LetterScreen />} />
      </Routes>
  )
}

export default App
