
import { reactive } from 'vue'
import { defineStore } from 'pinia'

export class File {
  filename: string;
  code: string;
  hidden?: boolean;
  compiled: {
    js: string;
    css: string;
    ssr: string;
    parsed: any;
    parsedCode?: any;
    transformed?: any;
  } =   {
    js: '',
    css: '',
    ssr: '',
    parsed: '',
  }
  constructor(filename: string, code = '', hidden = false) {
    this.filename = filename
    this.code = code
    this.hidden = hidden
  }
}

const welcomeCode = `
<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg">
</template>
`.trim()


export const useFileStore = defineStore('file', () => {
  const activeFile = reactive<File>({
    filename: 'a.vue',
    code: welcomeCode,
    compiled:   {
      js: '',
      css: '',
      ssr: '',
      parsed: '',
    }
  })


  function setCode(code: string) {
    activeFile.code =  code
  }

  return { activeFile, setCode }
})
