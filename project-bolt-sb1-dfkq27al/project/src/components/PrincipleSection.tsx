import React from 'react';
import CodeBlock from './CodeBlock';
import { PrincipleType } from '../types';

interface PrincipleSectionProps {
  principle: PrincipleType;
  isEven: boolean;
}

const PrincipleSection = ({ principle, isEven }: PrincipleSectionProps) => {
  return (
    <section id={principle.id} className="scroll-mt-20">
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}>
        <div className="lg:w-1/2">
          <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {principle.number}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{principle.title}</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>{principle.description}</p>
            <ul className="mt-4">
              {principle.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl">
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
              <span className="text-gray-200 font-medium">{principle.codeTitle}</span>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <CodeBlock code={principle.code} language={principle.language} />
          </div>
          <div className="mt-6 text-center px-6 py-3 bg-gray-100 rounded-lg text-gray-700">
            <span className="text-sm">{principle.codeDescription}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipleSection;