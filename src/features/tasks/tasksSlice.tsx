import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTasks, createTask, updateTask, deleteTask } from './tasksThunks';
import { SerializedError } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  taskName: string;
  taskAuthorName: string;
  taskAuthorLastname: string;
  taskDate: string;
  isCompleted: boolean;
}

interface TasksState {
  taskList: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  taskList: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleCompletion: (state, action: PayloadAction<string>) => {
      const task = state.taskList.find(task => task.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.taskList = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.taskList.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.taskList.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.taskList[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.taskList = state.taskList.filter(task => task.id !== action.payload);
      });
  },
});

export const { toggleCompletion } = tasksSlice.actions;
export default tasksSlice.reducer;