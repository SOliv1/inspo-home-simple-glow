// src/components/TodoList.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

const CHECK_CLASSES = [
  'btn-check--mint',
  'btn-check--yellow',
  'btn-check--pink',
  'btn-check--lilac',
];

function TodoList() {
  const items = useSelector((state) => state.todos.items);

  const remaining = items.filter((t) => !t.completed).length;

  const hasItems = items.length > 0;

  return (
    <>
      <header className="list-header">
        <div className="list-title-group">
          <h2 className="list-title">Today’s tasks</h2>
          <p className="list-subtitle">
            Tap the coloured check to complete, or remove what you don’t need.
          </p>
        </div>
        <div className="pill-counter" aria-live="polite">
          <span id="remaining-count">{remaining}</span> left
        </div>
      </header>

      <ul id="todo-list" className="todo-list" aria-live="polite">
        {items.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            text={item.text}
            completed={item.completed}
            checkClass={CHECK_CLASSES[item.colorIndex % CHECK_CLASSES.length]}
          />
        ))}
      </ul>

      {!hasItems && (
        <p className="empty-state" id="empty-state">
          No tasks yet. Start small: add one thing you can finish in 5 minutes.
        </p>
      )}
    </>
  );
}

export default TodoList;
