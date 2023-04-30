
import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

import type {
  SFCScriptCompileOptions,
  SFCAsyncStyleCompileOptions,
  SFCTemplateCompileOptions
} from '@vue/compiler-sfc'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { RootNode } from '@vue/compiler-core'

export interface SFCOptions {
  script?: Partial<SFCScriptCompileOptions>
  style?: Partial<SFCAsyncStyleCompileOptions>
  template?: Partial<SFCTemplateCompileOptions>
}
export const useEditorStore = defineStore('editor', () => {
  const count = ref(0)
  const activeFile = ref('<template>')
  const SFCOptions = reactive<SFCOptions>({})
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  function setActiveFile(code: string) {
    activeFile.value =  code
  }

  return { activeFile, setActiveFile, SFCOptions, count, doubleCount, increment }
})
