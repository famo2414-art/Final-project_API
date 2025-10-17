import { useState } from 'react';

function VerseForm({ onSubmit }) {
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (book && chapter && verse) {
      onSubmit(book, chapter, verse);
      setBook('');
      setChapter('');
      setVerse('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Book (e.g., John)"
          value={book}
          onChange={(e) => setBook(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-100"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Chapter (e.g., 3)"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-100"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Verse (e.g., 16)"
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-100"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Fetch Verse
      </button>
    </form>
  );
}

export default VerseForm;
