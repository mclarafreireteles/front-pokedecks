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
import { Series } from './pages/admin/adminSeries/Series'

import { AdminRoute } from './components/AdminRoute/AdminRoute'
import { Cart } from './pages/Cart/Cart'
import { MyOrders } from './pages/MyOrders/MyOrders';



function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/success" element={<Success />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/cart" element={<Cart/>} /> 
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/admin/series" element={<Series />} />
      
      

      <Route element={<AdminRoute />}>
        <Route path='/admin/cards' element={<Cards />} />
        <Route path='/admin/sets' element={<Sets />} />
        <Route path='/admin/orders' element={<Orders />} />
      </Route>
    </Routes>
  )
}

export default App