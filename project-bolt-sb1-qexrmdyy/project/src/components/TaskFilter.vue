<template>
  <div class="mb-6 p-4 bg-gray-50 rounded-lg">
    <h3 class="text-sm font-medium text-gray-700 mb-3">筛选任务</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-xs text-gray-600 mb-1">状态</label>
        <div class="flex space-x-2">
          <button
            v-for="option in statusOptions"
            :key="option.value"
            @click="updateStatus(option.value)"
            class="px-3 py-1.5 text-sm rounded-md transition-colors"
            :class="filter.status === option.value 
              ? 'bg-blue-600 text-white' 
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
      
      <div>
        <label class="block text-xs text-gray-600 mb-1">类别</label>
        <select
          v-model="selectedCategory"
          class="w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">所有类别</option>
          <option 
            v-for="category in categories" 
            :key="category.id" 
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { TaskFilter } from '../types';

const props = defineProps({
  filter: {
    type: Object as () => TaskFilter,
    required: true
  },
  categories: {
    type: Array as () => Array<{ id: string; name: string; color: string }>,
    required: true
  }
});

const emit = defineEmits(['update-filter']);

const selectedCategory = ref(props.filter.category);

const statusOptions = [
  { label: '全部', value: 'all' },
  { label: '进行中', value: 'active' },
  { label: '已完成', value: 'completed' }
];

watch(selectedCategory, (newValue) => {
  emit('update-filter', {
    ...props.filter,
    category: newValue
  });
});

function updateStatus(status: string) {
  emit('update-filter', {
    ...props.filter,
    status
  });
}
</script>