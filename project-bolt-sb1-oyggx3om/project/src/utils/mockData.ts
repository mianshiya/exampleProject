// 模拟新闻数据类型
export interface NewsData {
  id: number;
  title: string;
  content: string;
  time: string;
  category: string;
  views: number;
}

// 新闻类别
const categories = ['技术', '设计', '前端', '后端', 'UI/UX', '移动开发', '产品'];

// 生成随机时间（今天或昨天）
const getRandomTime = () => {
  const now = new Date();
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  
  now.setHours(hours);
  now.setMinutes(minutes);
  
  // 50%概率是今天，50%概率是昨天
  if (Math.random() > 0.5) {
    now.setDate(now.getDate() - 1);
    return `昨天 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  } else {
    return `今天 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
};

// 生成随机标题
const titles = [
  '移动端手势操作优化指南',
  '如何提升Web应用的用户体验',
  '前端性能优化的10个技巧',
  '响应式设计最佳实践',
  '移动端触摸事件详解',
  '现代CSS布局技术',
  'JavaScript异步编程指南',
  '移动优先设计原则',
  'Web动画实现方案对比',
  'Vue与React性能对比分析',
  '移动端下拉刷新实现原理',
  'CSS Grid布局完全指南',
  '提高移动端页面加载速度的方法',
  'TypeScript在前端项目中的应用',
  '前端状态管理方案对比'
];

// 生成随机内容
const contents = [
  '本文详细介绍了移动端常见的手势操作实现方法，包括滑动、捏合、旋转等，并提供了优化建议。',
  '用户体验是移动应用成功的关键因素，本文分享了提升Web应用用户体验的实用技巧和案例。',
  '性能优化对于移动端尤为重要，文章汇总了前端性能优化的关键点和实现方法。',
  '响应式设计使网站能够适应不同设备，本文介绍了实现响应式设计的核心技术和原则。',
  '触摸事件是移动端交互的基础，文章深入分析了各种触摸事件的特性和使用场景。',
  '现代CSS提供了强大的布局能力，本文介绍了Flexbox和Grid等布局技术的应用。',
  '异步编程是处理复杂交互的关键，文章详解了Promise、async/await等技术的使用方法。',
  '移动优先设计已成为主流，本文分享了实施移动优先策略的经验和方法。',
  '动画能够提升用户体验，文章对比了CSS动画、JS动画和SVG动画的优缺点。',
  '不同前端框架有各自优势，本文客观分析了Vue和React在性能方面的表现。',
  '下拉刷新是移动端常见交互，文章深入讲解了其实现原理和优化方向。',
  'CSS Grid提供了强大的二维布局能力，本文全面介绍了其使用方法和技巧。',
  '页面加载速度直接影响用户体验，文章提供了多种提高移动端加载速度的实用方法。',
  'TypeScript增强了代码的可维护性，文章分享了在前端项目中应用TypeScript的经验。',
  '状态管理是复杂应用的难点，文章对比了Redux、Vuex等状态管理方案的特点。'
];

// 生成模拟数据
export const generateMockData = (page: number, count: number, isRefresh = false): NewsData[] => {
  const result: NewsData[] = [];
  const startIndex = (page - 1) * count;
  
  for (let i = 0; i < count; i++) {
    const index = (startIndex + i) % titles.length;
    const randomTitle = isRefresh 
      ? `[新] ${titles[index]}` 
      : titles[index];
    
    result.push({
      id: isRefresh ? Date.now() + i : startIndex + i + 1,
      title: randomTitle,
      content: contents[index],
      time: getRandomTime(),
      category: categories[Math.floor(Math.random() * categories.length)],
      views: Math.floor(Math.random() * 1000) + 100
    });
  }
  
  return result;
};