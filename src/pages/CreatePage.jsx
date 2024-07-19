import React from 'react';
import { useNavigate } from 'react-router-dom';
import ToDoForm from '../components/ToDoForm';

const CreatePage = ({ onFormSubmit }) => {
  const navigate = useNavigate();

  const handleFormSubmit = (task) => {
    onFormSubmit(task);
    navigate('/');
  };

  return (
    <div>
      <h2>Create Task</h2>
      <ToDoForm onFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default CreatePage;