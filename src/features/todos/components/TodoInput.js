// src/components/TodoInput.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todosSlice';

function TodoInput() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch(addTodo(trimmed));
    setText('');
  };

  return (
    <form id="todo-form" className="todo-form" onSubmit={handleSubmit}>
      <label htmlFor="todo-input" className="todo-label">
        Add a task
      </label>
      <div className="todo-input-row">
        <input
          id="todo-input"
          className="todo-input"
          type="text"
          name="task"
          placeholder="e.g. Drink a glass of water"
          autoComplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </div>
    </form>
  );
}

export default TodoInput;
