const createStore = (reducer, initalState = {}) => {
  // 当前的 state
  let state = initalState;
  // 当前订阅的 listenners
  let listeners = [];
  // getState 用于获取当前的 state
  const getState = () => state;
  // 每个 dispatch 一个 action, 滴啊用 reducer 生成一个新的 state
  // 然后通知 listerners 里保存的 listener
  const dispatch = action => {
    console.log("action==>", action);
    state = reducer(state, action);
    listeners.forEach(l => l());
  };
  const subscribe = listener => {
    console.log("listener==>", listener);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  return {
    getState,
    dispatch,
    subscribe
  };
};

const counterReducer = (state, action) => {
  console.log("state ==>", state);
  switch (action.type) {
    case "INCREMENT":
      return state.count + 1;
    case "DECREMENT":
      return state.count - 1;
    default:
      return state;
  }
};

const store = createStore(counterReducer, { count: 0 });
// 订阅一个打印当前 state 的函数
store.subscribe(() => console.log("==>", store.getState()));

store.dispatch({ type: "INCREMENT" }); // 打印 1
store.dispatch({ type: "INCREMENT" }); // 打印 2
store.dispatch({ type: "DECREMENT" }); // 打印 1
