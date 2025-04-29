import React, { ReactNode } from 'react';

interface SectionContainerProps {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  title,
  description,
  children,
}) => {
  return (
    <section id={id} className="py-16 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
          <p className="text-lg text-gray-600">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
};