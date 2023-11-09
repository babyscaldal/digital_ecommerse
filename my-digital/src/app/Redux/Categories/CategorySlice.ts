import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import categoryService from "./CategoryServices"
import { RootState } from "../../store"
import { ICategoryResponse } from "./CategoryType"

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, thunkAPI) => {
    try {
      const response = await categoryService.getAllCategories()
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

interface ICategoryState {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  categories: ICategoryResponse[]
  message: any
}

const categoryState: ICategoryState = {
  categories: [] as ICategoryResponse[],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

export const categorySlice = createSlice({
  name: "category",
  initialState: categoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getAllCategories.fulfilled,
        (state, action: PayloadAction<ICategoryResponse[]>) => {
          state.categories = action.payload
          state.isLoading = false
          state.isSuccess = true
          state.isError = false
        },
      )
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.error.message
      })
  },
})

export const categories = (state: RootState) => state?.category?.categories
export const isLoadingState = (state: RootState) => state?.product?.isLoading
export default categorySlice.reducer
