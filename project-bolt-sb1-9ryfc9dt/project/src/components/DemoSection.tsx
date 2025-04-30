import React, { ReactNode } from 'react';

interface DemoSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const DemoSection: React.FC<DemoSectionProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      {children}
    </div>
  );
};