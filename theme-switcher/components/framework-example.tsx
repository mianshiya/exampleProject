"use client"

import { Tabs, TabsContent, TabsItem, TabsList } from "@/components/ui/tabs"

export default function FrameworkExample() {
  return (
    <div>
      <h3 className="mb-3 text-xl font-medium">框架中的主题实现</h3>

      <Tabs defaultValue="react">
        <TabsList className="mb-4">
          <TabsItem value="react">React</TabsItem>
          <TabsItem value="vue">Vue</TabsItem>
        </TabsList>

        <TabsContent value="react" className="space-y-4">
          <p>在 React 中，通常使用 Context API 来管理主题状态：</p>

          <div className="rounded-md bg-muted p-4">
            <pre className="text-sm">
              <code>{`// ThemeContext.js
import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  // 从 localStorage 或系统偏好获取初始主题
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      
      // 检查系统偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    // 应用主题到 HTML 元素
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};`}</code>
            </pre>
          </div>

          <p>在组件中使用：</p>

          <div className="rounded-md bg-muted p-4">
            <pre className="text-sm">
              <code>{`// App.js
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button onClick={toggleTheme}>
      切换到{theme === 'light' ? '深色' : '浅色'}主题
    </button>
  );
}

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>我的应用</h1>
        <ThemeToggle />
      </header>
      <main>
        {/* 应用内容 */}
      </main>
    </div>
  );
}`}</code>
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="vue" className="space-y-4">
          <p>在 Vue 中，可以使用 Composition API 和响应式状态管理：</p>

          <div className="rounded-md bg-muted p-4">
            <pre className="text-sm">
              <code>{`// useTheme.js
import { ref, watch, onMounted } from 'vue';

export function useTheme() {
  const theme = ref('light');
  
  // 初始化主题
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      theme.value = savedTheme;
    } else {
      // 检查系统偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme.value = prefersDark ? 'dark' : 'light';
    }
    
    applyTheme(theme.value);
  });
  
  // 监听主题变化
  watch(theme, (newTheme) => {
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
  
  // 应用主题
  const applyTheme = (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  
  // 切换主题
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };
  
  return {
    theme,
    toggleTheme
  };
}`}</code>
            </pre>
          </div>

          <p>在组件中使用：</p>

          <div className="rounded-md bg-muted p-4">
            <pre className="text-sm">
              <code>{`<!-- App.vue -->
<template>
  <div class="app">
    <header>
      <h1>我的应用</h1>
      <button @click="toggleTheme">
        切换到{{ theme === 'light' ? '深色' : '浅色' }}主题
      </button>
    </header>
    <main>
      <!-- 应用内容 -->
    </main>
  </div>
</template>

<script setup>
import { useTheme } from './useTheme';

const { theme, toggleTheme } = useTheme();
</script>`}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
