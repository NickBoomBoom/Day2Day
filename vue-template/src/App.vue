<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }
  input {
    width:100%;
  }

html body,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
blockquote,
dl,
dt,
dd,
ul,
ol,
li,
div,
pre,
form,
fieldset,
legend,
button,
input,
textarea,
th,
td {
  padding: 0;
  margin: 0;
  border: none;
  list-style: none;
  -webkit-tap-highlight-color: transparent;
}

html,
body {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* background-color: #E5E5E5; */
  background-color: #f7f7f7;
}

</style>
