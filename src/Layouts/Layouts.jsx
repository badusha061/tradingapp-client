import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '@/components/Footer/Footer.jsx'

function Layouts({children}) {
  return (
    <>
        <Navbar />
        {children}
        <Footer />
    </>
  )
}

export default Layouts
