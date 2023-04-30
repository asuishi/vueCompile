<script setup lang="ts">
// import FileSelector from './FileSelector.vue'
import CodeMirror from '@/components/codemirror/CodeMirror.vue'
import { useFileStore } from '@/stores/file'
import { compileFile } from '@/transform'

const fileStore = useFileStore()

// import Message from '../Message.vue'
import { debounce } from '@/utils'
import { computed } from 'vue'

const onChange = debounce((code: string) => {
  fileStore.activeFile.code = code
  compileFile(fileStore.activeFile)
}, 250)

const activeMode = computed(() => {
  const filename = fileStore.activeFile.code
  if(!filename) {
    return
  }
  return filename.endsWith('.vue') || filename.endsWith('.html')
    ? 'htmlmixed'
    : filename.endsWith('.css')
    ? 'css'
    : 'javascript'
})
</script>

<template>
  <div class="editor-container">
    <CodeMirror
      @change="onChange"
      :value="fileStore.activeFile.code"
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
