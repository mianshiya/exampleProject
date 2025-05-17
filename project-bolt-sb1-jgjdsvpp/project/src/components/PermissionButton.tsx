import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface PermissionButtonProps {
  permission: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const PermissionButton: React.FC<PermissionButtonProps> = ({
  permission,
  children,
  onClick,
  className = 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors',
}) => {
  const { hasPermission } = useAuth();
  const hasAccess = hasPermission(permission);

  if (!hasAccess) {
    return null;
  }

  return (
    <button 
      onClick={onClick} 
      className={className}
    >
      {children}
    </button>
  );
};