const BASE_URL = 'http://localhost:3000';

export const fetchRandomVerse = async () => {
  const res = await fetch(`${BASE_URL}/api/verse/random`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export const fetchSpecificVerse = async (book, chapter, verse) => {
  const res = await fetch(`${BASE_URL}/api/verse/specific?book=${encodeURIComponent(book)}&chapter=${chapter}&verse=${verse}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export const fetchSearchVerse = async (passage) => {
  const res = await fetch(`${BASE_URL}/api/verse/search?passage=${encodeURIComponent(passage)}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export const fetchVerses = async () => {
  const res = await fetch(`${BASE_URL}/api/verses`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export const saveVerse = async (verseData) => {
  const res = await fetch(`${BASE_URL}/api/verses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(verseData),
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export const updateVerseNote = async (id, note) => {
  const res = await fetch(`${BASE_URL}/api/verses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ note }),
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export const deleteVerse = async (id) => {
  const res = await fetch(`${BASE_URL}/api/verses/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export const fetchHistory = async () => {
  const res = await fetch(`${BASE_URL}/api/verse/history`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};
