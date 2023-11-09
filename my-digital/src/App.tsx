import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "tippy.js/dist/tippy.css";
import { useEffect, useMemo, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GlobalStyles from "./style/GlobalStyle";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import OurStore from "./pages/OurStore";
import ProductsList from "./components/ProductsList";
import {
  cartProductsState,
  cloneToFilterProductList,
  commentsSingleProductState,
  compareProductsState,
  favoriteProductsState,
  filterProductsListState,
  getPopularProducts,
  getProducts,
  renderProductsState,
  selectedProductState,
} from "./app/Redux/products/productSlice";
import { getAllCategories } from "./app/Redux/Categories/CategorySlice";
import Layout from "./components/Layout";
import SingleBlog from "./components/SingleBlog";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import Checkout from "./pages/CheckOut";
import Contact from "./pages/Contact";
import FavoriteList from "./pages/FavoriteList";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivatePolicy";
import ProductDetail from "./pages/ProductDetail";
import RefundPolicy from "./pages/RefundPolicy";
import ResetPassword from "./pages/ResetPassword";
import ShippingPolicy from "./pages/ShippingPolicy";
import SignUp from "./pages/SignUp";
import TermAndCondition from "./pages/TermAndCondition";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import { getAllBlogs } from "./app/Redux/blogs/blogSlice";
import Test from "./pages/Test";
import SearchProductsList from "./pages/SearchProductsList";
import { isLoginState } from "./app/Redux/users/userSlice";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import MyProfile from "./pages/MyProfile";

export const CLIENT_ID =
  "AR7DIhTjR3PfJecOliIJIq0BFyNqkRXChTJZWA3Wwz1_eo5tZVCaEHhmocoz80Q3_GjThDlyjvvIc6YM";

function App() {
  const favoriteProducts = useAppSelector(favoriteProductsState);
  const compareProducts = useAppSelector(compareProductsState);
  const cartProducts = useAppSelector(cartProductsState);
  const commentsProduct = useAppSelector(commentsSingleProductState);
  const selectedProduct = useAppSelector(selectedProductState);
  const renderProducts = useAppSelector(renderProductsState);
  const filterProducts = useAppSelector(filterProductsListState);
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(isLoginState);

  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;

  const startItem = (currentPage - 1) * itemPerPage;
  const endItem = startItem + itemPerPage;
  const displayedProducts = filterProducts?.slice(startItem, endItem);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageChange = (event: any, page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = () => {
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    dispatch(getPopularProducts());
    dispatch(getAllBlogs());
  }, []);

  useEffect(() => {
    dispatch(cloneToFilterProductList(renderProducts));
  }, [renderProducts]);

  useEffect(() => {
    localStorage.setItem("favoriteList", JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareProducts));
  }, [compareProducts]);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
  }, [selectedProduct]);

  useEffect(() => {
    localStorage.setItem("commentsProduct", JSON.stringify(commentsProduct));
  }, [commentsProduct]);

  const router = useMemo(() => {
    return createBrowserRouter([
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "products",
            element: (
              <OurStore
                onCategoryChange={handleCategoryChange}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            ),
            children: [
              {
                index: true,
                element: <Navigate to="all" />,
              },
              {
                path: "all",
                element: <ProductsList listItem={displayedProducts} />,
              },
              {
                path: ":category",
                element: <ProductsList listItem={displayedProducts} />,
              },
            ],
          },
          {
            path: "products/:category/:id",
            element: <ProductDetail />,
          },
          {
            path: "blogs",
            element: <Blog onCategoryChange={handleCategoryChange} />,
          },
          {
            path: "blogs/:id",
            element: <SingleBlog />,
          },
          {
            path: "compare",
            element: <Compare />,
          },
          {
            path: "favorite",
            element: <FavoriteList />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "cart",
            element: isLogin ? <Cart /> : <Navigate to={"/login"} />,
          },
          {
            path: "signUp",
            element: <SignUp />,
          },
          {
            path: "forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "reset-password",
            element: <ResetPassword />,
          },
          {
            path: "privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            path: "refund-policy",
            element: <RefundPolicy />,
          },
          {
            path: "shipping-policy",
            element: <ShippingPolicy />,
          },
          {
            path: "term-condition",
            element: <TermAndCondition />,
          },

          {
            path: "search",
            element: <SearchProductsList />,
          },
          { path: "test", element: <Test /> },
          {
            path: "my-profile",
            element: <MyProfile />,
          },
        ],
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ]);
  }, [handleCategoryChange, displayedProducts, currentPage, handlePageChange]);

  return (
    <PayPalScriptProvider options={{ clientId: CLIENT_ID }}>
      <QueryClientProvider client={new QueryClient()}>
        <GlobalStyles>
          <RouterProvider router={router} />
        </GlobalStyles>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PayPalScriptProvider>
  );
}

export default App;
