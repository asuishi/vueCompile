<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import Editor from '@/components/input/Editor.vue'
import Output from '@/components/output/Output.vue';
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
