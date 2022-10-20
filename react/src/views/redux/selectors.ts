import { VISIBILITY_FILTERS } from "./constants";

export const getTodosState = (store:any) => store.todos;

export const getTodoList = (store:any) =>
  getTodosState(store) ? getTodosState(store).allIds : [];

export const getTodoById = (store:any, id:any) =>
  getTodosState(store) ? { ...getTodosState(store).byIds[id], id } : {};

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getTodos = (store:any) =>
  getTodoList(store).map((id:any) => getTodoById(store, id));

export const getTodosByVisibilityFilter = (store:any, visibilityFilter:any) => {
  const allTodos = getTodos(store);
  switch (visibilityFilter) {
    case VISIBILITY_FILTERS.COMPLETED:
      return allTodos.filter((todo:any) => todo.completed);
    case VISIBILITY_FILTERS.INCOMPLETE:
      return allTodos.filter((todo:any) => !todo.completed);
    case VISIBILITY_FILTERS.ALL:
    default:
      return allTodos;
  }
};
