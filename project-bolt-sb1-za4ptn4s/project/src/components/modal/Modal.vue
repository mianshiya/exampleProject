<script setup lang="ts">
import { ref, onMounted, onUnmounted, useSlots, computed } from 'vue';

interface ModalProps {
  modelValue: boolean;
  title?: string;
  width?: string;
  height?: string;
  type?: 'default' | 'info' | 'success' | 'warning' | 'error';
  closeOnClickOverlay?: boolean;
  draggable?: boolean;
  showClose?: boolean;
  closeOnEsc?: boolean;
}

const props = withDefaults(defineProps<ModalProps>(), {
  modelValue: false,
  title: '标题',
  width: '50%',
  height: 'auto',
  type: 'default',
  closeOnClickOverlay: true,
  draggable: false,
  showClose: true,
  closeOnEsc: true
});

const emit = defineEmits(['update:modelValue', 'close', 'confirm']);

const modalRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const isMoving = ref(false);
const position = ref({ x: 0, y: 0 });
const startPosition = ref({ x: 0, y: 0 });

const slots = useSlots();

const iconClass = computed(() => {
  switch (props.type) {
    case 'info': return 'modal-icon-info';
    case 'success': return 'modal-icon-success';
    case 'warning': return 'modal-icon-warning';
    case 'error': return 'modal-icon-error';
    default: return '';
  }
});

const closeModal = () => {
  emit('update:modelValue', false);
  emit('close');
};

const confirmModal = () => {
  emit('update:modelValue', false);
  emit('confirm');
};

const onOverlayClick = (e: MouseEvent) => {
  // 只有当点击的是遮罩层本身时才关闭
  if (e.target === e.currentTarget && props.closeOnClickOverlay) {
    closeModal();
  }
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.closeOnEsc && props.modelValue) {
    closeModal();
  }
};

// 拖拽相关
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
  
  modalRef.value.style.transform = `translate(${position.value.x}px, ${position.value.y}px)`;
};

const onMouseup = () => {
  isMoving.value = false;
};

onMounted(() => {
  document.addEventListener('mousemove', onMousemove);
  document.addEventListener('mouseup', onMouseup);
  document.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', onMousemove);
  document.removeEventListener('mouseup', onMouseup);
  document.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-overlay" @click="onOverlayClick">
      <div 
        ref="modalRef" 
        class="modal-container" 
        :class="[`modal-${type}`]" 
        :style="{ width, height }"
      >
        <div 
          ref="headerRef" 
          class="modal-header"
          :class="{ 'draggable': draggable }" 
          @mousedown="onMousedown"
        >
          <div class="modal-title">
            <span v-if="iconClass" class="modal-icon" :class="iconClass"></span>
            {{ title }}
          </div>
          <button v-if="showClose" class="modal-close" @click="closeModal">×</button>
        </div>
        
        <div class="modal-body">
          <slot></slot>
        </div>
        
        <div class="modal-footer" v-if="slots.footer">
          <slot name="footer">
            <button class="modal-btn modal-btn-cancel" @click="closeModal">取消</button>
            <button class="modal-btn modal-btn-confirm" @click="confirmModal">确定</button>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  max-width: 90vw;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e8e8e8;
}

.modal-header.draggable {
  cursor: move;
}

.modal-title {
  font-weight: 600;
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center;
}

.modal-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.modal-icon-info::before {
  content: 'ℹ️';
}

.modal-icon-success::before {
  content: '✅';
}

.modal-icon-warning::before {
  content: '⚠️';
}

.modal-icon-error::before {
  content: '❌';
}

.modal-close {
  background: transparent;
  border: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  transition: color 0.3s;
}

.modal-close:hover {
  color: #333;
}

.modal-body {
  padding: 16px;
  overflow-y: auto;
  flex: 1;
  color: #333;
}

.modal-footer {
  padding: 16px;
  border-top: 1px solid #e8e8e8;
  display: flex;
  justify-content: flex-end;
}

.modal-btn {
  padding: 8px 16px;
  margin-left: 8px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-btn-cancel {
  color: #606266;
}

.modal-btn-cancel:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.modal-btn-confirm {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}

.modal-btn-confirm:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

/* 预设类型样式 */
.modal-info .modal-header {
  background-color: #f0f9ff;
  color: #0077cc;
}

.modal-success .modal-header {
  background-color: #f0fff0;
  color: #4caf50;
}

.modal-warning .modal-header {
  background-color: #fffbe6;
  color: #e6a23c;
}

.modal-error .modal-header {
  background-color: #fff0f0;
  color: #f56c6c;
}
</style>