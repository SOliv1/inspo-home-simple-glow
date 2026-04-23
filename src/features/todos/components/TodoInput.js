// src/features/todos/components/TodoInput.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../todosSlice';

function TodoInput() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch(addTodo(trimmed));
    setText('');
  }

  return (
    <form className="todo-compose" onSubmit={handleSubmit}>
      <input
        className="todo-compose-input"
        type="text"
        placeholder="Add a task…"
        autoComplete="off"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="todo-compose-btn">Add</button>
    </form>
  );
}

export default TodoInput;
