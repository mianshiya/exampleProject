import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const SystemSettings: React.FC = () => {
  const { hasPermission } = useAuth();
  
  // 只有特定权限的用户才能看到某些设置选项
  const canViewSecurity = hasPermission('settings.security');
  const canManageRoles = hasPermission('settings.roles');
  const canConfigureSystem = hasPermission('settings.system');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">系统设置</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {/* 基本设置 - 所有有settings.view权限的用户都能看到 */}
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">基本设置</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  网站名称
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  defaultValue="角色权限管理系统演示"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  网站描述
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  defaultValue="基于角色的权限管理系统演示，用于教学和研究目的。"
                />
              </div>
            </div>
          </div>
          
          {/* 安全设置 - 需要settings.security权限 */}
          {canViewSecurity && (
            <div className="p-6">
              <h2 className="text-lg font-medium mb-4">安全设置</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="two-factor"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="two-factor" className="ml-2 block text-sm text-gray-700">
                    启用两因素认证
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    会话超时时间（分钟）
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue={30}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* 角色管理 - 需要settings.roles权限 */}
          {canManageRoles && (
            <div className="p-6">
              <h2 className="text-lg font-medium mb-4">角色管理</h2>
              <p className="text-sm text-gray-600 mb-4">
                在这里可以管理系统中的角色和权限。（演示系统，此功能未实现）
              </p>
              
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={() => alert('角色管理功能（演示功能，实际未实现）')}
              >
                管理角色和权限
              </button>
            </div>
          )}
          
          {/* 系统配置 - 需要settings.system权限 */}
          {canConfigureSystem && (
            <div className="p-6">
              <h2 className="text-lg font-medium mb-4">系统配置</h2>
              <p className="text-sm text-gray-600 mb-4">
                系统高级配置选项，仅管理员可见。（演示系统，此功能未实现）
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="maintenance-mode"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="maintenance-mode" className="ml-2 block text-sm text-gray-700">
                    启用维护模式
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="debug-mode"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="debug-mode" className="ml-2 block text-sm text-gray-700">
                    启用调试模式
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};