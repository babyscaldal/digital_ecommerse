import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authServices from "./userService";
import { toast } from "react-toastify";
import { IRegisterInfoData } from "../../../components/SignUpForm";
import {
  ILoginRequestData,
  ILoginResponseData,
  IRegisterRequestData,
} from "./userType";
import { RootState } from "../../store";
import { IMyProfileFormValue } from "../../../components/MyProfileForm";

interface IAuthState {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  createdUser: IRegisterRequestData;
  loggedInUser: ILoginRequestData;
  usersClient: IRegisterInfoData[];
  isLogin: boolean;
  token: string | null;
  currentUser: ILoginResponseData | null;
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: IRegisterRequestData, thunkAPI) => {
    try {
      const res = await authServices.register(userData);

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: ILoginRequestData, thunkAPI) => {
    try {
      return await authServices.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      return await authServices.getCurrentUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCurrentUser = createAsyncThunk(
  "auth/updateCurrentUser",
  async (userData: IMyProfileFormValue, thunkAPI) => {
    try {
      return await authServices.updateCurrentUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const allUsers = localStorage.getItem("allUsers");

const getCustomerFromLocalStorage: string | null =
  localStorage.getItem("customer");

const currentCustomer = getCustomerFromLocalStorage
  ? JSON.parse(getCustomerFromLocalStorage)
  : null;

const authState: IAuthState = {
  token: null,
  currentUser: null,
  isLogin: !!currentCustomer?.user?.token || false,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  createdUser: {} as IRegisterRequestData,
  loggedInUser: currentCustomer ? currentCustomer : {},
  usersClient: allUsers ? JSON.parse(allUsers) : [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    saveUserToClient: (state, action: PayloadAction<IRegisterInfoData>) => {
      const isRegistered = state.usersClient.some(
        (user) => user.email === action.payload.email
      );
      if (!isRegistered) {
        state.usersClient.push(action.payload);
        localStorage.setItem("allUsers", JSON.stringify(state.usersClient));
      } else {
        state.usersClient = [...state.usersClient];
      }
    },
    logout: (state) => {
      state.isLogin = false;
      localStorage.removeItem("customer");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<IRegisterRequestData>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.createdUser = action.payload;
          state.isLogin = true;
          if (state.isSuccess) {
            toast.success("User is created successfully!");
          }
        }
      )
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        if (state.isError) {
          toast.error(
            "This user name or email has been taken. Please try again!"
          );
        }
      })

      //Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<ILoginRequestData>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.loggedInUser = action.payload;
          state.isLogin = true;
          if (state.isSuccess) {
            toast.success("User logged in successfully");
          }
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        if (state.isError) {
          toast.error(
            "This user name or password was wrong. Please try again!"
          );
        }
      })

      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getCurrentUser.fulfilled,
        (state, action: PayloadAction<ILoginResponseData>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.currentUser = action.payload;
        }
      )
      .addCase(getCurrentUser.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.currentUser = null;
      })

      .addCase(updateCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCurrentUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updateCurrentUser.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.currentUser = null;
      });
  },
});

export const usersSaved = (state: RootState) => state?.auth?.usersClient;
export const isLoginState = (state: RootState) => state?.auth?.isLogin;
export const currentUserState = (state: RootState) => state?.auth?.currentUser;

export const { saveUserToClient, logout } = authSlice.actions;
export default authSlice.reducer;
