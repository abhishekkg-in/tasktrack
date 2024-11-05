import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/tasks/tasksSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer
  },
});
