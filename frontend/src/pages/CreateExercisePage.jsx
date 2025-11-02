import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateExercisePage = () => {
  const navigate = useNavigate();
  const [exercise, setExercise] = useState({
    name: '',
    reps: '',
    weight: '',
    unit: 'lbs',
    date: '',
  });

  const handleChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [year, month, day] = exercise.date.split('-');
    const shortDate = `${month}-${day}-${year.slice(-2)}`;

    const payload = {
      name: exercise.name,
      reps: parseInt(exercise.reps),
      weight: parseInt(exercise.weight),
      unit: exercise.unit,
      date: shortDate,
    };

    try {
      const res = await fetch('/exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 201) {
        alert('Exercise created successfully!');
      } else {
        alert('Failed to create exercise.');
      }
    } catch (err) {
      console.error('Create error:', err);
      alert('Failed to create exercise.');
    }

    navigate('/');
  };

  return (
    <section>
      <h2>Create Exercise</h2>
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
        <button type="submit">Create</button>
      </form>
    </section>
  );
};

export default CreateExercisePage;