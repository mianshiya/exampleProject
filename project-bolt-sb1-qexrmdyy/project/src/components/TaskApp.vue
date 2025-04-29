<template>
  <div class="max-w-4xl mx-auto">
    <header class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-blue-600 mb-2">任务管理系统</h1>
      <p class="text-gray-600">高效管理您的日常任务</p>
    </header>

    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="p-6">
        <TaskForm 
          @add-task="addTask" 
          :categories="categories" 
        />
      </div>
      
      <div class="border-t border-gray-100">
        <div class="p-6">
          <TaskFilter 
            :filter="filter" 
            :categories="categories"
            @update-filter="updateFilter" 
          />
          
          <TaskList 
            :tasks="filteredTasks" 
            @toggle-task="toggleTaskStatus" 
            @delete-task="deleteTask"
            @edit-task="editTask"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import TaskForm from './TaskForm.vue';
import TaskList from './TaskList.vue';
import TaskFilter from './TaskFilter.vue';
import type { Task, TaskFilter as FilterType } from '../types';

const tasks = ref<Task[]>([]);
const nextId = ref(1);

const categories = ref([
  { id: 'work', name: '工作', color: 'bg-blue-500' },
  { id: 'personal', name: '个人', color: 'bg-green-500' },
  { id: 'shopping', name: '购物', color: 'bg-purple-500' },
  { id: 'health', name: '健康', color: 'bg-red-500' }
]);

const filter = ref<FilterType>({
  status: 'all',
  category: 'all'
});

onMounted(() => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
    const maxId = Math.max(...tasks.value.map(task => task.id), 0);
    nextId.value = maxId + 1;
  }
});

watch(tasks, (newTasks) => {
  localStorage.setItem('tasks', JSON.stringify(newTasks));
}, { deep: true });

const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    const statusMatch = filter.value.status === 'all' || 
      (filter.value.status === 'completed' && task.completed) ||
      (filter.value.status === 'active' && !task.completed);
    
    const categoryMatch = filter.value.category === 'all' || 
      task.category === filter.value.category;
    
    return statusMatch && categoryMatch;
  });
});

function addTask(task: Omit<Task, 'id' | 'completed'>) {
  tasks.value.push({
    id: nextId.value,
    title: task.title,
    description: task.description,
    category: task.category,
    completed: false,
    createdAt: new Date().toISOString()
  });
  nextId.value++;
}

function toggleTaskStatus(taskId: number) {
  const task = tasks.value.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
  }
}

function deleteTask(taskId: number) {
  const index = tasks.value.findIndex(t => t.id === taskId);
  if (index !== -1) {
    tasks.value.splice(index, 1);
  }
}

function editTask(updatedTask: Task) {
  const index = tasks.value.findIndex(t => t.id === updatedTask.id);
  if (index !== -1) {
    tasks.value[index] = updatedTask;
  }
}

function updateFilter(newFilter: FilterType) {
  filter.value = newFilter;
}
</script>