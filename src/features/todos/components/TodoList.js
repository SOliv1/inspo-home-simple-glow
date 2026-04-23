// src/features/todos/components/TodoList.js
import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

function TodoList({ palette }) {
  const items = useSelector((state) => state.todos.items);

  return (
    <ul className="todo-bubble-list">
      {items.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          text={item.text}
          completed={item.completed}
          bubbleBg={palette.bg[item.colorIndex % 4]}
          bubbleBorder={palette.border[item.colorIndex % 4]}
        />
      ))}
      {items.length === 0 && (
        <li className="todo-empty">Nothing yet — add your first task above ✨</li>
      )}
    </ul>
  );
}

export default TodoList;
