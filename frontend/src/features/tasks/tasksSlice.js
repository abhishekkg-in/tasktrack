import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import tasksServices from './tasksServices'

const user = localStorage.getItem('user')

const initialState = {
    tasks: [],
    taskWithColumn: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

export const getAllTasks = createAsyncThunk(
    'task/getAll',
    async (userData, thunkAPI) => {
        try {
            // console.log("user--->>>>>> ", user);
            return await tasksServices.getAllTask()
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const createTask = createAsyncThunk(
    'task/create',
    async (userData, thunkAPI) => {
        try {
            return await tasksServices.createTask(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateTask = createAsyncThunk(
    'task/update',
    async (userData, thunkAPI) => {
        try {
            return await tasksServices.updateTask(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteTask = createAsyncThunk(
    'task/delete',
    async (userData, thunkAPI) => {
        try {
            return await tasksServices.deleteTask(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)



// export const getAllTasksByUser = createAsyncThunk(
//     'task/user',
//     async (userData, thunkAPI) => {
//         try {
//             // console.log("user.............. ", user);
//             // console.log(JSON.parse(user)._id);

//             return await tasksServices.getAllTaskforLoggedUser(JSON.parse(user)._id)
//         } catch (error) {
//             const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// )

// ----------------------- TASK SLICE ------------------

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllTasks.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllTasks.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.tasks = action.payload
            state.taskWithColumn = action.payload.reduce(
                (acc, task) => {
                  const status = task.status.toLowerCase(); // Convert status to lowercase
                  acc[status] = [...(acc[status] || []), task];
                  return acc;
                },
                { todo: [], inprogress: [], done: [] } // Adjust statuses as needed
              );
        })
        .addCase(getAllTasks.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.tasks = []
        })
        .addCase(updateTask.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(updateTask.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.tasks = null
        })
        .addCase(createTask.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createTask.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createTask.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.tasks = null
        })
        .addCase(deleteTask.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(deleteTask.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.tasks = null
        })
        // .addCase(getAllTasksByUser.pending, (state) => {
        //     state.isLoading = true
        // })
        // .addCase(getAllTasksByUser.fulfilled, (state, action) => {
        //     state.isLoading = false
        //     state.isSuccess = true
        //     state.userTasks = action.payload
        // })
        // .addCase(getAllTasksByUser.rejected, (state, action) => {
        //     state.isLoading = false
        //     state.isError = true
        //     state.message = action.payload
        //     state.userTasks = []
        // })
    }
})

export const {reset} = taskSlice.actions
export default taskSlice.reducer