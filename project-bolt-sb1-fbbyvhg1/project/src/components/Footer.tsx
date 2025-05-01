import React from 'react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">© 2025 图片优化教学演示. 版权所有.</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
              <GithubIcon className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
              <TwitterIcon className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;