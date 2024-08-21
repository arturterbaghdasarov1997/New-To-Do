import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = '/api/v1/task';

interface Task {
  id: string;
  taskName: string;
  taskAuthorName: string;
  taskAuthorLastname: string;
  taskDate: string;
  isCompleted: boolean;
  tags?: string[];
}

interface FetchTasksResponse {
  items: Task[];
}

export const fetchTasks = createAsyncThunk<Task[]>(
  'tasks/fetchTasks',
  async () => {
    const response = await fetch(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch tasks');
    const data: FetchTasksResponse = await response.json();
    return data.items;
  }
);

export const createTask = createAsyncThunk<Task, Task>(
  'tasks/createTask',
  async (task) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to create task');
    const data: Task = await response.json();
    return data;
  }
);

export const updateTask = createAsyncThunk<Task, Task>(
  'tasks/updateTask',
  async (task) => {
    const response = await fetch(`${API_URL}/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to update task');
    const data: Task = await response.json();
    return data;
  }
);

export const deleteTask = createAsyncThunk<string, string>(
  'tasks/deleteTask',
  async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    });
    if (!response.ok) throw new Error('Failed to delete task');
    return id;
  }
);