// src/services/JournalService.js — localStorage-backed persistence

const STORAGE_KEY = "journal_entries";

function readStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function writeStore(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export async function getEntries() {
  return readStore();
}

export async function createEntry(entry) {
  const entries = readStore();
  const newEntry = { _id: Date.now().toString(), ...entry, createdAt: new Date().toISOString() };
  writeStore([newEntry, ...entries]);
  return newEntry;
}

export async function updateEntry(id, entry) {
  const entries = readStore().map((e) => (e._id === id ? { ...e, ...entry } : e));
  writeStore(entries);
  return entries.find((e) => e._id === id);
}

export async function deleteEntry(id) {
  writeStore(readStore().filter((e) => e._id !== id));
}
