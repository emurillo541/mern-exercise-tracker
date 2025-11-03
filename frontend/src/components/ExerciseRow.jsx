import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; 

const ExerciseRow = ({ exercise, onDelete }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0(); 

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
        {/* Conditional Rendering: Only show buttons if the user is logged in */}
        {isAuthenticated ? (
          <>
            <FaEdit 
              onClick={handleEdit} 
              style={{ cursor: 'pointer', marginRight: '8px' }} 
            />
            <FaTrash 
              onClick={handleDelete} 
              style={{ cursor: 'pointer' }} 
            />
          </>
        ) : (
           
        )}
      </td>
    </tr>
  );
};

export default ExerciseRow;