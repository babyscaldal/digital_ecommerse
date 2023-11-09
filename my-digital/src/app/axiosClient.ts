import axios from "axios"
import queryString from "query-string"
import { ILoginResponseData } from "./Redux/users/userType"

const axiosClient = axios.create({
  headers: {
    Accept: "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

// Add a request interceptor

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const userDataInLocal = localStorage.getItem("customer")
    if (userDataInLocal && typeof userDataInLocal === "string") {
      let userData: ILoginResponseData = JSON.parse(userDataInLocal)
      let token = userData.user.token
      config.headers["Authorization"] = `Bearer ${token}`
      return config
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  },
)

export default axiosClient
