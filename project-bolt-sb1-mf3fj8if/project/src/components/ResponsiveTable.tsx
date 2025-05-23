import React from 'react';
import { tableData } from '../data/tableData';

const ResponsiveTable: React.FC = () => {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-l-4 border-blue-500 pl-3">
        表格演示
      </h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* 桌面端表格视图 */}
        <div className="hidden md:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <th className="py-3 px-4 text-left text-gray-700 font-semibold border-b">姓名</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold border-b">年龄</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold border-b">职业</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold border-b">所在城市</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold border-b">操作</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((person, index) => (
                <tr 
                  key={index} 
                  className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="py-3 px-4 border-b">{person.name}</td>
                  <td className="py-3 px-4 border-b">{person.age}</td>
                  <td className="py-3 px-4 border-b">{person.occupation}</td>
                  <td className="py-3 px-4 border-b">{person.city}</td>
                  <td className="py-3 px-4 border-b">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">查看</button>
                    <button className="text-gray-600 hover:text-gray-800">编辑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* 移动端卡片视图 */}
        <div className="block md:hidden">
          {tableData.map((person, index) => (
            <div key={index} className="border-b last:border-b-0 p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between pb-2 mb-2 border-b border-gray-100">
                <span className="font-medium">{person.name}</span>
                <div className="flex space-x-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800">查看</button>
                  <button className="text-sm text-gray-600 hover:text-gray-800">编辑</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="text-gray-500">年龄:</div>
                <div>{person.age}</div>
                <div className="text-gray-500">职业:</div>
                <div>{person.occupation}</div>
                <div className="text-gray-500">所在城市:</div>
                <div>{person.city}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 flex items-center bg-blue-50 p-3 rounded-md">
        <span className="block md:hidden">🔍 当前显示：<span className="font-medium">垂直列表模式</span>（移动设备视图）</span>
        <span className="hidden md:block">🔍 当前显示：<span className="font-medium">水平表格模式</span>（桌面设备视图）</span>
      </div>
    </div>
  );
};

export default ResponsiveTable;