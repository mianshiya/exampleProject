import React, { useState, useEffect } from 'react';
import { useForm } from '../../context/FormContext';
import FormField from '../FormField';
import StepButtons from '../StepButtons';

const PersonalInfoStep: React.FC = () => {
  const { formData, updateFormData } = useForm();
  const { name, email, phone } = formData.personalInfo;
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // 验证表单字段
  const validateField = (field: string, value: string) => {
    let error = '';
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          error = '姓名不能为空';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = '邮箱不能为空';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = '请输入有效的邮箱地址';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = '电话不能为空';
        } else if (!/^1[3-9]\d{9}$/.test(value)) {
          error = '请输入有效的手机号码';
        }
        break;
    }
    
    return error;
  };

  // 处理表单字段变更
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // 更新表单数据
    updateFormData('personalInfo', { [name]: value });
    
    // 验证并更新错误信息
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // 初始验证
  useEffect(() => {
    setErrors({
      name: validateField('name', name),
      email: validateField('email', email),
      phone: validateField('phone', phone),
    });
  }, []);

  return (
    <div className="transition-all duration-300 ease-in-out">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">个人信息</h2>
      
      <div className="space-y-4">
        <FormField
          label="姓名"
          type="text"
          id="name"
          value={name}
          onChange={handleChange}
          required
          error={errors.name}
          placeholder="请输入您的姓名"
        />
        
        <FormField
          label="邮箱"
          type="email"
          id="email"
          value={email}
          onChange={handleChange}
          required
          error={errors.email}
          placeholder="请输入您的邮箱"
        />
        
        <FormField
          label="手机号码"
          type="tel"
          id="phone"
          value={phone}
          onChange={handleChange}
          required
          error={errors.phone}
          placeholder="请输入您的手机号码"
        />
      </div>
      
      <StepButtons stepKey="personalInfo" />
    </div>
  );
};

export default PersonalInfoStep;