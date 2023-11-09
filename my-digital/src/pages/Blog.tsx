import styled from "styled-components";
import useTitle from "../hooks/useTitle";
import { Col, Container, Row } from "react-bootstrap";
import BlogCard from "../components/BlogCard";
import { CategoryList, FilterCard, FilterTitle } from "./OurStore";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { allBlogState } from "../app/Redux/blogs/blogSlice";
import { NavLink } from "react-router-dom";
import {
  getProducts,
  getProductsInCategory,
} from "../app/Redux/products/productSlice";
import { categories } from "../app/Redux/Categories/CategorySlice";
import toCapitalize from "../utils/toCapitalize";

const Wrapper = styled.section`
  padding-top: 160px;
`;

interface IBlog {
  onCategoryChange: () => void;
}

export default function Blog({ onCategoryChange }: IBlog) {
  useTitle("Blogs");
  const dispatch = useAppDispatch();
  const allBlogs = useAppSelector(allBlogState);
  const allCategories = useAppSelector(categories);

  return (
    <Wrapper>
      <Container fluid="xxl" className="blog-wrapper home-wrapper-2 py-5">
        <Row className="g-">
          <Col xs={3}>
            <FilterCard>
              <FilterTitle>Categories</FilterTitle>
              <CategoryList>
                <li>
                  <NavLink
                    onClick={() => {
                      dispatch(getProducts());
                      onCategoryChange();
                    }}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "blue" : "",
                      };
                    }}
                    to={`/products/all`}
                  >
                    All Products
                  </NavLink>
                </li>
                {allCategories?.map((category) => (
                  <li key={category?.id}>
                    <NavLink
                      onClick={() => {
                        dispatch(getProductsInCategory(category?.id));
                        onCategoryChange();
                      }}
                      style={({ isActive }) => {
                        return {
                          color: isActive ? "blue" : "",
                        };
                      }}
                      to={`/products/${category?.category}`}
                    >
                      {toCapitalize(category?.category)}
                    </NavLink>
                  </li>
                ))}
              </CategoryList>
            </FilterCard>
          </Col>

          <Col xs={9}>
            <Row className="g-3">
              {allBlogs?.map((blog, index) => (
                <Col key={index} xs={4}>
                  <BlogCard blog={blog} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
}
