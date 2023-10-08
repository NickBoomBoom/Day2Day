<script setup lang="ts">
import { ref, watch } from 'vue'
import { Editor } from 'novel-vue'
import 'novel-vue/dist/style.css'
const content = ref('')
watch(content, (v: any) => {
  console.log(1111, v)
})
function handleUpdate(e: any) {
  console.log(3333, e)
  console.log(444, e.getJSON())
}
</script>

<template>
  <div>
    <Editor @debouncedUpdate="handleUpdate" className="w-full" />
  </div>
</template>
