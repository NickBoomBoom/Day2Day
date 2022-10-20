<template>
<button @click='emit'>上传</button>
</template>
<script>
export default {
  methods: {
    emit() {
      const arr = [
        {
          a:1
        },
        {
          a:2
        }
      ]
      this.$emit('up', arr)
    }
  },
}
</script>