<template>
<div>
    <tab-container>
     <tab-container-item>
      <div v-for="item in 10" :key="item">1</div>
      <div slot="header">我是头部</div>
      <div slot="footer">我是尾部</div>
     </tab-container-item>
     <tab-container-item>
        <div v-for="item in 10" :key="item">2</div>
     </tab-container-item>
     <tab-container-item>
        <div v-for="item in 10" :key="item">3</div>
     </tab-container-item>
   </tab-container>
</div>
</template>
<script>
import TabContainer from '@/packages/tabContainer/TabContainer'
import TabContainerItem from '@/packages/tabContainer/TabContainerItem'
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  components: {
    TabContainer, TabContainerItem
  }
}
</script>
