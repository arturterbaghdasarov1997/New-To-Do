import React, { useState, useEffect } from 'react';
import { Task } from '../features/tasks/tasksSlice';

interface ToDoFormProps {
  onFormSubmit: (task: Task) => void;
  editId?: string;
  task?: Task;
}

const ToDoForm: React.FC<ToDoFormProps> = ({ onFormSubmit, editId, task }) => {
  const [taskName, setTaskName] = useState('');
  const [taskAuthorName, setTaskAuthorName] = useState('');
  const [taskAuthorLastname, setTaskAuthorLastname] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTaskName(task.taskName);
      setTaskAuthorName(task.taskAuthorName);
      setTaskAuthorLastname(task.taskAuthorLastname);
      setTaskDate(task.taskDate);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taskData: Task = {
      id: editId || '',
      taskName,
      taskAuthorName,
      taskAuthorLastname,
      taskDate,
      isCompleted: false,
    };
    onFormSubmit(taskData);
    setTaskName('');
    setTaskAuthorName('');
    setTaskAuthorLastname('');
    setTaskDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author First Name"
        value={taskAuthorName}
        onChange={(e) => setTaskAuthorName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author Last Name"
        value={taskAuthorLastname}
        onChange={(e) => setTaskAuthorLastname(e.target.value)}
        required
      />
      <input
        type="date"
        value={taskDate}
        onChange={(e) => setTaskDate(e.target.value)}
        required
      />
      <button type="submit">{editId ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default ToDoForm;
