import React, { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  icon: ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  icon,
  value,
  onChange,
  error,
  placeholder,
  autoComplete
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className={`
        relative rounded-md shadow-sm transition-all duration-200
        ${error ? 'ring-2 ring-red-500' : 'focus-within:ring-2 focus-within:ring-blue-500'}
      `}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`
            block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5
            placeholder-gray-400 focus:outline-none sm:text-sm transition-colors duration-200
            ${error 
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500' 
              : 'focus:border-blue-500 border-gray-300 text-gray-900'
            }
          `}
        />
      </div>
      {error && (
        <div className="mt-1 flex items-center text-sm text-red-600">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default InputField;