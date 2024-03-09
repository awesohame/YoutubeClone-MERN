import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

//pages
import Home from './pages/Home'

function App() {

  return (
    <Routes>
      {/* home */}
      <Route path="/" element={<Home />} />

      {/* settings */}
      <Route path="/settings" element={<div>Settings</div>} />


    </Routes>
  )
}

export default App
