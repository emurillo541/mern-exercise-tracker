import React, { useEffect, useState } from 'react';
import ExerciseTable from '../components/ExerciseTable.jsx';
import { useExercisesApi } from '../../api/apiService.js';
import { useAuth0 } from '@auth0/auth0-react';

const HomePage = () => {
  const { isAuthenticated } = useAuth0(); 
  const [exercises, setExercises] = useState([]);
  const { getAllExercises, deleteExercise } = useExercisesApi();

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
        console.error('Fetch error:', err);
        alert('Failed to load exercises. You may need to log in again.');
      }
    };

    fetchExercises();
  }, [isAuthenticated, getAllExercises]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this exercise?')) return;

    try {
      await deleteExercise(id);
      setExercises((prev) => prev.filter((ex) => ex._id !== id));
      alert('Deleted successfully');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete exercise: ' + err.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <section>
        <h1>Welcome to Exercise Tracker</h1>
        <p>Please log in to view and manage your exercises.</p>
      </section>
    );
  }

  if (exercises.length === 0) {
    return (
      <section>
        <h1>All Exercises</h1>
        <p>You haven't logged any exercises yet! Click "Create Exercise" to add your first entry.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Exercises</h1>
      <ExerciseTable exercises={exercises} onDelete={handleDelete} />
    </section>
  );
};

export default HomePage;
