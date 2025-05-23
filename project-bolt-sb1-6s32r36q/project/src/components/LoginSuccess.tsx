import React from 'react';
import { CheckCircle, LogOut } from 'lucide-react';

interface LoginSuccessProps {
  username: string;
  onLogout: () => void;
}

const LoginSuccess: React.FC<LoginSuccessProps> = ({ username, onLogout }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">登录成功</h2>
      <p className="text-gray-600 mb-8">
        欢迎回来，<span className="font-medium">{username}</span>！
      </p>
      <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-8 max-w-md">
        <p className="text-green-800 text-sm">
          您已成功验证身份并登录系统。在实际应用中，此时您将被重定向到应用的主界面或仪表板。
        </p>
      </div>
      <button
        onClick={onLogout}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <LogOut className="h-4 w-4 mr-2" />
        退出登录
      </button>
    </div>
  );
};

export default LoginSuccess;