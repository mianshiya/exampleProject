import React from 'react';
import { Info, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

const LoginInstruction: React.FC = () => {
  return (
    <div className="h-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Info className="h-5 w-5 text-blue-500 mr-2" />
        登录界面错误提示说明
      </h3>
      
      <p className="text-gray-600 mb-6">
        本演示展示了一个带有错误提示逻辑的用户登录界面实现。您可以尝试以下操作来触发不同的错误提示：
      </p>
      
      <div className="space-y-4">
        <InstructionItem 
          icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
          title="输入为空"
          description="直接点击登录按钮或输入后删除内容，将触发'输入不能为空'的错误提示。"
        />
        
        <InstructionItem 
          icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
          title="格式不正确"
          description="输入不符合要求的用户名或密码格式，将触发格式错误提示。"
        />
        
        <InstructionItem 
          icon={<XCircle className="h-5 w-5 text-red-500" />}
          title="账号密码错误"
          description="输入任意不匹配的用户名和密码组合，将触发'用户名或密码错误'的提示。"
        />
        
        <InstructionItem 
          icon={<CheckCircle className="h-5 w-5 text-green-500" />}
          title="登录成功"
          description="使用正确的用户名(admin)和密码(password123)登录，将显示登录成功页面。"
        />
      </div>
      
      <div className="mt-8 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <h4 className="font-medium text-blue-800 mb-1">实现要点</h4>
        <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
          <li>前端表单验证与错误提示</li>
          <li>用户体验优化与视觉反馈</li>
          <li>安全的输入处理与验证流程</li>
          <li>清晰的界面状态管理</li>
        </ul>
      </div>
    </div>
  );
};

interface InstructionItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const InstructionItem: React.FC<InstructionItemProps> = ({ icon, title, description }) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0 mt-1">
        {icon}
      </div>
      <div className="ml-3">
        <h4 className="text-sm font-medium text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default LoginInstruction;