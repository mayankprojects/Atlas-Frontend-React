import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import AddAtlas from './components/AddAtlas';
import UpdateAtlas from './components/UpdateAtlas';
import AtlasList from './components/AtlasList';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return (
      <div className="app-container">
        <Navbar onLogout={handleLogout} />
        {children}
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          isAuthenticated ? 
            <Navigate to="/" /> : 
            <Login onLoginSuccess={handleLogin} />
        } />
        <Route path="/register" element={
          isAuthenticated ? 
            <Navigate to="/" /> : 
            <Register />
        } />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <AtlasList />
          </ProtectedRoute>
        } />
        <Route path="/addAtlas" element={
          <ProtectedRoute>
            <AddAtlas />
          </ProtectedRoute>
        } />
        <Route path="/editAtlas/:id" element={
          <ProtectedRoute>
            <UpdateAtlas />
          </ProtectedRoute>
        } />

        {/* Catch-all route */}
        <Route path="*" element={
          isAuthenticated ? 
            <Navigate to="/" /> : 
            <Navigate to="/login" />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;