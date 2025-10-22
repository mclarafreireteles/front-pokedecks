import './App.css'

import { Routes, Route } from 'react-router-dom'

import { Marketplace } from './pages/Marketplace'
import { LandingPage } from './pages/LandingPage'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Marketplace />} />
      
      {/* Quando a URL for "/login", mostre o componente <LoginPage /> */}
      <Route path="/home" element={<LandingPage />} />
    </Routes>
  )
}

export default App
