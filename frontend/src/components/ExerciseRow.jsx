import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ExerciseRow = ({ exercise, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(exercise._id);
  };

  const handleEdit = () => {
    navigate(`/edit/${exercise._id}`, { state: { exercise } });
  };

  return (
    <tr>
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{exercise.date}</td>
      <td>
        <FaEdit onClick={handleEdit} style={{ cursor: 'pointer', marginRight: '8px' }} />
        <FaTrash onClick={handleDelete} style={{ cursor: 'pointer' }} />
      </td>
    </tr>
  );
};

export default ExerciseRow;
