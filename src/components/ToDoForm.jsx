import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const ToDoForm = ({ onFormSubmit, editId, task }) => {
  const [taskName, setTaskName] = useState('');
  const [taskAuthorName, setTaskAuthorName] = useState('');
  const [taskAuthorLastname, setTaskAuthorLastname] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [error, setError] = useState('');
  const theme = useSelector(state => state.theme);

  useEffect(() => {
    if (task) {
      setTaskName(task.taskName);
      setTaskAuthorName(task.taskAuthorName);
      setTaskAuthorLastname(task.taskAuthorLastname);
      setTaskDate(task.taskDate);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      id: editId,
      taskName,
      taskAuthorName,
      taskAuthorLastname,
      taskDate
    };
    try {
      await onFormSubmit(taskData);
      setTaskName('');
      setTaskAuthorName('');
      setTaskAuthorLastname('');
      setTaskDate('');
      setError('');
    } catch (err) {
      console.error(err);
      setError('An error occurred while submitting the form. Please try again.');
    }
  };

  return (
    <form className={`taskForm ${theme}`} onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Task Name"
        className={`inputForm ${theme}`} onSubmit={handleSubmit}
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author First Name"
        className={`inputForm ${theme}`} onSubmit={handleSubmit}
        value={taskAuthorName}
        onChange={(e) => setTaskAuthorName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author Last Name"
        className={`inputForm ${theme}`} onSubmit={handleSubmit}
        value={taskAuthorLastname}
        onChange={(e) => setTaskAuthorLastname(e.target.value)}
        required
      />
      <input
        type="date"
        className={`inputForm ${theme}`} onSubmit={handleSubmit}
        value={taskDate}
        onChange={(e) => setTaskDate(e.target.value)}
        required
      />
      <button type="submit">{editId ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

ToDoForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  editId: PropTypes.string,
  task: PropTypes.object
};

export default ToDoForm;