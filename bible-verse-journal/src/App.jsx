import { useState, useEffect } from 'react';
import VerseCard from './components/VerseCard';
import SearchHistory from './components/SearchHistory';
import {
  fetchRandomVerse,
  fetchSpecificVerse,
  fetchSearchVerse,
  fetchVerses,
  saveVerse,
  updateVerseNote,
  deleteVerse,
  fetchHistory
} from './api';
import toast from 'react-hot-toast';

function App() {
  const [randomVerse, setRandomVerse] = useState(null);
  const [specificVerse, setSpecificVerse] = useState(null);
  const [searchVerse, setSearchVerse] = useState(null);
  const [savedVerses, setSavedVerses] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastFetch, setLastFetch] = useState(0);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    loadVerses();
    loadHistory();
  }, []);

  const loadVerses = async () => {
    try {
      const verses = await fetchVerses();
      setSavedVerses(verses);
    } catch (err) {
      console.error('loadVerses error:', err);
      toast.error('Failed to load saved verses');
    }
  };

  const loadHistory = async () => {
    try {
      const history = await fetchHistory();
      setHistory(history);
    } catch (err) {
      console.error('loadHistory error:', err);
      toast.error('Failed to load history');
    }
  };

  const debounceFetch = (fetchFn, delay = 500) => {
    return (...args) => {
      const now = Date.now();
      if (now - lastFetch < delay) return;
      setLastFetch(now);
      fetchFn(...args);
    };
  };

  const handleFetchRandom = debounceFetch(async () => {
    setLoading(true);
    try {
      const verse = await fetchRandomVerse();
      setRandomVerse(verse);
      loadHistory();
      toast.success('Random verse fetched!');
    } catch (err) {
      console.error('handleFetchRandom error:', err);
      toast.error('Failed to fetch random verse');
    } finally {
      setLoading(false);
    }
  });

  const handleFetchSpecific = debounceFetch(async () => {
    setLoading(true);
    try {
      const verseData = await fetchSpecificVerse('John', '3', '16');
      setSpecificVerse(verseData);
      loadHistory();
      toast.success('Verse fetched!');
    } catch (err) {
      console.error('handleFetchSpecific error:', err);
      toast.error('Failed to fetch verse');
    } finally {
      setLoading(false);
    }
  });

  const handleSearchVerse = debounceFetch(async () => {
    if (!searchInput) {
      toast.error('Please enter a verse (e.g., Psalm 23:1-3)');
      return;
    }
    setLoading(true);
    try {
      const verseData = await fetchSearchVerse(searchInput);
      setSearchVerse(verseData);
      loadHistory();
      toast.success('Verse searched!');
    } catch (err) {
      console.error('handleSearchVerse error:', err);
      toast.error('Failed to search verse: ' + err.message);
    } finally {
      setLoading(false);
    }
  });

  const handleSaveVerse = async (verseData) => {
    try {
      await saveVerse(verseData);
      loadVerses();
      toast.success('Verse saved!');
    } catch (err) {
      console.error('handleSaveVerse error:', err);
      toast.error('Failed to save verse');
    }
  };

  const handleUpdateNote = async (id, note) => {
    try {
      await updateVerseNote(id, note);
      loadVerses();
      toast.success('Note updated!');
    } catch (err) {
      console.error('handleUpdateNote error:', err);
      toast.error('Failed to update note');
    }
  };

  const handleDeleteVerse = async (id) => {
    try {
      await deleteVerse(id);
      loadVerses();
      toast.success('Verse deleted!');
    } catch (err) {
      console.error('handleDeleteVerse error:', err);
      toast.error('Failed to delete verse');
    }
  };

  const renderVerseWithAnimation = (verseData) => {
    if (!verseData) return null;
    const text = verseData.text || verseData.verse || '';
    const reference =
      verseData.reference ||
      `${verseData.bookname} ${verseData.chapter}:${verseData.verseNum}`;
    const words = `${reference} — ${text}`.split(' ');
    return (
      <p className="text-lg leading-relaxed">
        {words.map((word, index) => (
          <span
            key={index}
            className="animate-word"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {word}{' '}
          </span>
        ))}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-blue-700 text-white text-center py-4 shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">
          Bible Verse Journal
        </h1>
      </header>

      <main className="container mx-auto p-6 space-y-10">
        {/* Random & Specific */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Random Verse</h2>
            <button
              onClick={handleFetchRandom}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Fetch Random Verse'}
            </button>
            {loading && (
              <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            )}
            {randomVerse && (
              <VerseCard verse={randomVerse} onSave={handleSaveVerse} />
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Specific Verse</h2>
            <button
              onClick={handleFetchSpecific}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Fetch John 3:16'}
            </button>
            {specificVerse && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Specific Verse</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get Specific Verse ({specificVerse.reference})
                </p>
                {renderVerseWithAnimation(specificVerse)}
              </div>
            )}
          </div>
        </section>

        {/* Search Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Search Verse</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchVerse();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Enter passage (e.g., John 3:16, Psalm 23:1-3)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Search Verse
            </button>
          </form>
          {searchVerse && (
            <div className="space-y-2">
              
              <VerseCard verse={searchVerse} onSave={handleSaveVerse} />
            </div>
          )}
        </section>

        {/* Saved Verses */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Saved Verses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedVerses.map((verse) => (
              <VerseCard
                key={verse.id}
                verse={verse}
                onUpdate={handleUpdateNote}
                onDelete={handleDeleteVerse}
                isSaved
              />
            ))}
          </div>
        </section>

        {/* Search History */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Search History</h2>
          <SearchHistory history={history} />
        </section>
      </main>
    </div>
  );
}

export default App;
