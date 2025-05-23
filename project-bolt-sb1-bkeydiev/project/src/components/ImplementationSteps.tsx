import React from 'react';
import { useTranslation } from 'react-i18next';

const ImplementationSteps: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      title: t('steps.step1.title'),
      content: t('steps.step1.content'),
    },
    {
      title: t('steps.step2.title'),
      content: t('steps.step2.content'),
    },
    {
      title: t('steps.step3.title'),
      content: t('steps.step3.content'),
    },
    {
      title: t('steps.step4.title'),
      content: t('steps.step4.content'),
    },
    {
      title: t('steps.step5.title'),
      content: t('steps.step5.content'),
    },
    {
      title: t('steps.step6.title'),
      content: t('steps.step6.content'),
    },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-xl font-medium mb-4">{t('steps.title')}</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500"
          >
            <h4 className="font-medium mb-2">{step.title}</h4>
            <p className="text-gray-700">{step.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImplementationSteps;