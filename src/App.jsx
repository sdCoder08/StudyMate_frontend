import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import DocumentEditorPage from './Pages/DocumentEditorPage'
import LandingPage from './Pages/LandingPage'
import LandingNavbar from './Components/Common/LandingNavbar'
import MainNav from './Components/Common/MainNav';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import TasksAndGoalsPage from './Pages/TasksAndGoalsPage';
import HomePage from './Pages/HomePage';
import DocumentsPage from './Pages/DocumentsPage';
import './App.css'

const App = () => {
  
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  
  return (
    <div >
    {isLandingPage ? <LandingNavbar /> : <MainNav />}
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/Editor" element={<DocumentEditorPage />} />
      <Route path="/user/auth" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/tasks" element={<TasksAndGoalsPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/documents" element={<DocumentsPage />} />
    </Routes>
  </div>
  )
}

export default App
