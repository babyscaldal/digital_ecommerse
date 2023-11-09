import axiosClient from "../../axiosClient"
import { IComments } from "./productType"

const productServices = {
  getAllProducts: async () => {
    const GET_ALL_PRODUCT_URL =
      "https://digital-ecommerse-api.onrender.com/products"
    const response = await axiosClient.get(GET_ALL_PRODUCT_URL)
    return response
  },

  getProductByCategory: async (id: number) => {
    const GET_PRODUCTS_IN_CATEGORY_URL = `https://digital-ecommerse-api.onrender.com/categories/${id}/products`

    const response = await axiosClient.get(GET_PRODUCTS_IN_CATEGORY_URL)
    return response
  },

  getPopularProducts: async () => {
    const GET_POPULAR_PRODUCT_URL =
      "https://digital-ecommerse-api.onrender.com/popular"
    const response = await axiosClient.get(GET_POPULAR_PRODUCT_URL)
    return response
  },
  searchProducts: async (searchValue: string) => {
    const SEARCH_PRODUCT_URL = `https://digital-ecommerse-api.onrender.com/products?q=${encodeURIComponent(
      searchValue,
    )}`
    const response = await axiosClient.get(SEARCH_PRODUCT_URL)
    return response
  },
  getCommentsSingleProduct: async (productId: number) => {
    const GET_COMMENTS_SINGLE_PRODUCTS_URL = `https://digital-ecommerse-api.onrender.com/products/${productId}/comments`
    const response = await axiosClient.get(GET_COMMENTS_SINGLE_PRODUCTS_URL)
    return response
  },

  postCommentsSingleProduct: async (data: IComments) => {
    const POST_COMMENTS_SINGLE_PRODUCTS_URL = `https://digital-ecommerse-api.onrender.com/comments`
    const response = await axiosClient.post(
      POST_COMMENTS_SINGLE_PRODUCTS_URL,
      data,
    )
    return response
  },
}

export default productServices
