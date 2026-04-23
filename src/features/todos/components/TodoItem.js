// src/components/TodoItem.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../features/todos/todosSlice';

function TodoItem({ id, text, completed, checkClass }) {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  return (
    <li className={`todo-item todo-item--enter ${completed ? 'completed' : ''}`}>
      <div className="todo-item-content">
        <span className="todo-meta-dot" />
        <p className="todo-text">{text}</p>
      </div>

      <div className="todo-actions">
        <button
          type="button"
          className={`btn-check ${checkClass}`}
          onClick={handleToggle}
          aria-label={completed ? 'Mark as not done' : 'Mark as done'}
        >
          ✓
        </button>

        <button
          type="button"
          className="btn-delete"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
