<script setup lang="ts">
  import { reactive, ref } from 'vue'
  const emit = defineEmits<(e: 'change', value: string) => void>()
  const modes  = reactive(['parsed', 'transformed',  'parsedCode', 'code'])
  const mode =  ref('parsed')
  const onClick = (m: string) => {
    mode.value = m
    emit('change', m)
  }
</script>
<template>
  <div class="tab-buttons">
    <button
      v-for="m of modes"
      :key="m"
      :class="{ active: mode === m }"
      @click="onClick(m)"
    >
        <span>{{ m }}</span>
    </button>
  </div>
</template>

<style scoped>
.tab-buttons {
  box-sizing: border-box;
  border-bottom: 1px solid var(--border);
  background-color: #130303;
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
