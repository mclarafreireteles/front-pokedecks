import './App.css'

import { Routes, Route } from 'react-router-dom'
import { Marketplace } from './pages/Marketplace/Marketplace'
import { LandingPage } from './pages/LandingPage/LandingPage'
import { Login } from './pages/SignIn/SignIn'
import { Register } from './pages/Register/Register'
import { Success } from './pages/Success/Success'
import { Profile } from './pages/Profile/Profile'
import { Product } from './pages/Product/Product'
import { Orders } from './pages/admin/adminOrders/Orders'
import { Cards } from './pages/admin/adminCards/Cards'
import { Sets } from './pages/admin/adminSets/Sets'



function App() {

  return (
    <Routes>
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/" element={<Marketplace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/success" element={<Success />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path='/admin/orders' element={<Orders />}/>
      <Route path='/admin/cards' element={<Cards />}/>
      <Route path='/admin/sets' element={<Sets />}/>
    </Routes>
  )
}

export default App