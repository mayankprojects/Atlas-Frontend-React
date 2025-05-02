import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import AddAtlas from './components/AddAtlas';
import UpdateAtlas from './components/UpdateAtlas';
import AtlasList from './components/AtlasList';
import Navbar from './components/Navbar';
import UserAtlasList from './components/UserAtlasList';
import EnrollClass from './components/EnrollClass';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem('userRole') || 'user'
  );

  useEffect(() => {
    // Load stored role when component mounts
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('user');
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('userRole');
  };

  const ProtectedRoute = ({ children, allowedRoles = ['admin', 'user'] }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    
    // Check if current user role is allowed to access this route
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/" />;
    }
    
    return (
      <div className="app-container">
        <Navbar onLogout={handleLogout} userRole={userRole} />
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
        
        {/* Home route - redirects based on role */}
        <Route path="/" element={
          <ProtectedRoute>
            {userRole === 'admin' ? <AtlasList /> : <UserAtlasList />}
          </ProtectedRoute>
        } />
        
        {/* Admin-only Routes */}
        <Route path="/addAtlas" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AddAtlas />
          </ProtectedRoute>
        } />
        <Route path="/editAtlas/:id" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <UpdateAtlas />
          </ProtectedRoute>
        } />
        
        {/* User-only Routes */}
        <Route path="/enrollClass/:id" element={
          <ProtectedRoute allowedRoles={['user']}>
            <EnrollClass />
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