import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import cartReducer from "./Redux/cart/CartSlice"
import authReducer from "./Redux/users/userSlice"
import productReducer from "./Redux/products/productSlice"
import categoryReducer from "./Redux/Categories/CategorySlice"
import blogsReducer from "./Redux/blogs/blogSlice"
import contactReducer from "./Redux/contacts/contactSlice"
import countryReducer from "./Redux/countries/countrySlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    blog: blogsReducer,
    contact: contactReducer,
    country: countryReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
