import React, { useState, useEffect } from 'react';
import ExerciseTable from '../components/ExerciseTable.jsx';
import { API_BASE_URL } from '../config.js';

const HomePage = () => {
  const [exercises, setExercises] = useState([]);

  const fetchExercises = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/exercises`);
      const data = await res.json();
      setExercises(data);
    } catch (e) {
      console.error('Fetch error:', e);
    }
  };

  const deleteExercise = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this exercise?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/exercises/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        let errData = {};
        try {
          errData = await response.json();
        } catch (_) {}
        console.error('Failed to delete exercise:', errData);
        alert("Failed to delete exercise: " + (errData?.Error || response.status));
        return;
      }

      setExercises((prev) => prev.filter((e) => String(e._id) !== String(id)));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting exercise.');
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <section>
      <ExerciseTable exercises={exercises} onDelete={deleteExercise} />
    </section>
  );
};

export default HomePage;