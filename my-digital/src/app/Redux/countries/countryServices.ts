import axiosClient from "../../axiosClient"

const countryServices = {
  getAllCountries: async () => {
    const COUNTRIES_URL = "https://digital-ecommerse-api.onrender.com/countries"
    const response = await axiosClient.get(COUNTRIES_URL)
    return response
  },
}

export default countryServices
