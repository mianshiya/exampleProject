import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPermissions = [] 
}) => {
  const { currentUser, hasPermission } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // 用户未登录，重定向到登录页面
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredPermissions.length > 0 && !hasPermission(requiredPermissions)) {
    // 用户没有所需权限，重定向到未授权页面
    return <Navigate to="/not-authorized" replace />;
  }

  return <>{children}</>;
};