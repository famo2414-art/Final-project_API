import { useState } from 'react';

function VerseCard({ verse, onSave, onUpdate, onDelete, isSaved = false }) {
  const [note, setNote] = useState(verse.note || '');

  const handleSave = () => {
    onSave({ ...verse, note });
  };

  const handleUpdate = () => {
    onUpdate(verse.id, note);
  };

  const renderVerseWithAnimation = () => {
    const text = verse.verse || verse.text || '';
    const reference = verse.reference || `${verse.bookname} ${verse.chapter}:${verse.verseNum}`;
    const words = `${reference} — ${text}`.split(' ');
    return (
      <p className="text-lg">
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
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md animate-fade-in">
      {renderVerseWithAnimation()}
      {isSaved && (
        <div className="mt-2">
          <textarea
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note..."
          />
          <button
            onClick={handleUpdate}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update Note
          </button>
        </div>
      )}
      {!isSaved && (
        <div className="mt-2">
          <textarea
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note..."
          />
          <button
            onClick={handleSave}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save Verse
          </button>
        </div>
      )}
      {isSaved && (
        <button
          onClick={() => onDelete(verse.id)}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Delete Verse
        </button>
      )}
    </div>
  );
}

export default VerseCard;
