import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';
import AgentDashboard from './components/AgentDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import './App.css'

function App() {
  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
        />
        <Route 
            path="/agent-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['agent']}>
                <AgentDashboard />
              </ProtectedRoute>
            } 
        />
        <Route 
            path="/customer-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <CustomerDashboard />
              </ProtectedRoute>
            } 
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
