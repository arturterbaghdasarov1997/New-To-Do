import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../features/tasks/tasksThunks';
import ToDoForm from '../components/ToDoForm';

const CreatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (task) => {
    dispatch(createTask(task));
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