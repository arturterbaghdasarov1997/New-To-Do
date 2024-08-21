import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { updateTask } from '../features/tasks/tasksThunks';
import ToDoForm from '../components/ToDoForm';
import { Task } from '../features/tasks/tasksSlice';

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const task = useSelector((state: RootState) =>
    state.tasks.taskList.find(task => task.id === id)
  );

  const handleFormSubmit = (updatedTask: Task) => {
    dispatch(updateTask(updatedTask))
      .unwrap()
      .then(() => navigate('/'))
      .catch((err) => {
        console.error('Failed to update task:', err);
      });
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
};

export default EditPage;
