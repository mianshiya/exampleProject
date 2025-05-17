import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockUsers } from '../data/mockData';
import { PermissionButton } from '../components/PermissionButton';

export const UserManagement: React.FC = () => {
  const { hasPermission } = useAuth();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  
  const canEditUsers = hasPermission('users.edit');
  const canDeleteUsers = hasPermission('users.delete');
  
  const handleEdit = (userId: number) => {
    setSelectedUser(userId);
    alert(`编辑用户 ID: ${userId}（演示功能，实际未实现）`);
  };
  
  const handleDelete = (userId: number) => {
    alert(`删除用户 ID: ${userId}（演示功能，实际未实现）`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">用户管理</h1>
        
        {hasPermission('users.create') && (
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            onClick={() => alert('添加用户功能（演示功能，实际未实现）')}
          >
            添加用户
          </button>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  用户名
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  姓名
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  角色
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                      user.role === 'user' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role === 'admin' && '管理员'}
                      {user.role === 'manager' && '经理'}
                      {user.role === 'user' && '普通用户'}
                      {user.role === 'guest' && '访客'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {canEditUsers && (
                      <PermissionButton 
                        permission="users.edit"
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleEdit(user.id)}
                      >
                        编辑
                      </PermissionButton>
                    )}
                    
                    {canDeleteUsers && (
                      <PermissionButton 
                        permission="users.delete"
                        className="text-red-600 hover:text-red-900 ml-3"
                        onClick={() => handleDelete(user.id)}
                      >
                        删除
                      </PermissionButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};