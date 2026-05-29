import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { registerSW }
from 'virtual:pwa-register'

registerSW({
  immediate: true
})

import './index.css'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Interview from './pages/Interview'
import Results from './pages/Results'
import ProtectedRoute from './components/ProtectedRoute'
import ResumeUpload from './pages/ResumeUpload'
import History from './pages/History'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Analytics from './pages/Analytics'
import CodingInterview from './pages/CodingInterview'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
      <Route path="/interview" element={<Interview />} />
      <Route path="/results" element={<Results />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/resume" element={ <ProtectedRoute> <ResumeUpload /> </ProtectedRoute> } />
      <Route path="/history" element={ <ProtectedRoute> <History /> </ProtectedRoute> } />
      <Route path="/profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute> } />
      <Route path="/analytics" element={ <ProtectedRoute> <Analytics /> </ProtectedRoute> } />
      <Route path="/coding" element={ <ProtectedRoute> <CodingInterview /> </ProtectedRoute>} />
    </Routes>
  </BrowserRouter>
) 