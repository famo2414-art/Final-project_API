function Home() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Created by Faiz Mohammed</h2>
      <p className="text-lg text-gray-900 dark:text-white">
        Welcome to the Bible Verse Journal, an application designed to inspire and organize your spiritual journey. This app allows you to fetch random Bible verses, search for specific passages, and save your favorite verses with personal notes. It integrates the NET Bible API (<a href="https://labs.bible.org/api/" className="text-blue-600 hover:underline">https://labs.bible.org/api/</a>) to provide accurate and accessible scripture.
      </p>
      <p className="text-lg text-gray-900 dark:text-white">
        The app was developed using React and Vite for a responsive frontend, styled with Tailwind CSS for a modern and clean interface. The backend, built with Node.js and Express, handles API requests and stores data in JSON files. Features include fetching random or specific verses, saving verses with notes, and viewing search history, all enhanced with smooth animations and user-friendly design.
      </p>
    </div>
  );
}

export default Home;
