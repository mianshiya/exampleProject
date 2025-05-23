import React from 'react';
import { useForm } from '../context/FormContext';
import StepNavigation from './StepNavigation';
import PersonalInfoStep from './steps/PersonalInfoStep';
import AddressInfoStep from './steps/AddressInfoStep';
import EducationInfoStep from './steps/EducationInfoStep';
import SummaryStep from './steps/SummaryStep';

const FormWizard: React.FC = () => {
  const { currentStep } = useForm();

  // 渲染当前步骤的组件
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep />;
      case 1:
        return <AddressInfoStep />;
      case 2:
        return <EducationInfoStep />;
      case 3:
        return <SummaryStep />;
      default:
        return <PersonalInfoStep />;
    }
  };

  return (
    <div className="bg-white p-6">
      <div className="mb-8">
        <StepNavigation />
      </div>
      <div className="transition-all duration-300 ease-in-out">
        {renderStep()}
      </div>
    </div>
  );
};

export default FormWizard;