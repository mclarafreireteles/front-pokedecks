import './App.css'

import { Routes, Route } from 'react-router-dom'

import { Marketplace } from './pages/Marketplace'
import { LandingPage } from './pages/LandingPage/LandingPage'
import { Login } from './pages/SignIn/SignIn'
import { Register } from './pages/Register/Register'
import { Success } from './pages/Success/Success'
import { Profile } from './pages/Profile/Profile'



function App() {

  return (
    <Routes>
      <Route path="/authentication" element={<LandingPage />} />
      
      <Route path="/" element={<Marketplace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/success" element={<Success />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App
