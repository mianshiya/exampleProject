import { ListItem } from '../types';

// 生成随机标题
const generateTitle = (): string => {
  const prefixes = ['项目', '任务', '需求', '功能', '模块', '组件', '服务', '接口', '文档', '测试'];
  const actions = ['开发', '设计', '测试', '部署', '维护', '重构', '优化', '实现', '分析', '评审'];
  const suffixes = ['计划', '方案', '进度', '报告', '规范', '指南', '说明', '总结', '文档', '评估'];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${prefix}${action}${suffix}`;
};

// 生成随机内容
const generateContent = (): string => {
  const contents = [
    '这是一个演示虚拟列表滚动回收的示例项目，包含详细的实现原理和代码示例。',
    '虚拟列表技术可以有效减少DOM节点数量，提高页面性能，特别适合大数据量渲染。',
    '滚动时，只有可视区域和缓冲区的内容会被渲染，其他内容会从DOM中移除以节省内存。',
    '通过计算滚动位置和容器高度，动态决定渲染哪些项目，实现高效的内容展示和回收。',
    '前端优化的核心在于减少不必要的计算和渲染，虚拟列表是长列表渲染的最佳实践之一。',
    '该技术广泛应用于各类需要展示大量数据的场景，如社交媒体Feed流、商品列表等。',
    '实现虚拟列表需要精确计算每个元素的位置和尺寸，以确保滚动体验的流畅性。',
    '缓冲区的设计可以提前加载即将进入视口的内容，减少用户感知到的加载延迟。',
    '响应式虚拟列表需要考虑不同设备和屏幕尺寸下的渲染策略和优化方案。',
    '通过本演示，你可以直观了解虚拟列表的工作原理和性能优势。'
  ];
  
  return contents[Math.floor(Math.random() * contents.length)];
};

// 生成测试数据
export const generateItems = (count: number): ListItem[] => {
  return Array(count)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      title: generateTitle(),
      content: generateContent()
    }));
};