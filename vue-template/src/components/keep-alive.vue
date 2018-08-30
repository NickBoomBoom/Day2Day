<template>
  <div id='keep-alive-root'>
    <input type="text" v-model="str" placeholder="在这里输入,返回或前进都会将此段文字保存">
    <p>依次触发created=>mounted=>activated,所以我们在第一次进入时在created中请求数据,之后每次进入只触发acitivated,并且实例销毁时只触发deactivated,不在触发正常情况下的destroyed</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      str: null
    }
  },
  created () {
    console.log('created')
    this.init()
  },
  activated () {
    console.log('activated', this.str)
  },
  deactivated () {
    console.log('deactivated 使用keep-ailve时触发的实例销毁函数')
  },
  destroyed () {
    console.log('destroyed 不使用keep-alive时触发的实例销毁函数')
  },
  methods: {
    init () {
      axios.get('http://gank.io/api/history/content/2/1')
        .then(res => {
          console.log('axios无包装状态下获取的res', res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

</script>

<style scoped>

</style>
