export default function DynamicStylesheetDemo() {
  return (
    <div>
      <h3 className="mb-3 text-xl font-medium">动态加载样式表实现主题切换</h3>
      <p className="mb-4">除了使用 CSS 变量，还可以通过动态加载不同的样式表文件实现主题切换：</p>

      <div className="mb-4 rounded-md bg-muted p-4">
        <pre className="text-sm">
          <code>{`// 准备不同主题的样式表
// light-theme.css
body {
  background-color: #ffffff;
  color: #333333;
}

// dark-theme.css
body {
  background-color: #1a1a1a;
  color: #f5f5f5;
}`}</code>
        </pre>
      </div>

      <p className="mb-4">JavaScript 动态加载样式表：</p>
      <div className="rounded-md bg-muted p-4">
        <pre className="text-sm">
          <code>{`// 动态加载样式表
function loadTheme(themeName) {
  // 移除当前主题样式表
  const existingLink = document.getElementById('theme-stylesheet');
  if (existingLink) {
    existingLink.remove();
  }
  
  // 创建新的样式表链接
  const link = document.createElement('link');
  link.id = 'theme-stylesheet';
  link.rel = 'stylesheet';
  link.href = \`/themes/\${themeName}-theme.css\`;
  
  // 添加到文档头部
  document.head.appendChild(link);
  
  // 保存主题选择
  localStorage.setItem('theme', themeName);
}

// 切换主题
function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  loadTheme(newTheme);
}`}</code>
        </pre>
      </div>

      <div className="mt-4">
        <h4 className="mb-2 text-lg font-medium">优缺点比较</h4>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>CSS 变量方法</strong>：加载快速，切换流畅，维护方便，但在非常旧的浏览器上可能不支持。
          </li>
          <li>
            <strong>动态样式表方法</strong>：兼容性更好，但可能导致闪烁，且维护多个样式表文件较为繁琐。
          </li>
        </ul>
      </div>
    </div>
  )
}
