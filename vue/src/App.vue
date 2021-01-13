<template>
  <div id="app">
    <router-view></router-view>
    <button @click="$router.go(1)">go(1)</button>
    <button @click="$router.go(20)">go(20)</button>
    <button @click="$router.go(-1)">go(-1)</button>
    <button @click="$router.go(-2)">go(-2)</button>
    <button @click="$router.go(-20)">go(-20)</button>
    <button @click="$router.push({path:'/b'})">push(b)</button>
    <button @click="$router.push('/c')">push(c)</button>
    <button @click="$router.replace('/b')">replace(b)</button>
    <button @click="$router.replace('/c')">replace(c)</button>
    <button @click="$router.back()">back</button>
    <button @click="$router.forward()">forward</button>
    <button @click="p">push</button>
  </div>
</template>
<script>
export default {
  methods:{
    p () {
      this.$router.push('/b', res => {
        console.log(111, res)
      }).then(res => {
         console.log(res)
      })
    }
  }
};
</script>
<style >
button {
  display: block;
  width: 10em;
  height: 2em;
  line-height: 2em;
  text-align: center;
  margin-bottom: 10px;
}
</style>