import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

export type UserRole = 'admin' | 'manager' | 'user' | 'guest';

export interface User {
  id: number;
  username: string;
  name: string;
  role: UserRole;
  permissions: string[];
}

interface AuthContextType {
  currentUser: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider内部使用');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // 从本地存储中恢复用户会话
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // 在实际应用中，这里应该是一个API调用
    // 这里我们使用模拟数据进行演示
    const user = mockUsers.find(u => u.username === username);
    
    // 简单起见，我们不校验密码，只要用户名匹配即可
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const hasPermission = (permission: string | string[]): boolean => {
    if (!currentUser) return false;
    
    if (Array.isArray(permission)) {
      return permission.some(p => currentUser.permissions.includes(p));
    }
    
    return currentUser.permissions.includes(permission);
  };

  const value = {
    currentUser,
    login,
    logout,
    hasPermission
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};