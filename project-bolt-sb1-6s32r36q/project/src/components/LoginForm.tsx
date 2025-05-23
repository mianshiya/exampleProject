import React, { useState } from 'react';
import { Lock, User, AlertCircle } from 'lucide-react';
import { validateUsername, validatePassword } from '../utils/validators';
import InputField from './InputField';

interface LoginFormProps {
  onLoginSuccess: (username: string) => void;
}

// 模拟的用户数据，实际项目中应从后端获取
const DEMO_USER = {
  username: 'admin',
  password: 'password123'
};

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    form: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 清除之前的错误
    setErrors({ username: '', password: '', form: '' });
    
    // 收集表单错误
    const formErrors = {
      username: validateUsername(username),
      password: validatePassword(password),
      form: ''
    };
    
    // 如果有字段错误，则显示错误信息并阻止提交
    if (formErrors.username || formErrors.password) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 检查用户名和密码是否匹配（演示用）
      if (username === DEMO_USER.username && password === DEMO_USER.password) {
        onLoginSuccess(username);
      } else {
        setErrors({
          ...formErrors,
          form: '用户名或密码错误，请重试'
        });
      }
    } catch (error) {
      setErrors({
        ...formErrors,
        form: '登录过程中发生错误，请稍后再试'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">用户登录</h2>
      <p className="text-gray-600 mb-6">请输入您的账号和密码</p>
      
      {errors.form && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-sm text-red-600">{errors.form}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
        <InputField 
          id="username"
          label="用户名"
          type="text"
          icon={<User className="h-5 w-5 text-gray-400" />}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={errors.username}
          placeholder="请输入用户名"
          autoComplete="username"
        />
        
        <InputField 
          id="password"
          label="密码"
          type="password"
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          placeholder="请输入密码"
          autoComplete="current-password"
        />
        
        <div className="text-sm text-gray-500 mb-6 mt-2">
          <p>演示用户: admin</p>
          <p>演示密码: password123</p>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full py-3 px-4 rounded-md font-medium text-white transition-all duration-300
            ${isSubmitting 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            }
          `}
        >
          {isSubmitting ? '登录中...' : '登录'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;