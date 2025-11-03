import React, { useEffect, useState } from 'react';
import ExerciseTable from '../components/ExerciseTable.jsx';
import { useExercisesApi } from '../apiService.js'; 


const HomePage = () => {
  const [exercises, setExercises] = useState([]);
  
  const { getAllExercises, deleteExercise } = useExercisesApi(); 

  useEffect(() => {
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
  }, [getAllExercises]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this exercise?')) return;

    try {
      await deleteExercise(id);
      
      setExercises(exercises.filter((ex) => ex._id !== id));
      alert('Deleted successfully');
      
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete exercise: ' + err.message); 
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