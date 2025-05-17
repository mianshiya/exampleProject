import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockContent } from '../data/mockData';
import { PermissionButton } from '../components/PermissionButton';

export const ContentManagement: React.FC = () => {
  const { hasPermission } = useAuth();
  
  const canEditContent = hasPermission('content.edit');
  const canPublishContent = hasPermission('content.publish');
  
  const handleEdit = (id: number) => {
    alert(`编辑内容 ID: ${id}（演示功能，实际未实现）`);
  };
  
  const handlePublish = (id: number) => {
    alert(`发布内容 ID: ${id}（演示功能，实际未实现）`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">内容管理</h1>
        
        {hasPermission('content.create') && (
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            onClick={() => alert('创建内容功能（演示功能，实际未实现）')}
          >
            创建内容
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockContent.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">内容预览</span>
            </div>
            
            <div className="p-4">
              <h2 className="text-lg font-medium mb-2">{item.title}</h2>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="mr-3">创建者: {item.author}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  item.status === 'published' ? 'bg-green-100 text-green-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status === 'published' ? '已发布' : '草稿'}
                </span>
              </div>
              
              <div className="flex space-x-2">
                {canEditContent && (
                  <PermissionButton 
                    permission="content.edit"
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                    onClick={() => handleEdit(item.id)}
                  >
                    编辑
                  </PermissionButton>
                )}
                
                {canPublishContent && item.status !== 'published' && (
                  <PermissionButton 
                    permission="content.publish"
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                    onClick={() => handlePublish(item.id)}
                  >
                    发布
                  </PermissionButton>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};