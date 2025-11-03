import React, { useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navigation from './components/Navigation.jsx';
import HomePage from './pages/HomePage.jsx';
import CreateExercisePage from './pages/CreateExercisePage.jsx';
import EditExercisePage from './pages/EditExercisePage.jsx';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  if (isAuthenticated) {
    return children;
  }

  return <div>Redirecting to login...</div>;
};

const App = () => (
  <BrowserRouter>
    <header>
      <h1>Exercise Tracker</h1>
      <p>Track your exercises efficiently.</p>
      <Navigation />
    </header>

    <main>
      <Routes>
        
        <Route path="/" element={<HomePage />} /> 

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateExercisePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditExercisePage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>

    <footer>© 2025 Emmanuel Murillo</footer>
  </BrowserRouter>
);

export default App;