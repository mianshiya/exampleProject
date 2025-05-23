import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const { currentUser } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">角色权限管理系统演示</h1>
      
      <div className="flex items-center space-x-4">
        {currentUser && (
          <div className="flex items-center">
            <div className="mr-2">
              <span className="text-sm text-gray-600">欢迎，</span>
              <span className="font-medium text-gray-800">{currentUser.name}</span>
            </div>
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 font-medium">
              {currentUser.role === 'admin' && '管理员'}
              {currentUser.role === 'manager' && '经理'}
              {currentUser.role === 'user' && '普通用户'}
              {currentUser.role === 'guest' && '访客'}
            </span>
          </div>
        )}
        
        <button
          onClick={onLogout}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          退出登录
        </button>
      </div>
    </header>
  );
};