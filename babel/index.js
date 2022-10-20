const babel = require('@babel/core')
const fn = () => {
  console.log(this)
}

console.log(babel)

const res = babel.transform(fn, {
  presets: ['@babel/preset-env']
})


console.log('=================> ', res)