<template>
 <div id='home'>
   <router-link :to="{name:'KeepAlive'}">KeepAlive 测试</router-link><br>
   <router-link :to="{name:'TabContainerTest'}">tabcontainer测试</router-link><br>
   <button @click="toast">toast测试</button>
   <router-link to="/home/tab1">tab1</router-link>
   <router-link to="/home/tab2">tab2</router-link>
   <router-view ></router-view>
 </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
  },
  methods: {
    toast () {
      this.$toast('测试中')
    }
  },
  components: {
  }
}
</script>

<style scoped>
#home {
  height: 999px;
  width: 100%;
}
</style>
