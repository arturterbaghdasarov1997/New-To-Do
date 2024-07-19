import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = ({ taskList, toggleCompletion, deleteTask }) => (
  <div className='MainPage'>
    <Link to="/create">Create New Task</Link>
    {taskList.map((task) => (
      <div key={task.id} className='Task'>
        <h3>Task: {task.taskName}</h3>
        <p>Author's Name: {task.taskAuthorName}</p>
        <p>Author's Lastname: {task.taskAuthorLastname}</p>
        <p>Date: {task.taskDate}</p>
        <p>Completed: {task.isCompleted ? "Yes" : "No"}</p>
        <div className="taskButtons">
          <button className={task.isCompleted ? 'MarkIncomplete' : 'MarkComplete'} onClick={() => toggleCompletion(task.id)}>
            {task.isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
          </button>
          <Link to={`/edit/${task.id}`}>
            <button className='Edit'>Edit</button>
          </Link>
          <button style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }} className='Delete' onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      </div>
    ))}
  </div>
);

export default MainPage;