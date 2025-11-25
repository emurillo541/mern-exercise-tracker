import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navigation from './components/Navigation.jsx';
import HomePage from './pages/HomePage.jsx';
import CreateExercisePage from './pages/CreateExercisePage.jsx';
import EditExercisePage from './pages/EditExercisePage.jsx';
import { useExercisesApi } from '../api/apiService.js';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  useEffect(() => {
    if (!isAuthenticated && !isLoading) loginWithRedirect();
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  return isAuthenticated ? children : <div>Redirecting to login...</div>;
};

const App = () => {
  const { isAuthenticated } = useAuth0();
  const { getAllExercises, deleteExercise } = useExercisesApi();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      setExercises([]);
      return;
    }

    const fetchExercises = async () => {
      try {
        const data = await getAllExercises();
        setExercises(data);
      } catch (err) {
        console.error('Failed to fetch exercises:', err);
      }
    };

    fetchExercises();
  }, [isAuthenticated, getAllExercises]);

  const handleDelete = async (id) => {
    try {
      await deleteExercise(id);
      setExercises((prev) => prev.filter((ex) => ex._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete exercise');
    }
  };

  return (
    <BrowserRouter>
      <header>
        <h1>Exercise Tracker</h1>
        <p>Track your exercises efficiently.</p>
        <Navigation />
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={<HomePage exercises={exercises} onDelete={handleDelete} />}
          />

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
};

export default App;