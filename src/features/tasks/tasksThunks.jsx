import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = '/api/v1/task';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch(API_URL, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch tasks');
  const data = await response.json();
  return data.items.map(task => ({
    taskName: task.taskName,
    taskAuthorName: task.taskAuthorName,
    taskAuthorLastname: task.taskAuthorLastname,
    taskDate: task.taskDate,
    id: task._uuid,
    isCompleted: task.isCompleted,
    tags: task.tags || [],
  }));
});

export const createTask = createAsyncThunk('tasks/createTask', async (task) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify([task]),
  });
  if (!response.ok) throw new Error('Failed to create task');
  const data = await response.json();
  return data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
  const response = await fetch(`${API_URL}/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error('Failed to update task');
  const data = await response.json();
  return data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete task');
  return id;
});