import React, { createContext, useContext, useReducer, useEffect } from 'react';

// 定义表单数据的类型
export interface FormData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
  };
  addressInfo: {
    address: string;
    city: string;
    zipCode: string;
  };
  educationInfo: {
    degree: string;
    school: string;
    graduationYear: string;
  };
  summary: {
    agreeToTerms: boolean;
  };
}

// 定义初始表单数据
const initialFormData: FormData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
  },
  addressInfo: {
    address: '',
    city: '',
    zipCode: '',
  },
  educationInfo: {
    degree: '',
    school: '',
    graduationYear: '',
  },
  summary: {
    agreeToTerms: false,
  },
};

// 表单上下文的类型
interface FormContextType {
  formData: FormData;
  currentStep: number;
  totalSteps: number;
  updateFormData: (stepName: keyof FormData, data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isStepValid: (stepName: keyof FormData) => boolean;
  resetForm: () => void;
  submitForm: () => void;
}

// 定义 Action 类型
type FormAction =
  | { type: 'UPDATE_FORM_DATA'; stepName: keyof FormData; data: any }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'RESET_FORM' }
  | { type: 'INIT_FORM'; data: FormData };

// 创建上下文
const FormContext = createContext<FormContextType | undefined>(undefined);

// 表单状态的 reducer
const formReducer = (state: { formData: FormData; currentStep: number; totalSteps: number }, action: FormAction) => {
  switch (action.type) {
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.stepName]: {
            ...state.formData[action.stepName],
            ...action.data,
          },
        },
      };
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1),
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      };
    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: Math.max(0, Math.min(action.step, state.totalSteps - 1)),
      };
    case 'RESET_FORM':
      return {
        ...state,
        formData: initialFormData,
        currentStep: 0,
      };
    case 'INIT_FORM':
      return {
        ...state,
        formData: action.data,
      };
    default:
      return state;
  }
};

// 表单上下文提供者组件
export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, {
    formData: initialFormData,
    currentStep: 0,
    totalSteps: 4, // 总步骤数
  });

  // 从本地存储加载表单数据
  useEffect(() => {
    const savedForm = localStorage.getItem('formWizardData');
    if (savedForm) {
      try {
        const parsedForm = JSON.parse(savedForm);
        dispatch({ type: 'INIT_FORM', data: parsedForm });
      } catch (error) {
        console.error('加载保存的表单数据时出错:', error);
      }
    }
  }, []);

  // 将表单数据保存到本地存储
  useEffect(() => {
    localStorage.setItem('formWizardData', JSON.stringify(state.formData));
  }, [state.formData]);

  // 验证步骤是否有效
  const isStepValid = (stepName: keyof FormData): boolean => {
    const stepData = state.formData[stepName];
    
    switch (stepName) {
      case 'personalInfo':
        return !!(
          stepData.name.trim() && 
          stepData.email.trim() && 
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stepData.email) && 
          stepData.phone.trim()
        );
      case 'addressInfo':
        return !!(
          stepData.address.trim() && 
          stepData.city.trim() && 
          stepData.zipCode.trim()
        );
      case 'educationInfo':
        return !!(
          stepData.degree.trim() && 
          stepData.school.trim() && 
          stepData.graduationYear.trim()
        );
      case 'summary':
        return stepData.agreeToTerms;
      default:
        return false;
    }
  };

  // 提交表单
  const submitForm = () => {
    console.log('表单提交成功:', state.formData);
    alert('表单提交成功！');
    dispatch({ type: 'RESET_FORM' });
  };

  // 提供上下文值
  const contextValue: FormContextType = {
    formData: state.formData,
    currentStep: state.currentStep,
    totalSteps: state.totalSteps,
    updateFormData: (stepName, data) => dispatch({ type: 'UPDATE_FORM_DATA', stepName, data }),
    nextStep: () => dispatch({ type: 'NEXT_STEP' }),
    prevStep: () => dispatch({ type: 'PREV_STEP' }),
    goToStep: (step) => dispatch({ type: 'GO_TO_STEP', step }),
    isStepValid,
    resetForm: () => dispatch({ type: 'RESET_FORM' }),
    submitForm,
  };

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
};

// 自定义钩子，用于访问表单上下文
export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm 必须在 FormProvider 内部使用');
  }
  return context;
};