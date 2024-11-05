import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import tasksServices from './tasksServices'

const initialState = {
    tasks: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

export const getAllTasks = createAsyncThunk(
    'task/getAll',
    async (userData, thunkAPI) => {
        try {
            return await tasksServices.getAllTask()
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

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
        })
        .addCase(getAllTasks.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.tasks = null
        })
    }
})

export const {reset} = taskSlice.actions
export default taskSlice.reducer