function observe(value, cb) {
  Object.keys(value).forEach((key) => defineReactive(value, key, value[key], cb))
}

function defineReactive(obj, key, val, cb) {
  console.log(
    'obj==>', obj,
    'key==>', key,
    'val==>', val, 
    'cb==>', cb)
  Object.defineProperty(obj, key, {
    enumerable: true,  // true 时, 属性描述符才能够被改变,也能够被删除
    configurable: true,  // true 时, 该属性才能出现在对象的枚举属性中
    get: () => {
      /*....依赖收集等....*/
      /*Github:https://github.com/answershuto*/
    },
    set: newVal => {
      cb();/*订阅者收到消息的回调*/
    }
  })
}

class Vue {
  constructor(options) {
    this._data = options.data;
    observe(this._data, options.render)
  }
}

let app = new Vue({
  el: '#app',
  data: {
    text: 'text',
    text2: 'text2'
  },
  render() {
    console.log("render");
  }
})