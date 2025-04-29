<template>
  <div class="mt-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">您的任务</h2>
    
    <div v-if="tasks.length === 0" class="text-center py-8">
      <ClipboardIcon class="h-12 w-12 mx-auto text-gray-400 mb-2" />
      <p class="text-gray-500">暂无任务。添加一些任务开始使用吧！</p>
    </div>
    
    <transition-group 
      name="task-list" 
      tag="ul" 
      class="space-y-3"
    >
      <TaskItem 
        v-for="task in tasks" 
        :key="task.id" 
        :task="task" 
        @toggle-task="$emit('toggle-task', task.id)"
        @delete-task="$emit('delete-task', task.id)"
        @edit-task="$emit('edit-task', $event)"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ClipboardIcon } from 'lucide-vue-next';
import TaskItem from './TaskItem.vue';
import type { Task } from '../types';

defineProps({
  tasks: {
    type: Array as () => Task[],
    required: true
  }
});

defineEmits(['toggle-task', 'delete-task', 'edit-task']);
</script>

<style scoped>
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.3s ease;
}

.task-list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.task-list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>