import './App.css'

import { Routes, Route } from 'react-router-dom'

import { Marketplace } from './pages/Marketplace'
import { LandingPage } from './pages/LandingPage/LandingPage'
import { Login } from './pages/SignIn/SignIn'
import { Register } from './pages/Register/Register'
import { Success } from './pages/Success/Success'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Marketplace />} />
      
      <Route path="/home" element={<LandingPage />} />
      <Route path="/home/login" element={<Login />} />
      <Route path="/home/register" element={<Register />} />
      <Route path="/home/register/success" element={<Success />} />
    </Routes>
  )
}

export default App
