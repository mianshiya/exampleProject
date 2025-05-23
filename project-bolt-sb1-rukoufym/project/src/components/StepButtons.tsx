import React from 'react';
import { useForm } from '../context/FormContext';
import { ArrowLeft, ArrowRight, Save, RotateCcw } from 'lucide-react';

interface StepButtonsProps {
  stepKey: keyof ReturnType<typeof useForm>['formData'];
  showSubmit?: boolean;
}

const StepButtons: React.FC<StepButtonsProps> = ({ stepKey, showSubmit = false }) => {
  const { prevStep, nextStep, currentStep, totalSteps, isStepValid, resetForm, submitForm } = useForm();

  const isValid = isStepValid(stepKey);
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
      <div>
        {!isFirstStep && (
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            上一步
          </button>
        )}
      </div>
      
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={resetForm}
          className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          title="重置表单"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        
        {isLastStep && showSubmit ? (
          <button
            type="button"
            onClick={submitForm}
            disabled={!isValid}
            className={`flex items-center px-4 py-2 rounded-md transition-colors
              ${isValid ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            提交
            <Save className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button
            type="button"
            onClick={nextStep}
            disabled={!isValid}
            className={`flex items-center px-4 py-2 rounded-md transition-colors
              ${isValid ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            下一步
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default StepButtons;