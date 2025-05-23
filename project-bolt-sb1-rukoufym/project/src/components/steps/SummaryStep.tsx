import React, { useState } from 'react';
import { useForm } from '../../context/FormContext';
import StepButtons from '../StepButtons';
import FormCheckbox from '../FormCheckbox';
import { Check, Edit } from 'lucide-react';

const SummaryStep: React.FC = () => {
  const { formData, updateFormData, goToStep } = useForm();
  const { personalInfo, addressInfo, educationInfo, summary } = formData;
  
  const [error, setError] = useState('');

  // 处理复选框变更
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    updateFormData('summary', { agreeToTerms: checked });
    
    if (!checked) {
      setError('您必须同意条款才能提交');
    } else {
      setError('');
    }
  };

  // 编辑特定步骤
  const handleEdit = (step: number) => {
    goToStep(step);
  };

  return (
    <div className="transition-all duration-300 ease-in-out">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">信息总结</h2>
      
      <div className="space-y-6">
        {/* 个人信息摘要 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-700">个人信息</h3>
            <button 
              onClick={() => handleEdit(0)}
              className="text-blue-500 hover:text-blue-700 flex items-center text-sm"
            >
              <Edit className="w-4 h-4 mr-1" />
              编辑
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex">
              <span className="text-gray-500 w-20">姓名:</span>
              <span className="font-medium">{personalInfo.name}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-20">邮箱:</span>
              <span className="font-medium">{personalInfo.email}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-20">电话:</span>
              <span className="font-medium">{personalInfo.phone}</span>
            </div>
          </div>
        </div>
        
        {/* 地址信息摘要 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-700">地址信息</h3>
            <button 
              onClick={() => handleEdit(1)}
              className="text-blue-500 hover:text-blue-700 flex items-center text-sm"
            >
              <Edit className="w-4 h-4 mr-1" />
              编辑
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex">
              <span className="text-gray-500 w-20">地址:</span>
              <span className="font-medium">{addressInfo.address}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-20">城市:</span>
              <span className="font-medium">{addressInfo.city}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-20">邮编:</span>
              <span className="font-medium">{addressInfo.zipCode}</span>
            </div>
          </div>
        </div>
        
        {/* 教育信息摘要 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-700">教育信息</h3>
            <button 
              onClick={() => handleEdit(2)}
              className="text-blue-500 hover:text-blue-700 flex items-center text-sm"
            >
              <Edit className="w-4 h-4 mr-1" />
              编辑
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex">
              <span className="text-gray-500 w-20">学位:</span>
              <span className="font-medium">{educationInfo.degree}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-20">学校:</span>
              <span className="font-medium">{educationInfo.school}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-20">毕业年份:</span>
              <span className="font-medium">{educationInfo.graduationYear}</span>
            </div>
          </div>
        </div>
        
        {/* 条款同意 */}
        <div className="mt-6">
          <FormCheckbox
            id="agreeToTerms"
            checked={summary.agreeToTerms}
            onChange={handleCheckboxChange}
            required
            error={error}
            label={
              <span>
                我已阅读并同意<a href="#" className="text-blue-500 hover:underline">服务条款</a>和
                <a href="#" className="text-blue-500 hover:underline">隐私政策</a>
              </span>
            }
          />
        </div>
      </div>
      
      <StepButtons stepKey="summary" showSubmit />
    </div>
  );
};

export default SummaryStep;