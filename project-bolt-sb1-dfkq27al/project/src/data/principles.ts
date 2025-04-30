import { PrincipleType } from '../types';

export const principles: PrincipleType[] = [
  {
    id: 'command-line',
    number: '原理 1',
    title: '命令行交互',
    description: 'Vue CLI 使用 Commander.js 解析命令行参数，Inquirer.js 实现交互式问答，让用户选择项目配置。',
    keyPoints: [
      'Commander.js 用于解析命令行选项和参数',
      'Inquirer.js 提供交互式提示和选择菜单',
      '清晰的用户偏好收集界面',
      '支持保存和重用预设配置'
    ],
    codeTitle: '命令行实现',
    code: `// 示例：使用 Commander.js 设置 CLI 命令
import { program } from 'commander';
import inquirer from 'inquirer';

program
  .version('1.0.0')
  .description('自定义项目脚手架工具')
  .command('create <project-name>')
  .action(async (projectName) => {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: '选择项目模板：',
        choices: ['vue', 'react', 'node-express', 'custom']
      },
      {
        type: 'checkbox',
        name: 'features',
        message: '选择其他功能：',
        choices: ['typescript', 'router', 'vuex', 'eslint']
      }
    ]);
    
    console.log(\`正在创建新的 \${answers.template} 项目：\${projectName}\`);
    // 开始搭建项目
  });

program.parse(process.argv);`,
    language: 'javascript',
    codeDescription: '这个示例展示了如何使用 Commander.js 进行命令解析和 Inquirer.js 实现交互式提示。'
  },
  {
    id: 'templates',
    number: '原理 2',
    title: '模板系统',
    description: 'Vue CLI 采用基于模板的项目生成机制，通过预设的模板或远程仓库模板创建项目结构。',
    keyPoints: [
      '预定义的常用项目结构模板',
      '支持自定义和远程模板',
      '模板插值实现动态内容',
      '基于用户选择的条件文件渲染'
    ],
    codeTitle: '模板处理系统',
    code: `// 示例：模板引擎实现
import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

async function renderTemplate(templateDir, targetDir, options) {
  // 复制并处理所有模板文件
  const files = await fs.readdir(templateDir);
  
  for (const file of files) {
    const sourcePath = path.join(templateDir, file);
    const targetPath = path.join(targetDir, file);
    
    const stats = await fs.stat(sourcePath);
    
    if (stats.isDirectory()) {
      // 递归处理目录
      await fs.ensureDir(targetPath);
      await renderTemplate(sourcePath, targetPath, options);
    } else {
      // 处理文件内容
      const content = await fs.readFile(sourcePath, 'utf-8');
      
      // 仅处理 .ejs 文件
      if (file.endsWith('.ejs')) {
        const rendered = ejs.render(content, options);
        await fs.writeFile(
          targetPath.replace(/\\.ejs$/, ''), 
          rendered
        );
      } else {
        // 直接复制非模板文件
        await fs.copyFile(sourcePath, targetPath);
      }
    }
  }
}

// 使用示例
renderTemplate(
  './templates/vue-app',
  './my-project',
  { projectName: 'my-project', useTypescript: true }
);`,
    language: 'javascript',
    codeDescription: '这段代码展示了一个模板处理系统，用于读取模板文件、应用转换并输出最终的项目结构。'
  },
  {
    id: 'plugins',
    number: '原理 3',
    title: '插件架构',
    description: 'Vue CLI 基于插件系统设计，每个功能模块都是一个插件，如 babel、eslint、router 等，可以按需添加。',
    keyPoints: [
      '模块化架构，支持即插即用',
      '标准插件接口和生命周期钩子',
      '基于用户选择动态加载插件',
      '插件生成器 API 用于扩展功能'
    ],
    codeTitle: '插件系统实现',
    code: `// 示例：插件系统架构
class PluginManager {
  constructor() {
    this.plugins = new Map();
    this.hooks = {
      beforeCreate: [],
      created: [],
      beforeRender: [],
      rendered: []
    };
  }

  // 注册插件
  registerPlugin(name, plugin) {
    if (this.plugins.has(name)) {
      throw new Error(\`插件 "\${name}" 已经注册\`);
    }
    
    this.plugins.set(name, plugin);
    
    // 注册插件钩子
    Object.keys(this.hooks).forEach(hookName => {
      if (typeof plugin[hookName] === 'function') {
        this.hooks[hookName].push(plugin[hookName].bind(plugin));
      }
    });
    
    return this;
  }

  // 按顺序应用插件
  async applyHook(hookName, context) {
    for (const hook of this.hooks[hookName]) {
      await hook(context);
    }
  }

  // 运行完整插件流程
  async runPlugins(projectOptions) {
    const context = { options: projectOptions, files: new Map() };
    
    await this.applyHook('beforeCreate', context);
    // 初始化项目结构
    await this.applyHook('created', context);
    await this.applyHook('beforeRender', context);
    // 渲染模板
    await this.applyHook('rendered', context);
    
    return context;
  }
}

// 示例插件
const eslintPlugin = {
  beforeCreate(ctx) {
    console.log('配置 ESLint...');
  },
  created(ctx) {
    ctx.files.set('.eslintrc.js', \`module.exports = {
      root: true,
      extends: ['eslint:recommended'],
    }\`);
  }
};

// 使用示例
const pm = new PluginManager();
pm.registerPlugin('eslint', eslintPlugin);
pm.runPlugins({ projectName: 'my-project' });`,
    language: 'javascript',
    codeDescription: '这个示例展示了如何实现一个带有生命周期钩子的插件系统，允许插件扩展和修改脚手架过程。'
  },
  {
    id: 'webpack',
    number: '原理 4',
    title: 'Webpack 配置',
    description: 'Vue CLI 内部集成了 webpack，提供开箱即用的构建配置，同时允许用户通过 vue.config.js 进行自定义。',
    keyPoints: [
      '针对不同环境的预配置 webpack 设置',
      '基于链式的配置 API，实现精细控制',
      '抽象配置层以简化操作',
      '支持配置扩展和覆盖'
    ],
    codeTitle: 'Webpack 配置管理',
    code: `// 示例：可配置的 webpack 设置
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

class WebpackConfigBuilder {
  constructor(options = {}) {
    this.options = options;
    this.config = {
      context: process.cwd(),
      mode: options.mode || 'development',
      entry: './src/main.js',
      output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name].[contenthash].js'
      },
      module: {
        rules: []
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html'
        })
      ]
    };
  }

  // 添加不同文件类型的加载器
  addJavaScriptSupport() {
    this.config.module.rules.push({
      test: /\\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    });
    return this;
  }

  addVueSupport() {
    this.config.module.rules.push({
      test: /\\.vue$/,
      use: ['vue-loader']
    });
    this.config.plugins.push(new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }));
    return this;
  }

  addCssSupport() {
    this.config.module.rules.push({
      test: /\\.css$/,
      use: ['style-loader', 'css-loader']
    });
    return this;
  }

  // 应用用户配置
  applyUserConfig(userConfig = {}) {
    // 合并用户配置与基础配置
    this.config = merge(this.config, userConfig);
    return this;
  }

  // 构建最终的 webpack 配置
  build() {
    return this.config;
  }
}

// 使用示例
const configBuilder = new WebpackConfigBuilder({ mode: 'production' })
  .addJavaScriptSupport()
  .addVueSupport()
  .addCssSupport();

// 如果存在则应用来自 vue.config.js 的用户配置
let userConfig = {};
try {
  userConfig = require(path.resolve(process.cwd(), 'vue.config.js'));
} catch (e) {
  console.log('未找到用户配置，使用默认配置');
}

const finalConfig = configBuilder
  .applyUserConfig(userConfig.configureWebpack || {})
  .build();

module.exports = finalConfig;`,
    language: 'javascript',
    codeDescription: '这段代码展示了一个可配置的 webpack 设置，支持默认配置和用户自定义，类似于 Vue CLI 的方式。'
  },
  {
    id: 'scaffolding',
    number: '原理 5',
    title: '项目脚手架',
    description: 'Vue CLI 提供完整的开发环境和构建设置，包括热重载、代码检查、测试等功能。',
    keyPoints: [
      '一键项目设置和初始化',
      '带有热模块替换的开发服务器',
      '集成测试和代码检查功能',
      '生产环境部署的构建优化'
    ],
    codeTitle: '项目脚手架实现',
    code: `// 示例：项目脚手架编排
import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import { execSync } from 'child_process';

class ProjectScaffolder {
  constructor(options) {
    this.projectName = options.projectName;
    this.projectPath = path.resolve(process.cwd(), this.projectName);
    this.templatePath = path.resolve(__dirname, \`../templates/\${options.template}\`);
    this.features = options.features || [];
  }

  async scaffold() {
    console.log(chalk.blue(\`在 \${this.projectPath} 创建新项目\`));
    
    // 1. 创建项目目录
    await fs.ensureDir(this.projectPath);
    
    // 2. 复制基础模板
    await fs.copy(this.templatePath, this.projectPath);
    
    // 3. 处理模板文件
    await this.processTemplates();
    
    // 4. 应用选择的功能
    await this.applyFeatures();
    
    // 5. 安装依赖
    await this.installDependencies();
    
    // 6. 初始化 git 仓库
    await this.initGit();
    
    console.log(chalk.green('✨ 项目创建完成！'));
    console.log('📦 开始使用：');
    console.log(\`  cd \${this.projectName}\`);
    console.log('  npm run serve');
  }

  async processTemplates() {
    // 处理 package.json
    const pkgPath = path.join(this.projectPath, 'package.json');
    const pkg = await fs.readJson(pkgPath);
    
    pkg.name = this.projectName;
    
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }

  async applyFeatures() {
    for (const feature of this.features) {
      console.log(chalk.blue(\`添加功能：\${feature}\`));
      
      // 应用每个选择的功能
      switch (feature) {
        case 'typescript':
          await this.addTypeScript();
          break;
        case 'router':
          await this.addRouter();
          break;
        case 'vuex':
          await this.addVuex();
          break;
        case 'eslint':
          await this.addEslint();
          break;
      }
    }
  }

  async installDependencies() {
    console.log(chalk.blue('安装依赖...'));
    execSync('npm install', { cwd: this.projectPath, stdio: 'inherit' });
  }

  async initGit() {
    console.log(chalk.blue('初始化 git 仓库...'));
    execSync('git init', { cwd: this.projectPath, stdio: 'inherit' });
    execSync('git add -A', { cwd: this.projectPath, stdio: 'inherit' });
    execSync('git commit -m "初始提交"', {
      cwd: this.projectPath,
      stdio: 'inherit'
    });
  }

  // 功能实现方法
  async addTypeScript() {
    // 添加 TypeScript 支持的实现
  }

  async addRouter() {
    // 添加 Vue Router 的实现
  }

  async addVuex() {
    // 添加 Vuex 的实现
  }

  async addEslint() {
    // 添加 ESLint 的实现
  }
}

// 使用示例
new ProjectScaffolder({
  projectName: 'my-vue-app',
  template: 'vue',
  features: ['typescript', 'router']
}).scaffold();`,
    language: 'javascript',
    codeDescription: '这个示例展示了项目脚手架的整体编排，包括模板处理、功能应用和依赖安装。'
  }
];