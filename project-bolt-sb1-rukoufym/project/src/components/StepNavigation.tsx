import React from 'react';
import { useForm } from '../context/FormContext';
import { CheckCircle, Circle } from 'lucide-react';

const StepNavigation: React.FC = () => {
  const { currentStep, totalSteps, goToStep, formData, isStepValid } = useForm();

  // 步骤标题
  const stepTitles = ['个人信息', '地址信息', '教育信息', '总结提交'];
  
  // 步骤对应的表单数据键
  const stepKeys: Array<keyof typeof formData> = ['personalInfo', 'addressInfo', 'educationInfo', 'summary'];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            {/* 步骤指示器 */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => goToStep(index)}
                disabled={index > currentStep && !isStepValid(stepKeys[currentStep])}
                className={`relative flex items-center justify-center rounded-full w-10 h-10 text-white transition-all duration-200
                  ${
                    index < currentStep
                      ? 'bg-green-500 hover:bg-green-600'
                      : index === currentStep
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-gray-300 cursor-not-allowed'
                  }
                `}
                aria-label={`前往步骤 ${index + 1}: ${stepTitles[index]}`}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="font-medium">{index + 1}</span>
                )}
              </button>
              <span className={`mt-2 text-sm font-medium 
                ${index === currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                {stepTitles[index]}
              </span>
            </div>
            
            {/* 连接线 */}
            {index < totalSteps - 1 && (
              <div 
                className={`flex-1 h-1 mx-2 rounded ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepNavigation;