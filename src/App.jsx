import React from 'react'
import { Outlet } from 'react-router-dom'

import './App.css'
import { Header } from './components/Header'

export const App = () => {
  return (
    <>
      <Header />
      <main id="screens">
        <Outlet />
      </main>
    </>
  )
}
