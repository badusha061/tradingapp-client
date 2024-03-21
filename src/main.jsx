import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {  Route, RouterProvider, createBrowserRouter , createRoutesFromElements } from 'react-router-dom'
import Register from './pages/RegisterPage/Register.jsx'
import Login from './pages/LoginPage/Login.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import Stocks from './pages/Stocks/Stocks.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<HomePage />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/stocks' element={<Stocks />} />
    </Route>

  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
