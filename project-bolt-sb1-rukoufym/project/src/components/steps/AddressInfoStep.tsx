import React, { useState, useEffect } from 'react';
import { useForm } from '../../context/FormContext';
import FormField from '../FormField';
import StepButtons from '../StepButtons';

const AddressInfoStep: React.FC = () => {
  const { formData, updateFormData } = useForm();
  const { address, city, zipCode } = formData.addressInfo;
  
  const [errors, setErrors] = useState({
    address: '',
    city: '',
    zipCode: '',
  });

  // 验证表单字段
  const validateField = (field: string, value: string) => {
    let error = '';
    
    switch (field) {
      case 'address':
        if (!value.trim()) {
          error = '地址不能为空';
        }
        break;
      case 'city':
        if (!value.trim()) {
          error = '城市不能为空';
        }
        break;
      case 'zipCode':
        if (!value.trim()) {
          error = '邮政编码不能为空';
        } else if (!/^\d{6}$/.test(value)) {
          error = '请输入有效的邮政编码（6位数字）';
        }
        break;
    }
    
    return error;
  };

  // 处理表单字段变更
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // 更新表单数据
    updateFormData('addressInfo', { [name]: value });
    
    // 验证并更新错误信息
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // 初始验证
  useEffect(() => {
    setErrors({
      address: validateField('address', address),
      city: validateField('city', city),
      zipCode: validateField('zipCode', zipCode),
    });
  }, []);

  return (
    <div className="transition-all duration-300 ease-in-out">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">地址信息</h2>
      
      <div className="space-y-4">
        <FormField
          label="详细地址"
          type="text"
          id="address"
          value={address}
          onChange={handleChange}
          required
          error={errors.address}
          placeholder="请输入您的详细地址"
        />
        
        <FormField
          label="城市"
          type="text"
          id="city"
          value={city}
          onChange={handleChange}
          required
          error={errors.city}
          placeholder="请输入您所在的城市"
        />
        
        <FormField
          label="邮政编码"
          type="text"
          id="zipCode"
          value={zipCode}
          onChange={handleChange}
          required
          error={errors.zipCode}
          placeholder="请输入6位邮政编码"
        />
      </div>
      
      <StepButtons stepKey="addressInfo" />
    </div>
  );
};

export default AddressInfoStep;