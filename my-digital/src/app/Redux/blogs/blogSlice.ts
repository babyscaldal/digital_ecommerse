import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import blogServices from "./blogService"
import { IBlogResponse } from "./blogType"
import { RootState } from "../../store"

export const getAllBlogs = createAsyncThunk(
  "blogs/getAllBlogs",
  async (_, thunkAPI) => {
    try {
      const response = await blogServices.getAllBlogs()
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

interface IBlogsState {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  allBlogs: IBlogResponse[]
  message: any
}

const blogState: IBlogsState = {
  allBlogs: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
}

export const blogsSlice = createSlice({
  name: "blog",
  initialState: blogState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getAllBlogs.fulfilled,
        (state, action: PayloadAction<IBlogResponse[]>) => {
          state.allBlogs = action.payload
          state.isLoading = false
          state.isSuccess = true
          state.isError = false
        },
      )
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.error.message
      })
  },
})

export const allBlogState = (state: RootState) => state?.blog?.allBlogs
export default blogsSlice.reducer
