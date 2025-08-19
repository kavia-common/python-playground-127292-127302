import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Playground from './pages/Playground';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Snippets from './pages/Snippets';
import History from './pages/History';
import ProtectedRoute from './components/ProtectedRoute';

/**
 * Root application entry rendering layout and routes.
 * Keeps a simple local theme state and applies it to the document element.
 */
function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  function toggleTheme() {
    /** Toggle between 'light' and 'dark' themes, persisted in localStorage. */
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <header className="header">
            <Header theme={theme} onToggleTheme={toggleTheme} />
          </header>

          <main className="main">
            <Routes>
              <Route path="/" element={<Navigate to="/play" replace />} />
              <Route path="/play" element={<Playground />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/snippets"
                element={
                  <ProtectedRoute>
                    <Snippets />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/play" replace />} />
            </Routes>
          </main>

          <footer className="footer">
            <Footer />
          </footer>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
