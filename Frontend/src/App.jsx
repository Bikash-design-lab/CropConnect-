import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Profile from './components/pages/Profile'

function App() {

  return (
    <>
     <h1>This is App.jsx page</h1>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/profile' element={<Profile/>} />
     </Routes>
    </>
  )
}

export default App
