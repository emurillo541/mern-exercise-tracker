import React, { useEffect, useState } from 'react';
import ExerciseTable from '../components/ExerciseTable.jsx';
import { API_BASE_URL } from '../config.js';

const HomePage = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/exercises`);
        if (!res.ok) throw new Error('Failed to fetch exercises');
        const data = await res.json();
        setExercises(data);
      } catch (err) {
        console.error('Fetch error:', err);
        alert('Failed to load exercises');
      }
    };

    fetchExercises();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this exercise?')) return;

    try {
      const res = await fetch(`${API_BASE_URL}/exercises/${id}`, { method: 'DELETE' });
      if (res.status === 204) {
        setExercises(exercises.filter((ex) => ex._id !== id));
        alert('Deleted successfully');
      } else {
        const error = await res.json();
        alert('Failed to delete exercise: ' + (error?.Error || res.status));
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete exercise.');
    }
  };

  return (
    <section>
      <h1>All Exercises</h1>
      <ExerciseTable exercises={exercises} onDelete={handleDelete} />
    </section>
  );
};

export default HomePage;
