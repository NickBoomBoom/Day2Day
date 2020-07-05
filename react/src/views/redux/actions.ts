import { ADD_TODO, TOGGLE_TODO, SET_FILTER } from "./actionTypes";

let nextTodoId = 0;

export const addTodo:any = (content:any) => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const toggleTodo:any = (id:any) => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const setFilter:any = (filter:any) => ({ type: SET_FILTER, payload: { filter } });
