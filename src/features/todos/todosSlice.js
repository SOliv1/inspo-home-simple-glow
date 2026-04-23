// src/features/todos/todosSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [], // { id, text, completed, colorIndex }
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            id: nanoid(),
            text,
            completed: false,
            // store which colour button this task should use
            colorIndex: Math.floor(Math.random() * 4),
          },
        };
      },
    },
    toggleTodo(state, action) {
      const id = action.payload;
      const todo = state.items.find((t) => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo(state, action) {
      const id = action.payload;
      state.items = state.items.filter((t) => t.id !== id);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
