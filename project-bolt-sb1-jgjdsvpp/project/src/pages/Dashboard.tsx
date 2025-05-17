import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockPermissionsList } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">系统仪表盘</h1>
      
      <div className="mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">您的账户信息</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-gray-600">用户名</div>
              <div className="font-medium">{currentUser.username}</div>
            </div>
            <div>
              <div className="text-gray-600">姓名</div>
              <div className="font-medium">{currentUser.name}</div>
            </div>
            <div>
              <div className="text-gray-600">角色</div>
              <div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  currentUser.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                  currentUser.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                  currentUser.role === 'user' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {currentUser.role === 'admin' && '管理员'}
                  {currentUser.role === 'manager' && '经理'}
                  {currentUser.role === 'user' && '普通用户'}
                  {currentUser.role === 'guest' && '访客'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">您的权限</h2>
          <p className="text-gray-600 mt-1">
            基于您的角色，您有以下权限：
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPermissionsList.map((permissionGroup) => (
              <div key={permissionGroup.group} className="border border-gray-200 rounded-lg">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-medium">
                  {permissionGroup.groupName}
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {permissionGroup.permissions.map((permission) => {
                      const hasPermission = currentUser.permissions.includes(permission.key);
                      
                      return (
                        <li key={permission.key} className="flex items-center">
                          <span className={`w-3 h-3 rounded-full mr-2 ${
                            hasPermission ? 'bg-green-500' : 'bg-red-500'
                          }`}></span>
                          <span className={hasPermission ? 'text-gray-800' : 'text-gray-400'}>
                            {permission.name}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};