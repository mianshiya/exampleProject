import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { UserManagement } from './pages/UserManagement';
import { ContentManagement } from './pages/ContentManagement';
import { SystemSettings } from './pages/SystemSettings';
import { NotAuthorized } from './pages/NotAuthorized';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route element={<Layout />}>
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/users" element={
              <ProtectedRoute requiredPermissions={['users.view']}>
                <UserManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/content" element={
              <ProtectedRoute requiredPermissions={['content.view']}>
                <ContentManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute requiredPermissions={['settings.view']}>
                <SystemSettings />
              </ProtectedRoute>
            } />
            
            <Route path="/not-authorized" element={<NotAuthorized />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;