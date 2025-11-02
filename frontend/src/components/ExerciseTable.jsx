import React from 'react';
import ExerciseRow from './ExerciseRow.jsx';

const ExerciseTable = ({ exercises, onDelete }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Reps</th>
        <th>Weight</th>
        <th>Unit</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {exercises.map((exercise) => (
        <ExerciseRow key={exercise._id} exercise={exercise} onDelete={onDelete} />
      ))}
    </tbody>
  </table>
);

export default ExerciseTable;