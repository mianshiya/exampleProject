<script setup lang="ts">
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import { Modal } from './components/modal';
import CodeBlock from './components/CodeBlock.vue';

const showBasicModal = ref(false);
const showTypeModal = ref(false);
const showDraggableModal = ref(false);
const modalType = ref<'default' | 'info' | 'success' | 'warning' | 'error'>('default');

const openTypeModal = (type: 'default' | 'info' | 'success' | 'warning' | 'error') => {
  modalType.value = type;
  showTypeModal.value = true;
};

const basicModalCode = `<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from './components/modal';

const showModal = ref(false);
<\/script>

<template>
  <button @click="showModal = true">打开弹窗</button>
  
  <Modal v-model="showModal" title="基础弹窗">
    <p>这是一个基础弹窗的内容区域</p>
    
    <template #footer>
      <button @click="showModal = false">取消</button>
      <button @click="showModal = false">确定</button>
    </template>
  </Modal>
</template>`;

const teleportCode = `<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-overlay">
      <div class="modal-container">
        <!-- 弹窗内容 -->
      </div>
    </div>
  </Teleport>
</template>`;

const draggableCode = `// 拖拽相关代码
const onMousedown = (e: MouseEvent) => {
  if (!props.draggable || !headerRef.value) return;
  
  isMoving.value = true;
  startPosition.value = {
    x: e.clientX,
    y: e.clientY
  };
};

const onMousemove = (e: MouseEvent) => {
  if (!isMoving.value || !modalRef.value) return;
  
  const deltaX = e.clientX - startPosition.value.x;
  const deltaY = e.clientY - startPosition.value.y;
  
  position.value.x += deltaX;
  position.value.y += deltaY;
  
  startPosition.value = {
    x: e.clientX,
    y: e.clientY
  };
  
  modalRef.value.style.transform = \`translate(\${position.value.x}px, \${position.value.y}px)\`;
};

const onMouseup = () => {
  isMoving.value = false;
};`;

const escCloseCode = `// ESC键关闭
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.closeOnEsc && props.modelValue) {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown);
});`;
</script>

<template>
  <div class="container">
    <header>
      <h1>Vue3 弹窗组件设计与实现</h1>
      <p class="subtitle">基于组合式API (Composition API) 的实现方案</p>
    </header>

    <main>
      <section class="section">
        <h2>组件设计思路</h2>
        <div class="card">
          <h3>1. 组件结构</h3>
          <p>基础弹窗包含三个主要部分：</p>
          <ul>
            <li><strong>header</strong>：标题栏，包含标题和关闭按钮</li>
            <li><strong>body</strong>：内容区，可通过默认插槽自定义</li>
            <li><strong>footer</strong>：底部按钮区，可通过具名插槽自定义</li>
          </ul>
        </div>

        <div class="card">
          <h3>2. 功能设计</h3>
          <ul>
            <li>支持自定义内容</li>
            <li>可拖拽功能</li>
            <li>多种预设类型（默认、提示、确认、警告、错误）</li>
            <li>自定义宽高</li>
          </ul>
        </div>

        <div class="card">
          <h3>3. 实现方式</h3>
          <p>使用 <code>Teleport</code> 将弹窗渲染到 body 标签下，避免父组件 CSS 影响：</p>
          <CodeBlock :code="teleportCode" />
        </div>

        <div class="card">
          <h3>4. 状态管理</h3>
          <p>通过响应式 ref 控制弹窗显隐状态，使用 v-model 进行双向绑定</p>
        </div>

        <div class="card">
          <h3>5. 交互设计</h3>
          <p>支持多种关闭方式：</p>
          <ul>
            <li>按钮关闭</li>
            <li>点击遮罩层关闭</li>
            <li>ESC 键关闭：</li>
          </ul>
          <CodeBlock :code="escCloseCode" />
        </div>
      </section>

      <section class="section">
        <h2>演示案例</h2>
        
        <div class="demo-container">
          <div class="demo-card">
            <h3>基础弹窗</h3>
            <p>最基本的弹窗组件，包含标题、内容和底部按钮</p>
            <button class="demo-btn" @click="showBasicModal = true">打开基础弹窗</button>
            <CodeBlock :code="basicModalCode" />
          </div>

          <div class="demo-card">
            <h3>多种类型弹窗</h3>
            <p>预设了多种类型的弹窗，用于不同场景</p>
            <div class="button-group">
              <button class="demo-btn" @click="openTypeModal('info')">信息弹窗</button>
              <button class="demo-btn success" @click="openTypeModal('success')">成功弹窗</button>
              <button class="demo-btn warning" @click="openTypeModal('warning')">警告弹窗</button>
              <button class="demo-btn error" @click="openTypeModal('error')">错误弹窗</button>
            </div>
          </div>

          <div class="demo-card">
            <h3>可拖拽弹窗</h3>
            <p>支持通过拖拽标题栏来移动弹窗位置</p>
            <button class="demo-btn" @click="showDraggableModal = true">打开可拖拽弹窗</button>
            <CodeBlock :code="draggableCode" />
          </div>
        </div>
      </section>
    </main>

    <!-- 弹窗演示 -->
    <Modal v-model="showBasicModal" title="基础弹窗">
      <div class="modal-demo-content">
        <p>这是一个基础弹窗的内容区域，你可以在这里放置任何内容。</p>
        <p>点击底部的按钮或者遮罩层可以关闭弹窗。</p>
      </div>

      <template #footer>
        <button class="modal-btn modal-btn-cancel" @click="showBasicModal = false">取消</button>
        <button class="modal-btn modal-btn-confirm" @click="showBasicModal = false">确定</button>
      </template>
    </Modal>

    <Modal 
      v-model="showTypeModal" 
      :title="modalType === 'info' ? '信息提示' : 
             modalType === 'success' ? '操作成功' : 
             modalType === 'warning' ? '警告提示' : 
             modalType === 'error' ? '错误提示' : '默认弹窗'"
      :type="modalType"
    >
      <div class="modal-demo-content">
        <p v-if="modalType === 'info'">这是一个信息提示弹窗，用于展示普通信息。</p>
        <p v-if="modalType === 'success'">操作已成功完成，数据已保存。</p>
        <p v-if="modalType === 'warning'">请注意，此操作可能会导致数据变更。</p>
        <p v-if="modalType === 'error'">操作失败，请检查输入并重试。</p>
      </div>

      <template #footer>
        <button class="modal-btn modal-btn-confirm" @click="showTypeModal = false">我知道了</button>
      </template>
    </Modal>

    <Modal 
      v-model="showDraggableModal" 
      title="可拖拽弹窗" 
      draggable
    >
      <div class="modal-demo-content">
        <p><strong>拖拽说明：</strong></p>
        <p>1. 点击并按住弹窗的标题栏</p>
        <p>2. 拖动鼠标移动弹窗位置</p>
        <p>3. 松开鼠标完成移动</p>
      </div>

      <template #footer>
        <button class="modal-btn modal-btn-cancel" @click="showDraggableModal = false">关闭</button>
      </template>
    </Modal>

    <footer class="page-footer">
      <p>Vue3 弹窗组件设计演示 &copy; 2025</p>
    </footer>
  </div>
</template>

<style>
:root {
  --primary-color: #409eff;
  --success-color: #67c23a;
  --warning-color: #e6a23c;
  --error-color: #f56c6c;
  --text-color: #303133;
  --text-color-secondary: #606266;
  --border-color: #e8e8e8;
  --bg-color: #f5f7fa;
}

body {
  margin: 0;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  color: var(--text-color);
  line-height: 1.6;
  background-color: var(--bg-color);
}

#app {
  max-width: 100%;
  margin: 0;
  padding: 0;
  text-align: left;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

h1 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--text-color-secondary);
  margin-top: 0;
}

.section {
  margin-bottom: 2rem;
}

h2 {
  color: var(--text-color);
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
  display: inline-block;
}

.card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

h3 {
  color: var(--primary-color);
  margin-top: 0;
}

ul {
  padding-left: 1.5rem;
}

code {
  background-color: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: "Courier New", Courier, monospace;
}

.demo-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.demo-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.demo-btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid var(--primary-color);
  background-color: white;
  color: var(--primary-color);
  cursor: pointer;
  transition: all 0.3s;
}

.demo-btn:hover {
  background-color: var(--primary-color);
  color: white;
}

.demo-btn.success {
  border-color: var(--success-color);
  color: var(--success-color);
}

.demo-btn.success:hover {
  background-color: var(--success-color);
  color: white;
}

.demo-btn.warning {
  border-color: var(--warning-color);
  color: var(--warning-color);
}

.demo-btn.warning:hover {
  background-color: var(--warning-color);
  color: white;
}

.demo-btn.error {
  border-color: var(--error-color);
  color: var(--error-color);
}

.demo-btn.error:hover {
  background-color: var(--error-color);
  color: white;
}

.modal-demo-content {
  min-height: 100px;
}

.page-footer {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  text-align: center;
  color: var(--text-color-secondary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .demo-container {
    grid-template-columns: 1fr;
  }
}
</style>