import React, { Suspense } from 'react';

const AsyncListCompoents = React.lazy(() => import('./components/aysncList'))

class LazyPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      list: []
    }
  }
  componentDidMount() {
    this.init()
  }

  init = async () => {
    return new Promise((resolve, reject) => {
      let res: any[] = []
      for (let i = 0; i < 10000; i++) {
        res.push(i)
      }
      setTimeout(() => {
        resolve(
          this.setState({
            list: res
          })
        )
      }, 2000);
      // reject('error')
    })
  }

  render() {
    const { list } = this.state
    return <div className='lazy-root'>
      <h4>
        React.lazy 和 Suspense 使用
      </h4>
      <p>
        React.lazy 异步加载组件,配合Suspense使用, Suspense属性fallback可传入loading组件,在懒加载组件加载完成前展示.
        <br />
        但是,Suspense暂时不支持子组件里面的异步事件监听.
        <br />
        目前的处理,在父组件中获取数据,当数据获取完成,展示子组件,子组件渲染完成前会展示fallback设置的过渡组件
      </p>

      <p>
        使用场景: 
         <br />
          电商平台,首页展示商品信息和广告位,数据获取到. 优先展示商品模块, 广告位模块延迟展示
      </p>
      {
        list.length > 0 ?
          <Suspense fallback={<h1 >正在渲染子组件...</h1>}>
            <AsyncListCompoents list={list} />
          </Suspense>
          :
          <h1>正在异步获取数据中</h1>
      }

    </div>
  }
}

export default LazyPage