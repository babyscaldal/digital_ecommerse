import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import contactServices from "./contactServices"
import { IContact, ISubscribeEmail } from "./contactType"
import { ac } from "vitest/dist/types-e3c9754d.js"
import { toast } from "react-toastify"

export const postContactInfo = createAsyncThunk(
  "contact/postContactInfo",
  async (contactData: IContact, thunkAPI) => {
    try {
      const response = await contactServices.postContactInfo(contactData)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const postSubscribeEmailInfo = createAsyncThunk(
  "contact/postSubscribeEmailInfo",
  async (subscribeEmail: ISubscribeEmail, thunkAPI) => {
    try {
      const response = await contactServices.postSubscribeEmailInfo(
        subscribeEmail,
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

interface IContactState {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  contacts: IContact[]
  subscribe: ISubscribeEmail[]
  message: any
}

const contactState: IContactState = {
  subscribe: [],
  contacts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

export const contactSlice = createSlice({
  name: "contact",
  initialState: contactState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postContactInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        postContactInfo.fulfilled,
        (state, action: PayloadAction<IContact>) => {
          state.contacts = [...state.contacts, action.payload]
          state.isLoading = false
          state.isSuccess = true
          state.isError = false
          if (state.isSuccess) {
            toast.success("Contact info is created successfully!")
          }
        },
      )
      .addCase(postContactInfo.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.error.message
        if (state.isError) {
          toast.error("Something went wrong. Please try again!")
        }
      })
      .addCase(postSubscribeEmailInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        postSubscribeEmailInfo.fulfilled,
        (state, action: PayloadAction<ISubscribeEmail>) => {
          state.subscribe = [...state.subscribe, action.payload]
          state.isLoading = false
          state.isSuccess = true
          state.isError = false
          if (state.isSuccess) {
            toast.success("Your subscribe is added successfully!")
          }
        },
      )
      .addCase(postSubscribeEmailInfo.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.error.message
        if (state.isError) {
          toast.error("Something went wrong. Please try again!")
        }
      })
  },
})

export const allContactState = (state: RootState) => state?.contact.contacts
export const isLoadingState = (state: RootState) => state?.product?.isLoading
export default contactSlice.reducer
