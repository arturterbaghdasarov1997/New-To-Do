import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ToDoForm from '../components/ToDoForm';

const EditPage = ({ taskList, onFormSubmit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = taskList.find(task => task.id === id);

  const handleFormSubmit = (task) => {
    onFormSubmit(task);
    navigate('/');
  };

  return (
    <div>
      <h2>Edit Task</h2>
      {task && (
        <ToDoForm
          onFormSubmit={handleFormSubmit}
          editId={id}
          task={task}
        />
      )}
    </div>
  );
}

export default EditPage;