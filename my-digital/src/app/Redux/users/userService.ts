import { IMyProfileFormValue } from "../../../components/MyProfileForm"
import axiosClient from "../../axiosClient"
import { ILoginRequestData, IRegisterRequestData } from "./userType"

const authServices = {
  register: async (userData: IRegisterRequestData) => {
    const REGISTER_URL = "https://api.realworld.io/api/users"
    const response = await axiosClient.post(REGISTER_URL, userData)
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data))
      return response.data
    }
    return response
  },

  login: async (userData: ILoginRequestData) => {
    const LOGIN_URL = "https://api.realworld.io/api/users/login"
    const response = await axiosClient.post(LOGIN_URL, userData)
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data))
      return response.data
    }
    return response
  },

  getCurrentUser: async () => {
    const GET_CURRENT_USER_URL = "https://api.realworld.io/api/user"
    const response = await axiosClient.get(GET_CURRENT_USER_URL)
    return response.data
  },

  updateCurrentUser: async (userData: IMyProfileFormValue) => {
    const UPDATE_CURRENT_USER_URL = "https://api.realworld.io/api/user"
    const response = await axiosClient.put(UPDATE_CURRENT_USER_URL, userData)
    return response.data
  },
}

export default authServices
