// src/features/todos/components/TodoItem.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../todosSlice';

function TodoItem({ id, text, completed, bubbleBg, bubbleBorder }) {
  const dispatch = useDispatch();

  return (
    <li
      className={`todo-bubble ${completed ? 'todo-bubble--done' : ''}`}
      style={{ '--bubble-bg': bubbleBg, '--bubble-border': bubbleBorder }}
    >
      <button
        type="button"
        className="todo-bubble-check"
        onClick={() => dispatch(toggleTodo(id))}
        aria-label={completed ? 'Mark as not done' : 'Mark as done'}
      >
        {completed ? '✓' : ''}
      </button>

      <span className="todo-bubble-text">{text}</span>

      <button
        type="button"
        className="todo-bubble-delete"
        onClick={() => dispatch(deleteTodo(id))}
        aria-label="Delete task"
      >
        ×
      </button>
    </li>
  );
}

export default TodoItem;
