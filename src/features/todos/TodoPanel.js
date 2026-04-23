// src/features/todos/TodoPanel.js
import React from 'react';
import { getTodoPalette } from '../../utils/todoPalette';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

export function TodoPanel({ season, mood }) {
  const palette = getTodoPalette(season, mood);

  return (
    <div className="todo-panel">
      <TodoInput />
      <TodoList palette={palette} />
    </div>
  );
}

export default TodoPanel;
