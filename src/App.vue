<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import Editor from '@/components/input/Editor.vue'
import Output from '@/components/output/Output.vue';

import { useFileStore } from './stores/file';
import { watchEffect } from 'vue';

const fileStore = useFileStore()
watchEffect(() => {
  if(fileStore.errors.length > 0) {
    console.log(fileStore.errors)
  }
  if(fileStore.warnings.length > 0) {
    console.log(fileStore.errors)
  }
})
</script>

<template>
<div class="contianer">
  <Layout>
    <template #left>
      <Editor />
    </template>
    <template #right>
      <Output />
    </template>
  </Layout>
</div>
</template>

<style scoped>
.contianer {
  width: 100%;
  height: 100%;
}
</style>
