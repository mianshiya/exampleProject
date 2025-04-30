<script setup lang="ts">
defineProps<{
  code: string;
  language?: string;
}>();
</script>

<template>
  <div class="code-block">
    <div class="code-header">
      <span>{{ language || 'vue' }}</span>
    </div>
    <pre><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.code-block {
  margin: 16px 0;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #e8e8e8;
  background-color: #fafafa;
}

.code-header {
  background-color: #f3f3f3;
  padding: 8px 16px;
  font-size: 14px;
  color: #606266;
  border-bottom: 1px solid #e8e8e8;
}

pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.5;
  font-family: 'Courier New', Courier, monospace;
}

code {
  color: #333;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>