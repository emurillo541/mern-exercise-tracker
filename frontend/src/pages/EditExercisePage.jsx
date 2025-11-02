import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditExercisePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    if (state?.exercise) {
      const { date } = state.exercise;

      
      const [month, day, year] = date.split('-');
      const formattedDate = `20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

      setExercise({ ...state.exercise, date: formattedDate });
    } else {
      alert('No exercise to edit');
      navigate('/');
    }
  }, [state, navigate]);

  if (!exercise) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const [year, month, day] = exercise.date.split('-');
    const shortDate = `${month}-${day}-${year.slice(-2)}`;

    const updated = {
      name: exercise.name.trim(),
      reps: parseInt(exercise.reps),
      weight: parseInt(exercise.weight),
      unit: exercise.unit,
      date: shortDate,
    };

    console.log('Sending updated exercise:', updated);

    try {
      const res = await fetch(`/exercises/${exercise._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      if (res.status === 200) {
        alert('Exercise updated successfully!');
        navigate('/');
      } else {
        const error = await res.json();
        console.error('Backend error:', error);
        alert('Failed to update exercise: ' + (error?.Error || res.status));
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update exercise.');
    }
  };

  return (
    <section>
      <h2>Edit Exercise</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={exercise.name} onChange={handleChange} required />
        </label>
        <label>
          Reps:
          <input type="number" name="reps" value={exercise.reps} onChange={handleChange} required />
        </label>
        <label>
          Weight:
          <input type="number" name="weight" value={exercise.weight} onChange={handleChange} required />
        </label>
        <label>
          Unit:
          <select name="unit" value={exercise.unit} onChange={handleChange} required>
            <option value="lbs">lbs</option>
            <option value="kgs">kgs</option>
          </select>
        </label>
        <label>
          Date:
          <input type="date" name="date" value={exercise.date} onChange={handleChange} required />
        </label>
        <button type="submit">Save</button>
      </form>
    </section>
  );
};

export default EditExercisePage;