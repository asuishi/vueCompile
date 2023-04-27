<script setup lang="ts">
import CodeMirror from '../codemirror/CodeMirror.vue'
import {  ref } from 'vue'
const value = ref<string>('const a = 5')

</script>

<template>
  <div class="output-container">
    <CodeMirror
      v-if="mode !== 'preview'"
      readonly
      :mode="mode === 'css' ? 'css' : 'javascript'"
      :value="value"
    />
  </div>
</template>

<style scoped>
.output-container {
  background-color: var(--bg-soft);
  height: 100%;
  overflow: hidden;
  position: relative;
}

.tab-buttons {
  box-sizing: border-box;
  border-bottom: 1px solid var(--border);
  background-color: var(--bg);
  height: var(--header-height);
  overflow: hidden;
}
.tab-buttons button {
  padding: 0;
  box-sizing: border-box;
}
.tab-buttons span {
  font-size: 13px;
  font-family: var(--font-code);
  text-transform: uppercase;
  color: var(--text-light);
  display: inline-block;
  padding: 8px 16px 6px;
  line-height: 20px;
}
button.active {
  color: var(--color-branding-dark);
  border-bottom: 3px solid var(--color-branding-dark);
}
</style>
