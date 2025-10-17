import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import rateLimit from 'express-rate-limit';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Rate limit to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// File paths
const VERSES_FILE = path.join(__dirname, 'verses.json');
const HISTORY_FILE = path.join(__dirname, 'history.json');

// Initialize storage files
async function initFiles() {
  try {
    await fs.access(VERSES_FILE);
  } catch {
    await fs.writeFile(VERSES_FILE, JSON.stringify([]));
  }
  try {
    await fs.access(HISTORY_FILE);
  } catch {
    await fs.writeFile(HISTORY_FILE, JSON.stringify([]));
  }
}
await initFiles();

// Load caches
let versesCache = JSON.parse(await fs.readFile(VERSES_FILE));
let historyCache = JSON.parse(await fs.readFile(HISTORY_FILE));

// Save history safely (no duplicates)
async function updateHistory(verseData, type) {
  const exists = historyCache.some(v => v.reference === verseData.reference);
  if (!exists) {
    historyCache.push({ ...verseData, type, timestamp: new Date().toISOString() });
    await fs.writeFile(HISTORY_FILE, JSON.stringify(historyCache, null, 2));
  }
}

// API: Random Verse
app.get('/api/verse/random', async (req, res) => {
  try {
    const response = await fetch('https://labs.bible.org/api/?passage=random&type=json');
    const data = await response.json();
    const verse = {
      id: uuidv4(),
      text: data[0]?.text || 'No verse found.',
      reference: `${data[0]?.bookname} ${data[0]?.chapter}:${data[0]?.verse}`
    };
    await updateHistory(verse, 'random');
    res.json(verse);
  } catch (err) {
    console.error('Random verse error:', err);
    res.status(500).json({ error: 'Failed to fetch random verse' });
  }
});

// API: Specific Verse (default John 3:16)
app.get('/api/verse/specific', async (req, res) => {
  const { book = 'John', chapter = '3', verse = '16' } = req.query;
  try {
    const response = await fetch(`https://labs.bible.org/api/?passage=${book}+${chapter}:${verse}&type=json`);
    const data = await response.json();
    const verseData = {
      id: uuidv4(),
      text: data[0]?.text || 'Verse not found.',
      reference: `${book} ${chapter}:${verse}`
    };
    await updateHistory(verseData, 'specific');
    res.json(verseData);
  } catch (err) {
    console.error('Specific verse error:', err);
    res.status(500).json({ error: 'Failed to fetch specific verse' });
  }
});

// API: Search Verse
app.get('/api/verse/search', async (req, res) => {
  const { passage } = req.query;
  if (!passage) return res.status(400).json({ error: 'Passage required' });
  try {
    const response = await fetch(`https://labs.bible.org/api/?passage=${encodeURIComponent(passage)}&type=json`);
    const data = await response.json();
    const verseData = {
      id: uuidv4(),
      text: data[0]?.text || 'Verse not found.',
      reference: data[0]?.bookname ? `${data[0].bookname} ${data[0].chapter}:${data[0].verse}` : passage
    };
    await updateHistory(verseData, 'search');
    res.json(verseData);
  } catch (err) {
    console.error('Search verse error:', err);
    res.status(500).json({ error: 'Failed to search verse' });
  }
});

// API: Saved Verses CRUD
app.get('/api/verses', (req, res) => {
  res.json(versesCache);
});

app.post('/api/verses', async (req, res) => {
  const newVerse = { ...req.body, id: uuidv4(), createdAt: new Date().toISOString() };
  versesCache.push(newVerse);
  await fs.writeFile(VERSES_FILE, JSON.stringify(versesCache, null, 2));
  res.status(201).json(newVerse);
});

app.put('/api/verses/:id', async (req, res) => {
  const { id } = req.params;
  const { note } = req.body;
  const index = versesCache.findIndex(v => v.id === id);
  if (index === -1) return res.status(404).json({ error: 'Verse not found' });
  versesCache[index].note = note;
  await fs.writeFile(VERSES_FILE, JSON.stringify(versesCache, null, 2));
  res.json(versesCache[index]);
});

app.delete('/api/verses/:id', async (req, res) => {
  const { id } = req.params;
  const index = versesCache.findIndex(v => v.id === id);
  if (index === -1) return res.status(404).json({ error: 'Verse not found' });
  const deleted = versesCache.splice(index, 1)[0];
  await fs.writeFile(VERSES_FILE, JSON.stringify(versesCache, null, 2));
  res.json(deleted);
});

// API: History
app.get('/api/verse/history', (req, res) => {
  res.json(historyCache.slice(-10));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
