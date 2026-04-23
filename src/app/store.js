import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weatherSlice';
import todosReducer from '../features/todos/todosSlice';

function loadTodos() {
  try { return JSON.parse(localStorage.getItem('inspo_todos')) || []; }
  catch { return []; }
}

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    todos: todosReducer,
  },
  preloadedState: {
    todos: { items: loadTodos() },
  },
});

store.subscribe(() => {
  localStorage.setItem('inspo_todos', JSON.stringify(store.getState().todos.items));
});
