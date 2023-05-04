<script setup lang="ts">
import CodeMirror from '@/components/codemirror/CodeMirror.vue'
import { useFileStore } from '@/stores/file'
import {  computed } from 'vue'

import OutHeaderVue from './OutHeader.vue';
import { replacer } from '@/utils/replacer'
import {ref } from 'vue'


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
    case 'code':
      return fileStore.activeFile.compiled.js
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
  background-color: #130303;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
