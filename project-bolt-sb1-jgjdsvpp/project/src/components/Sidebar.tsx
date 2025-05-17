import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { hasPermission } = useAuth();

  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-xl font-bold">权限管理演示</h2>
      </div>
      
      <nav className="mt-6">
        <ul>
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 hover:bg-gray-700 transition-colors ${
                  isActive ? 'bg-gray-700 border-l-4 border-blue-500' : ''
                }`
              }
            >
              <LayoutDashboard className="mr-3 h-5 w-5" />
              <span>仪表盘</span>
            </NavLink>
          </li>
          
          {hasPermission('users.view') && (
            <li>
              <NavLink 
                to="/users" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 hover:bg-gray-700 transition-colors ${
                    isActive ? 'bg-gray-700 border-l-4 border-blue-500' : ''
                  }`
                }
              >
                <Users className="mr-3 h-5 w-5" />
                <span>用户管理</span>
              </NavLink>
            </li>
          )}
          
          {hasPermission('content.view') && (
            <li>
              <NavLink 
                to="/content" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 hover:bg-gray-700 transition-colors ${
                    isActive ? 'bg-gray-700 border-l-4 border-blue-500' : ''
                  }`
                }
              >
                <FileText className="mr-3 h-5 w-5" />
                <span>内容管理</span>
              </NavLink>
            </li>
          )}
          
          {hasPermission('settings.view') && (
            <li>
              <NavLink 
                to="/settings" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 hover:bg-gray-700 transition-colors ${
                    isActive ? 'bg-gray-700 border-l-4 border-blue-500' : ''
                  }`
                }
              >
                <Settings className="mr-3 h-5 w-5" />
                <span>系统设置</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};