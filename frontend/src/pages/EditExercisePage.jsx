import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useExercisesApi } from '../../api/apiService.js'; 

const EditExercisePage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [exercise, setExercise] = useState(null);
    const { updateExercise } = useExercisesApi(); 

    useEffect(() => {
        if (state?.exercise) {
            const [month, day, year] = state.exercise.date.split('-');
            const formattedDate = `20${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`;
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
        const shortDate = `${month.padStart(2,'0')}-${day.padStart(2,'0')}-${year.slice(-2)}`;

        const payload = {
            name: exercise.name.trim(),
            reps: parseInt(exercise.reps, 10),
            weight: parseInt(exercise.weight, 10),
            unit: exercise.unit,
            date: shortDate
        };

        try {
            await updateExercise(exercise._id, payload);
            alert('Exercise updated successfully!');
            navigate('/');
        } catch (err) {
            console.error('Update error:', err);
            alert('Failed to update exercise: ' + err.message);
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