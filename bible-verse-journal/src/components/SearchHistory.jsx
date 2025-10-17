function SearchHistory({ history }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 border-b border-gray-400 dark:border-gray-600 pb-2 text-center">
        Search History
      </h2>
      {history.length === 0 && (
        <p className="text-gray-700 dark:text-gray-300 text-center">
          No search history yet.
        </p>
      )}
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <p className="text-lg text-gray-900 dark:text-white">
              {entry.verse || entry.text}
              <span className="italic ml-2 text-blue-600 dark:text-blue-400">
                — {entry.reference || `${entry.bookname} ${entry.chapter}:${entry.verseNum}`}
              </span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              ⏱ {new Date(entry.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;
