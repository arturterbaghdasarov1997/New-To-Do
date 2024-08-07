import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks, createTask, updateTask, deleteTask } from './tasksThunks';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        taskList: [],
        loading: false,
        error: null,
    },
    reducers: {
        toggleComletion: (state, action) => {
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
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.taskList = action.payload;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(createTask.fulfilled, (state, action) => {
            state.taskList.push(action.payload)
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            const index = state.taskList.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.taskList[index] = action.payload
            }
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
            state.taskList = state.taskList.filter(task => task.id !== action.payload);
        });
    },
});

export const { toggleComletion } = tasksSlice.actions;
export default tasksSlice.reducer;