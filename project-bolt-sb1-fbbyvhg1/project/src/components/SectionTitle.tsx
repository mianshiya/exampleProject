import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle,
  centered = false 
}) => {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{title}</h2>
      {subtitle && <p className="text-gray-600 max-w-3xl">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;