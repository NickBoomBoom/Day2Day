import React from 'react';
import './index.scss'

class ThisPage extends React.Component {
  constructor(props: any) {
    super(props)
    this.bindTest = this.bindTest.bind(this)
  }

  bindTest() {
    console.log('bind 绑定函数, this ===> ', this)
  }

  unBindTest() {
    console.log('未使用bind 绑定, this ===>', this)
  }

  arrowBind = () => {
    console.log("箭头函数绑定, this ====>", this)
  }

  inside() {
    console.log('内部箭头函数绑定, this ====> ', this)
  }

  render() {
    return <div className='this-root'>
      <h4>
        this 绑定原因: JavaScript的执行机制
         <br />
        onClick是中间变量，所以处理函数中的this指向会丢失
         <pre dangerouslySetInnerHTML={{
          __html: `
          const a = {
            test: function () {
              console.log(this)
            }
          }
          a.test() // 输出a
         `}}>

        </pre>
        <pre dangerouslySetInnerHTML={{
          __html: `
          const a = {
            test: function () {
              console.log(this)
            }
          }
          const t = a.test
          t() // 输出 window, t 是一个中间变量
        `}}>
        </pre>
      </h4>
      <button onClick={this.bindTest}> bind 函数绑定  </button>
      <button onClick={this.unBindTest}> bind 函数未绑定  </button>
      <button onClick={this.arrowBind}> 箭头函数绑定  </button>
      <button onClick={() => this.inside()}> 内部箭头函数绑定  </button>
    </div>
  }
}

export default ThisPage