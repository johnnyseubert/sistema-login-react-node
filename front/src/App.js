import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SobrePage from './pages/SobrePage'
import RelatoriosPage from './pages/RelatoriosPage'
import { UserLoginContextProvider } from './contexts/UserLoginContext'

export default function App() {

  return (
    <UserLoginContextProvider>
      <Header />

      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/sobre' element={<SobrePage />} />
        <Route path='/relatorios' element={<RelatoriosPage />} />
      </Routes>

      <Footer />
    </UserLoginContextProvider>
  )
}
