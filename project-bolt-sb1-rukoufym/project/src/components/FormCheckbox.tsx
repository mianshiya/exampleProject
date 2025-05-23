import React from 'react';

interface FormCheckboxProps {
  label: React.ReactNode;
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  id,
  checked,
  onChange,
  required = false,
  error,
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            required={required}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor={id} className="font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormCheckbox;