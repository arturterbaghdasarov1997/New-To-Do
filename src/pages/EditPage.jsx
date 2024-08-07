import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTask } from '../features/tasks/tasksThunks';
import ToDoForm from '../components/ToDoForm';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const task = useSelector(state => state.tasks.taskList.find(task => task.id === id));

  const handleFormSubmit = (task) => {
    dispatch(updateTask(task));
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