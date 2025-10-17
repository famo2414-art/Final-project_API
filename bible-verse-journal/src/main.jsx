import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import Home from './components/Home.jsx';
import './index.css';

function Layout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white">
      <Toaster position="bottom-right" />
      <header className="bg-gradient-to-r from-blue-800 to-purple-800 text-white p-4 sticky top-0 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl md:text-3xl font-bold">Bible Verse Journal</Link>
          <div className="flex items-center space-x-4">
            <nav className="space-x-4">
              <Link to="/" className="hover:text-gray-300">Home</Link>
              <Link to="/journal" className="hover:text-gray-300">Journal</Link>
            </nav>
            <button
              onClick={toggleDarkMode}
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/journal" element={<Layout><App /></Layout>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
