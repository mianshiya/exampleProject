<template>
  <li 
    class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    :class="{ 'border-l-4 border-l-green-500': task.completed }"
  >
    <div v-if="!isEditing" class="p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0 pt-0.5">
          <button 
            @click="$emit('toggle-task', task.id)"
            class="h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors"
            :class="task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'"
          >
            <CheckIcon v-if="task.completed" class="h-3 w-3 text-white" />
          </button>
        </div>
        
        <div class="ml-3 flex-1">
          <div class="flex items-center justify-between">
            <h3 
              class="text-base font-medium transition-all duration-200"
              :class="task.completed ? 'text-gray-500 line-through' : 'text-gray-800'"
            >
              {{ task.title }}
            </h3>
            
            <div class="ml-2 flex-shrink-0">
              <span 
                class="inline-block px-2 py-0.5 text-xs font-medium rounded-full text-white"
                :class="getCategoryColor(task.category)"
              >
                {{ getCategoryName(task.category) }}
              </span>
            </div>
          </div>
          
          <p 
            v-if="task.description" 
            class="mt-1 text-sm text-gray-600"
            :class="{ 'text-gray-400': task.completed }"
          >
            {{ task.description }}
          </p>
          
          <div class="mt-2 flex items-center text-xs text-gray-500">
            <CalendarIcon class="h-3 w-3 mr-1" />
            <span>{{ formatDate(task.createdAt) }}</span>
          </div>
        </div>
      </div>
      
      <div class="mt-3 pt-2 border-t border-gray-100 flex justify-end space-x-2">
        <button 
          @click="startEditing"
          class="p-1.5 text-gray-500 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          title="编辑"
        >
          <PencilIcon class="h-4 w-4" />
        </button>
        
        <button 
          @click="$emit('delete-task', task.id)"
          class="p-1.5 text-gray-500 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
          title="删除"
        >
          <TrashIcon class="h-4 w-4" />
        </button>
      </div>
    </div>
    
    <div v-else class="p-4">
      <form @submit.prevent="saveEdit" class="space-y-3">
        <div>
          <input
            v-model="editedTitle"
            type="text"
            required
            class="w-full px-3 py-1.5 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="任务标题"
          />
        </div>
        
        <div>
          <textarea
            v-model="editedDescription"
            rows="2"
            class="w-full px-3 py-1.5 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="任务描述"
          ></textarea>
        </div>
        
        <div>
          <select
            v-model="editedCategory"
            required
            class="w-full px-3 py-1.5 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option 
              v-for="cat in categories" 
              :key="cat.id" 
              :value="cat.id"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>
        
        <div class="flex justify-end space-x-2">
          <button
            type="button"
            @click="cancelEditing"
            class="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded"
          >
            取消
          </button>
          
          <button
            type="submit"
            class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CheckIcon, PencilIcon, TrashIcon, CalendarIcon } from 'lucide-vue-next';
import type { Task } from '../types';

const props = defineProps({
  task: {
    type: Object as () => Task,
    required: true
  }
});

const emit = defineEmits(['toggle-task', 'delete-task', 'edit-task']);

const categories = ref([
  { id: 'work', name: '工作', color: 'bg-blue-500' },
  { id: 'personal', name: '个人', color: 'bg-green-500' },
  { id: 'shopping', name: '购物', color: 'bg-purple-500' },
  { id: 'health', name: '健康', color: 'bg-red-500' }
]);

const isEditing = ref(false);
const editedTitle = ref(props.task.title);
const editedDescription = ref(props.task.description);
const editedCategory = ref(props.task.category);

function getCategoryName(categoryId: string): string {
  const category = categories.value.find(c => c.id === categoryId);
  return category ? category.name : categoryId;
}

function getCategoryColor(categoryId: string): string {
  const category = categories.value.find(c => c.id === categoryId);
  return category ? category.color : 'bg-gray-500';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('zh-CN', { 
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

function startEditing(): void {
  isEditing.value = true;
  editedTitle.value = props.task.title;
  editedDescription.value = props.task.description || '';
  editedCategory.value = props.task.category;
}

function cancelEditing(): void {
  isEditing.value = false;
}

function saveEdit(): void {
  if (editedTitle.value.trim() === '') return;
  
  emit('edit-task', {
    ...props.task,
    title: editedTitle.value,
    description: editedDescription.value,
    category: editedCategory.value
  });
  
  isEditing.value = false;
}
</script>