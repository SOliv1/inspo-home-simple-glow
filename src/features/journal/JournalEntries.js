import React, { useState, useEffect } from "react";
import { getEntries, createEntry, deleteEntry } from "../../services/JournalService";

export function JournalEntries() {
  const [entries, setEntries] = useState([]);
  const [newText, setNewText] = useState("");

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    try {
      const data = await getEntries();
      setEntries(Array.isArray(data) ? data : []);
    } catch {
      setEntries([]);
    }
  }

  async function handleCreate() {
    if (!newText.trim()) return;
    await createEntry({ text: newText });
    setNewText("");
    loadEntries();
  }

  async function handleDelete(id) {
    await deleteEntry(id);
    loadEntries();
  }

  return (
    <div className="journal-entries fade-on-scroll">
      <h2 className="journal-title">Your Journal</h2>

      {entries.length > 0 && (
        <ul className="journal-list">
          {entries.map((entry) => (
            <li key={entry._id} className="journal-item">
              <p className="journal-text">{entry.text}</p>
              <button
                className="journal-delete-btn"
                onClick={() => handleDelete(entry._id)}
                aria-label="Delete entry"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="journal-compose">
        <textarea
          className="journal-compose-input"
          placeholder="Write a reflection…"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleCreate();
          }}
          rows={3}
        />
        <button className="journal-add-btn" onClick={handleCreate}>
          Add
        </button>
      </div>
    </div>
  );
}

export default JournalEntries;