import React from 'react';
import { LayoutGrid, Layers } from 'lucide-react';

interface LayoutToggleProps {
  activeLayout: 'flexbox' | 'grid';
  onChange: (layout: 'flexbox' | 'grid') => void;
}

const LayoutToggle: React.FC<LayoutToggleProps> = ({ activeLayout, onChange }) => {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
      <button
        className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          activeLayout === 'flexbox'
            ? 'bg-blue-500 text-white shadow-sm'
            : 'text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onChange('flexbox')}
      >
        <Layers className="w-4 h-4 mr-2" />
        Flexbox
      </button>
      <button
        className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          activeLayout === 'grid'
            ? 'bg-purple-500 text-white shadow-sm'
            : 'text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onChange('grid')}
      >
        <LayoutGrid className="w-4 h-4 mr-2" />
        Grid
      </button>
    </div>
  );
};

export default LayoutToggle;