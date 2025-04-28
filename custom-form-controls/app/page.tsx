import { CodeBlock } from "@/components/code-block"
import { DemoSection } from "@/components/demo-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">如何通过 CSS 实现美观的自定义复选框和单选按钮</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            本演示网站展示了如何使用 CSS 创建自定义样式的复选框和单选按钮，同时保持良好的可访问性和用户体验。
          </p>
        </header>

        <section className="mb-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">核心步骤</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-md shadow-sm">
              <h3 className="text-xl font-medium mb-2 text-gray-800">1. 隐藏原生控件</h3>
              <p className="text-gray-600">使用 opacity: 0 或 appearance: none 隐藏原生控件，但保留其功能性。</p>
            </div>
            <div className="bg-white p-5 rounded-md shadow-sm">
              <h3 className="text-xl font-medium mb-2 text-gray-800">2. 创建自定义样式</h3>
              <p className="text-gray-600">
                利用 label 元素和伪元素（::before、::after）创建视觉替代物，并通过 CSS 选择器控制状态变化。
              </p>
            </div>
            <div className="bg-white p-5 rounded-md shadow-sm">
              <h3 className="text-xl font-medium mb-2 text-gray-800">3. 添加交互反馈</h3>
              <p className="text-gray-600">实现悬停、聚焦和点击等状态的视觉反馈，提升用户体验。</p>
            </div>
            <div className="bg-white p-5 rounded-md shadow-sm">
              <h3 className="text-xl font-medium mb-2 text-gray-800">4. 确保可访问性</h3>
              <p className="text-gray-600">保持键盘导航和屏幕阅读器兼容性，确保所有用户都能使用。</p>
            </div>
          </div>
        </section>

        <DemoSection />

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">实现代码</h2>

          <div className="mb-8">
            <h3 className="text-xl font-medium mb-3 text-gray-800">HTML 结构</h3>
            <CodeBlock
              code={`<div class="custom-checkbox">
  <input type="checkbox" id="checkbox1" />
  <label for="checkbox1">自定义复选框</label>
</div>

<div class="custom-radio">
  <input type="radio" id="radio1" name="radio-group" />
  <label for="radio1">自定义单选按钮</label>
</div>`}
              language="html"
            />
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-medium mb-3 text-gray-800">CSS 样式 - 复选框</h3>
            <CodeBlock
              code={`.custom-checkbox {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.custom-checkbox input[type="checkbox"] {
  /* 隐藏原生控件但保持可访问性 */
  opacity: 0;
  position: absolute;
  width: 24px;
  height: 24px;
  z-index: 1;
  cursor: pointer;
}

.custom-checkbox label {
  padding-left: 35px;
  cursor: pointer;
  position: relative;
}

.custom-checkbox label::before {
  /* 创建自定义复选框外观 */
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  border: 2px solid #3b82f6;
  border-radius: 4px;
  background-color: white;
  transition: all 0.2s ease;
}

.custom-checkbox input[type="checkbox"]:checked + label::before {
  background-color: #3b82f6;
}

.custom-checkbox input[type="checkbox"]:checked + label::after {
  /* 创建勾选标记 */
  content: '';
  position: absolute;
  left: 8px;
  top: 4px;
  width: 8px;
  height: 14px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

/* 交互状态 */
.custom-checkbox input[type="checkbox"]:focus + label::before {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.custom-checkbox input[type="checkbox"]:hover + label::before {
  border-color: #2563eb;
}`}
              language="css"
            />
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3 text-gray-800">CSS 样式 - 单选按钮</h3>
            <CodeBlock
              code={`.custom-radio {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.custom-radio input[type="radio"] {
  /* 隐藏原生控件但保持可访问性 */
  opacity: 0;
  position: absolute;
  width: 24px;
  height: 24px;
  z-index: 1;
  cursor: pointer;
}

.custom-radio label {
  padding-left: 35px;
  cursor: pointer;
  position: relative;
}

.custom-radio label::before {
  /* 创建自定义单选按钮外观 */
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  border: 2px solid #3b82f6;
  border-radius: 50%;
  background-color: white;
  transition: all 0.2s ease;
}

.custom-radio input[type="radio"]:checked + label::after {
  /* 创建选中标记 */
  content: '';
  position: absolute;
  left: 6px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #3b82f6;
}

/* 交互状态 */
.custom-radio input[type="radio"]:focus + label::before {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.custom-radio input[type="radio"]:hover + label::before {
  border-color: #2563eb;
}`}
              language="css"
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">可访问性注意事项</h2>
          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
            <h3 className="text-xl font-medium mb-2 text-gray-800">确保可访问性的关键点</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>保持原生控件可聚焦，确保键盘用户可以使用 Tab 键导航</li>
              <li>使用适当的标签和 ARIA 属性，帮助屏幕阅读器识别控件</li>
              <li>确保颜色对比度符合 WCAG 标准，方便视力障碍用户</li>
              <li>提供足够大的点击区域，方便触摸屏用户和运动障碍用户</li>
              <li>添加焦点状态的视觉反馈，帮助用户了解当前聚焦的元素</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">浏览器兼容性</h2>
          <p className="mb-4 text-gray-600">这些技术在所有现代浏览器中都能良好工作，包括：</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-md shadow-sm text-center">
              <p className="font-medium">Chrome</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm text-center">
              <p className="font-medium">Firefox</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm text-center">
              <p className="font-medium">Safari</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm text-center">
              <p className="font-medium">Edge</p>
            </div>
          </div>
          <p className="mt-4 text-gray-600">对于旧版浏览器，可能需要添加额外的前缀或回退样式。</p>
        </section>
      </div>
    </main>
  )
}
