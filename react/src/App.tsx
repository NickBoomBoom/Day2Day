import React from 'react';
import {
  Switch,
  Route,
  NavLink,
  withRouter
} from "react-router-dom";
import QueryPage from './views/query'
import HookPage from './views/hook'
import ThisPage from './views/this'
import LazyPage from './views/lazy'
import ContextPage from './views/context'
import RefsPage from './views/refs'
import ReduxPage from './views/redux'
import { IRouter } from './models/router.model'
const RouterList: IRouter[] = [
  {
    path: "/",
    meta: {
      title: '首页',
      exact: true
    },
    component: () => <div>首页</div>
  },
  {
    path: '/query',
    meta: {
      title: '提取query数据'
    },
    component: QueryPage
  },
  {
    path: '/hook',
    meta: {
      title: 'React Hook 体验'
    },
    component: HookPage
  },
  {
    path: '/this',
    meta: {
      title:"this bind问题"
    },
    component: ThisPage
  },
  {
    path: '/lazy',
    meta: {
      title:"React.lazy Suspense"
    },
    component: LazyPage
  },
  {
    path: '/context',
    meta: {
      title:"context"
    },
    component: ContextPage
  },
  {
    path: '/refs',
    meta: {
      title:"refs新版,this.refs[key]禁用"
    },
    component: RefsPage
  },
  {
    path: '/redux',
    meta: {
      title:"redux"
    },
    component: ReduxPage
  },
  {
    path: '*',
    meta: {
      title: "404",
      hidden: true
    },
    component: () => <h2>404</h2>
  }
]


class App extends React.Component<any, any> {
  componentDidMount() {
    this.props.history.listen((t: any) => {
      console.warn('路由切换', t)
    })
  }
  render() {
    return <>
      <div className="slider">
        {
          RouterList.filter(t => !t.meta.hidden).map(item => {
            return <NavLink key={item.path} to={item.path}>
              {item.meta?.title}
            </NavLink>
          })
        }
      </div>

      <div className="main">
        <Switch>
          {
            RouterList.map((item, index) => {
              return <Route
                key={index}
                path={item.path}
                exact={item.meta?.exact}
                component={item.component}
              />
            })
          }
        </Switch>
      </div>
    </>
  }
}

export default withRouter(App);
