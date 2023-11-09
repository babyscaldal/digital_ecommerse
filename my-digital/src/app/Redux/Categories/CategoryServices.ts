import axiosClient from "../../axiosClient"

const categoryService = {
  getAllCategories: async () => {
    const GET_ALL_CATEGORY_URL =
      "https://digital-ecommerse-api.onrender.com/categories"
    const response = await axiosClient.get(GET_ALL_CATEGORY_URL)
    return response
  },
}

export default categoryService
