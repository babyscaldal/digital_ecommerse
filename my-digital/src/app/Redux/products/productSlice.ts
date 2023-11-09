import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

import productServices from "./productServices"
import { IComments, IProductResponse } from "./productType"
import { RootState } from "../../store"

interface IProductState {
  count: number
  allProduct: IProductResponse[]
  renderProducts: IProductResponse[]
  productsPerPage: IProductResponse[]
  searchResultProducts: IProductResponse[]
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: any
  popularList: IProductResponse[]
  filterProductsList: IProductResponse[]
  favoriteProducts: IProductResponse[]
  compareProducts: IProductResponse[]
  cartProducts: IProductResponse[]
  totalCartProductPrice: number
  comments: IComments[]
  selectedProduct: IProductResponse
}

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, thunkAPI) => {
    try {
      const response = await productServices.getAllProducts()
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const getPopularProducts = createAsyncThunk(
  "product/getPopularProducts",
  async (_, thunkAPI) => {
    try {
      const response = await productServices.getPopularProducts()
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const getProductsInCategory = createAsyncThunk(
  "product/getProductsInCategory",
  async (id: number, thunkAPI) => {
    try {
      const response = await productServices.getProductByCategory(id)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const searchProducts = createAsyncThunk(
  "product/searchProducts",
  async (searchValue: string, thunkAPI) => {
    try {
      const response = await productServices.searchProducts(searchValue)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const getCommentsSingleProduct = createAsyncThunk(
  "product/getCommentsSingleProduct",
  async (productId: number, thunkAPI) => {
    try {
      const response = await productServices.getCommentsSingleProduct(productId)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const postCommentsSingleProduct = createAsyncThunk(
  "product/postCommentsSingleProduct",
  async (data: IComments, thunkAPI) => {
    try {
      const response = await productServices.postCommentsSingleProduct(data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

const favoriteListInLocalStorage = localStorage.getItem("favoriteList")
const favoriteListInitState: IProductResponse[] = favoriteListInLocalStorage
  ? JSON.parse(favoriteListInLocalStorage)
  : []

const compareListInLocalStorage = localStorage.getItem("compareList")
const compareListInitState: IProductResponse[] = compareListInLocalStorage
  ? JSON.parse(compareListInLocalStorage)
  : []

const cartProductsInLocalStorage = localStorage.getItem("cartProducts")
const cartProductsInitState: IProductResponse[] = cartProductsInLocalStorage
  ? JSON.parse(cartProductsInLocalStorage)
  : []

const selectedProductInLocalStorage = localStorage.getItem("selectedProduct")
const selectedProductInitState: IProductResponse = selectedProductInLocalStorage
  ? JSON.parse(selectedProductInLocalStorage)
  : {}

const commentsProductInLocalStorage = localStorage.getItem("commentsProduct")
const commentsProductInitState: IComments[] = commentsProductInLocalStorage
  ? JSON.parse(commentsProductInLocalStorage)
  : []

export const productState: IProductState = {
  count: 1,
  renderProducts: [],
  filterProductsList: [],
  allProduct: [],
  productsPerPage: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  popularList: [],
  searchResultProducts: [],
  favoriteProducts: favoriteListInitState,
  compareProducts: compareListInitState,
  cartProducts: cartProductsInitState,
  totalCartProductPrice: 0,
  comments: commentsProductInitState,
  selectedProduct: selectedProductInitState,
}

export const productSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {
    changeProductsPerPage: (
      state,
      action: PayloadAction<IProductResponse[]>,
    ) => {
      state.productsPerPage = action.payload
    },

    sortProductsByAlphabetAZ: (state) => {
      state.renderProducts = state.renderProducts.slice().sort((a, b) => {
        const itemA = a.title.toUpperCase()
        const itemB = b.title.toUpperCase()
        return itemA.localeCompare(itemB)
      })
    },

    sortProductsByAlphabetZA: (state) => {
      state.renderProducts = state.renderProducts.slice().sort((a, b) => {
        const itemA = a.title.toUpperCase()
        const itemB = b.title.toUpperCase()
        return itemB.localeCompare(itemA)
      })
    },

    sortProductsByPriceHigh: (state) => {
      state.renderProducts = state.renderProducts.slice().sort((a, b) => {
        return a.price - b.price
      })
    },

    sortProductsByPriceLow: (state) => {
      state.renderProducts = state.renderProducts.slice().sort((a, b) => {
        return b.price - a.price
      })
    },

    cloneToFilterProductList: (
      state,
      action: PayloadAction<IProductResponse[]>,
    ) => {
      state.filterProductsList = action.payload
    },

    filterProductsByRate: (state, action: PayloadAction<number[]>) => {
      if (action.payload.length) {
        state.filterProductsList = state.renderProducts.filter((product) => {
          return action.payload.includes(Number(product.rating.rate.toFixed(0)))
        })
      } else {
        state.filterProductsList = state.renderProducts
      }
    },

    filterProductsByPrice: (state, action: PayloadAction<number[]>) => {
      state.filterProductsList = state.renderProducts.filter((product) => {
        return (
          product.price > action.payload[0] && product.price < action.payload[1]
        )
      })
    },

    resetToInit: (state) => {
      state.searchResultProducts = []
    },

    addProductsToFavoriteList: (
      state,
      action: PayloadAction<IProductResponse>,
    ) => {
      const isAdded = state.favoriteProducts.some(
        (product) => product.id === action.payload.id,
      )
      if (isAdded) return
      state.favoriteProducts = [...state.favoriteProducts, action.payload]
    },

    removeProductsFromFavoriteList: (
      state,
      action: PayloadAction<IProductResponse>,
    ) => {
      state.favoriteProducts = state.favoriteProducts.filter(
        (product) => product.id !== action.payload.id,
      )
    },

    addProductsToCompareList: (
      state,
      action: PayloadAction<IProductResponse>,
    ) => {
      const isAdded = state.compareProducts.some(
        (product) => product.id === action.payload.id,
      )
      if (isAdded) return
      state.compareProducts = [...state.compareProducts, action.payload]
    },

    removeProductsFromCompareList: (
      state,
      action: PayloadAction<IProductResponse>,
    ) => {
      state.compareProducts = state.compareProducts.filter(
        (product) => product.id !== action.payload.id,
      )
    },

    addProductsToCartList: (state, action: PayloadAction<IProductResponse>) => {
      const isAdded = state.cartProducts.some(
        (product) => product.id === action.payload.id,
      )
      if (isAdded) return
      state.cartProducts = [...state.cartProducts, action.payload]
    },

    removeProductsFromCartList: (
      state,
      action: PayloadAction<IProductResponse>,
    ) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload.id,
      )
    },

    removeAllProducts: (state) => {
      state.cartProducts = []
    },

    removeAllSelectedProductsFromCartList: (
      state,
      action: PayloadAction<IProductResponse[]>,
    ) => {
      const selectedProductIds = action.payload.map((product) => product.id)
      state.cartProducts = state.cartProducts.filter((cartProduct) => {
        return !selectedProductIds.includes(cartProduct.id)
      })
    },

    addTotalPriceToCartProducts: (
      state,
      action: PayloadAction<IProductResponse>,
    ) => {
      state.cartProducts = state.cartProducts.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            quantity: action.payload.quantity,
            totalPrice: action.payload.totalPrice,
          }
        }
        return product
      })
    },

    totalPriceCalculate: (state, action: PayloadAction<number>) => {
      state.totalCartProductPrice = action.payload
    },

    getSelectedProduct: (state, action: PayloadAction<IProductResponse>) => {
      state.selectedProduct = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<IProductResponse[]>) => {
          state.allProduct = action.payload
          state.renderProducts = action.payload
          state.isLoading = false
          state.isSuccess = true
          state.isError = false
        },
      )
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.error
      })
      .addCase(getProductsInCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getProductsInCategory.fulfilled,
        (state, action: PayloadAction<IProductResponse[]>) => {
          state.renderProducts = action.payload
          state.isLoading = false
          state.isSuccess = true
          state.isError = false
        },
      )
      .addCase(getProductsInCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.error
      })
      .addCase(getPopularProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getPopularProducts.fulfilled,
        (state, action: PayloadAction<IProductResponse[]>) => {
          state.popularList = action.payload
          state.isLoading = false
          state.isSuccess = true
          state.isError = false
        },
      )
      .addCase(getPopularProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.error
      })
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        searchProducts.fulfilled,
        (state, action: PayloadAction<IProductResponse[]>) => {
          state.renderProducts = action.payload
          state.searchResultProducts = action.payload
          state.isLoading = false
          state.isSuccess = true
          state.isError = false
        },
      )
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.error
      })
      .addCase(getCommentsSingleProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getCommentsSingleProduct.fulfilled,
        (state, action: PayloadAction<IComments[]>) => {
          state.comments = action.payload
          state.isLoading = false
          state.isSuccess = true
          state.isError = false
        },
      )
      .addCase(getCommentsSingleProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.error
      })
      .addCase(postCommentsSingleProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        postCommentsSingleProduct.fulfilled,
        (state, action: PayloadAction<IComments>) => {
          state.comments = [...state.comments, action.payload]
          state.isLoading = false
          state.isSuccess = true
          state.isError = false
        },
      )
      .addCase(postCommentsSingleProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.error
      })
  },
})

export const allProductsState = (state: RootState) => state?.product?.allProduct
export const popularProductsState = (state: RootState) =>
  state?.product?.popularList

export const renderProductsState = (state: RootState) =>
  state?.product?.renderProducts

export const filterProductsListState = (state: RootState) =>
  state?.product?.filterProductsList

export const productPerPageState = (state: RootState) =>
  state?.product?.productsPerPage

export const searchProductsState = (state: RootState) =>
  state?.product?.renderProducts

export const resetToInitState = (state: RootState) =>
  state?.product?.renderProducts

export const favoriteProductsState = (state: RootState) =>
  state?.product?.favoriteProducts

export const compareProductsState = (state: RootState) =>
  state?.product?.compareProducts

export const countState = (state: RootState) => state?.product?.count

export const isLoadingState = (state: RootState) => state?.product?.isLoading

export const cartProductsState = (state: RootState) =>
  state?.product?.cartProducts

export const totalCartProductPriceState = (state: RootState) =>
  state?.product?.totalCartProductPrice

export const commentsSingleProductState = (state: RootState) =>
  state?.product?.comments

export const selectedProductState = (state: RootState) =>
  state?.product?.selectedProduct

export const {
  removeAllSelectedProductsFromCartList,
  addProductsToCartList,
  addProductsToFavoriteList,
  removeProductsFromFavoriteList,
  addProductsToCompareList,
  removeProductsFromCompareList,
  resetToInit,
  changeProductsPerPage,
  sortProductsByAlphabetAZ,
  sortProductsByAlphabetZA,
  sortProductsByPriceHigh,
  sortProductsByPriceLow,
  filterProductsByRate,
  removeProductsFromCartList,
  cloneToFilterProductList,
  filterProductsByPrice,
  addTotalPriceToCartProducts,
  totalPriceCalculate,
  removeAllProducts,
  getSelectedProduct,
} = productSlice.actions
export default productSlice.reducer
