import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import './App.css'

function App() {
  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
