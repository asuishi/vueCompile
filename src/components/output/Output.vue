<script setup lang="ts">
import CodeMirror from '@/components/codemirror/CodeMirror.vue'
import { useFileStore } from '@/stores/file'
import {  computed } from 'vue'
import { NodeTypes, ElementTypes} from '@/types/nodeTyoes'
import OutHeaderVue from './OutHeader.vue';
import {ref } from 'vue'
function replacer(key: string, value: any) {
  // Filtering out properties
  if (key === "loc" || key === 'ns') {
    return undefined;
  }
  if (key === "type") {
    return `${value}(${NodeTypes[value]})`
  }
  if (key === "tagType") {
    return `${value}(${ElementTypes[value]})`
  }
  return value;
}

const currentMode = ref('parsed')
const fileStore = useFileStore()
const file  = computed(() => {
  switch(currentMode.value) {
    case 'parsed':
      return JSON.stringify(fileStore.activeFile.compiled.parsed, replacer, 2)
    case 'parsedCode':
      return fileStore.activeFile.compiled.parsedCode;
    case 'transformed':
      return JSON.stringify(fileStore.activeFile.compiled.transformed, replacer, 2)
    default: 
      return JSON.stringify(fileStore.activeFile.compiled.parsed, replacer, 2)
  }
})

const onChange = (m: string) => {
  currentMode.value = m
}
</script>

<template>
  <div class="output-container">
    <OutHeaderVue @change="onChange"></OutHeaderVue>
    <CodeMirror
      mode="javascript"
      readonly
      :value="file"
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
