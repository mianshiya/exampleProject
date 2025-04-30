import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Vue CLI 原理探索</h3>
            <p className="text-gray-400">
              学习 CLI 工具实现原理的教育资源，帮助你构建自己的项目脚手架工具。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">相关资源</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a 
                  href="https://cli.vuejs.org/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Vue CLI 文档
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/vuejs/vue-cli" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Vue CLI GitHub 仓库
                </a>
              </li>
              <li>
                <a 
                  href="https://vuejs.org/guide/scaling-up/tooling.html" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Vue.js 工具指南
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">关注我们</h3>
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://github.com/vuejs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://twitter.com/vuejs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="https://www.linkedin.com/company/vuejs/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
            <p className="text-gray-400">关注最新的 Vue 生态系统动态</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Vue CLI 原理探索. 仅用于教育目的。</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;