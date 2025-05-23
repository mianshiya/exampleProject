import React, { useState, useEffect } from 'react';
import { useForm } from '../../context/FormContext';
import FormField from '../FormField';
import StepButtons from '../StepButtons';

const EducationInfoStep: React.FC = () => {
  const { formData, updateFormData } = useForm();
  const { degree, school, graduationYear } = formData.educationInfo;
  
  const [errors, setErrors] = useState({
    degree: '',
    school: '',
    graduationYear: '',
  });

  // 验证表单字段
  const validateField = (field: string, value: string) => {
    let error = '';
    const currentYear = new Date().getFullYear();
    
    switch (field) {
      case 'degree':
        if (!value.trim()) {
          error = '学位不能为空';
        }
        break;
      case 'school':
        if (!value.trim()) {
          error = '学校不能为空';
        }
        break;
      case 'graduationYear':
        if (!value.trim()) {
          error = '毕业年份不能为空';
        } else {
          const year = parseInt(value);
          if (isNaN(year) || year < 1950 || year > currentYear + 10) {
            error = '请输入有效的毕业年份（1950-' + (currentYear + 10) + '）';
          }
        }
        break;
    }
    
    return error;
  };

  // 处理表单字段变更
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // 更新表单数据
    updateFormData('educationInfo', { [name]: value });
    
    // 验证并更新错误信息
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // 初始验证
  useEffect(() => {
    setErrors({
      degree: validateField('degree', degree),
      school: validateField('school', school),
      graduationYear: validateField('graduationYear', graduationYear),
    });
  }, []);

  return (
    <div className="transition-all duration-300 ease-in-out">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">教育信息</h2>
      
      <div className="space-y-4">
        <FormField
          label="最高学位"
          type="text"
          id="degree"
          value={degree}
          onChange={handleChange}
          required
          error={errors.degree}
          placeholder="如：学士、硕士、博士"
        />
        
        <FormField
          label="毕业院校"
          type="text"
          id="school"
          value={school}
          onChange={handleChange}
          required
          error={errors.school}
          placeholder="请输入您的毕业院校"
        />
        
        <FormField
          label="毕业年份"
          type="number"
          id="graduationYear"
          value={graduationYear}
          onChange={handleChange}
          required
          error={errors.graduationYear}
          placeholder="请输入毕业年份，如：2020"
        />
      </div>
      
      <StepButtons stepKey="educationInfo" />
    </div>
  );
};

export default EducationInfoStep;