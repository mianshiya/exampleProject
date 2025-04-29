<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
        任务标题
      </label>
      <input
        id="title"
        v-model="title"
        type="text"
        required
        placeholder="需要完成什么任务？"
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      />
    </div>
    
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
        任务描述（可选）
      </label>
      <textarea
        id="description"
        v-model="description"
        rows="2"
        placeholder="添加任务详细信息..."
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      ></textarea>
    </div>
    
    <div>
      <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
        任务类别
      </label>
      <select
        id="category"
        v-model="category"
        required
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      >
        <option value="" disabled>选择类别</option>
        <option 
          v-for="cat in categories" 
          :key="cat.id" 
          :value="cat.id"
        >
          {{ cat.name }}
        </option>
      </select>
    </div>
    
    <div>
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        <span class="mr-2">添加任务</span>
        <PlusIcon class="h-5 w-5" />
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PlusIcon } from 'lucide-vue-next';

defineProps({
  categories: {
    type: Array as () => Array<{ id: string; name: string; color: string }>,
    required: true
  }
});

const emit = defineEmits(['add-task']);

const title = ref('');
const description = ref('');
const category = ref('');

function handleSubmit() {
  if (title.value.trim() === '' || category.value === '') return;
  
  emit('add-task', {
    title: title.value,
    description: description.value,
    category: category.value,
    createdAt: new Date().toISOString()
  });
  
  title.value = '';
  description.value = '';
  category.value = '';
}
</script>