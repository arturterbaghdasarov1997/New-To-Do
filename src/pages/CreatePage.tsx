import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store/store';
import { createTask } from '../features/tasks/tasksThunks';
import ToDoForm from '../components/ToDoForm';
import { Task } from '../features/tasks/tasksSlice';

const CreatePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleFormSubmit = (task: Task) => {
    dispatch(createTask(task))
      .unwrap()
      .then(() => navigate('/'))
      .catch((err) => {
        console.error('Failed to create task:', err);
      });
  };

  return (
    <div>
      <h2>Create Task</h2>
      <ToDoForm onFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default CreatePage;
