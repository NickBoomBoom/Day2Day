import './index.scss';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './views/redux/store'
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>

      <ThemeContext.Provider value='red'>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeContext.Provider>
    </Provider>


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export {
  ThemeContext
}