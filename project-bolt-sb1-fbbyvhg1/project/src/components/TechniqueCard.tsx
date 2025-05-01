import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TechniqueCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
}

const TechniqueCard: React.FC<TechniqueCardProps> = ({
  title,
  description,
  icon,
  to
}) => {
  return (
    <div className="card group hover:border-blue-500 hover:border transition-all duration-300">
      <div className="mb-4 text-blue-500">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link 
        to={to} 
        className="inline-flex items-center text-blue-500 font-medium group-hover:translate-x-0.5 transition-transform"
      >
        了解更多 <ArrowRightIcon className="ml-1 w-4 h-4" />
      </Link>
    </div>
  );
};

export default TechniqueCard;