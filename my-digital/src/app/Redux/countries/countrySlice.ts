import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store"

import { ICountry } from "./countryType"
import countryServices from "./countryServices"

export const getAllCountries = createAsyncThunk(
  "country/getAllCountries",
  async (_, thunkAPI) => {
    try {
      const response = await countryServices.getAllCountries()
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

interface ICountryState {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  countries: ICountry[]
  cities: string[]
  message: any
}

const countryState: ICountryState = {
  countries: [],
  cities: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

export const countrySlice = createSlice({
  name: "country",
  initialState: countryState,
  reducers: {
    getCities: (state, action: PayloadAction<string[]>) => {
      state.cities = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountries.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getAllCountries.fulfilled,
        (state, action: PayloadAction<ICountry[]>) => {
          state.countries = action.payload
          state.isLoading = false
          state.isSuccess = true
          state.isError = false
        },
      )
      .addCase(getAllCountries.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.error.message
      })
  },
})

export const allCountriesState = (state: RootState) => state?.country.countries
export const isLoadingState = (state: RootState) => state?.country?.isLoading
export const citiesState = (state: RootState) => state?.country?.cities

export const { getCities } = countrySlice.actions
export default countrySlice.reducer
