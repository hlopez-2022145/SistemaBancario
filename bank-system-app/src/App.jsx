import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import { Outlet } from 'react-router-dom'
import './components/CSS/Style.css'
import { Footer } from './components/Footer/Footer.jsx'
import { Navbar } from './components/NavBar/Navbar.jsx'

export const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
