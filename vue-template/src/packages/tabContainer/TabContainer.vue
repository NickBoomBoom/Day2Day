<template>
  <div
    v-finger:tap="tap"
    v-finger:swipe="swipe"
    ref="wrap"
    class="wrap"
    :style="{'transform': 'translateX('+ moveX +'px)'}"
    >
      <slot></slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
      startX: null,
      moveX: null
    }
  },
  mounted () {
    let wrap = this.$refs.wrap
    wrap.addEventListener('touchstart', function (e) {
      console.log('touchstart', e.touches[0].screenX)
      this.startX = e.touches[0].screenX
    }, false)
    wrap.addEventListener('touchmove', function (e) {
      console.log('touchmove', e.touches[0].screenX)
      this.moveX = this.startX - e.touches[0].screenX
    }, false)
    wrap.addEventListener('touchend', function (e) {
      console.log('touchend', e.changedTouches[0])
    }, false)
  },
  methods: {
    tap (e) {
      // console.log('点触事件', e)
    },
    swipe (e) {
      console.log('swipe', e.direction)
      let direction = e.direction
      if (direction === 'Right') {
        console.log('右移')
      } else if (direction === 'Left') {
        console.log('左移')
      }
    }
  },
  watch: {
    moveX (val) {
      console.log('moveX', val)
    },
    startX (val) {
      console.log('startx', val)
    }
  }
}
</script>
<style scoped>
.wrap {
  white-space: nowrap;
  width:100%;
  font-size: 0;
  -webkit-text-size-adjust: none;
}
</style>
