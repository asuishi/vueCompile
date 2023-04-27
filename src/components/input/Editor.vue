<script setup lang="ts">
// import FileSelector from './FileSelector.vue'
import CodeMirror from '@/components/codemirror/CodeMirror.vue'

// import Message from '../Message.vue'
import { debounce } from '@/utils'
import { ref } from 'vue'
const value = ref<string>('')

const onChange = debounce((code: string) => {
  console.log(code)
}, 250)

// const activeMode = computed(() => {
//   const { filename } = store.state.activeFile
//   return filename.endsWith('.vue') || filename.endsWith('.html')
//     ? 'htmlmixed'
//     : filename.endsWith('.css')
//     ? 'css'
//     : 'javascript'
// })
</script>

<template>
  <div class="editor-container">
    <CodeMirror
      @change="onChange"
      :value="value"
      :mode="activeMode"
    />
  </div>
</template>

<style scoped>
.editor-container {
  background-color: aqua;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
